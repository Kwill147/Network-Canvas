var OrdinalBin=function e(n){var a={};a.options={targetEl:$(".container"),edgeType:"Dyad",variable:{label:"gender_p_t0",values:["Female","Male","Transgender","Don't Know","Won't Answer"]},heading:"Default Heading",subheading:"Default Subheading."},extend(a.options,n);var t,o,i=function(){a.destroy()};return a.destroy=function(){notify("Destroying ordinalBin.",0),window.removeEventListener("changeStageStart",i,!1)},a.init=function(){a.options.targetEl.append("<h1>"+a.options.heading+"</h1>"),a.options.targetEl.append('<p class="lead">'+a.options.subheading+"</p>"),a.options.targetEl.append('<div class="node-bucket"></div>');var e=a.options.variable.values.length;t=$(".container").outerWidth()/e-20,o=$(".container").outerHeight()-300,$.each(a.options.variable.values,function(e,n){var t=$('<div class="ord-node-bin node-bin-static n'+e+'" data-index="'+e+'"><h1>'+n.label+'</h1><p class="lead">(Empty)</p></div>');t.data("index",e),a.options.targetEl.append(t),$(".n"+e).droppable({accept:".draggable",drop:function(n,t){var o=t.draggable,i=$(this);$(o).appendTo(i),$(o).css({position:"",top:"",left:""});var d={};d[a.options.variable.label]=a.options.variable.values[e].value;var r=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,to:$(o).data("node-id"),type:"Dyad"})[0].id;network.updateEdge(r,d),$.each($(".ord-node-bin"),function(e){var n=$(".n"+e).children().length-2;if(n>0){var a="people";1===n&&(a="person"),$(".n"+e+" p").html(n+" "+a+".")}else $(".n"+e+" p").html("(Empty)")});var s=$(".n"+e);setTimeout(function(){s.transition({background:s.data("oldBg")},200,"ease")},0),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1,start:function(){$(".ord-node-bin").css({overflow:"visible"})}})},over:function(){$(this).data("oldBg",$(this).css("background-color")),$(this).stop().transition({background:"rgba(255, 193, 0, 1.0)"},400,"ease")},out:function(){$(this).stop().transition({background:$(this).data("oldBg")},500,"ease")}})}),$(".ord-node-bin").css({width:t,height:o});var n=network.getEdges({from:network.getNodes({type_t0:"Ego"})[0].id,type:a.options.edgeType});$.each(n,function(e,n){if(void 0!==n[a.options.variable.label]&&""!==n[a.options.variable.label]){e="error",$.each(a.options.variable.values,function(t,o){n[a.options.variable.label]===o.value&&(e=t,console.log("found it! "+t))}),$(".n"+e).append('<div class="node-item draggable" data-node-id="'+n.to+'">'+n.nname_t0+"</div>");var t="people",o=$(".n"+e).children().length-2;1===o&&(t="person"),$(".n"+e).children("p").html(0===o?"(Empty)":o+" "+t+".")}else $(".node-bucket").append('<div class="node-item draggable" data-node-id="'+n.to+'">'+n.nname_t0+"</div>")}),$(".draggable").draggable({cursor:"pointer",revert:"invalid",disabled:!1,start:function(){$(".ord-node-bin").css({overflow:"visible"})}}),window.addEventListener("changeStageStart",i,!1)},a.init(),a};