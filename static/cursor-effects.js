(() => {
  "use strict";
  const orb=document.getElementById("cg-cursor-orb");
  const transition=document.getElementById("cg-page-transition");
  if(!orb)return;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse=window.matchMedia("(pointer: coarse)").matches;
  if(!coarse&&!reduce){
    let x=-100,y=-100,tx=-100,ty=-100,raf=0;
    const move=e=>{tx=e.clientX-17;ty=e.clientY-17;orb.classList.add("cg-cursor-visible");if(!raf)raf=requestAnimationFrame(draw);};
    function draw(){x+=(tx-x)*.22;y+=(ty-y)*.22;orb.style.transform=`translate3d(${x}px,${y}px,0)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.3)raf=requestAnimationFrame(draw);else raf=0;}
    document.addEventListener("mousemove",move,{passive:true});
    document.addEventListener("mouseleave",()=>orb.classList.remove("cg-cursor-visible"));
    document.addEventListener("mousedown",()=>orb.classList.add("cg-cursor-click"));
    document.addEventListener("mouseup",()=>window.setTimeout(()=>orb.classList.remove("cg-cursor-click"),360));
  }
  function showTransition(){if(!transition||reduce)return;transition.classList.add("cg-transition-active");}
  document.addEventListener("click",event=>{
    const link=event.target.closest("a[href]");
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    if(link.target==="_blank"||link.hasAttribute("download")||link.getAttribute("href").startsWith("#"))return;
    let url;try{url=new URL(link.href,location.href);}catch(_){return;}
    if(url.origin!==location.origin||url.href===location.href)return;
    showTransition();
  });
  document.querySelectorAll("form").forEach(form=>form.addEventListener("submit",event=>{
    if(event.defaultPrevented||!form.checkValidity())return;
    // Skip the guide chat, which submits locally without navigating.
    if(form.id==="cg-guide-form")return;
    showTransition();
  }));
  window.addEventListener("pageshow",()=>{if(transition)transition.classList.remove("cg-transition-active");});
})();