"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[243],{243:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var r,i,s,c,o=t(439),a=t(168),l=t(617),h=t(87),u=t(867),d=t(184),p=(0,u.ZP)(h.rU)(r||(r=(0,a.Z)(["\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 0;\n  color: black;\n  text-decoration: none;\n  font-weight: 500;\n  text-transform: uppercase;\n"]))),x=function(e){var n=e.to,t=e.children;return(0,d.jsxs)(p,{to:n,children:[(0,d.jsx)(l.jTe,{size:"24"}),t]})},j=u.ZP.div(i||(i=(0,a.Z)(["\n  display: flex;\n  gap: 30px;\n  margin-bottom: 20px;\n  padding-bottom: 4px;\n  border-bottom: 1px solid black;\n"]))),m=u.ZP.img(s||(s=(0,a.Z)(["\n  height: 280px;\n"]))),f=u.ZP.div(c||(c=(0,a.Z)(["\n  display: flex;\n  flex-direction: column;\n"]))),v=t(986),b=t(791),g=t(689),k=function(){var e,n,t=(0,g.UO)().id,r=(0,b.useState)(null),i=(0,o.Z)(r,2),s=i[0],c=i[1],a=(0,g.TH)(),l=(0,b.useRef)(null!==(e=null===(n=a.state)||void 0===n?void 0:n.from)&&void 0!==e?e:"/movies");if((0,b.useEffect)((function(){(0,v.Z)("movie/".concat(t)).then((function(e){c(e)})).catch((function(e){return console.error(e)}))}),[t]),s)return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(x,{to:l.current,children:"Back"}),(0,d.jsxs)(j,{children:[s.poster_path?(0,d.jsx)(m,{src:"https://image.tmdb.org/t/p/w500"+s.poster_path,alt:s.title}):(0,d.jsx)(m,{src:"https://www.mub.eps.manchester.ac.uk/science-engineering/wp-content/themes/uom-theme/assets/images/default-thumbnail.jpg",alt:s.title,width:500}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h2",{children:s.title}),(0,d.jsxs)("p",{children:["User score: ",Number(s.vote_average).toFixed(1)]}),(0,d.jsx)("h3",{children:"Overview"}),(0,d.jsx)("p",{children:s.overview})]})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)("h2",{children:"About movie"}),(0,d.jsx)(h.rU,{to:"cast",children:"cast"}),(0,d.jsx)(h.rU,{to:"review",children:"review"})]}),(0,d.jsx)(b.Suspense,{fallback:(0,d.jsx)("div",{children:"Loading subpage..."}),children:(0,d.jsx)(g.j3,{})})]})}},986:function(e,n,t){var r=t(861),i=t(757),s=t.n(i),c={method:"GET",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzIzZWM2ZTBmOTk4MzA3MDVhNWVhNjliYmJlYjVjZiIsInN1YiI6IjY1M2IxNjE2Y2M5NjgzMDE0ZWI4MjEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7UIYM47J3rkdAbKkVNX5uzNonb4kSFhc3JR75HbXij4"}},o=function(){var e=(0,r.Z)(s().mark((function e(){var n,t,r=arguments;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.length>0&&void 0!==r[0]?r[0]:"trending/all/week",e.next=3,fetch("https://api.themoviedb.org/3/".concat(n),c);case 3:if(!(t=e.sent).ok){e.next=6;break}return e.abrupt("return",t.json());case 6:return e.next=8,Promise.reject(new Error("Oops..."));case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n.Z=o}}]);
//# sourceMappingURL=243.fc9ca0b2.chunk.js.map