(() => {
 const fine=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
 if(!fine || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 document.querySelectorAll(".tilt-card").forEach(card=>{
  card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;const ry=(x-.5)*7;const rx=(.5-y)*6;card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;});
  card.addEventListener("pointerleave",()=>{card.style.transform="";});
 });
})();