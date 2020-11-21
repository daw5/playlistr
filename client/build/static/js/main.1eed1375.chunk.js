(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{125:function(e,t,n){},126:function(e,t,n){},158:function(e,t,n){e.exports=n(261)},163:function(e,t,n){},210:function(e,t){},228:function(e,t,n){},229:function(e,t,n){},230:function(e,t,n){},231:function(e,t,n){},232:function(e,t,n){},251:function(e,t,n){},252:function(e,t,n){},257:function(e,t,n){},258:function(e,t,n){},259:function(e,t,n){},260:function(e,t,n){},261:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"logout",(function(){return E})),n.d(a,"login",(function(){return y})),n.d(a,"register",(function(){return O}));var r={};n.r(r),n.d(r,"connectSocket",(function(){return C})),n.d(r,"authenticateSocket",(function(){return S})),n.d(r,"fetchMoreMessages",(function(){return N})),n.d(r,"sendPrivateMessage",(function(){return P})),n.d(r,"sendGroupMessage",(function(){return M})),n.d(r,"leaveGroup",(function(){return I})),n.d(r,"disconnectSocket",(function(){return x})),n.d(r,"updateConversations",(function(){return T}));var c={};n.r(c),n.d(c,"getCurrentUser",(function(){return _})),n.d(c,"getUsers",(function(){return R})),n.d(c,"getConversations",(function(){return z})),n.d(c,"setUsername",(function(){return L}));var s={};n.r(s),n.d(s,"getThumbnailURL",(function(){return q}));var o={};n.r(o),n.d(o,"createPlaylist",(function(){return $})),n.d(o,"updatePlaylist",(function(){return J})),n.d(o,"deletePlaylist",(function(){return V})),n.d(o,"getPlaylists",(function(){return Z})),n.d(o,"getUserPlaylists",(function(){return Y})),n.d(o,"getPlaylist",(function(){return Q})),n.d(o,"getRecentPlaylists",(function(){return X}));var i=n(0),u=n.n(i),l=n(13),m=n.n(l),d=(n(163),n(6));var f,p=n(133),g=n.n(p),h=n(132),v=n.n(h),b=n(51),E=function(){return b.post("/api/auth/logout").then((function(){return!0})).catch((function(){return!1}))},y=function(e,t){return b.post("/api/auth/login",{email:e,password:t}).then((function(e){return e})).catch((function(e){return e.response}))},O=function(e,t){return b.post("/api/auth/register",{email:e,password:t}).then((function(e){return e})).catch((function(e){return e.response}))},k=n(127),j=n.n(k),w=n(51),C=function(){return f=j.a.connect(window.location.hostname)},S=function(){return(f=C()).on("connect",(function(){f.emit("authenticate").on("authenticated",(function(){console.log("socket authentication complete")})).on("unauthorized",(function(e){console.log("unauthorized: ".concat(JSON.stringify(e.data)))}))})),f},N=function(e,t){return w.get("/api/users/current/conversations/".concat(e[t]._id,"/load-messages/").concat(e[t].messages.length)).then((function(n){return U(e,t,n.data)})).catch((function(e){console.log(e)}))},U=function(e,t,n){var a=e[t].messages.concat(n),r=e;return r[t].messages=a,r},P=function(e,t,n){return e.preventDefault(),f.emit("message",{reciever_id:n,contents:t}),!0},M=function(e,t,n,a){return e.preventDefault(),f.emit("group-message",{correspondent:n,messageToSend:t,group:a}),!0},I=function(e){f.emit("leave-group",e)},x=function(){f.close(),f=null},T=function(e,t){var n=t;return e&&(e.newConversation?n[e.correspondent]=e.newConversation:n[e.correspondent].messages.unshift(e.message)),n};n(32).config();var D=n(51),_=function(){return D.get("/api/users/current").then((function(e){return e.data})).catch((function(e){console.log(e)}))},R=function(){return D.get("/api/users").then((function(e){var t=e.data.filter((function(e){return e.username}));return F(t)})).catch((function(e){console.log(e)}))},z=function(e){return D.get("/api/users/current/conversations").then((function(t){return A(t.data,e)})).catch((function(e){console.log(e)}))},L=function(e,t){return D.put("/api/users/current/set-username",{_id:e,username:t}).then((function(e){return console.log("response: ",e),e})).catch((function(e){console.log(e)}))},A=function(e,t){var n={};return e.forEach((function(e){n[e.users[0]!==t?e.users[0]:e.users[1]]=e})),n},F=function(e){var t={};return e.forEach((function(e){t[e._id]=e})),t},H=n(128),K=n(51),B=/^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)$/,W=/^(?:\/embed)?\/([\w-]{10,12})$/,q=function(e){e=e||"";var t=Object(H.parse)(e,!0);if(-1!==["www.youtube.com","youtube.com","youtu.be"].indexOf(t.host)){var n=null;if("v"in t.query)t.query.v&&t.query.v.match(/^[\w-]{10,12}$/)&&(n=t.query.v);else{var a=W.exec(t.pathname);a&&(n=a[1])}if(n)return"http://img.youtube.com/vi/".concat(n,"/hqdefault.jpg")}if(-1!==["www.vimeo.com","vimeo.com","player.vimeo.com"].indexOf(t.host)){var r=B.exec(t.pathname);if(r){var c=r[1];return K.get("https://vimeo.com/api/v2/video/".concat(c,".json")).then((function(e){return e.data[0].thumbnail_large})).catch((function(){return!1}))}}return null};n(32).config();var G=n(51),$=function(e,t){return G.post("/api/playlists",{title:e,tracks:t}).then((function(e){return e.data})).catch((function(e){return e.response.data}))},J=function(e,t){return G.put("/api/playlists/".concat(e),t).then((function(e){return e.data})).catch((function(e){return e.response.data}))},V=function(e){return G.delete("/api/playlists/".concat(e)).then((function(e){return e.data})).catch((function(e){return e.response.data}))},Z=function(){return G.get("/api/playlists").then((function(e){return e.data})).catch((function(e){return e.response.data}))},Y=function(){return G.get("/api/users/current/playlists").then((function(e){return e.data})).catch((function(e){return e.response.data}))},Q=function(e){return G.get("/api/playlists/".concat(e)).then((function(e){return e.data})).catch((function(e){return e.response.data}))},X=function(){return G.get("/api/playlists/recent").then((function(e){return e.data})).catch((function(e){return e.response.data}))},ee=n(75),te=n(301),ne=n(67),ae=n.n(ne),re=n(14);n(86);var ce=function(e){var t=Object(i.useState)(!1),n=Object(d.a)(t,2),s=n[0],o=n[1],l=Object(i.useState)(!1),m=Object(d.a)(l,2),f=m[0],p=m[1],h=Object(i.useState)(""),b=Object(d.a)(h,2),E=b[0],y=b[1],O=Object(i.useState)(!1),k=Object(d.a)(O,2),j=k[0],w=k[1],C=Object(re.f)(),S=function(){p(!1),o(!1)},N=function(e){S(),P("WELCOME, ".concat(e))},U=function(e){var t=Object.values(e.data)[0].msg?Object.values(e.data)[0].msg:e.data;P(t.toUpperCase())},P=function(e){y(e),setTimeout((function(){y(null)}),2e3)};return u.a.createElement("div",{id:"headerContainer"},u.a.createElement("div",{id:"header",className:"\n          ".concat(E&&"color-animation","\n          ").concat(!s&&"signed-in-header","\n        ")},E&&u.a.createElement(ee.a,{className:"temporaryMessage",variant:"h5"},E),!E&&e.loaded&&u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{id:"navButtonsContainer"},e.currentUser&&e.currentUser.username?u.a.createElement(_e,{id:"sideMenuIconContainer",loadUserData:e.loadUserData}):u.a.createElement("div",{id:"loginButtonContainer"},!s||f?u.a.createElement(te.a,{id:"loginButton",onClick:function(){o(!0),p(!1)}},"Login"):u.a.createElement(te.a,{id:"registerButton",onClick:function(){return p(!0)}},"No Account?"))),s&&u.a.createElement(pe,{resetHeader:S,loginOrRegister:function(t){f?function(e){var t=e.email,n=e.password;e.passwordConfirm===n?a.register(t,n).then((function(e){U(e),200===e.status&&S()})):P("PASSWORDS DO NOT MATCH")}(t):function(t){var n=t.email,c=t.password;a.login(n,c).then((function(t){200===t.status?(r.disconnectSocket(),t.data.username?(S(),N(t.data.username)):(w(!0),P("WHAT SHOULD WE CALL YOU?")),e.loadUserData()):U(t)}))}(t)},handleSetUsername:function(t){c.setUsername(e.currentUser._id,t).then((function(t){200===t.status?(N(t.data.username),w(!1),e.loadUserData()):U(t)}))},enterUsername:j,setEnterUsername:w,showRegisterInputs:f}),!s&&u.a.createElement(ue,{playlists:e.playlists,displayTemporaryMessage:P}),u.a.createElement("div",{id:"messaging-icon-column"},u.a.createElement("div",{id:"messaging-icon-container",onClick:e.toggleMessagingSidebar},e.currentUser&&e.currentUser.username?u.a.createElement(u.a.Fragment,null,e.messagingSidebarOpen?u.a.createElement(g.a,{id:"messaging-icon-filled",style:{fontSize:40}}):u.a.createElement(v.a,{id:"messaging-icon-outline",style:{fontSize:40}})):u.a.createElement(u.a.Fragment,null,!s&&u.a.createElement(ae.a,{onClick:function(){return C.push("/")},style:{fontSize:40}})))))))},se=n(19),oe=n(310),ie=n(311);function ue(e){var t=Object(re.f)();return u.a.createElement("div",{className:"playlist-search-bar-container"},u.a.createElement(ie.a,{size:"small",className:"playlist-search-bar",options:e.playlists||[],onChange:function(n,a){e.displayTemporaryMessage("\u266b ".concat(a.title," \u266b")),t.push("/playlist/".concat(a._id))},getOptionLabel:function(e){return e.title},renderInput:function(e){return u.a.createElement(oe.a,Object.assign({},e,{InputProps:Object(se.a)(Object(se.a)({},e.InputProps),{},{style:{color:"#fff"}}),label:"Search for a playlist",variant:"outlined"}))}}))}var le=n(136),me=n.n(le),de=n(72),fe=n.n(de);var pe=function(e){var t=Object(i.useState)({}),n=Object(d.a)(t,2),a=n[0],r=n[1],c=Object(i.useRef)(null),s=function(e){console.log("auth input : ",a),"Enter"===e.key&&o()},o=function(){e.enterUsername?e.handleSetUsername(a.username):e.loginOrRegister(a)};Object(i.useEffect)((function(){c&&c.current.focus()}),[e.showRegisterInputs]);var l={border:"1px solid white",color:"white"};return u.a.createElement("div",{id:"authInputs",className:e.showRegisterInputs?"showRegisterInputs":""},u.a.createElement(oe.a,{autoFocus:!0,inputRef:c,value:a.username||a.email||"",className:"authInput emailInput ".concat(e.enterUsername&&"username-input"),size:"small",onChange:function(t){return e.enterUsername?r(Object(se.a)(Object(se.a)({},a),{},{username:t.target.value})):r(Object(se.a)(Object(se.a)({},a),{},{email:t.target.value}))},onKeyDown:function(e){return s(e)},variant:"outlined",placeholder:e.enterUsername?"Username":"Email",InputProps:{style:l}}),!e.enterUsername&&u.a.createElement(oe.a,{type:"password",value:a.password||"",className:"authInput passwordInput",size:"small",onChange:function(e){return r(Object(se.a)(Object(se.a)({},a),{},{password:e.target.value}))},onKeyDown:function(e){return s(e)},variant:"outlined",placeholder:"Password",InputProps:{style:l}}),e.showRegisterInputs&&u.a.createElement(oe.a,{type:"password",value:a.passwordConfirm||"",className:"authInput confirmPasswordInput",size:"small",onChange:function(e){return r(Object(se.a)(Object(se.a)({},a),{},{passwordConfirm:e.target.value}))},onKeyDown:function(e){return s(e)},variant:"outlined",placeholder:"Confirm Password",InputProps:{style:l}}),u.a.createElement("div",{className:e.showRegisterInputs?"loginSubmitContainerRegister":"loginSubmitContainer"},u.a.createElement(te.a,{onClick:function(){return o(a)},variant:"outlined",className:"submit"},u.a.createElement(fe.a,{fontSize:"large"})),u.a.createElement(te.a,{onClick:function(){return e.resetHeader()&&r({})},variant:"outlined",className:"close"},u.a.createElement(me.a,{fontSize:"default"}))))},ge=n(39);n(228);function he(e){var t=Object(i.useState)(null),n=Object(d.a)(t,2),a=n[0],s=n[1],o=Object(i.useState)({}),l=Object(d.a)(o,2),m=l[0],f=l[1],p=Object(i.useState)(),g=Object(d.a)(p,2),h=g[0],v=g[1],b=Object(i.useState)(0),E=Object(d.a)(b,2),y=E[0],O=E[1],k=Object(i.useState)(0),j=Object(d.a)(k,2),w=j[0],C=j[1];Object(i.useEffect)((function(){e.currentUser&&c.getConversations(e.currentUser._id).then((function(t){f(t),e.socket.on("message",(function(e){v(e)}))}))}),[e.socket]),Object(i.useEffect)((function(){h&&(f(r.updateConversations(h,m)),O(y+1))}),[h]);return u.a.createElement("div",{className:e.messagingSidebarOpen?"visible messaging-container":"hidden messaging-container"},!a&&u.a.createElement(ve,{users:e.users,currentUser:e.currentUser,conversations:m,setCorrespondent:s}),a&&u.a.createElement(ct,{messages:m[a._id]?Object(ge.a)(m[a._id].messages):[],fetchCount:w,newMessageCount:y,correspondent:a,getMessages:function(){r.fetchMoreMessages(m,a._id).then((function(e){f(e),C(w+1)}))},setCorrespondent:s}))}n(32).config();n(229);function ve(e){var t=e.users?delete e.users[e.currentUser._id]&&Object.values(e.users):[];return u.a.createElement("div",{id:"conversationsContainer"},u.a.createElement("div",{id:"searchContainer"},u.a.createElement(ie.a,{id:"users-list",className:"users-list-autocomplete",options:t,onChange:function(t,n){e.setCorrespondent(n)},getOptionLabel:function(e){return e.username},renderInput:function(e){return u.a.createElement(oe.a,Object.assign({},e,{InputLabelProps:{style:{color:"#fff"}},placeholder:"Search for a user",label:"Search for a user",variant:"outlined"}))}})),u.a.createElement("div",{id:"conversation-snippets-container"},e.conversations&&Object.keys(e.conversations).map((function(t){return u.a.createElement("div",{key:"conversation".concat(e.conversations[t]._id),className:"conversation-snippet-container",onClick:function(n){e.setCorrespondent(e.users[t])}},u.a.createElement(be,{currentUser:e.currentUser,correspondent:e.users[t],message:e.conversations[t].messages[0]}))}))))}n(32).config();n(230);function be(e){return u.a.createElement("div",{className:"conversation-snippet"},u.a.createElement("p",null,u.a.createElement("b",null,e.correspondent&&e.correspondent.username)),u.a.createElement("p",null,e.message.contents))}n(32).config();var Ee=n(68),ye=n(140),Oe=n.n(ye),ke=n(141),je=n.n(ke),we=n(313),Ce=n(304),Se=n(137),Ne=n.n(Se),Ue=n(138),Pe=n.n(Ue),Me=n(305),Ie=n(306),xe=n(307),Te=n(139),De=n.n(Te);n(231);function _e(e){var t,n=Object(re.f)(),c=u.a.useState({sideMenu:!1}),s=Object(d.a)(c,2),o=s[0],i=s[1],l=function(e,t){return function(n){("keydown"!==n.type||"Tab"!==n.key&&"Shift"!==n.key)&&i(Object(se.a)(Object(se.a)({},o),{},Object(Ee.a)({},e,t)))}},m=function(){a.logout().then((function(){r.disconnectSocket(),e.loadUserData(),n.push("/")}))};return u.a.createElement("div",null,u.a.createElement(u.a.Fragment,{key:"sideMenu"},u.a.createElement(te.a,{style:{height:"100%"},onClick:l("sideMenu",!0)},o.sideMenu?u.a.createElement(je.a,{style:{fontSize:"40px",color:"white"}}):u.a.createElement(Oe.a,{style:{fontSize:"40px",color:"white"}})),u.a.createElement(we.a,{anchor:"left",open:o.sideMenu,onClose:l("sideMenu",!1)},(t="sideMenu",u.a.createElement("div",{role:"presentation",onClick:l(t,!1),onKeyDown:l(t,!1)},u.a.createElement(Ce.a,null,u.a.createElement(Me.a,{onClick:function(){return n.push("/")},button:!0,key:"hotPlaylists"},u.a.createElement(Ie.a,null,u.a.createElement(ae.a,null)),u.a.createElement(xe.a,{primary:"Hot Playlists"})),u.a.createElement(Me.a,{onClick:function(){return n.push("/my-playlists")},button:!0,key:"playlists"},u.a.createElement(Ie.a,null,u.a.createElement(Ne.a,null)),u.a.createElement(xe.a,{primary:"My Playlists"})),u.a.createElement(Me.a,{onClick:function(){return n.push("/playlist-create")},button:!0,key:"newPlaylist"},u.a.createElement(Ie.a,null,u.a.createElement(Pe.a,null)),u.a.createElement(xe.a,{primary:"New Playlist"})),u.a.createElement(Me.a,{onClick:m,button:!0,key:"logout"},u.a.createElement(Ie.a,null,u.a.createElement(De.a,null)),u.a.createElement(xe.a,{primary:"Logout"}))))))))}var Re=n(142),ze=n.n(Re);n(232);function Le(e){var t=Object(i.useState)(null),n=Object(d.a)(t,2),a=n[0],c=n[1],s=Object(i.useState)(null),l=Object(d.a)(s,2),m=l[0],f=l[1],p=Object(i.useState)(0),g=Object(d.a)(p,2),h=g[0],v=g[1],b=Object(i.useState)(null),E=Object(d.a)(b,2),y=E[0],O=E[1],k=Object(re.f)(),j=e.match.params.id;Object(i.useEffect)((function(){return function(){return e.socket&&r.leaveGroup(j)}}),[]),Object(i.useEffect)((function(){w()}),[e.match.params.id]),Object(i.useEffect)((function(){C()}),[e.socket]);var w=function(){var t=new URLSearchParams(window.location.search).get("track");v(t?t-1:0),o.getPlaylist(e.match.params.id).then((function(e){c(e),C(),k.push("/playlist/".concat(e._id))}))},C=function(){e.socket.emit("join-group",j,y),O(j),e.socket.on("group-message",(function(e){f(e)}))},S=function(){h+1<=a.tracks.length-1&&v(h+1)};return u.a.createElement("div",{className:"playlist-container"},u.a.createElement("div",{className:"playlist"},u.a.createElement("button",{className:"back-button"},u.a.createElement(ze.a,{onClick:function(){h-1>=0&&v(h-1)},style:{fontSize:45}})),a&&u.a.createElement(He,{currentTrack:a.tracks[h]&&a.tracks[h].url,trackForward:S}),u.a.createElement("button",{className:"forward-button"}," ",u.a.createElement(fe.a,{onClick:S,style:{fontSize:45}}))),u.a.createElement(nt,{currentUser:e.currentUser,latestMessage:m,group:j}))}n(32).config();var Ae=n(73),Fe=n.n(Ae);n(125);n(32).config();function He(e){var t=/^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/.test(e.currentTrack);return u.a.createElement("div",{className:"player-wrapper"},e.currentTrack?u.a.createElement(Fe.a,{className:t?"facebook-react-player":"react-player",url:e.currentTrack,width:t?"calc(50% - 46px)":"100%",height:"100%",controls:!0,onEnded:e.trackForward,playing:!0}):u.a.createElement("h2",{style:{color:"white",margin:"auto",textAlign:"center"}},"No Playlist Selected"))}var Ke=n(89),Be=n.n(Ke),We=n(143);n(251);function qe(e){var t=Object(i.useState)([]),n=Object(d.a)(t,2),a=n[0],r=n[1],c=Object(i.useState)(null),l=Object(d.a)(c,2),m=l[0],f=l[1],p=Object(i.useState)({title:null,tracks:null}),g=Object(d.a)(p,2),h=g[0],v=g[1],b=Object(i.useState)(null),E=Object(d.a)(b,2),y=E[0],O=E[1],k=Object(re.f)();Object(i.useEffect)((function(){e.edit&&o.getPlaylist(e.match.params.id).then((function(e){r(e.tracks),f(e.title)}))}),[]);var j=function(e){e.preventDefault(),a.length>0?o.createPlaylist(m,a).then((function(e){e.errors?v(e.errors):e&&k.push("/playlist/".concat(e._id))})):v({tracks:"Add some tracks!"})},w=function(){var e=Object(We.a)(Be.a.mark((function e(t){var n;return Be.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!Fe.a.canPlay(y)){e.next=10;break}return e.next=4,s.getThumbnailURL(y);case 4:n=e.sent,r([].concat(Object(ge.a)(a),[{url:y,thumbnailUrl:n}])),O(""),h.tracks&&v({tracks:null}),e.next=11;break;case 10:v({tracks:"Cannot add track"});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:"playlist-create-container"},u.a.createElement("div",{className:"playlist-create-inputs-container"},u.a.createElement("div",{className:"input-container playlist-create-input-container ".concat(e.edit&&"edit-inputs-container")},u.a.createElement(oe.a,{onKeyDown:function(e){return"Enter"===e.key&&w(e)},placeholder:"Paste link to media here",value:y||"",error:h.tracks,className:"message-input",onChange:function(e){return O(e.target.value)},autoFocus:!0,InputProps:{style:{color:"#fff"}}}),u.a.createElement(te.a,{className:"standard-submit-button",onClick:function(e){return w(e)},variant:"contained"},"Add Track")),u.a.createElement("div",{className:"input-container playlist-create-input-container ".concat(e.edit&&"edit-inputs-container")},u.a.createElement(oe.a,{onKeyDown:function(e){return"Enter"===e.key&&j(e)},placeholder:!e.edit&&"Enter your playlist title here",error:h.title,value:m||"",className:"message-input",onChange:function(e){return f(e.target.value)},InputProps:{style:{color:"#fff"}}}),u.a.createElement(te.a,{className:"standard-submit-button",onClick:function(t){e.edit?o.updatePlaylist(e.match.params.id,{title:m,tracks:a}).then((function(e){e.errors?v(e.errors):k.push("/my-playlists")})):j(t)},variant:"contained"},e.edit?"Save Changes":"Create"))),a&&u.a.createElement(et,{tracks:a,setTracks:r,deleteTrack:function(e){a.splice(e,1)&&r(Object(ge.a)(a))}}))}n(32).config();var Ge=n(144),$e=n.n(Ge),Je=n(74),Ve=n.n(Je);n(252);function Ze(e){var t=Object(i.useState)([]),n=Object(d.a)(t,2),a=n[0],r=n[1],c=Object(i.useState)(null),s=Object(d.a)(c,2),l=s[0],m=s[1],f=Object(i.useState)(!1),p=Object(d.a)(f,2),g=p[0],h=p[1],v=Object(re.f)();Object(i.useEffect)((function(){e.socket?O():y()}),[e.socket]);var b=function(e,t){t?v.push("/playlist/".concat(e._id,"?track=").concat(t)):v.push("/playlist/".concat(e._id))},E=function(){m(null),h(!1)},y=function(){o.getUserPlaylists().then((function(e){r(e)}))},O=function(){e.socket.on("get-active-playlists",(function(e){r(Object(ge.a)(e))})),e.socket.emit("get-active-playlists",!0)};return u.a.createElement("div",{className:"my-playlists-container"},a&&a.map((function(t,n){return u.a.createElement("div",{key:"playlist".concat(n),className:"playlist"},u.a.createElement("div",{className:"playlist-head"},u.a.createElement("div",{className:"playlist-title-container ".concat(e.socket&&"hot color-animation")},u.a.createElement("h2",null,t.title)),u.a.createElement("div",{className:"playlist-functions-container"},u.a.createElement(te.a,{className:"playlist-play-button standard-submit-button",variant:"contained",style:{gridColumn:e.socket&&"1 / span 2"},onClick:function(){return b(t)}},"Play"),!e.socket&&u.a.createElement(te.a,{className:"playlist-edit-button standard-submit-button",variant:"contained",onClick:function(){return function(e){v.push("/playlist-edit/".concat(e._id))}(t)}},"Edit"))),u.a.createElement("div",{className:"playlist-body"},t.tracks.map((function(e,n){return u.a.createElement("div",{onClick:function(){return b(t,n+1)},key:"track".concat(n),className:"my-playlists-thumbnail"},u.a.createElement("img",{src:e.thumbnailUrl?e.thumbnailUrl:Ve.a,className:"track-preview"}))}))),!e.socket&&u.a.createElement(te.a,{className:"delete-playlist-button",variant:"contained",color:"secondary",size:"small",onClick:function(){return function(e){m(e),h(!0)}(t)}},u.a.createElement($e.a,{fontSize:"small"})))})),!a[0]&&u.a.createElement("div",{className:"no-playlists"},u.a.createElement("h2",null,"No playlists here!")),u.a.createElement(lt,{action:function(e){o.deletePlaylist(e._id).then((function(){y(),E()})),m(null)},open:g,handleClose:E,item:l&&l}))}var Ye=n(91),Qe=n(145),Xe=n.n(Qe);n(257);function et(e){var t=Object(Ye.b)((function(t){var n=t.i,a=t.track;return u.a.createElement(tt,{thumbnailUrl:a.thumbnailUrl,deleteTrack:e.deleteTrack,index:n,className:"sortable-item"})})),n=Object(Ye.a)((function(e){var t=e.children;return u.a.createElement("div",{className:"sortable-container"},t)}));return u.a.createElement(n,{axis:"xy",onSortEnd:function(t){var n=t.oldIndex,a=t.newIndex,r=e.tracks;e.setTracks(Xe()(r,n,a))}},e.tracks.map((function(e,n){return u.a.createElement(t,{key:"item-".concat(n),index:n,i:n,track:e})})))}n(258);function tt(e){var t=Object(i.useState)(!1),n=Object(d.a)(t,2),a=n[0],r=n[1];return u.a.createElement("div",{onMouseEnter:function(){return r(!0)},onMouseLeave:function(){return r(!1)},className:"sortable-item"},u.a.createElement("img",{src:e.thumbnailUrl?e.thumbnailUrl:Ve.a,className:"track-preview \n          ".concat(a&&"low-opacity")}),a&&u.a.createElement("button",{onClick:function(){return e.deleteTrack(e.index)},className:"track-remove-button"},"DELETE"),u.a.createElement("button",{onClick:function(){return e.deleteTrack(e.index)},className:"track-remove-button-mobile"},"DELETE"))}n(259),n(126);function nt(e){var t=Object(i.useState)([]),n=Object(d.a)(t,2),a=n[0],c=n[1],s=Object(i.useState)(0),o=Object(d.a)(s,2),l=o[0],m=o[1],f=Object(i.useState)(""),p=Object(d.a)(f,2),g=p[0],h=p[1],v=Object(i.useRef)(null);Object(i.useEffect)((function(){c([])}),[e.group]);Object(i.useEffect)((function(){e.latestMessage&&c([e.latestMessage].concat(Object(ge.a)(a)))}),[e.latestMessage]);var b=function(t,n){n.length>0&&l<3&&(0===l&&setTimeout((function(){m(0)}),5e3),m(l+1),r.sendGroupMessage(t,n,{_id:e.currentUser?e.currentUser._id:"",username:e.currentUser?e.currentUser.username:"Anonymous"},e.group)&&h(""))};return u.a.createElement("div",{className:"group-chat"},u.a.createElement("div",{id:"groupMessagesContainer",className:"messages-container"},a.map((function(e,t){return u.a.createElement("div",{className:"message",key:"message".concat(t)},u.a.createElement("p",{className:"message-sender"},e.correspondent.username),u.a.createElement("p",{className:"group-message-content"},e.message))})),u.a.createElement("div",{ref:v})),u.a.createElement("div",{id:"groupChatFooter"},u.a.createElement("div",{className:"input-container"},u.a.createElement(oe.a,{onKeyDown:function(e){return"Enter"===e.key&&b(e,g)},placeholder:"Send a message",value:g,className:"message-input",onChange:function(e){return h(e.target.value)},InputProps:{style:{color:"#fff"}}}),u.a.createElement(te.a,{className:"standard-submit-button",onClick:function(e){return b(e,g)},variant:"contained"},"Send"))))}n(32).config();var at=n(146),rt=n.n(at);function ct(e){var t=Object(i.useState)(""),n=Object(d.a)(t,2),a=n[0],c=n[1],s=Object(i.useRef)(null),o=Object(i.useRef)(null),l=function(t,n){r.sendPrivateMessage(t,n,e.correspondent._id)&&c("")};return Object(i.useEffect)((function(){e.fetchCount>0&&o.current.scrollIntoView()}),[e.fetchCount]),Object(i.useEffect)((function(){s.current.scrollIntoView()}),[e.newMessageCount]),u.a.createElement("div",{id:"chatContainer"},u.a.createElement("div",{id:"chatHeaderContainer"},u.a.createElement(rt.a,{id:"backArrow",onClick:function(){return e.setCorrespondent(null)},style:{fontSize:40}}),u.a.createElement("h2",{id:"chatHeader"},e.correspondent.username)),u.a.createElement("div",{className:"messagesContainer",onScroll:function(t){return 0===t.target.scrollTop&&e.getMessages()}},function(){for(var t=[],n=e.messages.length-1;n>=0;n--)t.push(u.a.createElement("div",{key:"message".concat(e.messages[n]._id).concat(n),className:e.messages[n].sender===e.correspondent._id?"their-message":"my-message"},u.a.createElement("div",{className:"message"},e.messages[n].contents))),n===e.messages.length-30&&t.push(u.a.createElement("div",{key:"scrollPosition",ref:o}));return t}(),u.a.createElement("div",{ref:s})),u.a.createElement("div",{className:"chatFooter"},u.a.createElement("div",{className:"input-container"},u.a.createElement(oe.a,{onKeyDown:function(e){return"Enter"===e.key&&l(e,a)},placeholder:"Send a message",value:a,className:"message-input",onChange:function(e){return c(e.target.value)},InputProps:{style:{color:"#fff"}},multiline:!0}),u.a.createElement(te.a,{className:"standard-submit-button",onClick:function(e){return l(e,a)},variant:"contained"},"Send"))))}n(32).config();var st=n(308),ot=n(312);function it(){return{top:"".concat(50,"%"),left:"".concat(50,"%"),transform:"translate(-".concat(50,"%, -").concat(50,"%)")}}var ut=Object(st.a)((function(e){return{paper:{position:"absolute",color:"#fff",width:260,backgroundColor:"black",border:"1px solid #f50057",borderRadius:"10px",boxShadow:e.shadows[5],padding:e.spacing(2,4,3),textAlign:"center"}}}));function lt(e){var t=ut(),n=u.a.useState(it),a=Object(d.a)(n,1)[0],r=u.a.createElement("div",{style:a,className:t.paper},u.a.createElement("h2",{id:"simple-modal-title"},"Delete ",e.item&&e.item.title,"?"),u.a.createElement(te.a,{onClick:function(){return e.action(e.item)},variant:"outlined",color:"secondary"},"DELETE"),u.a.createElement(lt,null));return u.a.createElement(ot.a,{id:"generalModal",open:e.open,onClose:e.handleClose,"aria-labelledby":"simple-modal-title"},r)}var mt=n(40),dt=n(90),ft=n(309),pt=n(148),gt=Object(pt.a)({palette:{primary:{main:"#fff"}}});n(260);function ht(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=u.a.useState(e),n=Object(d.a)(t,2),a=n[0],r=n[1],c=u.a.useCallback((function(){r((function(e){return!e}))}),[]);return[a,c]}(),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(i.useState)(null),l=Object(d.a)(s,2),m=l[0],f=l[1],p=Object(i.useState)({}),g=Object(d.a)(p,2),h=g[0],v=g[1],b=Object(i.useState)(null),E=Object(d.a)(b,2),y=E[0],O=E[1],k=Object(i.useState)([]),j=Object(d.a)(k,2),w=j[0],C=j[1],S=Object(i.useState)(!1),N=Object(d.a)(S,2),U=N[0],P=N[1];Object(i.useEffect)((function(){T(),M()}),[]);var M=function(){c.getCurrentUser().then((function(e){e?x(e):I(),P(!0)}))},I=function(){f(null),O(r.connectSocket())},x=function(e){f(e),O(r.authenticateSocket()),c.getUsers().then((function(e){v(e)}))},T=function(){o.getRecentPlaylists().then((function(e){C(e)}))};return u.a.createElement(dt.b,null,u.a.createElement("div",{id:"app"},u.a.createElement(dt.a,null,u.a.createElement("meta",{name:"viewport",content:"minimum-scale=1, initial-scale=1, width=device-width"})),u.a.createElement(ft.a,{theme:gt},u.a.createElement(mt.a,null,u.a.createElement(ce,{messagingSidebarOpen:n,toggleMessagingSidebar:a,playlists:w,loaded:U,loadUserData:M,currentUser:m}),u.a.createElement("div",{id:"main-section-container"},u.a.createElement("div",{id:"main-section",className:n?"mobile-main-section":void 0},u.a.createElement(re.c,null,u.a.createElement(re.a,{path:"/my-playlists",render:function(){return u.a.createElement(Ze,null)}}),u.a.createElement(re.a,{path:"/playlist/:id",render:function(e){return y&&u.a.createElement(Le,Object.assign({},e,{currentUser:m,socket:y}))}}),u.a.createElement(re.a,{path:"/playlist-edit/:id",render:function(e){return m&&u.a.createElement(qe,Object.assign({},e,{edit:!0}))}}),u.a.createElement(re.a,{path:"/playlist-create",render:function(){return u.a.createElement(qe,{edit:!1})}}),u.a.createElement(re.a,{path:"/",render:function(){return y&&u.a.createElement(Ze,{socket:y})}}))),y&&m&&u.a.createElement(he,{users:h,socket:y,currentUser:m,messagingSidebarOpen:n}))))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));m.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(ht,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},74:function(e,t,n){e.exports=n.p+"static/media/cassette.f720df37.gif"},86:function(e,t,n){}},[[158,1,2]]]);
//# sourceMappingURL=main.1eed1375.chunk.js.map