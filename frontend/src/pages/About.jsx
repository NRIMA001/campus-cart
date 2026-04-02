import Topbar from "../components/Topbar";
import Icon from "../components/Icon";
import "./StaticPage.css";

export default function About() {
  return (
    <>
      <Topbar title="About Us" subtitle="The story behind Campus Cart" />
      <div className="page-content">
        <div className="static-page animate-slide-up">
          <section className="static-section">
            <h2>What is Campus Cart?</h2>
            <p>
              Campus Cart is a marketplace made for college students. If you need something
              for the semester — a textbook, a mini fridge, a drill for a project — there's
              probably someone on your campus who has it and isn't using it right now.
              We make it easy for you two to connect.
            </p>
          </section>

          <section className="static-section">
            <h2>Why we built this</h2>
            <p>
              College is expensive enough without having to buy things you'll only
              use once or twice. We kept running into the same problem: needing stuff
              for a class, a project, or a dorm setup, and not wanting to pay full
              price for something we'd barely use. So we built a place where students
              can rent, buy, and sell to each other — no middlemen, no markups, just
              people on the same campus helping each other out.
            </p>
          </section>

          <section className="static-section">
            <h2>What makes it different</h2>
            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon"><Icon name="lock" size={20} /></span>
                <h3>Verified Students</h3>
                <p>You need a .edu email to sign up. Everyone on the platform goes to a real school.</p>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon"><Icon name="savings" size={20} /></span>
                <h3>Actually Affordable</h3>
                <p>Rent what you need for a few bucks a day instead of dropping $50+ on something you'll use once.</p>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon"><Icon name="leaf" size={20} /></span>
                <h3>Less Stuff in Landfills</h3>
                <p>When things get passed along instead of thrown away, everyone wins.</p>
              </div>
            </div>
          </section>

          <section className="static-section">
            <h2>The Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">N</div>
                <h3>Nitesh</h3>
                <p>System Architecture & Backend</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">S</div>
                <h3>Sujal</h3>
                <p>Application Logic & UX</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
