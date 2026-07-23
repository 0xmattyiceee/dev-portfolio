import './Mission.css';

const Mission = () => {
  return (
    <section id="mission" className="mission">
      <span className="section-tag">// the mission</span>
      <h2 className="section-title">All-in on Solana mobile.</h2>
      <div className="mission-body">
        <p>
          I'm a developer going all-in on Solana mobile. The focus is simple:
          learn the stack deeply and ship real dApps for the <strong>Seeker</strong>
          {' '}and the <strong>Solana dApp Store</strong>.
        </p>
        <p>
          I'm building in public — leveling up on Rust, Anchor, and the Solana
          Mobile Stack while shipping projects that prove I can take an idea from
          zero to deployed. I'm also exploring <strong>Unity</strong> to build games
          for the dApp Store. If it runs on-chain and lives on a phone, that's where
          I want to be.
        </p>
      </div>
    </section>
  );
};

export default Mission;
