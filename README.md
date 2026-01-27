
---

```markdown
# 🛰️ STARFRONT COMMAND — Web-based RTS System

> **STATUS:** ONLINE  
> **PROTOCOL:** REAL-TIME STRATEGY SIMULATION  
> **PLATFORM:** WEB

**STARFRONT COMMAND** 係一個以瀏覽器為運行平台嘅  
**即時戰略遊戲（RTS）系統**，靈感源自 **StarCraft**，  
重點放喺 **系統架構設計、即時狀態同步同操作反應速度**。

本項目並非單純「遊戲 Demo」，而係一個  
**可擴展 RTS 架構實驗場**。

---

## 🧠 CORE DESIGN PHILOSOPHY

- **State-driven Architecture**
- **Deterministic Game Loop**
- **Low-latency Input Handling**
- **Data-oriented Unit System**
- **Scalable Map & Entity Management**

目標係令每一個系統都可以：
> *被理解、被替換、被擴展*

---

## ⚙️ SYSTEM ARCHITECTURE

```

[ Input Layer ]
↓
[ Command Queue ]
↓
[ Game Loop ]
↓
[ World State ]
↓
[ Renderer ]

```

### 🕹️ Input System
- 事件驅動（Event-based）
- 支援點擊、拖曳、框選
- 指令轉換成 **Command Object**
- 所有操作統一進入 Command Queue

### 🔁 Game Loop
- 固定 Tick（Deterministic）
- 更新順序嚴格控制
- 確保模擬結果可預測、可重播

### 🌍 World State
- 單一真實狀態來源（Single Source of Truth）
- 所有單位、建築、資源都以資料形式存在
- 狀態更新與渲染完全分離

---

## 🧩 ENTITY & UNIT SYSTEM

- 單位以 **Component-based 結構** 定義  
- 行為由系統（System）負責，而非單位本身  
- 易於新增：
  - 新單位
  - 新技能
  - 新建築類型  

**Example Concept：**
```

Unit
├─ Position
├─ Health
├─ Movement
├─ Attack
└─ Ownership

```

---

## 🗺️ MAP & PATHFINDING

- Tile-based 地圖系統
- 地圖資料與邏輯完全解耦
- Pathfinding 可獨立替換（如 A*）
- 支援阻擋、建築佔位、地形限制

---

## 🎨 RENDERING PIPELINE

- Renderer 僅負責視覺呈現
- 不直接修改遊戲狀態
- 支援：
  - 單位選取高亮
  - 指令視覺回饋
  - Fog-of-War（計劃中）

---

## 📡 MULTIPLAYER READINESS（PLANNED）

- Deterministic loop 為多人同步作準備
- 指令同步 > 狀態同步
- 可延伸至：
  - WebSocket
  - Lockstep model
  - Replay / Observer mode

---

## 🛠️ TECH STACK

- **Frontend:** Web-based (HTML / CSS / JS)
- **Rendering:** Canvas / DOM-based hybrid
- **Architecture:** Modular, System-driven
- **State Management:** Centralized Game State
- **Build Philosophy:** No engine lock-in

---

## 🧪 DEVELOPMENT STATUS

- ✅ Core game loop implemented  
- ✅ Input & command system functional  
- ✅ Unit state management stable  
- 🟡 Pathfinding optimization ongoing  
- 🟡 UI/UX polish in progress  
- 🔴 Multiplayer not yet enabled  

---

## 🎯 PROJECT GOALS

- 證明 RTS 架構可以喺 Web 環境中成立  
- 將「經典即時戰略設計」轉化成現代工程實踐  
- 作為：
  - 技術展示
  - 架構實驗
  - 遊戲系統研究項目  

---

## 📜 LICENSE

MIT

> **TRANSMISSION END.**
> *Command the web. Build the battlefield.*
```

---
