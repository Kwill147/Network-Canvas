var Menu=function n(t){function e(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}var o={},i=[],s=!1,a=$(".menu-container"),r=!1,c=function(){o.closeMenu()};return o.options={onBeforeOpen:function(){$(".menu-btn").transition({opacity:0}),$(".menu-btn").hide(),$(".black").hide(),$(".arrow-next").transition({marginRight:-550},1e3),$(".arrow-prev").transition({marginLeft:-550},1e3),$(".content").addClass("pushed"),$(".pushed").on("click",c)},onAfterOpen:function(){return!1},onBeforeClose:function(){$(".pushed").off("click",c),$(".content").removeClass("pushed")},onAfterClose:function(){$(".black").show(),$(".arrow-next").transition({marginRight:0},1e3),$(".arrow-prev").transition({marginLeft:0},1e3)}},o.getMenus=function(){return i},o.closeMenu=function(n){n?n.items.find(".icon-close").trigger("click"):$.each(i,function(n){var t="."+i[n].name+"-menu-container";$(t).hasClass("active")&&i[n].items.find(".icon-close").trigger("click")})},o.toggle=function(n){var t=n.button[0].getBoundingClientRect(),e=$("."+n.name+"-menu"),i=$("."+n.name+"-menu-container");if(e.addClass("no-transition"),e[0].style.left="auto",e[0].style.top="auto",s===!0)return!1;if(s=!0,n.expanded===!0)o.options.onBeforeClose(),i.removeClass("active"),setTimeout(o.options.onAfterClose,1e3),s=!1;else{o.options.onBeforeOpen();var a=modifyColor($("."+n.name+"-menu").css("background-color"),-.2);$("body").css({"background-color":a}),i.addClass("active"),setTimeout(o.options.onAfterOpen,500),s=!1}setTimeout(function(){e[0].style.left=t.left+"px",e[0].style.top=t.top+"px",n.expanded===!0?(e.removeClass("no-transition"),i.removeClass("menu-open"),n.expanded=!1,$(".menu-btn").transition({opacity:1})):setTimeout(function(){e.removeClass("no-transition"),i.addClass("menu-open"),n.expanded=!0},25)},25)},o.addMenu=function(n,t){var e={};e.name=n,e.expanded=!1,e.button=$('<span class="hi-icon menu-btn '+n+'" style="opacity:0"></span>'),e.button.addClass(t).html(n),a.append(e.button),e.button.css({top:-300});var s=n+"-menu",c=n+"-menu-container";return e.items=$('<div class="morph-button morph-button-sidebar morph-button-fixed '+c+'"><div class="morph-content '+s+'"><div><div class="content-style-sidebar"><span class="icon icon-close">Close the overlay</span><h2>'+n+"</h2><ul></ul></div></div></div></div>"),e.button.after(e.items),e.button.on("click",function(){o.toggle(e)}),e.items.find(".icon-close").on("click",function(){$(".menu-btn").show(),o.toggle(e)}),i.push(e),r===!0?setTimeout(function(){e.button.transition({top:0,opacity:1},1e3).promise().done(function(){r=!1})},500):(r=!0,e.button.transition({top:0,opacity:1},1e3).promise().done(function(){r=!1})),e},o.removeMenu=function(n){n.button.transition({top:-300,opacity:0},1e3,function(){$(n.button).remove(),$(n.items).remove()})},o.addItem=function(n,t,e,i){var s=$('<li><a class="icon icon-server '+e+'" href="#">'+t+"</a></li>");n.items.find("ul").append(s),s.on("click",function(){$(".paginate").removeAttr("disabled"),o.closeMenu(n),setTimeout(function(){i()},500)})},o.init=function(){notify("Menu initialising.",1),e(o.options,t)},o.init(),o};