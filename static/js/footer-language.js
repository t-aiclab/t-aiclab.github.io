(()=>{"use strict";
const row=document.querySelector(".site-footer .footer-main-row");
const identity=row?.querySelector(".footer-identity");
const languages=row?.querySelector(".footer-languages");
const details=languages?.querySelector(".footer-language-details");
const options=details?.querySelector(".footer-language-options");
if(!row||!identity||!languages||!details||!options)return;
const baseSizes=[20,15,14];
const textNodes=[...identity.querySelectorAll(".footer-title,.footer-affiliation")];
const footer=row.closest(".site-footer");
const host=document.createElement("div");
host.setAttribute("aria-hidden","true");
host.style.cssText="position:fixed;left:-100000px;top:0;visibility:hidden;pointer-events:none;width:max-content;max-width:none";
const sample=row.cloneNode(true);
sample.classList.remove("footer-language-compact");
sample.querySelector(".footer-language-details").open=true;
sample.querySelectorAll("a").forEach(a=>a.tabIndex=-1);
host.appendChild(sample);footer.appendChild(host);
const sampleIdentity=sample.querySelector(".footer-identity");
const sampleOptions=sample.querySelector(".footer-language-options");
const sampleTexts=[...sampleIdentity.querySelectorAll(".footer-title,.footer-affiliation")];
const minimum=.62;
function applyScale(target,scale){target.style.setProperty("--footer-scale",scale.toFixed(4))}
function required(scale){
  applyScale(sample,scale);
  const left=Math.max(0,...sampleTexts.map(el=>el.scrollWidth));
  const right=sampleOptions.scrollWidth;
  return left+right+12;
}
let collapsed=null;
function update(){
  const available=row.clientWidth;
  if(available<=0)return;
  const full=required(1);
  const reduced=required(minimum);
  // Width measurements always use the expanded, offscreen layout.
  const collapse=collapsed===true?available<reduced+6:available<reduced;
  if(collapse!==collapsed){
    collapsed=collapse;
    row.classList.toggle("footer-language-compact",collapse);
    details.open=!collapse;
  }
  let scale=1;
  if(!collapse&&available<full){
    let lo=minimum,hi=1;
    for(let i=0;i<14;i++){
      const mid=(lo+hi)/2;
      if(required(mid)<=available)lo=mid;else hi=mid;
    }
    scale=lo;
  }
  if(collapse){
    // Never enlarge the lab text when the language links collapse.
    // Start at the last expanded scale and decrease continuously as needed.
    const globeWidth=36;
    const space=Math.max(0,available-globeWidth-16);
    applyScale(sample,1);
    const leftAtFull=Math.max(1,...sampleTexts.map(el=>el.getBoundingClientRect().width));
    scale=Math.min(minimum,space/leftAtFull);
    // No arbitrary minimum font scale: allow the text to keep shrinking.
    scale=Math.max(0,scale);
  }
  applyScale(row,scale);
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
if(typeof ResizeObserver!=="undefined"){
  let width=0;
  new ResizeObserver(()=>{const next=row.clientWidth;if(next!==width){width=next;update()}}).observe(row);
}
})();
/* Independently fit the copyright and live visit counter to one row. */
(()=>{"use strict";
const row=document.querySelector(".site-footer .footer-bottom-row");
if(!row)return;
const items=[...row.querySelectorAll(".footer-copyright,.footer-counter")];
if(!items.length)return;
function fit(){
  const available=row.clientWidth;
  if(available<=0)return;
  row.style.setProperty("--footer-bottom-scale","1");
  const gap=parseFloat(getComputedStyle(row).columnGap)||8;
  const needed=items.reduce((sum,item)=>sum+item.getBoundingClientRect().width,0)+gap*(items.length-1);
  row.style.setProperty("--footer-bottom-scale",String(Math.min(1,Math.max(0,(available-2)/Math.max(needed,1)))));
}
fit();
window.addEventListener("resize",fit,{passive:true});
document.fonts?.ready?.then(fit);
if(typeof ResizeObserver!=="undefined"){
  let last=0;
  new ResizeObserver(()=>{const width=row.clientWidth;if(width!==last){last=width;fit()}}).observe(row);
}
const counter=row.querySelector("#busuanzi_value_site_pv");
if(counter&&typeof MutationObserver!=="undefined")new MutationObserver(fit).observe(counter,{childList:true,characterData:true,subtree:true});
})();
