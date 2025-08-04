// app.js

const Fingerprint = async () => {
    const hashData = async (data) => {
        const encoder = new TextEncoder();
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    };

    const getCanvasFingerprint = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = "14px Arial";
        ctx.fillText("Fingerprinting", 2, 2);
        return canvas.toDataURL();
    };

    const getWebGLFingerprint = () => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return "WebGL Not Supported";

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown";
    };

    const generateFingerprint = async () => {
        const deviceInfo = [
            navigator.userAgent,
            navigator.platform,
            navigator.language,
            navigator.hardwareConcurrency,
            new Date().getTimezoneOffset(),
            getCanvasFingerprint(),
            getWebGLFingerprint()
        ].join('|');

        return await hashData(deviceInfo);
    };

    return await generateFingerprint();
};

export default Fingerprint;
