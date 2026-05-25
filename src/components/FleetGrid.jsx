import { motion } from "framer-motion";
import SectionMeta from "./SectionMeta";

const fleetTiles = [
  { id: "dropship", img: "dropship.jpg", labelJP: "降下艦級", labelEN: "DROPSHIP CLASS", cls: "tile-hero" },
  { id: "locked", img: "cruiserlocked.gif", labelJP: "兵器ロック済", labelEN: "WEAPONS LOCKED", cls: "tile-gif" },
  { id: "wing", img: "cruiserwing.jpg", labelJP: "巡洋艦翼", labelEN: "BATTLECRUISER WING", cls: "tile-sm" },
  { id: "cmd", img: "fleetcommando.jpg", labelJP: "艦隊司令部", labelEN: "FLEET COMMAND", cls: "tile-md" },
  { id: "ghost", img: "ghost.jpg", labelJP: "ゴースト師団", labelEN: "GHOST DIVISION", cls: "tile-md" },
  { id: "commando", img: "ghostcommando.gif", labelJP: "特殊部隊", labelEN: "COMMANDO UNIT", cls: "tile-md" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function FleetGrid() {
  return (
    <section className="fleet" id="fleet">
      <div className="fleet-header">
        <SectionMeta clearance="// CLEARANCE: TACTICAL" coords="GRID: DEPLOY-4 // SECTOR: KOPRULU" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span>艦隊</span> DEPLOYMENT GRID
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          コプルル宙域 · 戦闘配備中
        </motion.p>
      </div>
      <div className="fleet-grid">
        {fleetTiles.map((tile, i) => (
          <motion.div
            key={tile.id}
            className={`fleet-tile ${tile.cls}`}
            custom={i}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <img src={`/media/${tile.img}`} alt={tile.labelEN} />
            <div className="fleet-tile-label">
              <span className="tile-label-jp">{tile.labelJP}</span>
              <span className="tile-label-en">{tile.labelEN}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
