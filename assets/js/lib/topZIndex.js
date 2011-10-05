/*
	TopZIndex 1.1 (September 23, 2009) plugin for jQuery
	http://topzindex.googlecode.com/
	Copyright (c) 2009 Todd Northrop
	http://www.speednet.biz/
	Licensed under GPL 3, see  <http://www.gnu.org/licenses/>
*/
(function(a){a.topZIndex=function(b){return Math.max(0,Math.max.apply(null,a.map(a(b||"body *"),function(d){return parseInt(a(d).css("z-index"))||null})))};a.fn.topZIndex=function(b){if(this.length===0){return this}b=a.extend({increment:1,selector:"body *"},b);var d=a.topZIndex(b.selector),c=b.increment;return this.each(function(){a(this).css("z-index",d+=c)})}})(jQuery);