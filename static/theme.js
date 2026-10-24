(() => {
 const key="cipherguard-theme";
 const root=document.documentElement;
 function apply(theme){root.dataset.theme=theme;document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{btn.innerHTML=theme==="dark"?"☼ <span>Light mode</span>":"☾ <span>Dark mode</span>";btn.setAttribute("aria-label",`Switch to ${theme==="dark"?"light":"dark"} mode`);});}
 let saved="dark";try{saved=localStorage.getItem(key)||"dark";}catch(_){} apply(saved);
 document.querySelectorAll("[data-theme-toggle]").forEach(btn=>btn.addEventListener("click",()=>{const next=root.dataset.theme==="dark"?"light":"dark";apply(next);try{localStorage.setItem(key,next);}catch(_){}}));
})();