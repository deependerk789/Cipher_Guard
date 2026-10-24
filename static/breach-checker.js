(() => {
 const password = document.getElementById("breach-password"), status = document.getElementById("breach-status");
 document.getElementById("toggle-breach-password").addEventListener("click", e => {
   password.type = password.type === "password" ? "text" : "password";
   e.currentTarget.textContent = password.type === "password" ? "Show" : "Hide";
 });
 document.getElementById("run-breach-check").addEventListener("click", async () => {
   if (!password.value) { status.textContent = "Enter a made-up sample password first."; status.className = "status-message bad"; return; }
   status.textContent = "Checking…"; status.className = "status-message";
   try {
     const response = await fetch("/api/breach-check", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password:password.value})});
     const data = await response.json();
     if (!response.ok) throw new Error(data.error || "The check failed.");
     status.textContent = data.found ? `⚠ ${data.message} Occurrences reported: ${Number(data.count).toLocaleString()}.` : `✓ ${data.message}`;
     status.className = "status-message " + (data.found ? "bad" : "good");
   } catch (err) { status.textContent = err.message || "Unable to check right now."; status.className = "status-message bad"; }
 });
})();