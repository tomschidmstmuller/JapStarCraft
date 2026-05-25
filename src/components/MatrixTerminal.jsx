import { useEffect } from "react";

const quotes = [
  "総員、戦闘配置",
  "軌道同期完了",
  "量子炉、安定状態",
  "敵性反応を確認",
  "戦術ネットワーク接続",
  "神経リンク同期中",
  "機動部隊、出撃準備",
  "命令を待機中",
  "重装部隊、前進",
  "システム正常",
  "目標を捕捉",
  "高エネルギー反応検知",
  "軌道防衛システム起動",
  "量子通信リンク確立",
  "全兵装、待機状態",
  "警告：敵艦接近",
  "ニューラルコア起動",
  "防衛マトリクス展開",
  "電子戦システム稼働",
  "暗号化通信安定",
  "戦術演算開始",
  "戦域データ解析中",
  "識別コード承認",
  "アクセス権限確認済み",
  "火力支援を要請",
  "重力制御安定",
  "次元境界フィールド正常",
  "軌道兵器オンライン",
  "迎撃システム展開",
  "脅威レベル上昇",
  "プラズマ収束率正常",
  "敵影を確認",
  "量子演算処理中",
  "戦略AI起動",
  "戦闘プロトコル開始",
  "防衛ライン維持",
  "戦術衛星リンク確立",
  "高次元通信接続",
  "機械知能同期完了",
  "シグナル増幅中",
  "オーバークロック実行",
  "極秘区画アクセス",
  "迎撃準備完了",
  "中央司令部リンク確立",
  "火器管制システム正常",
  "軌道降下部隊待機",
  "敵性生命反応あり",
  "量子ノード同期",
  "深層解析を実行中",
  "超光速通信安定",
];

function createColumn(container) {
  const column = document.createElement("div");
  column.classList.add("matrix-column");

  if (Math.random() > 0.85) {
    column.classList.add("red");
  }

  const stackSize = Math.floor(Math.random() * 12) + 8;
  let stack = "";
  for (let i = 0; i < stackSize; i++) {
    stack += quotes[Math.floor(Math.random() * quotes.length)] + "<br><br>";
  }
  column.innerHTML = stack;

  column.style.left = Math.random() * window.innerWidth + "px";
  const duration = Math.random() * 12 + 10;
  column.style.animationDuration = duration + "s";
  column.style.opacity = Math.random() * 0.35 + 0.1;
  column.style.fontSize = Math.random() * 0.5 + 0.65 + "rem";

  container.appendChild(column);

  setTimeout(() => {
    column.remove();
  }, duration * 1000);
}

export default function MatrixTerminal() {
  useEffect(() => {
    const container = document.getElementById("matrixTerminal");
    if (!container) return;

    const interval = setInterval(() => {
      createColumn(container);
    }, 250);

    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        createColumn(container);
      }, i * 120);
    }

    return () => clearInterval(interval);
  }, []);

  return <div className="matrix-terminal" id="matrixTerminal" />;
}
