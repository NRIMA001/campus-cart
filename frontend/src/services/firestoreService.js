import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const ITEMS_COL = "items";
const ORDERS_COL = "orders";
const CONVERSATIONS_COL = "conversations";
const MESSAGES_COL = "messages";

/* ── Helper: wrap a promise with a timeout ── */
function withTimeout(promise, ms = 10000, label = "Operation") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/* ── Upload image to Firebase Storage ── */
export async function uploadItemImage(file, userId) {
  const filename = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `items/${userId}/${filename}`);
  const snapshot = await withTimeout(
    uploadBytes(storageRef, file),
    15000,
    "Image upload"
  );
  return getDownloadURL(snapshot.ref);
}

/* ══════════════════════════════════════════════
   ITEMS — marketplace listings
   ══════════════════════════════════════════════ */

/* ── Fetch all items of a type ("rent" | "buy") ── */
export async function fetchItems(type) {
  try {
    const q = query(
      collection(db, ITEMS_COL),
      where("type", "==", type),
      orderBy("createdAt", "desc")
    );
    const snap = await withTimeout(getDocs(q), 10000, "Fetch items");
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    if (err.message?.includes("index") || err.code === "failed-precondition") {
      console.warn("Composite index missing — fetching without sort order.");
      const q = query(collection(db, ITEMS_COL), where("type", "==", type));
      const snap = await withTimeout(getDocs(q), 10000, "Fetch items fallback");
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    throw err;
  }
}

/* ── Fetch a single item by doc ID ── */
export async function fetchItemById(id) {
  const snap = await withTimeout(getDoc(doc(db, ITEMS_COL, id)), 8000, "Fetch item");
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/* ── Fetch items listed by a specific user ── */
export async function fetchUserItems(userId, type) {
  try {
    const q = query(
      collection(db, ITEMS_COL),
      where("sellerId", "==", userId),
      where("type", "==", type),
      orderBy("createdAt", "desc")
    );
    const snap = await withTimeout(getDocs(q), 10000, "Fetch user items");
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    if (err.message?.includes("index") || err.code === "failed-precondition") {
      const q = query(
        collection(db, ITEMS_COL),
        where("sellerId", "==", userId),
        where("type", "==", type)
      );
      const snap = await withTimeout(getDocs(q), 10000, "Fetch user items fallback");
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    throw err;
  }
}

/* ── Add a new item ── */
export async function addItem(itemData) {
  const docRef = await withTimeout(
    addDoc(collection(db, ITEMS_COL), {
      ...itemData,
      status: itemData.status || "Available",
      createdAt: serverTimestamp(),
    }),
    10000,
    "Add item"
  );
  return { id: docRef.id, ...itemData };
}

/* ── Update an existing item ── */
export async function updateItem(itemId, updates) {
  await withTimeout(
    updateDoc(doc(db, ITEMS_COL, itemId), {
      ...updates,
      updatedAt: serverTimestamp(),
    }),
    8000,
    "Update item"
  );
}

/* ── Delete an item ── */
export async function deleteItem(itemId) {
  await withTimeout(deleteDoc(doc(db, ITEMS_COL, itemId)), 8000, "Delete item");
}

/* ══════════════════════════════════════════════
   ORDERS — track rentals & purchases
   ══════════════════════════════════════════════ */

export async function createOrder(orderData) {
  const docRef = await withTimeout(
    addDoc(collection(db, ORDERS_COL), {
      ...orderData,
      status: "confirmed",
      createdAt: serverTimestamp(),
    }),
    10000,
    "Create order"
  );
  return { id: docRef.id, ...orderData, status: "confirmed" };
}

export async function fetchUserOrders(userId) {
  try {
    const q = query(collection(db, ORDERS_COL), where("buyerId", "==", userId), orderBy("createdAt", "desc"));
    const snap = await withTimeout(getDocs(q), 10000, "Fetch user orders");
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    if (err.message?.includes("index") || err.code === "failed-precondition") {
      const q = query(collection(db, ORDERS_COL), where("buyerId", "==", userId));
      const snap = await withTimeout(getDocs(q), 10000, "Fetch user orders fallback");
      return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    throw err;
  }
}

export async function fetchSellerOrders(userId) {
  try {
    const q = query(collection(db, ORDERS_COL), where("sellerId", "==", userId), orderBy("createdAt", "desc"));
    const snap = await withTimeout(getDocs(q), 10000, "Fetch seller orders");
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    if (err.message?.includes("index") || err.code === "failed-precondition") {
      const q = query(collection(db, ORDERS_COL), where("sellerId", "==", userId));
      const snap = await withTimeout(getDocs(q), 10000, "Fetch seller orders fallback");
      return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    }
    throw err;
  }
}

/* ══════════════════════════════════════════════
   MESSAGING — real-time conversations
   ══════════════════════════════════════════════ */

/* ── Find or create a conversation between two users ── */
export async function getOrCreateConversation(myUid, myName, otherUid, otherName, itemContext) {
  // Check if a conversation already exists between these two users
  const q = query(
    collection(db, CONVERSATIONS_COL),
    where("participantIds", "array-contains", myUid)
  );
  const snap = await withTimeout(getDocs(q), 8000, "Find conversation");

  for (const d of snap.docs) {
    const data = d.data();
    if (data.participantIds.includes(otherUid)) {
      return { id: d.id, ...data };
    }
  }

  // No existing conversation — create one
  const convoData = {
    participantIds: [myUid, otherUid],
    participants: {
      [myUid]: { name: myName, avatar: myName.charAt(0).toUpperCase() },
      [otherUid]: { name: otherName, avatar: otherName.charAt(0).toUpperCase() },
    },
    lastMessage: "",
    lastMessageAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    ...(itemContext ? { itemId: itemContext.id, itemName: itemContext.name, itemImage: itemContext.image } : {}),
  };

  const docRef = await withTimeout(
    addDoc(collection(db, CONVERSATIONS_COL), convoData),
    8000,
    "Create conversation"
  );
  return { id: docRef.id, ...convoData };
}

/* ── Subscribe to user's conversations (real-time) ── */
export function subscribeToConversations(userId, callback) {
  const q = query(
    collection(db, CONVERSATIONS_COL),
    where("participantIds", "array-contains", userId)
  );

  return onSnapshot(q, (snap) => {
    const convos = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.lastMessageAt?.seconds || 0) - (a.lastMessageAt?.seconds || 0));
    callback(convos);
  }, (err) => {
    console.error("Conversation subscription error:", err);
  });
}

/* ── Send a message in a conversation ── */
export async function sendMessage(conversationId, senderId, senderName, text) {
  const msgData = {
    conversationId,
    senderId,
    senderName,
    text,
    createdAt: serverTimestamp(),
  };

  const docRef = await withTimeout(
    addDoc(collection(db, MESSAGES_COL), msgData),
    8000,
    "Send message"
  );

  // Update conversation's lastMessage
  await withTimeout(
    updateDoc(doc(db, CONVERSATIONS_COL, conversationId), {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    }),
    5000,
    "Update conversation"
  );

  return { id: docRef.id, ...msgData };
}

/* ── Subscribe to messages in a conversation (real-time) ── */
export function subscribeToMessages(conversationId, callback) {
  const q = query(
    collection(db, MESSAGES_COL),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(messages);
  }, (err) => {
    console.error("Messages subscription error:", err);
    // Fallback without ordering
    const fallbackQ = query(
      collection(db, MESSAGES_COL),
      where("conversationId", "==", conversationId)
    );
    return onSnapshot(fallbackQ, (snap) => {
      const messages = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
      callback(messages);
    });
  });
}

/* ── Fetch all users (for "New Conversation" picker) ── */
export async function fetchAllUsers() {
  const snap = await withTimeout(getDocs(collection(db, "users")), 8000, "Fetch users");
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
}
