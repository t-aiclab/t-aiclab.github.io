(()=>{"use strict";
const row=document.querySelector(".site-footer .footer-main-row");
const identity=row?.querySelector(".footer-identity");
const languages=row?.querySelector(".footer-languages");
const details=languages?.querySelector(".footer-language-details");
const options=languages?.querySelector(".footer-language-options");
if(!row||!identity||!languages||!details||!options)return;
const textNodes=[...identity.querySelectorAll(".footer-title,.footer-affiliation")];
const probe=languages.cloneNode(true);
probe.classList.add("footer-language-measure");
probe.setAttribute("aria-hidden","true");
probe.querySelectorAll("a").forEach(a=>a.tabIndex=-1);
probe.style.cssText="position:fixed;left:-100000px;top:0;visibility:hidden;pointer-events:none";
row.appendChild(probe);
const probeOptions=probe.querySelector(".footer-language-options");
const measure=size=>{probe.style.setProperty("--language-font",size+"px");return probeOptions.getBoundingClientRect().width};
let compact=null;
function update(){
  const available=row.clientWidth;
  if(!available)return;
  const identityWidth=Math.max(0,...textNodes.map(n=>n.scrollWidth));
  const gap=8;
  const normal=measure(13),minimum=measure(10);
  const room=available-identityWidth-gap;
  const next=compact===true?room<minimum+8:room<minimum;
  if(next!==compact){
    compact=next;
    row.classList.toggle("footer-language-compact",next);
    details.open=!next;
  }
  let font=13;
  if(!compact&&room<normal){
    let lo=10,hi=13;
    for(let i=0;i<12;i++){const mid=(lo+hi)/2;if(measure(mid)<=room)lo=mid;else hi=mid}
    font=lo;
  }
  row.style.setProperty("--language-font",font.toFixed(2)+"px");
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
})();