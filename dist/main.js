(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){t(1,arguments);var r=e(n);return!isNaN(r)}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var i,o={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var s=t.defaultWidth,u=a.width?String(a.width):t.defaultWidth;r=t.values[u]||t.values[s]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function c(t){return function(e,n){var r=String(e),a=n||{},i=a.width,o=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],s=r.match(o);if(!s)return null;var u,c=s[0],d=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),u=t.valueCallback?t.valueCallback(u):u,{value:u=a.valueCallback?a.valueCallback(u):u,rest:r.slice(c.length)}}}const d={code:"en-US",formatDistance:function(t,e,n){var a;return n=n||{},a="string"==typeof r[t]?r[t]:1===e?r[t].one:r[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:o,formatRelative:function(t,e,n,r){return s[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(i.matchPattern);if(!a)return null;var o=a[0],s=n.match(i.parsePattern);if(!s)return null;var u=i.valueCallback?i.valueCallback(s[0]):s[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(o.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function m(n,r){t(2,arguments);var a=e(n).getTime(),i=l(r);return new Date(a+i)}function h(e,n){t(2,arguments);var r=l(n);return m(e,-r)}function f(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const g=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return f("yy"===e?r%100:r,e.length)},w=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):f(n+1,2)},b=function(t,e){return f(t.getUTCDate(),e.length)},y=function(t,e){return f(t.getUTCHours()%12||12,e.length)},p=function(t,e){return f(t.getUTCHours(),e.length)},v=function(t,e){return f(t.getUTCMinutes(),e.length)},T=function(t,e){return f(t.getUTCSeconds(),e.length)},k=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return f(Math.floor(r*Math.pow(10,n-3)),e.length)};var M=864e5;function P(n){t(1,arguments);var r=1,a=e(n),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function C(n){t(1,arguments);var r=e(n),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=P(i),s=new Date(0);s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0);var u=P(s);return r.getTime()>=o.getTime()?a+1:r.getTime()>=u.getTime()?a:a-1}function D(e){t(1,arguments);var n=C(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=P(r);return a}var x=6048e5;function j(n,r){t(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,s=null==o?0:l(o),u=null==a.weekStartsOn?s:l(a.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=e(n),d=c.getUTCDay(),m=(d<u?7:0)+d-u;return c.setUTCDate(c.getUTCDate()-m),c.setUTCHours(0,0,0,0),c}function E(n,r){t(1,arguments);var a=e(n,r),i=a.getUTCFullYear(),o=r||{},s=o.locale,u=s&&s.options&&s.options.firstWeekContainsDate,c=null==u?1:l(u),d=null==o.firstWeekContainsDate?c:l(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=new Date(0);m.setUTCFullYear(i+1,0,d),m.setUTCHours(0,0,0,0);var h=j(m,r),f=new Date(0);f.setUTCFullYear(i,0,d),f.setUTCHours(0,0,0,0);var g=j(f,r);return a.getTime()>=h.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function S(e,n){t(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:l(i),s=null==r.firstWeekContainsDate?o:l(r.firstWeekContainsDate),u=E(e,n),c=new Date(0);c.setUTCFullYear(u,0,s),c.setUTCHours(0,0,0,0);var d=j(c,n);return d}var L=6048e5;function U(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+f(i,2)}function W(t,e){return t%60==0?(t>0?"-":"+")+f(Math.abs(t)/60,2):N(t,e)}function N(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+f(Math.floor(a/60),2)+n+f(a%60,2)}const Y={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return g(t,e)},Y:function(t,e,n,r){var a=E(t,r),i=a>0?a:1-a;return"YY"===e?f(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):f(i,e.length)},R:function(t,e){return f(C(t),e.length)},u:function(t,e){return f(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return f(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return f(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return w(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return f(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,i){var o=function(n,r){t(1,arguments);var a=e(n),i=j(a,r).getTime()-S(a,r).getTime();return Math.round(i/L)+1}(n,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):f(o,r.length)},I:function(n,r,a){var i=function(n){t(1,arguments);var r=e(n),a=P(r).getTime()-D(r).getTime();return Math.round(a/x)+1}(n);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):f(i,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):b(t,e)},D:function(n,r,a){var i=function(n){t(1,arguments);var r=e(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/M)+1}(n);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):f(i,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return f(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return f(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return f(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return y(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):p(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):f(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):f(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):v(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):T(t,e)},S:function(t,e){return k(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return W(a);case"XXXX":case"XX":return N(a);case"XXXXX":case"XXX":default:return N(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return W(a);case"xxxx":case"xx":return N(a);case"xxxxx":case"xxx":default:return N(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+U(a,":");case"OOOO":default:return"GMT"+N(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+U(a,":");case"zzzz":default:return"GMT"+N(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return f(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return f((r._originalDate||t).getTime(),e.length)}};function I(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function B(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const O={p:B,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return I(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",I(a,e)).replace("{{time}}",B(i,e))}};function q(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var H=["D","DD"],F=["YY","YYYY"];function z(t){return-1!==H.indexOf(t)}function X(t){return-1!==F.indexOf(t)}function Q(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var A=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,G=/^'([^]*?)'?$/,R=/''/g,J=/[a-zA-Z]/;function _(r,a,i){t(2,arguments);var o=String(a),s=i||{},u=s.locale||d,c=u.options&&u.options.firstWeekContainsDate,m=null==c?1:l(c),f=null==s.firstWeekContainsDate?m:l(s.firstWeekContainsDate);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=u.options&&u.options.weekStartsOn,w=null==g?0:l(g),b=null==s.weekStartsOn?w:l(s.weekStartsOn);if(!(b>=0&&b<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var y=e(r);if(!n(y))throw new RangeError("Invalid time value");var p=q(y),v=h(y,p),T={firstWeekContainsDate:f,weekStartsOn:b,locale:u,_originalDate:y},k=o.match($).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,O[e])(t,u.formatLong,T):t})).join("").match(A).map((function(t){if("''"===t)return"'";var e=t[0];if("'"===e)return K(t);var n=Y[e];if(n)return!s.useAdditionalWeekYearTokens&&X(t)&&Q(t,a,r),!s.useAdditionalDayOfYearTokens&&z(t)&&Q(t,a,r),n(v,t,u.localize,T);if(e.match(J))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return t})).join("");return k}function K(t){return t.match(G)[1].replace(R,"'")}function V(t,e){return{projectID:t,projectName:e}}const Z=function(){const t=[],e=[],n=(_(new Date,"y-MM-dd"),V("PROJ_today","Today"));return t.push(n),{getProjectsLibrary:()=>t,getTasksLibrary:()=>e,createProject:function(n){""===n&&(n="New Project");const r="PROJ_"+Math.random().toString(36).substr(2,9),a=n,i=("",s=r,"Default Task",u="2021-06-15","medium",!1,c=!1,o="TASK_"+Math.random().toString(36).substr(2,9),u===_(new Date,"y-MM-dd")&&(c=!0),{taskID:o,parentProjectID:s,taskName:"Default Task",dueDate:u,priority:"medium",isTaskDone:false,isToday:c});var o,s,u,c;const d=V(r,a);t.push(d),e.push(i)},editTask:function(t,e,n,r){t.taskName=e,t.priority=n,t.dueDate=r}}}();(function(){const t={todayProjectsList:document.getElementById("today-projects-list"),allProjectsList:document.getElementById("all-projects-list"),addProjectBtn:document.getElementById("add-project-btn"),newProjectNameInput:document.getElementById("project-name-input"),createProjectBtn:document.getElementById("create-project-btn"),addProjectForm:document.getElementById("add-project-form"),allProjectTitles:document.querySelectorAll(".projects-list-item"),projectTitle:document.getElementById("project-title"),tasksList:document.getElementById("tasks-list"),taskTitleInput:document.getElementById("task-title-input"),taskPrioritySelect:document.getElementById("task-priority-select"),taskDateDueInput:document.getElementById("task-date-due"),addTaskBtn:document.getElementById("add-task-btn"),allEdiTaskBtns:document.querySelectorAll(".edit-btn")},e=(t.addProjectBtn.addEventListener("click",(function(){t.addProjectForm.classList.remove("hide"),t.addProjectForm.classList.add("flex-column")})),t.createProjectBtn.addEventListener("click",(function(){const e=t.newProjectNameInput.value;Z.createProject(e),n()})),void t.addTaskBtn.addEventListener("click",(function(){})));function n(){t.allProjectsList.innerHTML="",Z.getProjectsLibrary().length?Z.getProjectsLibrary().forEach((e=>{const n=document.createElement("li");n.classList.add("projects-list-item"),n.dataset.projectId=e.projectID,n.innerHTML=`<h4 class="project-name">\n                                        ${e.projectName}</h4>`,n.addEventListener("click",(function(){r(this.dataset.projectId)}));const a=document.createElement("button");a.classList.add("material-icons","delete-btn"),a.innerText="delete",a.dataset.deleteProjectID=e.projectID,n.appendChild(a),t.allProjectsList.appendChild(n)})):t.allProjectsList.innerHTML='<h4 class="project-name">Create your First Project</h4>'}function r(e){const n=e,r=Z.getProjectsLibrary().find((t=>t.projectID===n));t.projectTitle.innerText=r.projectName,function(e){t.tasksList.innerHTML="",Z.getTasksLibrary().forEach((n=>{if(n.parentProjectID===e||"PROJ_today"===e&&n.isToday){const e=document.createElement("li"),r=Z.getTasksLibrary().indexOf(n);console.log(Z.getTasksLibrary()),e.classList.add("task"),e.dataset.parentProjectId=n.parentProjectID,e.dataset.taskId=n.taskID,e.innerHTML=`<div class="task-description">\n        \n               <input type="checkbox" id="box-${r}">\n               <label for="box-${r}">${n.taskName}</label>\n             </div>\n             <div class="task-controls">\n             <span class="priority">Priority: ${n.priority} </span> \n               <span>${_(new Date(n.dueDate),"dd/MM/y")}</span>\n               <button class="material-icons edit-btn" id="edit-task-${n.taskID}">edit</button><button class="material-icons delete-btn id="delete-task-${n.taskID}">delete</button>\n             </div>`,t.tasksList.appendChild(e),document.querySelectorAll(".edit-btn").forEach((t=>{t.addEventListener("click",a)}))}}))}(n)}function a(e){const n=e.target.id.substring(e.target.id.length-14);console.log(n);const a=t.tasksList,i=document.createElement("li");i.classList.add("task-edit");const o=`<label for="${n}-title-input">Task name:</label>\n    <input type="text" class="task-title-input" name="${n}-title-input" id="${n}-title-input"></input>\n    <label for="${n}-priority-select">Priority:</label>\n    <select name="priority-list" id="${n}-priority-select" class="priority-list">\n        <option value="high" selected="selected">High</option>\n        <option value="medium">Medium</option>\n        <option value="low">Low</option>\n      </select>\n\n    <label for="${n}-date-due">Due:</label>\n    <input type="date" class="date" name="${n}-date-due" id="${n}-date-due"></input>\n    \n  <button id="edit-${n}-btn">Apply</button>`;i.innerHTML=o,a.insertBefore(i,a.firstElementChild.nextSibling),document.getElementById(`edit-${n}-btn`).addEventListener("click",(function(){const t=Z.getTasksLibrary().find((t=>t.taskID===n)),e=document.getElementById(n+"-title-input").value,a=document.getElementById(n+"-priority-select").value,i=document.getElementById(n+"-date-due").value;Z.editTask(t,e,a,i),r(t.parentProjectID)}))}return{DOMElements:t,eventListeners:e,renderSidebar:n}})().renderSidebar()})();