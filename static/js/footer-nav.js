(()=>{"use strict";
const footer=document.querySelector(".site-footer");
const row=footer?.querySelector(".footer-main-row");
const details=row?.querySelector(".footer-nav-details");
if(!footer||!row||!details)return;
const variables=["--footer-title-size","--footer-affiliation-size","--footer-secondary-size","--footer-link-size"];
const base=[20,15,14,13],minimum=.76;
const probe=row.cloneNode(true);
probe.classList.remove("footer-compact");
probe.classList.add("footer-wide","footer-measure");
const probeDetails=probe.querySelector(".footer-nav-details");
probeDetails.open=true;
probe.setAttribute("aria-hidden","true");
probe.querySelectorAll("a").forEach(a=>a.tabIndex=-1);
footer.appendChild(probe);
const left=probe.querySelector(".footer-identity");
const right=probe.querySelector(".footer-quicklinks");
function fontScale(element,f){variables.forEach((v,i)=>element.style.setProperty(v,(base[i]*f).toFixed(3)+"px"))}
function required(f){
  fontScale(probe,f);
  const texts=[...left.querySelectorAll(".footer-title,.footer-affiliation")];
  const leftWidth=Math.max(0,...texts.map(el=>el.scrollWidth));
  return leftWidth+right.getBoundingClientRect().width+16;
}
let compact=null;
function update(){
  const available=row.clientWidth;
  if(!available)return;
  const full=required(1),small=required(minimum);
  const shouldCollapse=compact===true?available<small+8:available<small;
  if(shouldCollapse!==compact){
    compact=shouldCollapse;
    row.classList.toggle("footer-compact",compact);
    row.classList.toggle("footer-wide",!compact);
    details.open=!compact;
  }
  if(!compact){
    let scale=1;
    if(available<full){
      let low=minimum,high=1;
      for(let i=0;i<12;i++){
        const mid=(low+high)/2;
        if(required(mid)<=available)low=mid;else high=mid;
      }
      scale=low;
    }
    fontScale(row,scale);
  }else{
    fontScale(row,1);
    const identity=row.querySelector(".footer-identity");
    const labels=[...identity.querySelectorAll(".footer-title,.footer-affiliation")];
    const natural=Math.max(0,...labels.map(el=>el.scrollWidth));
    const remaining=Math.max(0,available-row.querySelector(".footer-quicklinks").getBoundingClientRect().width-8);
    const ratio=natural?Math.min(1,remaining/natural):1;
    for(let i=0;i<3;i++)row.style.setProperty(variables[i],Math.max(i===0?9:8,base[i]*ratio).toFixed(3)+"px");
  }
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
if(typeof ResizeObserver!=="undefined"){
  let lastWidth=0;
  new ResizeObserver(()=>{const w=row.clientWidth;if(w!==lastWidth){lastWidth=w;update()}}).observe(row);
}
})();