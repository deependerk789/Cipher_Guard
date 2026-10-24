(() => {
  const byId = (id) => document.getElementById(id);
  const out = byId("generated-password");
  if (!out) return;
  const symbols = "!@#$%^&*()-_=+[]{};:,.?";
  const ambiguous = "O0Il1|";
  function secureIndex(max) { const range = 256 - (256 % max); const bytes = new Uint8Array(1); do { crypto.getRandomValues(bytes); } while (bytes[0] >= range); return bytes[0] % max; }
  function generate() {
    let chars = "";
    if (byId("use-upper").checked) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (byId("use-lower").checked) chars += "abcdefghijkmnopqrstuvwxyz";
    if (byId("use-number").checked) chars += "23456789";
    if (byId("use-symbol").checked) chars += symbols;
    if (byId("exclude-ambiguous").value === "yes") chars = [...chars].filter(c => !ambiguous.includes(c)).join("");
    if (!chars) { byId("generator-status").textContent = "Select at least one character type."; byId("generator-status").className = "status-message bad"; return; }
    const length = Math.max(8, Math.min(64, Number(byId("password-length").value) || 20));
    byId("password-length").value = length;
    out.value = Array.from({length}, () => chars[secureIndex(chars.length)]).join("");
    out.type = "password";
    const entropy = Math.round(length * Math.log2(chars.length));
    byId("generator-status").textContent = `Generated locally · approximate character-set entropy: ${entropy} bits. This is an estimate, not a guarantee.`;
    byId("generator-status").className = "status-message good";
    const fill = byId("generator-meter-fill"); if (fill) fill.style.width = Math.min(100, entropy / 1.28) + "%";
    const toggle = byId("toggle-generated"); if (toggle) toggle.textContent = "Show";
  }
  byId("generate-password").addEventListener("click", generate);
  byId("copy-password").addEventListener("click", async () => {
    if (!out.value) generate(); if (!out.value) return;
    try { await navigator.clipboard.writeText(out.value); byId("generator-status").textContent = "Copied to clipboard. Store it safely in a password manager."; }
    catch (_) { out.type = "text"; out.select(); byId("generator-status").textContent = "Clipboard access unavailable. The password is selected so you can copy it manually."; }
  });
  const toggle = byId("toggle-generated"); if (toggle) toggle.addEventListener("click", () => { out.type = out.type === "password" ? "text" : "password"; toggle.textContent = out.type === "password" ? "Show" : "Hide"; });
  byId("download-password").addEventListener("click", () => {
    if (!out.value) generate(); if (!out.value) return;
    const blob = new Blob([out.value + "\n"], {type:"text/plain;charset=utf-8"}); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "cipherguard-generated-password.txt"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    byId("generator-status").textContent = "Downloaded as plain text. For real credentials, a password manager is safer.";
  });
  generate();
})();