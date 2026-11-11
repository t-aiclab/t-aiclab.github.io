(()=>{const cards=[...document.querySelectorAll(".domain-card")],index=document.getElementById("domain-index"),title=document.getElementById("domain-title"),description=document.getElementById("domain-description"),link=document.getElementById("domain-research-link");function select(button){cards.forEach(card=>{const selected=card===button;card.classList.toggle("is-selected",selected);card.setAttribute("aria-pressed",String(selected))});if(index)index.textContent=button.dataset.index||"";if(title)title.textContent=button.dataset.title||"";if(description)description.textContent=button.dataset.detail||"";if(link){const url=button.getAttribute("data-research-url");if(url)link.setAttribute("href",url);link.textContent=(button.dataset.researchLabel||"Research")+" ↗"}}cards.forEach(button=>button.addEventListener("click",()=>select(button)));if(cards.length)select(cards.find(card=>card.classList.contains("is-selected"))||cards[0]);const links=[...document.querySelectorAll(".dashboard-rail a[href^='#']")];const targets=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);if("IntersectionObserver"in window&&targets.length){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;links.forEach(a=>{const active=a.hash==="#"+entry.target.id;a.classList.toggle("is-current",active);if(active)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")})}},{rootMargin:"-15% 0px -65% 0px",threshold:0});targets.forEach(el=>observer.observe(el))}})();
/* Keep the fixed sidebar precisely below the actual responsive header. */
(()=>{const header=document.querySelector(".site-header");if(!header)return;const sync=()=>document.documentElement.style.setProperty("--aic-header-height",Math.max(0,Math.round(header.getBoundingClientRect().bottom))+"px");sync();if("ResizeObserver"in window){new ResizeObserver(sync).observe(header)}else{window.addEventListener("resize",sync,{passive:true})}})();

/* Fit the four localized hero lines to the actual inner width, without wrapping. */
(()=>{"use strict";
const hero=document.querySelector(".dashboard-intro");
if(!hero)return;
const selectors=[".dashboard-kicker",".dashboard-lab-identity","#dashboard-title",".dashboard-theme-line"];
const lines=selectors.map(s=>hero.querySelector(s)).filter(Boolean);
if(!lines.length)return;
const bases=new Map();
for(const el of lines){
  el.style.removeProperty("font-size");
  bases.set(el,parseFloat(getComputedStyle(el).fontSize)||16);
}
function fit(){
  const style=getComputedStyle(hero);
  const available=hero.clientWidth-(parseFloat(style.paddingLeft)||0)-(parseFloat(style.paddingRight)||0);
  if(available<=0)return;
  for(const el of lines){
    const base=bases.get(el);
    el.style.setProperty("font-size",base+"px","important");
    const needed=el.scrollWidth;
    if(needed>available){
      const target=Math.max(1,base*(available-2)/needed);
      el.style.setProperty("font-size",target.toFixed(3)+"px","important");
    }
  }
}
fit();
window.addEventListener("resize",fit,{passive:true});
document.fonts?.ready?.then(fit);
if(typeof ResizeObserver!=="undefined")new ResizeObserver(fit).observe(hero);
})();
