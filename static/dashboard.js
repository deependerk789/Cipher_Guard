document.getElementById("download-report").addEventListener("click", () => {
 const content = `CIPHERGUARD SECURITY TOOLKIT — SECURITY REPORT\nGenerated: ${new Date().toLocaleString()}\n\nCHECKLIST\n- Use a unique password for every account.\n- Prefer long passwords or passphrases (16+ characters recommended).\n- Store credentials in a reputable password manager.\n- Enable multi-factor authentication wherever possible.\n- Never paste real credentials into educational demo tools.\n\nLIMITATION\nThis is a general educational checklist, not an account or device scan.\n`;
 const blob = new Blob([content], {type:"text/plain;charset=utf-8"});
 const url = URL.createObjectURL(blob), a = document.createElement("a");
 a.href = url; a.download = "cipherguard-security-report.txt"; a.click(); URL.revokeObjectURL(url);
});