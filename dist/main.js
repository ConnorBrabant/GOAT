!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1),n(2)},function(e,t,n){},function(e,t){document.addEventListener("DOMContentLoaded",(function(){var e=50,t=50,n=50,r=50,a=600-e-n,o=document.getElementById("bar-graph").offsetWidth-r-t,u=d3.select("#bar-graph").append("svg").attr("width","100%").attr("height",a+e+n).append("g").attr("transform","translate("+n+","+e+")"),l=d3.scaleBand().range([0,o]).padding(.4),i=d3.scaleLinear().range([a,0]);d3.csv("/src/data/jordandata.csv",(function(e){var t=d3.select("#year"),n=e,r=[];for(ele in n[n.length-1]){var o={};o.stat=ele,o.value=parseFloat(n[n.length-1][ele]),r.push(o)}e=r.slice(1),l.domain(e.map((function(e){return e.stat}))),i.domain([0,40]);var c=d3.axisBottom().scale(l),d=d3.axisLeft().scale(i);u.append("g").call(d),u.append("g").attr("transform","translate(0, 500)").call(c),u.selectAll(".bar").data(e).enter().append("rect").attr("x",(function(e){return l(e.stat)})).attr("y",(function(e){return i(e.value)})).attr("width",l.bandwidth()).attr("height",(function(e){return a-i(e.value)})),t.on("change",(function(){year=d3.event.target.value;var t=[];for(ele in n[year-1]){var r={};r.stat=ele,r.value=parseFloat(n[year-1][ele]),t.push(r)}e=t.slice(1);var o=u.selectAll("rect");o.data(e).enter().append("rect").merge(o).transition().duration(1e3).attr("y",(function(e){return i(e.value)})).attr("height",(function(e){return a-i(e.value)}))}))}))}))}]);
//# sourceMappingURL=main.js.map