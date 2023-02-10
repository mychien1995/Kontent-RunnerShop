import{u as b,a as x,b as o,c as k,d as A}from"./useHomePage.store.b0095030.js";import{a as f,o as n,b as c,e as t,F as h,r as g,f as v,u as i,t as r,h as S,c as y,n as C,g as w,i as F,w as N}from"./entry.928c21e6.js";const V={id:"template-mo-zay-hero-carousel",class:"carousel slide","data-bs-ride":"carousel"},z={class:"carousel-indicators"},P=["data-bs-slide-to"],B={class:"carousel-inner"},G={class:"container"},T={class:"row p-5"},I={class:"mx-auto col-md-8 col-lg-6 order-lg-last banner-img-wrapper"},M=["src"],H={class:"col-lg-6 mb-0 d-flex align-items-center"},L={class:"text-align-left align-self-center"},D={class:"h1 text-success"},E={class:"h2"},j=["innerHTML"],R=t("a",{class:"carousel-control-prev text-decoration-none w-auto ps-3",href:"#template-mo-zay-hero-carousel",role:"button","data-bs-slide":"prev"},[t("i",{class:"fas fa-chevron-left"})],-1),U=t("a",{class:"carousel-control-next text-decoration-none w-auto pe-3",href:"#template-mo-zay-hero-carousel",role:"button","data-bs-slide":"next"},[t("i",{class:"fas fa-chevron-right"})],-1),q=f({__name:"carousel",props:{parentContent:null,fieldName:null,content:null},setup(_){const s=_,d=b(s.parentContent,s.content,"images").map(a=>({imageSrc:x(a,"banner_image"),description:o(a,"description"),title:o(a,"title"),subTitle:o(a,"subtitle")}));return(a,p)=>(n(),c("div",V,[t("ol",z,[(n(!0),c(h,null,g(i(d),(e,m)=>(n(),c("li",{"data-bs-target":"#template-mo-zay-hero-carousel","data-bs-slide-to":m,class:v(m==0?"active":"")},null,10,P))),256))]),t("div",B,[(n(!0),c(h,null,g(i(d),(e,m)=>(n(),c("div",{class:v("carousel-item "+(m==0?"active":""))},[t("div",G,[t("div",T,[t("div",I,[t("img",{class:"img-fluid",src:e.imageSrc,alt:""},null,8,M)]),t("div",H,[t("div",L,[t("h1",D,r(e.title),1),t("h3",E,r(e.subTitle),1),t("div",{innerHTML:e.description},null,8,j)])])])])],2))),256))]),R,U]))}}),J={class:"container py-5"},K={class:"row text-center pt-3"},O={class:"col-lg-6 m-auto"},Q={class:"h1"},W={class:"row"},X={class:"col-12 col-md-4 p-5 mt-3"},Y={href:"#"},Z=["src"],tt={class:"text-center mt-3 mb-3"},et={class:"text-center"},st=["href"],nt=f({__name:"categoryBlock",props:{parentContent:null,fieldName:null,content:null},setup(_){const s=_,d=b(s.parentContent,s.content,"category_items").map(e=>({imageSrc:x(e,"thumbnail"),link:o(e,"link"),title:o(e,"title")})),a=o(s.content,"title"),p=o(s.content,"subtitle");return(e,m)=>(n(),c("section",J,[t("div",K,[t("div",O,[t("h1",Q,r(i(a)),1),t("p",null,r(i(p)),1)])]),t("div",W,[(n(!0),c(h,null,g(i(d),(l,$)=>(n(),c("div",X,[t("a",Y,[t("img",{src:l.imageSrc,class:"rounded-circle img-fluid border category-img"},null,8,Z)]),t("h5",tt,r(l.title),1),t("p",et,[t("a",{href:l.link,class:"btn btn-success"},"Go Shop",8,st)])]))),256))])]))}}),ot={class:"bg-light"},ct={class:"container py-5"},at={class:"row text-center py-3"},lt={class:"col-lg-6 m-auto"},rt={class:"h1"},it={class:"row"},dt={class:"col-12 col-md-4 mb-4"},_t={class:"card h-100"},ut={href:"/"},pt=["src"],mt={class:"card-body"},ht={class:"list-unstyled d-flex justify-content-between"},gt=S('<li><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-muted fa fa-star"></i><i class="text-muted fa fa-star"></i></li>',1),ft={class:"text-muted text-right"},bt={href:"shop-single.html",class:"h2 text-decoration-none text-dark"},xt={class:"card-text"},$t=f({__name:"featuredProduct",props:{parentContent:null,fieldName:null,content:null},setup(_){const s=_,u=b(s.parentContent,s.content,"products"),d=o(s.content,"title"),a=o(s.content,"subtitle"),p=u.map(e=>({imageSrc:x(e,"thumbnail"),name:o(e,"product_name"),price:parseFloat(o(e,"price")),rating:parseFloat(o(e,"rating")),description:o(e,"_pagebase__page_description")}));return(e,m)=>(n(),c("section",ot,[t("div",ct,[t("div",at,[t("div",lt,[t("h1",rt,r(i(d)),1),t("p",null,r(i(a)),1)])]),t("div",it,[(n(!0),c(h,null,g(i(p),(l,$)=>(n(),c("div",dt,[t("div",_t,[t("a",ut,[t("img",{src:l.imageSrc,class:"card-img-top"},null,8,pt)]),t("div",mt,[t("ul",ht,[gt,t("li",ft,"$"+r(l.price),1)]),t("a",bt,r(l.name),1),t("p",xt,r(l.description),1)])])]))),256))])])]))}}),vt=f({__name:"contentArea",props:{content:null,contentAreaFieldName:null},setup(_){const s=_,u={carousel:q,category_block:nt,featured_product_block:$t},a=k(s.content,s.contentAreaFieldName).map(e=>({content:e,component:u[e.system.type]})).filter(e=>e.component),p=e=>({parentContent:s.content,fieldName:e.system.codename,content:e});return(e,m)=>(n(!0),c(h,null,g(i(a),(l,$)=>(n(),c("div",null,[(n(),y(F(l.component),C(w(p(l.content))),null,16))]))),256))}}),wt=f({__name:"index",async setup(_){let s,u;const d=([s,u]=N(()=>A().getContent()),s=await s,u(),s);return(a,p)=>{const e=vt;return n(),y(e,C(w({content:i(d),contentAreaFieldName:"components"})),null,16)}}});export{wt as default};
