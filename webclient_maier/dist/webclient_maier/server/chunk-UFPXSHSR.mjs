import './polyfills.server.mjs';
import{A as S,B as M,C as m,D as O,E as g,F as U,G as K,H as D,K as R,Q as q,a as l,b as c,c as F,d as h,e as d,f as o,g as e,h as a,i as u,j as i,k as C,l as p,m as w,n as y,u as A,w as b,x as v,y as x,z as B}from"./chunk-AJBQHWQL.mjs";var I=["app-header",""],k=(()=>{let t=class t{constructor(r){this.myHttpclient=r}fetchActiveUsers(){let r=new O({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});return this.myHttpclient.get("http://localhost:8080/Pferderennen/Game/ActiveUsers",{headers:r})}profileClicked(){this.fetchActiveUsers().subscribe(r=>{alert("Active users: "+JSON.stringify(r))},r=>{console.error("Error fetching active users:",r),alert("Error fetching active users. Please try again later.")})}};t.\u0275fac=function(f){return new(f||t)(F(g))},t.\u0275cmp=l({type:t,selectors:[["","app-header","",5,"p"]],standalone:!0,features:[p],attrs:I,decls:9,vars:0,consts:[[1,"header"],[1,"logo"],["src","../../assets/icons/raceicon.jpg","alt","Logo",1,"image"],[1,"title"],[1,"profile-button",3,"click"],[3,"click"]],template:function(f,s){f&1&&(o(0,"div",0)(1,"div",1),a(2,"img",2),e(),o(3,"div",3),i(4,"Pferderennen"),e(),o(5,"button",4),u("click",function(){return s.profileClicked()}),i(6,"Login"),e()(),o(7,"button",5),u("click",function(){return s.profileClicked()}),i(8,"OK"),e())},dependencies:[U,m],styles:[`body{margin:0;font-family:Arial,sans-serif}.header{position:fixed;top:0;left:0;width:100%;background-color:#333;color:#fff;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;z-index:1000}.logo{width:10px;height:auto}.image{border-radius:50%}.title{font-size:24px;font-weight:700}.profile-button{background-color:#555;color:#fff;padding:8px 12px;border:none;border-radius:20px;cursor:pointer;margin-right:25px}
`],encapsulation:3});let n=t;return n})();var Y=["app-user-login",""],H=(()=>{let t=class t{};t.\u0275fac=function(f){return new(f||t)},t.\u0275cmp=l({type:t,selectors:[["","app-user-login","",5,"p"]],standalone:!0,features:[p],attrs:Y,decls:34,vars:0,consts:[[1,"container"],[1,"form-container","sign-in-container"],["action","#"],["type","email","placeholder","Email"],["type","password","placeholder","Password"],[1,"form-container","sign-up-container"],["type","text","placeholder","Name"],[1,"overlay-container"],[1,"overlay"],[1,"overlay-panel","overlay-left"],["id","signIn",1,"ghost"],[1,"overlay-panel","overlay-right"],["id","signUp",1,"ghost"]],template:function(f,s){f&1&&(o(0,"div",0)(1,"div",1)(2,"form",2)(3,"h1"),i(4,"Sign in"),e(),a(5,"input",3)(6,"input",4),o(7,"button"),i(8,"Sign In"),e()()(),o(9,"div",5)(10,"form",2)(11,"h1"),i(12,"Sign up"),e(),a(13,"input",6)(14,"input",3)(15,"input",4),o(16,"button"),i(17,"Sign Up"),e()()(),o(18,"div",7)(19,"div",8)(20,"div",9)(21,"h1"),i(22,"Welcome Back!"),e(),o(23,"p"),i(24,"To keep connected with us please login with your personal info"),e(),o(25,"button",10),i(26,"Sign In"),e()(),o(27,"div",11)(28,"h1"),i(29,"Hello, Friend!"),e(),o(30,"p"),i(31,"Enter your personal details and start journey with us"),e(),o(32,"button",12),i(33,"Sign Up"),e()()()()())},dependencies:[m,U],styles:[`@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Roboto;font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCRc4EsA.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCBc4EsA.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBxc4EsA.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fCxc4EsA.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fChc4EsA.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Roboto;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2) format("woff2");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2) format("woff2");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2) format("woff2");unicode-range:U+1F00-1FFF}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2) format("woff2");unicode-range:U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2) format("woff2");unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Roboto;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Roboto,sans-serif;height:100vh;display:flex;justify-content:center;align-items:center;background:#f1f2f6}.container{position:relative;width:100%;max-width:900px;display:grid;grid-template-columns:1fr 1fr;gap:50px;overflow:hidden}.form-container{background:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 50px;text-align:center;border-radius:10px;box-shadow:0 15px 25px #0000001a;transition:transform .6s ease}.form-container.sign-up-container{transform:translate(100%)}.form-container h1{font-size:24px;margin-bottom:20px}.form-container input{width:100%;padding:15px;margin:10px 0;border:1px solid #ccc;border-radius:5px}.form-container button{width:100%;padding:15px;margin:10px 0;border:none;border-radius:5px;background-color:#2980b9;color:#fff;cursor:pointer}.overlay-container{position:absolute;top:0;left:50%;width:100%;height:100%;transition:transform .6s ease;transform:translate(-50%)}.overlay{position:relative;width:200%;height:100%;transition:transform .6s ease}.overlay-panel{position:absolute;top:0;left:0;width:50%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 40px;text-align:center}.overlay-left{transform:translate(-20%)}.overlay-right{right:0;transform:translate(0)}.overlay-panel h1{font-size:24px;margin-bottom:20px}.overlay-panel p{font-size:14px;margin-bottom:20px}.ghost{border:1px solid #2980b9;background-color:transparent;color:#2980b9}.ghost:hover{background-color:#2980b9;color:#fff}
`],encapsulation:3});let n=t;return n})();function L(n,t){n&1&&(o(0,"div",7),i(1,"APP_USER_LOGIN"),e())}function J(n,t){n&1&&a(0,"div",0)}function V(n,t){n&1&&(o(0,"div"),i(1,"default"),e())}function G(n,t){if(n&1&&(o(0,"div",8),i(1),w(2,"json"),e()),n&2){let W=t.$implicit;c(),C(" ",y(2,1,W),`
`)}}var N=(()=>{let t=class t{constructor(r){this.myHttpclient=r,this.moduleName=""}buttonClicked(){console.log("LKADJ\xD6ALKSJDlJ"),this.moduleName=="app-user-component"?this.moduleName="dog":this.moduleName="app-user-component",console.log(this.moduleName)}};t.\u0275fac=function(f){return new(f||t)(F(g))},t.\u0275cmp=l({type:t,selectors:[["app-root"]],standalone:!0,features:[p],decls:9,vars:6,consts:[["app-header",""],[2,"margin-top","50%","width","100px","height","100px",3,"click"],[3,"ngSwitch"],["app-user-login","",4,"ngSwitchCase"],["app-header","",4,"ngSwitchCase"],[4,"ngSwitchDefault"],["style","text-align: center; margin-top: 50%; width: 100px; height: 100px;",4,"ngFor","ngForOf"],["app-user-login",""],[2,"text-align","center","margin-top","50%","width","100px","height","100px"]],template:function(f,s){f&1&&(a(0,"div",0),o(1,"button",1),u("click",function(){return s.buttonClicked()}),i(2,"Content"),e(),o(3,"container-element",2),h(4,L,2,0,"div",3)(5,J,1,0,"div",4)(6,V,2,0,"div",5),e(),h(7,G,3,3,"div",6),w(8,"async")),f&2&&(c(3),d("ngSwitch",s.moduleName),c(),d("ngSwitchCase","app-user-component"),c(),d("ngSwitchCase","dog"),c(2),d("ngForOf",y(8,4,s.posts)))},dependencies:[m,b,v,x,B,S,M,k,U,H],encapsulation:3});let n=t;return n})();var T=[];var z={providers:[q(T),D()]};var $={providers:[R()]},j=A(z,$);var Q=()=>K(N,j),vt=Q;export{vt as a};
