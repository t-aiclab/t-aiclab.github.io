(()=>{"use strict";
const row=document.querySelector(".site-footer .footer-main-row");
const identity=row?.querySelector(".footer-identity");
const languages=row?.querySelector(".footer-languages");
const details=languages?.querySelector(".footer-language-details");
if(!row||!identity||!languages||!details)return;
const measure=document.createElement("div");
measure.className="footer-measure-host";
measure.setAttribute("aria-hidden","true");
measure.style.cssText="position:fixed;left:-100000px;top:0;width:max-content;visibility:hidden;pointer-events:none";
const clone=row.cloneNode(true);
clone.classList.remove("footer-language-compact");
clone.classList.add("footer-language-measuring");
clone.querySelector(".footer-language-details").open=true;
clone.querySelectorAll("a").forEach(a=>a.tabIndex=-1);
measure.appendChild(clone);
row.closest(".site-footer").appendChild(measure);
const left=clone.querySelector(".footer-identity");
const right=clone.querySelector(".footer-language-options");
const labels=[...left.querySelectorAll(".footer-title,.footer-affiliation")];
const minimum=.72;
function required(f){
  clone.style.setProperty("--footer-scale",String(f));
  const identityWidth=Math.max(0,...labels.map(el=>el.getBoundingClientRect().width));
  return identityWidth+right.getBoundingClientRect().width+10;
}
let compact=null;
function update(){
  const available=row.clientWidth;
  if(!available)return;
  const full=required(1),small=required(minimum);
  const next=compact===true?available<small+8:available<small;
  if(next!==compact){
    compact=next;
    row.classList.toggle("footer-language-compact",compact);
    details.open=!compact;
  }
  let factor=1;
  if(!compact&&available<full){
    let low=minimum,high=1;
    for(let i=0;i<14;i++){
      const mid=(low+high)/2;
      if(required(mid)<=available)low=mid;else high=mid;
    }
    factor=low;
  }
  if(compact){
    // Reserve the globe button first; preserve both identity lines.
    const natural=required(1)-right.getBoundingClientRect().width-10;
    factor=Math.min(1,Math.max(.35,(available-46)/Math.max(1,natural)));
  }
  row.style.setProperty("--footer-scale",String(factor));
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
})();