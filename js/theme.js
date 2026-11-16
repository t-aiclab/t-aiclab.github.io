(()=>{"use strict";
const key="aiclab-theme";
let saved=null;try{saved=localStorage.getItem(key)}catch(_){}
const preferred=saved==="dark"||saved==="light"?saved:(window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light");
document.documentElement.dataset.theme=preferred;
function setup(){
 const button=document.querySelector(".aic-theme-toggle");if(!button)return;
 const sync=()=>{const dark=document.documentElement.dataset.theme==="dark";button.setAttribute("aria-pressed",String(dark));const label=button.dataset[dark?"labelLight":"labelDark"];button.setAttribute("aria-label",label);button.title=label};
 sync();
 button.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;try{localStorage.setItem(key,next)}catch(_){}sync()});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});else setup();
})();
