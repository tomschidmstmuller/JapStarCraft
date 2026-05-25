import { motion } from "framer-motion";
import SectionMeta from "./SectionMeta";

const briefingParams = [
  { jp: "▶ 宙域：コプルル", en: "SECTOR: KOPRULU", color: "" },
  { jp: "▶ 脅威レベル：最高", en: "THREAT: CRITICAL", color: "#ff6060" },
  { jp: "▶ 損失数：機密", en: "CASUALTIES: CLASSIFIED", color: "" },
  { jp: "▶ 目標：制宙権確保", en: "OBJ: ORBITAL SUPREMACY", color: "" },
  { jp: "▶ 指揮官：レイナー提督", en: "CMD: ADM. RAYNOR", color: "" },
  { jp: "▶ 状態：稼働中", en: "STATUS: ACTIVE ⬤", color: "#00e5c8" },
];

const briefingSystems = [
  { jp: "パワーコア · POWER CORE", pct: 98 },
  { jp: "スキャナー · SCANNER", pct: 100 },
  { jp: "通信 · COMMS", pct: 85 },
];

export default function MissionBriefing() {
  return (
    <section className="briefing" id="briefing">
      <div className="briefing-panel-wrap">
      <SectionMeta clearance="// CLEARANCE: CLASSIFIED" coords="NODE: NEURAL-2 // ENCRYPTION: AES-256" crimson />
      <motion.div
        className="briefing-panel"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="briefing-header">
          <h2 className="briefing-title">// NEURAL NETWORK · MISSION BRIEFING</h2>
          <span className="briefing-classified">機密 · CLASSIFIED</span>
        </div>
        <div className="briefing-body">
          <div className="briefing-grid">
            <div>
              <div className="briefing-badge">// 作戦指令書 · OPERATION ORDER</div>
              <div className="briefing-jp-text">
                テラン自治領艦隊司令部より、<br />
                赤星師団全隊員に告ぐ。<br /><br />
                コプルル宙域における<br />
                異種族勢力の急速な拡大に伴い、<br />
                本師団は即時展開命令を受理した。<br /><br />
                バトルクルーザー艦隊は<br />
                軌道上制圧作戦を開始せよ。<br />
                ゴースト特殊部隊は<br />
                敵指揮系統の無力化を実施せよ。<br /><br />
                任務の成否は、<br />
                諸君の判断と行動にかかっている。<br />
                テラン自治領の未来を守れ。
              </div>
              <div className="briefing-en-quote">
                &ldquo;All units of the Redstar Division: immediate deployment orders received. Orbital bombardment commences now. Ghost operatives — neutralize enemy command. The future of the Dominion rests with you.&rdquo;
              </div>
            </div>

            <div>
              <div className="briefing-badge briefing-badge-red">// 作戦パラメータ · PARAMETERS</div>
              <div className="briefing-params">
                {briefingParams.map((p, i) => (
                  <div key={i} className="briefing-param-row">
                    <span className="briefing-param-jp">▶ {p.jp}</span>
                    <span className="briefing-param-en" style={p.color ? { color: p.color } : {}}>{p.en}</span>
                  </div>
                ))}
              </div>

              <div className="briefing-systems">
                {briefingSystems.map((s, i) => (
                  <div key={i} className="briefing-system-row">
                    <div className="briefing-system-label">{s.jp}</div>
                    <div className="briefing-system-bar"><div className="briefing-system-fill" style={{ width: s.pct + "%" }} /></div>
                  </div>
                ))}
              </div>

              <motion.button
                className="briefing-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                情報にアクセス · ACCESS FULL INTEL
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </section>
  );
}
