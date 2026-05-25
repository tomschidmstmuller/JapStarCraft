let ctx = null;
let masterGain = null;
let reactorNodes = [];
let initialized = false;
let enabled = true;

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function createOsc(freq, type, gainVal, detune = 0) {
  const c = getContext();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  gain.gain.value = gainVal;
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  return { osc, gain };
}

function createNoiseBuffer() {
  const c = getContext();
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buf;
}

let noiseSource = null;

export function init() {
  if (initialized) return;
  initialized = true;
  getContext();
}

export function setEnabled(val) {
  enabled = val;
  if (!ctx || !masterGain) return;
  const target = val ? 0.15 : 0;
  masterGain.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.5);
}

export function startReactorHum() {
  if (!enabled) return;
  const c = getContext();
  const baseFreq = 55;

  const layers = [
    createOsc(baseFreq, "sine", 0.06),
    createOsc(baseFreq * 2, "sine", 0.03, 0.5),
    createOsc(baseFreq * 4, "sine", 0.015, -0.3),
    createOsc(baseFreq * 0.5, "sine", 0.04, 0.2),
  ];

  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.4;
  lfoGain.gain.value = 1.5;
  lfo.connect(lfoGain);
  lfoGain.connect(layers[0].osc.frequency);
  lfo.start();

  const lfo2 = c.createOscillator();
  const lfoGain2 = c.createGain();
  lfo2.frequency.value = 0.15;
  lfoGain2.gain.value = 0.8;
  lfo2.connect(lfoGain2);
  lfoGain2.connect(layers[1].osc.frequency);
  lfo2.start();

  reactorNodes = [...layers, { osc: lfo, gain: lfoGain }, { osc: lfo2, gain: lfoGain2 }];
}

export function stopReactorHum() {
  reactorNodes.forEach(n => {
    try {
      n.osc.stop();
      n.osc.disconnect();
      n.gain.disconnect();
    } catch (e) { /* already stopped */ }
  });
  reactorNodes = [];
}

let signalInterval = null;

export function startSignalChirps() {
  if (!enabled) return;
  const c = getContext();

  function chirp() {
    if (!enabled) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200 + Math.random() * 800, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000 + Math.random() * 1000, c.currentTime + 0.08);
    gain.gain.setValueAtTime(0.02, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.15);
  }

  chirp();
  signalInterval = setInterval(chirp, 3000 + Math.random() * 4000);
}

export function stopSignalChirps() {
  if (signalInterval) clearInterval(signalInterval);
  signalInterval = null;
}

let chatterInterval = null;

export function startRadioChatter() {
  if (!enabled) return;

  const c = getContext();

  function burst() {
    if (!enabled) return;
    const len = 0.08 + Math.random() * 0.12;
    const buf = createNoiseBuffer();
    const src = c.createBufferSource();
    src.buffer = buf;

    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 300 + Math.random() * 2000;
    bp.Q.value = 0.5;

    const gain = c.createGain();
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, c.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, c.currentTime + len);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(masterGain);
    src.start(c.currentTime);
    src.stop(c.currentTime + len);
  }

  burst();
  chatterInterval = setInterval(burst, 5000 + Math.random() * 8000);
}

export function stopRadioChatter() {
  if (chatterInterval) clearInterval(chatterInterval);
  chatterInterval = null;
}

export function playClick(freq = 800, duration = 0.05) {
  if (!enabled || !ctx) return;
  const c = ctx;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.04, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export function playHover(freq = 1200, duration = 0.03) {
  if (!enabled || !ctx) return;
  const c = ctx;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.015, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export function playDeploy() {
  if (!enabled || !ctx) return;
  const c = ctx;
  [400, 600, 800].forEach((freq, i) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    const t = c.currentTime + i * 0.1;
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(t);
    osc.stop(t + 0.08);
  });
}

export function playIntel() {
  if (!enabled || !ctx) return;
  const c = ctx;
  // descending sweep
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(1500, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.3);
  gain.gain.setValueAtTime(0.025, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.35);
}

export function stopAll() {
  stopReactorHum();
  stopSignalChirps();
  stopRadioChatter();
  if (masterGain) {
    masterGain.gain.linearRampToValueAtTime(0, (ctx?.currentTime || 0) + 0.3);
  }
}

export function dispose() {
  stopAll();
  if (ctx) {
    ctx.close();
    ctx = null;
  }
  initialized = false;
}
