(()=>{"use strict";
const row=document.querySelector(".site-footer .footer-main-row");
const identity=row?.querySelector(".footer-identity");
const languages=row?.querySelector(".footer-languages");
const details=languages?.querySelector(".footer-language-details");
if(!row||!identity||!languages||!details)return;
const labels=[...identity.querySelectorAll(".footer-title,.footer-affiliation")];
const base=[20,15,14],minimumFactor=.55;
const probe=languages.cloneNode(true);
probe.setAttribute("aria-hidden","true");
probe.querySelectorAll("a").forEach(a=>a.tabIndex=-1);
probe.style.cssText="position:fixed;left:-100000px;top:0;visibility:hidden;pointer-events:none";
row.appendChild(probe);
const probeOptions=probe.querySelector(".footer-language-options");
const measureLanguages=size=>{
  probe.style.setProperty("--language-font",size+"px");
  return probeOptions.getBoundingClientRect().width;
};
function setIdentity(f){
  labels.forEach((el,i)=>el.style.fontSize=(base[Math.min(i,2)]*f).toFixed(2)+"px");
}
function identityWidth(){return Math.max(0,...labels.map(el=>el.scrollWidth))}
let compact=null;
function update(){
  const available=row.clientWidth;
  if(!available)return;
  // Always measure from the original typography, independent of current state.
  setIdentity(1);
  const normalIdentity=identityWidth();
  const normalLanguage=measureLanguages(13);
  const minimumLanguage=measureLanguages(10);
  const gap=8;
  const minimumIdentity=normalIdentity*minimumFactor;
  const minimumRequired=minimumIdentity+minimumLanguage+gap;
  const next=compact===true?available<minimumRequired+8:available<minimumRequired;
  if(next!==compact){
    compact=next;
    row.classList.toggle("footer-language-compact",next);
    details.open=!next;
  }
  if(!compact){
    // Both sides shrink smoothly, before the globe dropdown is needed.
    const factor=Math.min(1,Math.max(minimumFactor,(available-gap)/(normalIdentity+normalLanguage)));
    setIdentity(factor);
    const room=Math.max(0,available-identityWidth()-gap);
    let font=13;
    if(room<normalLanguage){
      let low=10,high=13;
      for(let i=0;i<12;i++){
        const mid=(low+high)/2;
        if(measureLanguages(mid)<=room)low=mid;else high=mid;
      }
      font=low;
    }
    row.style.setProperty("--language-font",font.toFixed(2)+"px");
  }else{
    row.style.setProperty("--language-font","13px");
    const buttonWidth=languages.getBoundingClientRect().width;
    setIdentity(Math.min(1,Math.max(.4,(available-buttonWidth-gap)/Math.max(normalIdentity,1))));
  }
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
})();