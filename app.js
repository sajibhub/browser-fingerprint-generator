// app.js

const Fingerprint = async () => {

  const hashData = async (data) => {
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));

    return [...new Uint8Array(buffer)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };


  const getCanvasFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      ctx.textBaseline = "top";
      ctx.font = "16px Arial";
      ctx.fillStyle = "#123456";
      ctx.fillRect(0, 0, 200, 60);
      ctx.fillStyle = "#abcdef";
      ctx.fillText("device-check", 4, 4);

      return canvas.toDataURL();
    } catch {
      return "canvas-off";
    }
  };


  const getWebGLFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      if (!gl) return "no-webgl";

      const dbg = gl.getExtension("WEBGL_debug_renderer_info");

      return dbg
        ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
        : "unknown";
    } catch {
      return "webgl-off";
    }
  };


  const getAudioFingerprint = async () => {
    try {
      const ctx = new (window.AudioContext ||
        window.webkitAudioContext)();

      const osc = ctx.createOscillator();
      const analyser = ctx.createAnalyser();
      const gain = ctx.createGain();

      osc.frequency.value = 9000;
      osc.type = "sine";
      gain.gain.value = 0;

      osc.connect(analyser);
      analyser.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      osc.stop();
      ctx.close();

      return data.slice(0, 25).join(",");
    } catch {
      return "audio-off";
    }
  };


  const generateFingerprint = async () => {

    // Persistent ID
    let saved = localStorage.getItem("fp_id");

    if (saved) return saved;


    const audio = await getAudioFingerprint();

    const info = [
      navigator.platform,
      navigator.hardwareConcurrency,
      navigator.deviceMemory || "x",
      screen.width,
      screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      getCanvasFingerprint(),
      getWebGLFingerprint(),
      audio
    ].join("|");


    const hash = await hashData(info);

    localStorage.setItem("fp_id", hash);

    return hash;
  };


  return await generateFingerprint();
};

export default Fingerprint;
