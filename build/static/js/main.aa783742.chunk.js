(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{172:function(e,t,a){},302:function(e,t,a){},303:function(e,t,a){"use strict";a.r(t);var n,r=a(0),i=a.n(r),c=a(11),s=a.n(c),o=a(62),l=a(68),d=a(21),u=a(139),j=(a(172),a(10)),m=a(37),b=a(38),h=a(16),g=a(365),p=a(343),x=a(348),O=a(84),f=a.n(O),v=a(35),y=a(346),w=a(345),S=a(349),I=a(347),C=function(e,t){var a=!0;if(!e)return!0;if(e.required&&(a=""!==t.trim()&&a),e.minLength&&(a=t.length>=e.minLength&&a),e.maxLength&&(a=t.length<=e.maxLength&&a),e.isEmail){a=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(t)&&a}return a},k=a(101),A="INDEX",E=function(e,t){return Object(m.a)(Object(m.a)({},e),t)},N=function(e,t){var a=Object(k.a)(e);return a.push(t),a},T=a(362),U=a(2),D=function(e){return Object(U.jsx)(T.a,{fullWidth:e.fullWidth,onChange:e.inputChangeHandler,error:e.hasErr,className:e.componentClass,helperText:e.hasErr?e.errStr:"",label:e.label,type:e.type,variant:"outlined",autoComplete:e.autoComplete})},L=function(e,t,a,n){return Object(U.jsx)(i.a.Fragment,{children:Object.keys(e).map((function(r){var i=e[r];return Object(U.jsx)(D,{fullWidth:i&&i.fullWidth,inputChangeHandler:a?function(e){return a(e,r)}:null,value:t&&t[r]&&t[r].value,componentClass:t&&t[r]&&t[r].styleClass,errStr:i&&i.validations&&i.validations.validationErrStr,hasErr:!n[r],label:i&&i.label,type:i&&i.type,autoComplete:i&&i.autoComplete},r)}))})},P=a(144),W=3600,_=a.n(P).a.create({baseURL:"http://0.0.0.0:8087"}),q="AUTH_START",B="AUTH_SUCCESS",z="AUTH_FAIL",R="AUTH_LOGOUT",G="ADD_ALERT",H="REMOVE_ALERT",M=a(34),F=a.n(M),J=a(67),V=function(){var e=Object(J.a)(F.a.mark((function e(t,a){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_.post(t,a);case 3:return n=e.sent,e.abrupt("return",{data:n.data,error:null});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{data:null,error:e.t0});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,a){return e.apply(this,arguments)}}(),$="auth",X=function(){return{type:q}},K=function(e,t){return n=_.interceptors.request.use((function(t){return t.headers.Authorization="Bearer ".concat(e),t})),{type:B,email:t,idToken:e}},Q=function(e){return{type:z,error:e}},Y=function(){return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("email"),_.interceptors.request.eject(n),{type:R}},Z=function(e){return function(t){setTimeout((function(){t(Y())}),1e3*e)}},ee=function(e,t,a,n,r,i){return function(c){c(X());var s,o={email:e,name:t,gender:a,age:n,postalcode:r,address:i};console.log(o),(s=o,V("".concat($,"/register"),s)).then((function(e){if(console.log(e),console.log(e.data),e.data){var t=new Date((new Date).getTime()+36e5);localStorage.setItem("email",e.data.UserEmail),localStorage.setItem("token",e.data.Token.value),localStorage.setItem("expirationDate",t),c(K(e.data.token,e.data.UserEmail)),c(Z(W))}else c(Q("Invalid Entry"));e.error&&c(Q("Invalid Entry"))}))}},te=function(e,t){return function(a){var n;a(X()),(n={email:e,password:t},V("".concat($,"/login"),n)).then((function(e){if(e.data){console.log(e.data.UserEmail);var t=new Date((new Date).getTime()+36e5);localStorage.setItem("email",e.data.UserEmail),localStorage.setItem("token",e.data.Token.value),localStorage.setItem("expirationDate",t),a(K(e.data.Token.value,e.data.UserEmail)),a(Z(W))}else a(Q("Invalid Username or Password"));e.error&&a(Q("Invalid Username or Password"))}))}},ae=function(e){return{type:G,alert:e}},ne="/signin",re="/userprofile",ie={gmail:{label:"Email*",validations:{required:!0,isEmail:!0,validationErrStr:"Enter a valid email"}},password:{label:"Password*",type:"password",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}}},ce=Object(w.a)((function(e){return{root:{height:"100vh",display:"flex",flexDirection:"row",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginLeft:"45%"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},loginInput:{width:"100%",marginTop:"20px",color:"white"}}}));var se=Object(d.b)((function(e){return{isAuthenticated:null!=e.auth.token,error:e.auth.error}}),(function(e){return{onAuth:function(t,a){return e(te(t,a))},addAlert:function(t){return e(ae(t))}}}))((function(e){var t=ce(),a=e.isAuthenticated,n=e.error,i=Object(j.g)(),c=Object(r.useState)({gmail:!0,password:!0}),s=Object(h.a)(c,2),o=s[0],l=s[1],d=Object(r.useState)({gmail:"",password:""}),u=Object(h.a)(d,2),O=u[0],w=u[1],k={gmail:{styleClass:t.loginInput},password:{styleClass:t.loginInput}},A=Object(r.useCallback)((function(e,t){var a=ie[e].validations;return C(a,t||O[e])}),[O]),N=Object(r.useCallback)((function(e,t){var a=ie[t].validations,n=C(a,e.target.value);l(E(o,Object(b.a)({},t,n))),w(E(O,Object(b.a)({},t,e.target.value)))}),[O,o]),T=L(ie,k,N,o),D=Object(r.useCallback)((function(t){t.preventDefault();var a=Object(m.a)({},o);a.gmail=A("gmail"),a.password=A("password"),l(a),a.gmail&&a.password&&e.onAuth(O.gmail,O.password)}),[O,A,o,e]),P=null;return n&&(P=Object(U.jsx)("div",{children:Object(U.jsx)(p.a,{error:!0,children:n})})),a?Object(U.jsx)(j.a,{to:re}):Object(U.jsxs)(y.a,{container:!0,component:"main",className:t.root,children:[Object(U.jsx)(I.a,{}),Object(U.jsx)(y.a,{item:!0,xs:!1,sm:4,md:7,className:t.image}),Object(U.jsxs)(y.a,{item:!0,xs:12,sm:8,md:5,elevation:6,square:!0,children:[Object(U.jsx)(g.a,{className:t.avatar,children:Object(U.jsx)(f.a,{})}),Object(U.jsx)(v.a,{component:"h1",variant:"h5",children:"Sign In"}),Object(U.jsxs)("form",{noValidate:!0,autoComplete:"off",className:t.form,onSubmit:D,children:[P,T,Object(U.jsx)(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Sign In"}),Object(U.jsxs)(y.a,{container:!0,children:[Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(S.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(U.jsx)(y.a,{item:!0,children:Object(U.jsx)(S.a,{onClick:function(){return i.push("/signup")},variant:"body2",children:"Don't have an account? Sign Up"})})]})]})]})]})})),oe=a.p+"static/media/signuppage.407f8b7a.jpg",le={gmail:{label:"Email*",validations:{required:!0,isEmail:!0,validationErrStr:"Enter a valid email"}},name:{label:"Name",type:"String",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}},gender:{label:"Gender",type:"String",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}},postalcode:{label:"Postal Code",type:"String",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}},age:{label:"Age",type:"String",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}},address:{label:"Address",type:"String",validations:{required:!0,minLength:2,maxLength:40,validationErrStr:"Use between 6 and 40 characters for your password"}}},de=Object(w.a)((function(e){return{root:{height:"100vh",display:"flex",flexDirection:"row",alignItems:"center"},image:{backgroundImage:oe,backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover",backgroundPosition:"center",height:"100%",width:"100%"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginLeft:"45%"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},loginInput:{width:"100%",marginTop:"20px",color:"white"}}}));var ue=Object(d.b)((function(e){return{isAuthenticated:null!=e.auth.token,error:e.auth.error}}),(function(e){return{onAuth:function(t,a,n,r,i,c){return e(ee(t,a,n,r,i,c))},addAlert:function(t){return e(ae(t))}}}))((function(e){var t=de(),a=e.isAuthenticated,n=e.error,i=Object(j.g)(),c=Object(r.useState)({gmail:!0,name:!0,gender:!0,age:!0,postalcode:!0,address:!0}),s=Object(h.a)(c,2),o=s[0],l=s[1],d=Object(r.useState)({gmail:"",name:"",gender:"",age:"",postalcode:"",address:""}),u=Object(h.a)(d,2),O=u[0],w=u[1],k={gmail:{styleClass:t.loginInput},name:{styleClass:t.loginInput},gender:{styleClass:t.loginInput},age:{styleClass:t.loginInput},postalcode:{styleClass:t.loginInput},address:{styleClass:t.loginInput}},A=Object(r.useCallback)((function(e,t){var a=le[e].validations;return C(a,t||O[e])}),[O]),N=Object(r.useCallback)((function(e,t){var a=le[t].validations,n=C(a,e.target.value);l(E(o,Object(b.a)({},t,n))),w(E(O,Object(b.a)({},t,e.target.value)))}),[O,o]),T=L(le,k,N,o),D=Object(r.useCallback)((function(t){t.preventDefault();var a=Object(m.a)({},o);a.gmail=A("gmail"),a.name=A("name"),a.gender=A("gender"),a.age=A("age"),a.postalcode=A("postalcode"),a.address=A("address"),l(a),a.gmail&&a.name&&e.onAuth(O.gmail,O.name,O.gender,O.age,O.postalcode,O.address)}),[O,A,o,e]),P=null;return n&&(P=Object(U.jsx)("div",{children:Object(U.jsx)(p.a,{error:!0,children:n})})),a?Object(U.jsx)(j.a,{to:re}):Object(U.jsxs)(y.a,{container:!0,component:"main",className:t.root,children:[Object(U.jsx)(I.a,{}),Object(U.jsx)(y.a,{item:!0,xs:!1,sm:4,md:7,className:t.image}),Object(U.jsxs)(y.a,{item:!0,xs:12,sm:8,md:5,elevation:6,square:!0,children:[Object(U.jsx)(g.a,{className:t.avatar,children:Object(U.jsx)(f.a,{})}),Object(U.jsx)(v.a,{component:"h1",variant:"h5",children:"Sign Up"}),Object(U.jsxs)("form",{noValidate:!0,autoComplete:"off",className:t.form,onSubmit:D,children:[P,T,Object(U.jsx)(x.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Sign Up"}),Object(U.jsxs)(y.a,{container:!0,children:[Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(S.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(U.jsx)(y.a,{item:!0,children:Object(U.jsx)(S.a,{onClick:function(){return i.push("/signin")},variant:"body2",children:"Have an account? Sign In"})})]})]})]})]})})),je=a(304),me=a(344),be=a(353),he=a(354),ge=a(355),pe=a(145),xe=a.n(pe),Oe=a(146),fe=a.n(Oe),ve=a(350),ye=a(351),we=a(352),Se=Object(w.a)((function(e){return{root:{flexGrow:1},card:{width:"100%"}}})),Ie=Object(d.b)((function(e){return{error:e.auth.error,isAuthenticated:null!=e.auth.token,email:e.auth.email}}),(function(e){return{addAlert:function(t){return e(ae(t))}}}))((function(e){var t=Se(),a=e.email,n=Object(r.useState)(!0),i=Object(h.a)(n,2),c=i[0],s=i[1],o=Object(r.useState)([]),l=Object(h.a)(o,2),d=l[0],u=l[1];return Object(r.useEffect)((function(){var e;c&&(e={email:a},V("".concat($,"/get_user_info"),e)).then((function(e){e.error||u(e.data.UserDetails)})).finally((function(){return s(!1)}))}),[c,a]),Object(U.jsx)("div",{className:t.root,children:Object(U.jsxs)(ve.a,{className:t.card,children:[Object(U.jsx)(ye.a,{title:"My profile",subheader:"GreenBay"}),Object(U.jsx)(we.a,{children:Object(U.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(U.jsxs)(y.a,{container:!0,spacing:3,children:[Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{id:"Username",label:"User Name",value:d.username,fullWidth:!0,InputProps:{readOnly:!0}})}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{type:"name",id:"gender",label:"Gender",fullWidth:!0,value:d.gender,InputProps:{readOnly:!0}})}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{id:"email",label:"Email",type:"name",fullWidth:!0,value:d.useremail,InputProps:{readOnly:!0}})}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{id:"age",label:"Age",InputProps:{readOnly:!0},fullWidth:!0,value:d.age})}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{margin:"address",id:"Address",label:"Adress",fullWidth:!0,value:d.address,InputProps:{readOnly:!0}})}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(T.a,{id:"postalcode",label:"Postal Code",fullWidth:!0,value:d.postalcode,InputProps:{readOnly:!0}})})]})})})]})})})),Ce=Object(w.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},layout:{height:"100%",margin:"10px"},leftcontainer:{},rightcontainer:{height:"100%"},large:{width:e.spacing(7),height:e.spacing(7),backgroundImage:oe,backgroundRepeat:"no-repeat",backgroundColor:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[900],backgroundSize:"cover"},imagecard:{flexDirection:"column",alignItems:"center",justifyContent:"center"}}}));var ke=Object(d.b)((function(e){return{isAuthenticated:null!=e.auth.token,error:e.auth.error,email:e.auth.email}}),(function(e){return{addAlert:function(t){return e(ae(t))}}}))((function(e){var t=Ce(),a=Object(j.g)(),n=e.isAuthenticated;return console.log(e.email),n||a.push(ne),Object(U.jsx)("div",{className:t.root,children:Object(U.jsxs)(y.a,{container:!0,spacing:3,className:t.layout,children:[Object(U.jsxs)(y.a,{item:!0,xs:12,sm:4,className:t.leftcontainer,children:[Object(U.jsxs)(je.a,{className:t.imagecard,children:[Object(U.jsx)(g.a,{alt:"Remy Sharp",className:t.large}),Object(U.jsx)(v.a,{variant:"h5",gutterBottom:!0,children:"Isuru Ariyarathne"}),Object(U.jsx)(v.a,{variant:"h6",gutterBottom:!0,children:"isuru.18@cse.mrt.ac.lk"})]}),Object(U.jsx)(je.a,{className:t.paper,children:Object(U.jsxs)(me.a,{component:"nav","aria-label":"main mailbox folders",children:[Object(U.jsxs)(be.a,{button:!0,children:[Object(U.jsx)(he.a,{children:Object(U.jsx)(xe.a,{})}),Object(U.jsx)(ge.a,{primary:"My Profile"})]}),Object(U.jsxs)(be.a,{button:!0,children:[Object(U.jsx)(he.a,{children:Object(U.jsx)(fe.a,{})}),Object(U.jsx)(ge.a,{primary:"Change Passowrd"})]})]})})]}),Object(U.jsx)(y.a,{item:!0,xs:12,sm:8,className:t.rightcontainer,children:Object(U.jsx)(Ie,{})})]})})})),Ae=a(361),Ee=a(363),Ne=a(149),Te=a.n(Ne),Ue=a(364),De=a(360),Le=a(305),Pe=a(147),We=a.n(Pe),_e=(a(301),a(356)),qe=a(359),Be=a(357),ze=a(358),Re=a(148),Ge=a.n(Re),He=Object(w.a)({root:{maxWidth:345},media:{height:140}});function Me(e){var t=He(),a=e.data;return console.log(a),Object(U.jsxs)(ve.a,{className:t.root,children:[Object(U.jsxs)(_e.a,{children:[Object(U.jsx)(Be.a,{className:t.media,image:a[0].image_url,title:"Contemplative Reptile"}),Object(U.jsx)(me.a,{className:t.root,children:Object(U.jsxs)(be.a,{children:[Object(U.jsx)(ze.a,{children:Object(U.jsx)(g.a,{children:Object(U.jsx)(Ge.a,{})})}),Object(U.jsx)(ge.a,{primary:"Photos",secondary:"Jan 9, 2014"})]})}),Object(U.jsxs)(we.a,{children:[Object(U.jsx)(v.a,{gutterBottom:!0,variant:"h5",component:"h2",children:a[0].title}),Object(U.jsx)(v.a,{variant:"body2",color:"textSecondary",component:"p",children:a[0].description})]})]}),Object(U.jsx)(qe.a,{children:Object(U.jsx)(x.a,{size:"small",color:"secondary",children:"Delete"})})]})}var Fe=Object(w.a)((function(e){return{root:{flexGrow:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",marginLeft:e.spacing(8),marginRight:e.spacing(8),marginBottom:e.spacing(8)},container:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},pagination:{"& > * + *":{marginTop:e.spacing(2)},display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},button:{margin:e.spacing(8)},buttonalign:{alignItems:"right"},modal:{display:"flex",alignItems:"center",justifyContent:"center"},modelpaper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3),width:400},progressBar:{width:"100%"}}})),Je=[{title:"Deforestation pattern 1",user:"IsuruAriyarathne1",description:"description1",posted_date:"July 2nd 2021",image_url:"http://wallup.net/wp-content/uploads/2016/01/20264-nature-forest-trees-green.jpg",user_profile:"https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/"}];function Ve(){var e=Fe(),t=i.a.useState(1),a=Object(h.a)(t,2),n=a[0],r=a[1],c=i.a.useState(!1),s=Object(h.a)(c,2),o=s[0],l=s[1],d=i.a.useState(!1),u=Object(h.a)(d,1)[0],j=i.a.useState(0),m=Object(h.a)(j,2),b=m[0],g=m[1],p=i.a.useState(10),O=Object(h.a)(p,2),f=O[0],w=O[1],S=i.a.useState(""),I=Object(h.a)(S,1)[0],C=i.a.useRef((function(){}));i.a.useEffect((function(){C.current=function(){if(b>100)g(0),w(10);else{var e=10*Math.random(),t=10*Math.random();g(b+e),w(b+e+t)}}})),i.a.useEffect((function(){var e=setInterval((function(){C.current()}),500);return function(){clearInterval(e)}}),[]);return Object(U.jsxs)(i.a.Fragment,{children:[Object(U.jsx)("div",{className:e.root,children:Object(U.jsxs)(y.a,{container:!0,spacing:3,className:e.container,children:[Object(U.jsx)(y.a,{container:!0,spacing:3,className:e.buttonalign,children:Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(x.a,{variant:"contained",color:"primary",className:e.button,startIcon:Object(U.jsx)(Te.a,{}),onClick:function(){l(!0)},children:"Upload New Post"})})}),Object(U.jsxs)(y.a,{container:!0,spacing:3,children:[Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})})]}),Object(U.jsxs)(y.a,{container:!0,spacing:3,className:e.container,children:[Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})})]}),Object(U.jsxs)(y.a,{container:!0,spacing:3,className:e.container,children:[Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})}),Object(U.jsx)(y.a,{item:!0,xs:!0,children:Object(U.jsx)(Me,{data:Je})})]})]})}),Object(U.jsxs)("div",{className:e.pagination,children:[Object(U.jsxs)(v.a,{children:["Page: ",n]}),Object(U.jsx)(Ee.a,{count:10,page:n,onChange:function(e,t){r(t)}})]}),Object(U.jsx)(Ue.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:e.modal,open:o,onClose:function(){l(!1)},closeAfterTransition:!0,BackdropComponent:De.a,BackdropProps:{timeout:500},children:Object(U.jsx)(Le.a,{in:o,children:Object(U.jsxs)("div",{className:e.modelpaper,children:[Object(U.jsx)("h2",{id:"transition-modal-title",children:"Add new post"}),Object(U.jsx)(T.a,{id:"outlined-textarea",label:"Title",placeholder:"Enter the post title",multiline:!0,fullWidth:!0,variant:"outlined"}),Object(U.jsx)("div",{className:e.progressBar,children:Object(U.jsx)(Ae.a,{vvariant:"buffer",value:b,valueBuffer:f})}),Object(U.jsx)("input",{style:{margin:"0px 10px 10px 0px",backgroundColor:"#c7ece3"},type:"file",onChange:function(e){var t=e.target.files[0];I(t)}}),Object(U.jsx)(x.a,{variant:"contained",color:"primary",children:"Upload"}),Object(U.jsx)(We.a,{onChange:function(e){u(e.target.value)}})]})})})]})}a(302);var $e=Object(d.b)((function(e){return{isAuthenticated:null!==e.auth.token,email:e.auth.email}}),(function(e){return{onTryAutoSignIn:function(){return e((function(e){var t=localStorage.getItem("token");if(t){var a=new Date(localStorage.getItem("expirationDate"));if(a<=new Date)e(Y());else{var n=localStorage.getItem("email");e(K(t,n)),e(Z((a.getTime()-(new Date).getTime())/1e3))}}else e(Y())}))}}}))((function(e){var t=e.onTryAutoSignIn;Object(r.useEffect)((function(){t()}),[t]);var a=Object(U.jsx)(r.Suspense,{children:Object(U.jsxs)(j.d,{children:[Object(U.jsx)(j.b,{exact:!0,path:ne,component:se}),Object(U.jsx)(j.b,{exact:!0,path:"/signup",component:ue}),Object(U.jsx)(j.b,{exact:!0,path:re,component:ke}),Object(U.jsx)(j.b,{exact:!0,path:"/feedpage",component:Ve}),Object(U.jsx)(j.a,{path:"/",to:ne})]})});return Object(U.jsx)("div",{className:"App",children:a})}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Xe={token:null,email:null,error:null,loading:!1,authRedirectPath:"/"},Ke=function(e){return E(e,{error:null,loading:!0})},Qe=function(e,t){return E(e,{token:t.idToken,email:t.email,error:null,loading:!1})},Ye=function(e,t){return E(e,{token:null,email:null,error:t.error,loading:!1})},Ze=function(e){return E(e,{token:null,email:null})},et=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case q:return Ke(e);case B:return Qe(e,t);case z:return Ye(e,t);case R:return Ze(e);default:return e}},tt={alerts:[]},at=function(e,t){var a={alerts:N(e.alerts,t.alert)};return E(e,a)},nt=function(e,t){var a,n,r,i={alerts:(a=e.alerts,n=A,r=t.alertId,n===A?a.filter((function(e,t){return t!==r})):a.filter((function(e){return e[n]!==r})))};return E(e,i)},rt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:tt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case G:return at(e,t);case H:return nt(e,t);default:return e}},it=l.c,ct=Object(l.b)({auth:et,alert:rt}),st=Object(l.d)(ct,it(Object(l.a)(u.a))),ot=Object(U.jsx)(d.a,{store:st,children:Object(U.jsx)(o.a,{children:Object(U.jsx)(i.a.StrictMode,{children:Object(U.jsx)($e,{})})})});s.a.render(ot,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[303,1,2]]]);
//# sourceMappingURL=main.aa783742.chunk.js.map