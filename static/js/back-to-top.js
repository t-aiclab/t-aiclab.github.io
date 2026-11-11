(()=>{"use strict";
const button=document.querySelector(".aic-back-to-top");
const header=document.querySelector(".site-header");
if(!button)return;
function position(){if(header){const bottom=Math.max(0,header.getBoundingClientRect().bottom);document.documentElement.style.setProperty("--aic-header-height",bottom+"px")}}
position();
window.addEventListener("resize",position,{passive:true});
if(header&&typeof ResizeObserver!=="undefined")new ResizeObserver(position).observe(header);
button.addEventListener("click",()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({top:0,behavior:reduce?"instant":"smooth"});
});
})();
