import './Stack.css';

const shipping = ['React', 'TypeScript', 'JavaScript', 'C#', 'Python', 'Solidity', 'HTML/CSS', 'Git', 'Vite'];
const leveling = ['Rust', 'Anchor', 'Solana Mobile Stack', 'Solana Kit / web3.js', 'Mobile Wallet Adapter', 'Clarity', 'Cadence', 'Move', 'Go', 'C++'];

const Stack = () => {
  return (
    <section id="stack" className="stack">
      <span className="section-tag">// the stack</span>
      <h2 className="section-title">What I build with.</h2>
      <div className="stack-grid">
        <div className="stack-card">
          <h3 className="stack-heading">Shipping with</h3>
          <div className="chips">
            {shipping.map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
        <div className="stack-card">
          <h3 className="stack-heading">
            Leveling up <span className="stack-sub">// learning now</span>
          </h3>
          <div className="chips">
            {leveling.map(s => <span key={s} className="chip chip-learning">{s}</span>)}
          </div>
        </div>
      </div>
      <div className="credential">
        <h3 className="stack-heading">Verified credential</h3>
        <a
          href="https://www.credly.com/badges/ec0ccf1b-09aa-4bd9-b675-55939a8fdb3e/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="credential-badge"
        >
          <img
            src="https://images.credly.com/images/0f3e4162-ab6b-457c-8c0d-835a14680666/linkedin_thumb_image.png"
            alt="IBM Z Xplore - Concepts"
          />
        </a>
      </div>
    </section>
  );
};

export default Stack;
