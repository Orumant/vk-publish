(window["webpackJsonpvk-mini-app-test"]=window["webpackJsonpvk-mini-app-test"]||[]).push([[0],{103:function(e,t,a){e.exports=a.p+"static/media/persik.4e1ec840.png"},185:function(e,t,a){e.exports=a(290)},281:function(e,t,a){},290:function(e,t,a){"use strict";a.r(t);a(186),a(212),a(214),a(215),a(217),a(218),a(219),a(220),a(221),a(222),a(223),a(224),a(226),a(227),a(228),a(229),a(230),a(231),a(232),a(233),a(234),a(235),a(237),a(238),a(239),a(240),a(241),a(242),a(243),a(244),a(245),a(246),a(247),a(248),a(249),a(250),a(251),a(252),a(253),a(254);var n=a(0),c=a.n(n),r=a(67),i=a.n(r),l=a(34),o=a.n(l),s=a(68),u=a.n(s),m=a(97),p=a(39),d=a(106),f=a.n(d),E=a(105),b=a.n(E),h=(a(263),a(50)),k=a.n(h),g=a(43),v=a.n(g),O=a(100),j=a.n(O),w=a(51),y=a.n(w),x=a(69),P=a.n(x),A=a(99),S=a.n(A),_=a(98),C=a.n(_);var K=function(e){var t=e.id,a=e.go,r=e.fetchedUser,i=Object(n.useState)(null),l=Object(p.a)(i,2),s=l[0],u=l[1];return Object(n.useEffect)((function(){o.a.sendPromise("VKWebAppGetAuthToken",{app_id:7140716,scope:"groups"}).then((function(e){u(JSON.stringify(e))})).catch((function(e){console.log(e)}))}),[]),c.a.createElement(k.a,{id:t},c.a.createElement(v.a,null,"Example"),r&&c.a.createElement(y.a,{title:"User Data Fetched with VK Connect"},c.a.createElement(P.a,{before:r.photo_200?c.a.createElement(C.a,{src:r.photo_200}):null,description:r.city&&r.city.title?r.city.title:""},"".concat(r.first_name," ").concat(r.last_name))),r&&null!=s&&c.a.createElement(y.a,{title:"token"},c.a.createElement(P.a,null,s)),c.a.createElement(y.a,{title:"Navigation Example"},c.a.createElement(S.a,null,c.a.createElement(j.a,{size:"xl",level:"2",onClick:a,"data-to":"persik"},"Show me the Persik, please"))))},U=a(70),V=a(104),I=a.n(V),N=a(101),W=a.n(N),J=a(102),T=a.n(J),z=a(103),G=a.n(z),B=(a(281),Object(U.b)()),D=function(e){return c.a.createElement(k.a,{id:e.id},c.a.createElement(v.a,{left:c.a.createElement(I.a,{onClick:e.go,"data-to":"home"},B===U.a?c.a.createElement(W.a,null):c.a.createElement(T.a,null))},"Persik"),c.a.createElement("img",{className:"Persik",src:G.a,alt:"Persik The Cat"}))},F=function(){var e=Object(n.useState)("home"),t=Object(p.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(null),l=Object(p.a)(i,2),s=l[0],d=l[1],E=Object(n.useState)(c.a.createElement(b.a,{size:"large"})),h=Object(p.a)(E,2),k=h[0],g=h[1];Object(n.useEffect)((function(){function e(){return(e=Object(m.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.sendPromise("VKWebAppGetUserInfo");case 2:t=e.sent,d(t),g(null);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}o.a.subscribe((function(e){var t=e.detail,a=t.type,n=t.data;if("VKWebAppUpdateConfig"===a){var c=document.createAttribute("scheme");c.value=n.scheme?n.scheme:"client_light",document.body.attributes.setNamedItem(c)}})),function(){e.apply(this,arguments)}()}),[]);var v=function(e){r(e.currentTarget.dataset.to)};return c.a.createElement(f.a,{activePanel:a,popout:k},c.a.createElement(K,{id:"home",fetchedUser:s,go:v}),c.a.createElement(D,{id:"persik",go:v}))};o.a.send("VKWebAppInit"),i.a.render(c.a.createElement(F,null),document.getElementById("root"))}},[[185,1,2]]]);
//# sourceMappingURL=main.57d473c6.chunk.js.map