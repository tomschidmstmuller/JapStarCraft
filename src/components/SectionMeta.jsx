import { useState, useEffect } from "react";

export default function SectionMeta({ clearance, coords, crimson }) {
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTimeStr(d.toISOString().slice(11, 19) + "Z");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="section-meta">
      <span className={`clearance${crimson ? " crimson" : ""}`}>
        <span className="clearance-dot" />
        {clearance}
      </span>
      <span className="coords">{coords}</span>
      <span className="timestamp">{timeStr}</span>
    </div>
  );
}
