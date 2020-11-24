(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),l=t.n(o),c=(t(20),t(4)),u=t(2),i=function(e){var n=e.value,t=e.handleFilterChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("div",null,"filter with: ",r.a.createElement("input",{value:n,onChange:t}))))},m=function(e){var n=e.type,t=e.text,a=e.handle;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{type:n,onClick:"function"===typeof a?a:void 0},t))},d=function(e){var n=e.addName,t=e.newName,a=e.newNumber,o=e.handleNameChange,l=e.handleNumberChange;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:l})),r.a.createElement("div",null,r.a.createElement(m,{type:"submit",text:"add"}))))},s=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:"error"===n.event?{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n.message)},f=function(e){var n=e.name,t=e.number,a=e.id,o=e.del,l=e.ind;return r.a.createElement("tr",null,r.a.createElement("td",null,l),r.a.createElement("td",null,n),r.a.createElement("td",null,t),r.a.createElement("td",null,r.a.createElement(m,{key:a,type:"button",text:"delete",handle:o})))},h=t(3),b=t.n(h),v="/api/persons",g=function(){return b.a.get(v).then((function(e){return e.data}))},E=function(e){return b.a.post(v,e).then((function(e){return e.data}))},p=function(e,n){return b.a.put("".concat(v,"/").concat(e),n).then((function(e){return e}))},y=function(e){return b.a.delete("".concat(v,"/").concat(e)).then((function(e){return e}))},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],l=Object(a.useState)(""),m=Object(u.a)(l,2),h=m[0],b=m[1],v=Object(a.useState)(""),w=Object(u.a)(v,2),j=w[0],O=w[1],k=Object(a.useState)(""),C=Object(u.a)(k,2),N=C[0],S=C[1],F=Object(a.useState)(null),x=Object(u.a)(F,2),B=x[0],T=x[1];Object(a.useEffect)((function(){g().then((function(e){o(e)}))}),[]);var z=function(e){T(e),setTimeout((function(){T(null)}),5500)},A=""===N?t:t.filter((function(e){return e.name.toLowerCase().includes(N)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:B}),r.a.createElement(i,{value:N,handleFilterChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Add a new person"),r.a.createElement(d,{addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));if(n){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with new one?"))){var a=Object(c.a)(Object(c.a)({},n),{},{number:j});p(a.id,a).then((function(e){204===e.status?(z({event:"error",message:"Information of ".concat(n.name," has been removed from server")}),b(""),O(""),o(t.filter((function(e){return!(e.id===n.id)})))):(o(t.map((function(t){return t.id!==n.id?t:e.data}))),b(""),O(""))})).catch((function(e){400===e.response.status&&z({event:"error",message:"".concat(e.response.data.error)})}))}}else{var r={name:h.trim(),number:j};E(r).then((function(e){o(t.concat(e)),z({event:"added",message:"Added ".concat(e.name)})})).catch((function(e){z({event:"error",message:"".concat(e.response.data.error)})})),b(""),O("")}},newName:h,newNumber:j,handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("table",null,r.a.createElement("tbody",null,A.map((function(e,n){return r.a.createElement(f,{key:e.id,ind:n+1,name:e.name,id:e.id,del:function(){var n,a;n=e.id,a=e.name,window.confirm("Do you really want to delete ".concat(a,"?"))&&y(n).then((function(e){o(t.filter((function(e){return!(e.id===n)}))),z({event:"deleted",message:"The person's '".concat(a,"' was deleted from server")})})).catch((function(e){z({event:"error",message:"The person's '".concat(a,"' has already been deleted from server")}),o(t.filter((function(e){return!(e.id===n)})))}))},number:e.number})})))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2ddc7e11.chunk.js.map