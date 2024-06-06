import{a as b,S as w,i as L}from"./assets/vendor-b0d10f48.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();async function m(r,e=1){return await b.get("https://pixabay.com/api/",{params:{key:"44240844-fac6cf8e273222cb69c263295",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:"15"}}).then(i=>i.data)}let y;function h(r,e){const i=r.map(n=>`
      <li>
        <a href="${n.largeImageURL}">
          <img src="${n.webformatURL}" alt="${n.tags}">
        </a>
        
        <ul class="info">
          <li>Likes: ${n.likes}</li>
          <li>Views: ${n.views}</li>
          <li>Comments: ${n.comments}</li>
          <li>Downloads: ${n.downloads}</li>
        </ul>
      </li>
    `).join("");e.insertAdjacentHTML("beforeend",i),y?y.refresh():y=new w(".gallery a",{})}function a(r){L.error({message:r})}const g=document.querySelector(".form"),S=document.querySelector(".search-input"),f=document.querySelector(".gallery"),s=document.querySelector(".loader"),l=document.querySelector(".btn");let d=1,c="";const p=15;l.style.display="none";g.addEventListener("submit",q);l.addEventListener("click",()=>v(c));async function q(r){if(r.preventDefault(),c=S.value.trim(),c===""){l.style.display="none",a("Please enter a search query!");return}f.innerHTML="",s.style.display="block",m(c).then(e=>{if(s.style.display="none",e.hits.length===0){l.style.display="none",a("Sorry, there are no images matching your search query. Please try again!");return}h(e.hits,f)}).catch(e=>{s.style.display="none",a("Something went wrong. Please try again later."),console.error(e)}),l.style.display="block",g.reset()}async function v(r){s.style.display="block",d+=1;try{s.style.display="none";const e=await m(r,d);h(e.hits,f),scrolling(),(d*p>=e.totalHits||p>=e.totalHits)&&(l.style.display="none",a("We're sorry, but you've reached the end of search results."))}catch(e){s.style.display="none",console.log(e.message)}}function P(){const r=document.querySelector(".gallery li ").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}P();
//# sourceMappingURL=commonHelpers.js.map
