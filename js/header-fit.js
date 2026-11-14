(()=>{"use strict";
const header=document.querySelector(".site-header-modern");
if(!header)return;
const brand=header.querySelector(".brand");
const nav=header.querySelector(".main-nav");
const toggle=header.querySelector(".nav-toggle");
if(!brand||!nav)return;
const states=["header-no-full","header-tight","header-collapsed"];
const gap=()=>parseFloat(getComputedStyle(header).columnGap)||0;
const available=()=>{const s=getComputedStyle(header);return header.clientWidth-(parseFloat(s.paddingLeft)||0)-(parseFloat(s.paddingRight)||0)};
function setState(state){header.classList.remove(...states);if(state)header.classList.add(state)}
function fits(){return brand.scrollWidth+nav.scrollWidth+gap()+4<=available()}
function update(){
  let state=null;
  setState(null);
  if(!fits()){state="header-no-full";setState(state)}
  if(!fits()){state="header-tight";setState(state)}
  if(!fits()){state="header-collapsed";setState(state)}
  if(state!=="header-collapsed"&&toggle)toggle.checked=false;
}
update();
window.addEventListener("resize",update,{passive:true});
document.fonts?.ready?.then(update);
})();
