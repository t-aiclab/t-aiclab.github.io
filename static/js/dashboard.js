(()=>{const cards=[...document.querySelectorAll(".domain-card")],index=document.getElementById("domain-index"),title=document.getElementById("domain-title"),description=document.getElementById("domain-description"),link=document.getElementById("domain-research-link");function select(button){cards.forEach(card=>{const selected=card===button;card.classList.toggle("is-selected",selected);card.setAttribute("aria-pressed",String(selected))});if(index)index.textContent=button.dataset.index||"";if(title)title.textContent=button.dataset.title||"";if(description)description.textContent=button.dataset.detail||"";if(link){const url=button.getAttribute("data-research-url");if(url)link.setAttribute("href",url);link.textContent=(button.dataset.researchLabel||"Research")+" ↗"}}cards.forEach(button=>button.addEventListener("click",()=>select(button)));if(cards.length)select(cards.find(card=>card.classList.contains("is-selected"))||cards[0]);const links=[...document.querySelectorAll(".dashboard-rail a[href^='#']")];const targets=links.map(a=>document.getElementById(a.hash.slice(1))).filter(Boolean);if("IntersectionObserver"in window&&targets.length){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;links.forEach(a=>{const active=a.hash==="#"+entry.target.id;a.classList.toggle("is-current",active);if(active)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")})}},{rootMargin:"-15% 0px -65% 0px",threshold:0});targets.forEach(el=>observer.observe(el))}})();
/* Keep the fixed sidebar precisely below the actual responsive header. */
(()=>{const header=document.querySelector(".site-header");if(!header)return;const sync=()=>document.documentElement.style.setProperty("--aic-header-height",Math.max(0,Math.round(header.getBoundingClientRect().bottom))+"px");sync();if("ResizeObserver"in window){new ResizeObserver(sync).observe(header)}else{window.addEventListener("resize",sync,{passive:true})}})();

/* Fit all four hero lines to the summary paragraph's actual content width. */
(()=>{"use strict";
const hero=document.querySelector(".dashboard-intro");
const summary=hero?.querySelector(".dashboard-summary");
if(!hero||!summary)return;
const lines=[".dashboard-kicker",".dashboard-lab-identity","#dashboard-title",".dashboard-theme-line"].map(selector=>hero.querySelector(selector)).filter(Boolean);
const bases=new Map(lines.map(el=>[el,parseFloat(getComputedStyle(el).fontSize)||16]));
const ranges=new Map(lines.map(el=>{const range=document.createRange();range.selectNodeContents(el);return [el,range]}));
let scheduled=false;
function fit(){
  scheduled=false;
  const available=summary.getBoundingClientRect().width;
  if(available<=0)return;
  for(const el of lines){
    const base=bases.get(el),range=ranges.get(el);
    el.style.setProperty("font-size",base+"px","important");
    const natural=range.getBoundingClientRect().width;
    if(natural<=available-3)continue;
    let lo=0,hi=base;
    for(let i=0;i<16;i++){
      const mid=(lo+hi)/2;
      el.style.setProperty("font-size",mid+"px","important");
      if(range.getBoundingClientRect().width<=available-3)lo=mid;
      else hi=mid;
    }
    el.style.setProperty("font-size",lo.toFixed(3)+"px","important");
  }
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(fit)}}
fit();
window.addEventListener("resize",schedule,{passive:true});
document.fonts?.ready?.then(schedule);
if(typeof ResizeObserver!=="undefined")new ResizeObserver(schedule).observe(summary);
})();
