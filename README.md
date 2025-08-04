# 📇 Browser Fingerprint Generator

A simple browser-only fingerprint generator using Canvas, WebGL, and SHA-256. Useful for device identification, session tracking, or light client fingerprinting.

---

## 🚀 Features

- Uses browser APIs: `navigator`, `canvas`, and `WebGL`
- Hashes data with `SHA-256` using `crypto.subtle`
- Lightweight and privacy-aware (no tracking)
- Fully asynchronous and easy to use

---

## 📦 Installation

```bash
npm install browser-fingerprint-generator
```
### Note: This package only works in the browser (not in Node.js).
## 🧑‍💻 Usage

```
import Fingerprint from 'browser-fingerprint-generator';

(async () => {
  const fingerprint = await Fingerprint();
  console.log("Your fingerprint:", fingerprint);
})();
```
## 📂 What’s Included

The fingerprint is generated using:

    navigator.userAgent

    navigator.platform

    navigator.language

    navigator.hardwareConcurrency

    Timezone offset

    Canvas rendering fingerprint

    WebGL renderer info

These are hashed together using SHA-256 for a consistent unique identifier.
## ⚠️ Limitations

    Not suitable for anti-fraud systems on its own

    Not stable across browsers/devices

    Doesn’t persist unless stored on your side

## 👨‍💻 Author
**MOHAMMAD SAJIB**

---



🔗 Links

  - [Repository](https://github.com/sajihub/browser-fingerprint-generator)

  - [NPM Package](https://www.npmjs.com/package/browser-fingerprint-generator)



Let me know if you want to auto-generate badges (like npm version, downloads, etc.) or add contribution guidelines.
