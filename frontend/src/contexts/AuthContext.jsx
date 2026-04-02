import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

function profileFromAuth(firebaseUser) {
  if (!firebaseUser) return null;
  let fullName = firebaseUser.displayName || "Student";
  let university = "";
  try {
    const parsed = JSON.parse(firebaseUser.displayName);
    fullName = parsed.fullName || fullName;
    university = parsed.university || "";
  } catch {
    // plain string
  }
  return { fullName, email: firebaseUser.email, university, role: "student" };
}

export function AuthProvider({ children }) {
  const [user, setUser]               = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading]         = useState(true);
  const isRegistering = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser && !isRegistering.current) {
        try {
          const snap = await Promise.race([
            getDoc(doc(db, "users", firebaseUser.uid)),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("timeout")), 5000)
            ),
          ]);
          setUserProfile(snap.exists() ? snap.data() : profileFromAuth(firebaseUser));
        } catch {
          setUserProfile(profileFromAuth(firebaseUser));
        }
      } else if (!firebaseUser) {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function register(email, password, fullName, university) {
    isRegistering.current = true;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(cred.user, {
        displayName: JSON.stringify({ fullName, university }),
      });

      const firestoreWrite = setDoc(doc(db, "users", cred.user.uid), {
        fullName,
        email: cred.user.email,
        university,
        role: "student",
        createdAt: serverTimestamp(),
      });

      try {
        await Promise.race([
          firestoreWrite,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000)
          ),
        ]);
      } catch {
        // profile data saved in Auth displayName as fallback
      }

      await signOut(auth);
    } finally {
      isRegistering.current = false;
    }
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    try {
      const snap = await Promise.race([
        getDoc(doc(db, "users", cred.user.uid)),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 5000)
        ),
      ]);
      setUserProfile(snap.exists() ? snap.data() : profileFromAuth(cred.user));
    } catch {
      setUserProfile(profileFromAuth(cred.user));
    }

    return cred;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  }

  const value = { user, userProfile, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
