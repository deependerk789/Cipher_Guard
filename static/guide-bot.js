(() => {
  "use strict";
  const root = document.getElementById("cg-guide");
  if (!root || root.dataset.ready === "true") return;
  root.dataset.ready = "true";

  const $ = (id) => document.getElementById(id);
  const openBtn = $("cg-guide-open"), panel = $("cg-guide-panel"), closeBtn = $("cg-guide-close");
  const content = $("cg-guide-content"), form = $("cg-guide-form"), input = $("cg-guide-input");
  const tour = $("cg-tour-card"), actions = $("cg-quick-actions");
  const pointer = $("cg-guide-pointer");
  let pointedTarget = null, pointerFrame = 0;
  const page = root.dataset.guidePage || "";
  let activeTopic = null, activeStep = 0, typingTimer = null;

  const guides = {
    analyze: {title:"Analyze a sample password", target:"/", match:["home","analyze_form"], steps:[
      ["Start on the home page","Find the sample-password analyzer form. This is a learning demo, not a real sign-in system."],
      ["Use fictional details","Enter a demo name and email address. Avoid personal information when presenting or sharing screenshots."],
      ["Enter a made-up password","Use a fictional test string only. Never enter a password you use for a real account."],
      ["Read the result","Select Analyze sample. Review the strength estimate, checklist, and recommendations. A score is an estimate, not a guarantee."]]},
    generate: {title:"Generate a secure password", target:"/password-generator", match:["password_generator"], steps:[
      ["Open the generator","Choose Password Generator from the results page or dashboard to open its dedicated page."],
      ["Choose a length","Choose at least 16 characters where supported. Longer passwords are generally harder to guess."],
      ["Choose character types","Use uppercase, lowercase, numbers, and symbols if the account supports them. Excluding ambiguous characters can improve readability."],
      ["Generate and store safely","Select Generate, then Copy or Download. Prefer importing it into a reputable password manager. Never share generated values in screenshots or chats."]]},
    breach: {title:"Use the password breach checker", target:"/breach-checker", match:["breach_checker"], steps:[
      ["Open the checker","Choose Password Breach Checker from the results page, or use the Open page button below."],
      ["Use a fictional sample","Enter a made-up sample only. The sample is sent to your Flask app for hashing; the breach service receives only a short hash prefix."],
      ["Run the check","Select Check breach corpus and wait for the result. A connection issue can prevent a result."],
      ["Interpret the result","A match means the sample appears in the queried corpus. No match does not prove a password is safe. Never reuse a password known to be breached."]]},
    dashboard: {title:"Use the security dashboard and report", target:"/dashboard", match:["dashboard"], steps:[
      ["Open the dashboard","Choose Security Dashboard & Report from the results page or breach checker."],
      ["Review the checklist","Check the advice about unique passwords, password managers, and multi-factor authentication."],
      ["Download a report","Select Download Security Report to save a text checklist to your device."],
      ["Understand its limits","The dashboard is an educational checklist. It does not scan your accounts, device, or network."]]},
    privacy: {title:"Privacy and safe use", target:null, match:[], steps:[
      ["Use sample data only","Never enter a real password, account credential, one-time code, or recovery code."],
      ["Understand strength analysis","The current analyzer sends the submitted sample password to your own Flask server so it can calculate a score."],
      ["Understand breach checking","The breach checker hashes the sample on your Flask server and queries the breach service with a five-character SHA-1 prefix. The sample still reaches your own server."],
      ["Protect real accounts","Use unique passwords, a reputable password manager, and multi-factor authentication. Avoid saving passwords in plain text files long-term."]]}
  };

  function addMessage(message, who="bot") {
    const wrap=document.createElement("div"); wrap.className=`cg-message ${who === "user" ? "cg-message-user" : "cg-message-bot"}`;
    const p=document.createElement("p"); p.textContent=message;
    if(who!=="user"){const label=document.createElement("b");label.textContent="CIPHERGUARD GUIDE";wrap.appendChild(label);}
    wrap.appendChild(p);content.insertBefore(wrap,tour);content.scrollTop=content.scrollHeight;
  }
  function openPanel(){panel.hidden=false;openBtn.setAttribute("aria-expanded","true");input.focus();}
  function closePanel(){panel.hidden=true;clearPointer();openBtn.setAttribute("aria-expanded","false");openBtn.focus();}
  openBtn.addEventListener("click",()=>panel.hidden?openPanel():closePanel());
  closeBtn.addEventListener("click",closePanel);

  function clearPointer(){
    if(pointedTarget){pointedTarget.classList.remove("cg-point-target");pointedTarget=null;}
    if(pointer)pointer.hidden=true;
    window.removeEventListener("scroll",positionPointer,true);
    window.removeEventListener("resize",positionPointer);
    if(pointerFrame)cancelAnimationFrame(pointerFrame);
  }
  function selectorForStep(topic,step){
    const routes={
      analyze:["form:not(#cg-guide-form)","#name","#password","form:not(#cg-guide-form) button[type='submit']"],
      generate:["#password-length","#password-length","#use-upper","#generate-password"],
      breach:["#breach-password","#breach-password","#run-breach-check","#breach-status"],
      dashboard:[".dashboard-visual",".checks","#download-report",".disclaimer"],
      privacy:[".warning",".privacy,.disclaimer",".footnote",".privacy,.disclaimer"]
    };
    return (routes[topic]||[])[step]||null;
  }
  function positionPointer(){
    if(!pointer||!pointedTarget||pointer.hidden)return;
    const r=pointedTarget.getBoundingClientRect();
    if(r.width===0||r.height===0){pointer.hidden=true;return;}
    pointer.hidden=false;
    const pw=pointer.offsetWidth||140, ph=pointer.offsetHeight||40, margin=12;
    let left=r.right+10, top=r.top+(r.height-ph)/2;
    pointer.classList.remove("cg-pointer-left","cg-pointer-under");
    if(left+pw>window.innerWidth-margin){left=r.left-pw-10;pointer.classList.add("cg-pointer-left");}
    if(left<margin){left=Math.max(margin,Math.min(window.innerWidth-pw-margin,r.left+(r.width-pw)/2));top=r.bottom+8;pointer.classList.add("cg-pointer-under");}
    top=Math.max(margin,Math.min(window.innerHeight-ph-margin,top));
    pointer.style.left=`${left}px`;pointer.style.top=`${top}px`;
  }
  function pointAtCurrentStep(){
    clearPointer();
    if(!pointer||!activeTopic)return;
    const selector=selectorForStep(activeTopic,activeStep);
    let target=selector?document.querySelector(selector):null;
    // If the tour topic belongs to a different page, point at the in-panel link instead.
    if(!target && guideTargetFor(activeTopic))target=tour.querySelector(".cg-tour-link");
    if(!target)return;
    pointedTarget=target;
    pointedTarget.classList.add("cg-point-target");
    try{target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center",inline:"nearest"});}catch(_){ }
    pointer.hidden=false;positionPointer();
    window.addEventListener("scroll",positionPointer,true);window.addEventListener("resize",positionPointer);
  }
  function guideTargetFor(topic){return ({analyze:"/",generate:"/password-generator",breach:"/breach-checker",dashboard:"/dashboard",privacy:null})[topic]||null;}
  function showActions(){clearPointer();tour.hidden=true;actions.hidden=false;}
  function showTopic(topic, announce=true){
    const guide=guides[topic]; if(!guide)return;
    activeTopic=topic;activeStep=0;actions.hidden=true;tour.hidden=false;
    if(announce)addMessage(`Let's work through “${guide.title}” together. Use Next to move through each step.`);
    renderStep();
  }
  function renderStep(){
    const guide=guides[activeTopic];if(!guide)return;
    const [heading,detail]=guide.steps[activeStep];tour.replaceChildren();
    const kicker=document.createElement("div");kicker.className="cg-tour-kicker";kicker.textContent=`GUIDED TOUR · STEP ${activeStep+1} OF ${guide.steps.length}`;
    const progress=document.createElement("div");progress.className="cg-tour-progress";progress.setAttribute("role","progressbar");progress.setAttribute("aria-label","Tour progress");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(guide.steps.length));progress.setAttribute("aria-valuenow",String(activeStep+1));
    const fill=document.createElement("span");fill.style.width=`${((activeStep+1)/guide.steps.length)*100}%`;progress.appendChild(fill);
    const h=document.createElement("h3");h.textContent=heading;
    const p=document.createElement("p");p.textContent=detail;
    const controls=document.createElement("div");controls.className="cg-tour-controls";
    if(activeStep>0){const back=document.createElement("button");back.type="button";back.textContent="← Back";back.addEventListener("click",()=>{activeStep--;renderStep();});controls.appendChild(back);}
    if(activeStep===guide.steps.length-1){const finish=document.createElement("button");finish.type="button";finish.textContent="Finish ✓";finish.addEventListener("click",()=>{showActions();addMessage(`Nice work — you finished the ${guide.title.toLowerCase()} tour. Choose another topic whenever you need help.`);});controls.appendChild(finish);}
    else{const next=document.createElement("button");next.type="button";next.textContent="Next →";next.addEventListener("click",()=>{activeStep++;renderStep();});controls.appendChild(next);}
    const close=document.createElement("button");close.type="button";close.textContent="Exit tour";close.addEventListener("click",()=>{showActions();addMessage("Tour paused. You can restart it from the topic buttons anytime.");});controls.appendChild(close);
    tour.append(kicker,progress,h,p);
    if(guide.target && !guide.match.some(x=>page.includes(x))){const link=document.createElement("a");link.className="cg-tour-link";link.href=guide.target;link.textContent=topicLabel(activeTopic);link.setAttribute("aria-label",`Open ${topicLabel(activeTopic)}`);tour.appendChild(link);}
    tour.appendChild(controls);content.scrollTop=content.scrollHeight;
    window.setTimeout(pointAtCurrentStep,80);
  }
  function topicLabel(topic){return ({analyze:"Open home page",generate:"Open password generator",breach:"Open breach checker",dashboard:"Open security dashboard",privacy:"Read privacy guidance"})[topic]||"Open page";}
  root.querySelectorAll("[data-cg-topic]").forEach(btn=>btn.addEventListener("click",()=>showTopic(btn.dataset.cgTopic)));

  function answerFor(raw){
    const q=raw.toLowerCase();
    if(/\b(generate|generator|create.*password|make.*password|copy password|length|symbols?)\b/.test(q))return {topic:"generate",message:"The generator has its own page now. It creates random passwords locally in your browser. Choose “Generate password” below for the guided steps."};
    if(/\b(breach|pwned|leak|compromis|exposed)\b/.test(q))return {topic:"breach",message:"The breach checker looks for a match in known breached-password data. A no-match result is not a guarantee of safety. Choose “Breach checker” for a tour."};
    if(/\b(dashboard|report|download|checklist)\b/.test(q))return {topic:"dashboard",message:"The dashboard contains general password-security advice and a downloadable text report. It is not a live account scan."};
    if(/\b(analy[sz]e|strength|score|weak|strong|guess)\b/.test(q))return {topic:"analyze",message:"The analyzer estimates how difficult a sample may be to guess and shows suggestions. It does not guarantee security."};
    if(/\b(privacy|safe|real password|password manager|2fa|mfa|save|store)\b/.test(q))return {topic:"privacy",message:"Use fictional samples only. The analyzer sends its sample to your Flask server, while the breach service receives only a short hash prefix."};
    if(/\b(hello|hi|hey|namaste)\b/.test(q))return {topic:null,message:"Hi! 👋 I'm CipherGuard Guide. I can walk you through the analyzer, generator, breach checker, dashboard, and privacy basics. Choose a topic below or ask how a feature works."};
    if(/\b(next|back|step|restart|start tour|guide me|walk me through|show me how)\b/.test(q))return {topic:page.includes("breach")?"breach":page.includes("dashboard")?"dashboard":page.includes("analyze_form")?"generate":"analyze",message:"Sure — let's start a guided tour for the feature you're using."};
    return {topic:null,message:"I can help with password analysis, password generation, breach checks, reports, and privacy. Try asking “How do I generate a password?” or choose a topic below. I'm a built-in guide, not a live AI service."};
  }
  form.addEventListener("submit",event=>{
    event.preventDefault();const text=input.value.trim();if(!text)return;
    addMessage(text,"user");input.value="";
    const typing=document.createElement("div");typing.className="cg-message cg-message-bot cg-typing";typing.setAttribute("role","status");typing.setAttribute("aria-label","Guide is responding");
    for(let i=0;i<3;i++)typing.appendChild(document.createElement("i"));content.insertBefore(typing,tour);content.scrollTop=content.scrollHeight;
    window.clearTimeout(typingTimer);typingTimer=window.setTimeout(()=>{typing.remove();const answer=answerFor(text);addMessage(answer.message);if(answer.topic && /guide|show me|step|how to|how do|walk me|next|back|restart/.test(text.toLowerCase()))showTopic(answer.topic,false);},250);
  });
  document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden)closePanel();});
})();