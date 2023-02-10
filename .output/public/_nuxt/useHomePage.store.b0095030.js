import{j as E,k,l as C,m as F,p as D,q as O,u as S,s as L,v as H,x as M,y as T,z as $}from"./entry.928c21e6.js";const N=()=>null;function R(...n){var l;const s=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(s);let[r,t,e={}]=n;if(typeof r!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof t!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");e.server=e.server??!0,e.default=e.default??N,e.lazy=e.lazy??!1,e.immediate=e.immediate??!0;const a=E(),o=()=>a.isHydrating?a.payload.data[r]:a.static.data[r],c=()=>o()!==void 0;a._asyncData[r]||(a._asyncData[r]={data:k(o()??((l=e.default)==null?void 0:l.call(e))??null),pending:k(!c()),error:k(a.payload._errors[r]?C(a.payload._errors[r]):null)});const i={...a._asyncData[r]};i.refresh=i.execute=(d={})=>{if(a._asyncDataPromises[r]){if(d.dedupe===!1)return a._asyncDataPromises[r];a._asyncDataPromises[r].cancelled=!0}if(d._initial&&c())return o();i.pending.value=!0;const _=new Promise((u,p)=>{try{u(t(a))}catch(w){p(w)}}).then(u=>{if(_.cancelled)return a._asyncDataPromises[r];e.transform&&(u=e.transform(u)),e.pick&&(u=V(u,e.pick)),i.data.value=u,i.error.value=null}).catch(u=>{var p;if(_.cancelled)return a._asyncDataPromises[r];i.error.value=u,i.data.value=S(((p=e.default)==null?void 0:p.call(e))??null)}).finally(()=>{_.cancelled||(i.pending.value=!1,a.payload.data[r]=i.data.value,i.error.value&&(a.payload._errors[r]=C(i.error.value)),delete a._asyncDataPromises[r])});return a._asyncDataPromises[r]=_,a._asyncDataPromises[r]};const f=()=>i.refresh({_initial:!0}),h=e.server!==!1&&a.payload.serverRendered;{const d=L();if(d&&!d._nuxtOnBeforeMountCbs){d._nuxtOnBeforeMountCbs=[];const u=d._nuxtOnBeforeMountCbs;d&&(F(()=>{u.forEach(p=>{p()}),u.splice(0,u.length)}),D(()=>u.splice(0,u.length)))}h&&a.isHydrating&&c()?i.pending.value=!1:d&&(a.payload.serverRendered&&a.isHydrating||e.lazy)&&e.immediate?d._nuxtOnBeforeMountCbs.push(f):e.immediate&&f(),e.watch&&O(e.watch,()=>i.refresh());const _=a.hook("app:data:refresh",u=>{if(!u||u.includes(r))return i.refresh()});d&&D(_)}const y=Promise.resolve(a._asyncDataPromises[r]).then(()=>i);return Object.assign(y,i),y}function V(n,s){const r={};for(const t of s)r[t]=n[t];return r}const G={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function K(n,s={}){s={...G,...s};const r=U(s);return r.dispatch(n),r.toString()}function U(n){const s=[];let r=[];const t=e=>{s.push(e)};return{toString(){return s.join("")},getContext(){return r},dispatch(e){return n.replacer&&(e=n.replacer(e)),this["_"+(e===null?"null":typeof e)](e)},_object(e){const a=/\[object (.*)]/i,o=Object.prototype.toString.call(e),c=a.exec(o),i=c?c[1].toLowerCase():"unknown:["+o.toLowerCase()+"]";let f=null;if((f=r.indexOf(e))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(r.push(e),typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(e))return t("buffer:"),t(e.toString("utf8"));if(i!=="object"&&i!=="function"&&i!=="asyncfunction")if(this["_"+i])this["_"+i](e);else{if(n.ignoreUnknown)return t("["+i+"]");throw new Error('Unknown object type "'+i+'"')}else{let h=Object.keys(e);n.unorderedObjects&&(h=h.sort()),n.respectType!==!1&&!P(e)&&h.splice(0,0,"prototype","__proto__","letructor"),n.excludeKeys&&(h=h.filter(function(y){return!n.excludeKeys(y)})),t("object:"+h.length+":");for(const y of h)this.dispatch(y),t(":"),n.excludeValues||this.dispatch(e[y]),t(",")}},_array(e,a){if(a=typeof a<"u"?a:n.unorderedArrays!==!1,t("array:"+e.length+":"),!a||e.length<=1){for(const i of e)this.dispatch(i);return}const o=[],c=e.map(i=>{const f=U(n);return f.dispatch(i),o.push(f.getContext()),f.toString()});return r=[...r,...o],c.sort(),this._array(c,!1)},_date(e){return t("date:"+e.toJSON())},_symbol(e){return t("symbol:"+e.toString())},_error(e){return t("error:"+e.toString())},_boolean(e){return t("bool:"+e.toString())},_string(e){t("string:"+e.length+":"),t(e.toString())},_function(e){t("fn:"),P(e)?this.dispatch("[native]"):this.dispatch(e.toString()),n.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(e.name)),n.respectFunctionProperties&&this._object(e)},_number(e){return t("number:"+e.toString())},_xml(e){return t("xml:"+e.toString())},_null(){return t("Null")},_undefined(){return t("Undefined")},_regexp(e){return t("regex:"+e.toString())},_uint8array(e){return t("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray(e){return t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array(e){return t("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array(e){return t("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array(e){return t("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array(e){return t("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array(e){return t("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array(e){return t("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array(e){return t("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer(e){return t("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url(e){return t("url:"+e.toString())},_map(e){t("map:");const a=[...e];return this._array(a,n.unorderedSets!==!1)},_set(e){t("set:");const a=[...e];return this._array(a,n.unorderedSets!==!1)},_file(e){return t("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob(){if(n.ignoreUnknown)return t("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return t("domwindow")},_bigint(e){return t("bigint:"+e.toString())},_process(){return t("process")},_timer(){return t("timer")},_pipe(){return t("pipe")},_tcp(){return t("tcp")},_udp(){return t("udp")},_tty(){return t("tty")},_statwatcher(){return t("statwatcher")},_securecontext(){return t("securecontext")},_connection(){return t("connection")},_zlib(){return t("zlib")},_context(){return t("context")},_nodescript(){return t("nodescript")},_httpparser(){return t("httpparser")},_dataview(){return t("dataview")},_signal(){return t("signal")},_fsevent(){return t("fsevent")},_tlswrap(){return t("tlswrap")}}}function P(n){return typeof n!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code]\s+}$/i.exec(Function.prototype.toString.call(n))!=null}class B{constructor(s,r){s=this.words=s||[],this.sigBytes=r!==void 0?r:s.length*4}toString(s){return(s||W).stringify(this)}concat(s){if(this.clamp(),this.sigBytes%4)for(let r=0;r<s.sigBytes;r++){const t=s.words[r>>>2]>>>24-r%4*8&255;this.words[this.sigBytes+r>>>2]|=t<<24-(this.sigBytes+r)%4*8}else for(let r=0;r<s.sigBytes;r+=4)this.words[this.sigBytes+r>>>2]=s.words[r>>>2];return this.sigBytes+=s.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new B([...this.words])}}const W={stringify(n){const s=[];for(let r=0;r<n.sigBytes;r++){const t=n.words[r>>>2]>>>24-r%4*8&255;s.push((t>>>4).toString(16),(t&15).toString(16))}return s.join("")}},I={stringify(n){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=[];for(let t=0;t<n.sigBytes;t+=3){const e=n.words[t>>>2]>>>24-t%4*8&255,a=n.words[t+1>>>2]>>>24-(t+1)%4*8&255,o=n.words[t+2>>>2]>>>24-(t+2)%4*8&255,c=e<<16|a<<8|o;for(let i=0;i<4&&t*8+i*6<n.sigBytes*8;i++)r.push(s.charAt(c>>>6*(3-i)&63))}return r.join("")}},q={parse(n){const s=n.length,r=[];for(let t=0;t<s;t++)r[t>>>2]|=(n.charCodeAt(t)&255)<<24-t%4*8;return new B(r,s)}},J={parse(n){return q.parse(unescape(encodeURIComponent(n)))}};class Z{constructor(){this._minBufferSize=0,this.blockSize=512/32,this.reset()}reset(){this._data=new B,this._nDataBytes=0}_append(s){typeof s=="string"&&(s=J.parse(s)),this._data.concat(s),this._nDataBytes+=s.sigBytes}_doProcessBlock(s,r){}_process(s){let r,t=this._data.sigBytes/(this.blockSize*4);s?t=Math.ceil(t):t=Math.max((t|0)-this._minBufferSize,0);const e=t*this.blockSize,a=Math.min(e*4,this._data.sigBytes);if(e){for(let o=0;o<e;o+=this.blockSize)this._doProcessBlock(this._data.words,o);r=this._data.words.splice(0,e),this._data.sigBytes-=a}return new B(r,a)}}class Q extends Z{update(s){return this._append(s),this._process(),this}finalize(s){s&&this._append(s)}}const X=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],Y=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],b=[];class tt extends Q{constructor(){super(),this.reset()}reset(){super.reset(),this._hash=new B([...X])}_doProcessBlock(s,r){const t=this._hash.words;let e=t[0],a=t[1],o=t[2],c=t[3],i=t[4],f=t[5],h=t[6],y=t[7];for(let l=0;l<64;l++){if(l<16)b[l]=s[r+l]|0;else{const v=b[l-15],m=(v<<25|v>>>7)^(v<<14|v>>>18)^v>>>3,x=b[l-2],j=(x<<15|x>>>17)^(x<<13|x>>>19)^x>>>10;b[l]=m+b[l-7]+j+b[l-16]}const d=i&f^~i&h,_=e&a^e&o^a&o,u=(e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22),p=(i<<26|i>>>6)^(i<<21|i>>>11)^(i<<7|i>>>25),w=y+p+d+Y[l]+b[l],g=u+_;y=h,h=f,f=i,i=c+w|0,c=o,o=a,a=e,e=w+g|0}t[0]=t[0]+e|0,t[1]=t[1]+a|0,t[2]=t[2]+o|0,t[3]=t[3]+c|0,t[4]=t[4]+i|0,t[5]=t[5]+f|0,t[6]=t[6]+h|0,t[7]=t[7]+y|0}finalize(s){super.finalize(s);const r=this._nDataBytes*8,t=this._data.sigBytes*8;return this._data.words[t>>>5]|=128<<24-t%32,this._data.words[(t+64>>>9<<4)+14]=Math.floor(r/4294967296),this._data.words[(t+64>>>9<<4)+15]=r,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function et(n){return new tt().finalize(n).toString(I)}function rt(n,s={}){const r=typeof n=="string"?n:K(n,s);return et(r).slice(0,10)}function nt(n,s,r){const[t={},e]=typeof s=="string"?[{},s]:[s,r],a=t.key||rt([e,S(t.baseURL),typeof n=="string"?n:"",S(t.params||t.query)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!n)throw new Error("[nuxt] [useFetch] request is missing.");const o=a===e?"$f"+a:a,c=H(()=>{let m=n;return typeof m=="function"&&(m=m()),S(m)}),{server:i,lazy:f,default:h,transform:y,pick:l,watch:d,immediate:_,...u}=t,p=M({...u,cache:typeof t.cache=="boolean"?void 0:t.cache}),w={server:i,lazy:f,default:h,transform:y,pick:l,immediate:_,watch:[p,c,...d||[]]};let g;return R(o,()=>{var m;return(m=g==null?void 0:g.abort)==null||m.call(g),g=typeof AbortController<"u"?new AbortController:{},$fetch(c.value,{signal:g.signal,...p})},w)}const ot=(n,s)=>{const r=n.item.elements[s];return r!=null&&r.value&&r.value[0].url||""},ct=(n,s)=>{const r=n.elements[s];return r!=null&&r.value&&r.value[0].url||""},ut=(n,s)=>{const r=n.item.elements[s];return(r==null?void 0:r.value)||""},lt=(n,s)=>{const r=n.elements[s];return(r==null?void 0:r.value)||""},ft=(n,s)=>A(n,s,r=>({text:r.elements._link__link_text.value,url:r.elements._link__url.value,icon:r.elements.icon.value})),ht=(n,s)=>A(n,s,r=>({text:r.elements._link__link_text.value,url:r.elements._link__url.value})),dt=(n,s)=>{var e;const r=(e=n.item.elements[s])==null?void 0:e.value;if(!r||r.length==0)return[];const t=[];return r.forEach(a=>{const o=n.modular_content[a];o&&t.push(o)}),t},yt=(n,s,r)=>{var a;const t=(a=s.elements[r])==null?void 0:a.value;if(!t||t.length==0)return[];const e=[];return t.forEach(o=>{const c=n.modular_content[o];c&&e.push(c)}),e},A=(n,s,r)=>{var a;const t=(a=n.item.elements[s])==null?void 0:a.value;if(!t||t.length==0)return[];const e=[];return t.forEach(o=>{const c=n.modular_content[o];c&&e.push(r(c))}),e},st=(n,s)=>{let t=`${at()}/items/${n}`;return s.length>0&&(t+="?"),s.forEach(e=>{t+=`${e.key}=${e.value}`}),nt(t,"$JdZK3qWIcS")};function at(){const n=T(),s=n.kontent.baseDeliveryApiUrl,r=n.kontent.projectId;return`${s}/${r}`}const z=n=>$(n,()=>{const s=k(Promise.resolve({}));let r=!1;function t(){return r||(s.value=st(n,[{key:"depth",value:20}]).then(e=>e.data.value),r=!0),s.value}return{getContent:t}}),pt=z("home_page"),_t=z("site_settings");export{ct as a,lt as b,dt as c,pt as d,_t as e,ot as f,ht as g,ut as h,ft as i,yt as u};