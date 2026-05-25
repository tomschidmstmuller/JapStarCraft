const tiles = [
  { id: "hero", img: "cruiserlocked.gif", label: "HYPERION • FLAGSHIP", cls: "hero" },
  { id: "m1", img: "marine.gif", label: "C-14 IMPALER • MARINE", cls: "medium medium1" },
  { id: "m2", img: "tank.gif", label: "ARCLITE SIEGE MODE", cls: "medium medium2" },
  { id: "s1", img: "goliath.gif", label: "GOLIATH • WALKER", cls: "small small1" },
  { id: "s2", img: "robocommando.gif", label: "ROBO COMMANDO", cls: "small small2" },
  { id: "s3", img: "sovietcommando.gif", label: "SOVIET COMMANDO", cls: "small small3" },
  { id: "s4", img: "ghostcommando.gif", label: "GHOST • CLOAK ACTIVE", cls: "small small4" },
  { id: "s5", img: "tycus.gif", label: "TYCUS • HEAVY METAL", cls: "small small5" },
  { id: "s6", img: "ghostgirl.gif", label: "SPECTRE DIVISION", cls: "small small6" },
  { id: "s7", img: "giphy.gif", label: "TACTICAL FEED", cls: "small small7" },
];

export default function CinematicGrid() {
  return (
    <section className="cinematic-section" id="cinematic">
      <div className="cinematic-grid">
        <div className="cinematic-header">
          <div className="title-sc">◈ KORHAL SECTOR ◈ <span>CINEMATIC GRID</span></div>
          <div className="badge-korp">TERRAN DOMINION ARCHIVE // GIF RECON</div>
        </div>
        <div className="grid-7-starcraft">
          {tiles.map((t) => (
            <div key={t.id} className={`gif-card ${t.cls}`}>
              <img src={`/media/${t.img}`} alt={t.label} loading="lazy" />
              <div className="sc-badge">{t.label}</div>
            </div>
          ))}
        </div>
        <div className="cinematic-footer">
          <div className="sub">✧ KOPRULU SECTOR • CINEMATIC FEED ✧</div>
        </div>
      </div>
    </section>
  );
}
