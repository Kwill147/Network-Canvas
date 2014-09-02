"use strict";var NetworkCanvas=function e(t){function n(e,t,n){for(;1.001*e.width()<t.width()-2*n;)e.fontSize(1.001*e.fontSize()),e.y((t.height()-e.height())/2),e.width(t.width()),e.height(t.height())}var i,o,r,a,d,s={},c=[],l=!1,h=!1,u={blue:"#0174DF",placidblue:"#83b5dd",violettulip:"#9B90C8",hemlock:"#9eccb3",paloma:"#aab1b0",freesia:"#ffd600",cayenne:"#c40000",celosiaorange:"#f47d44",sand:"#ceb48d",dazzlingblue:"#006bb6",edge:"#bbb",selected:"gold"},f={defaultNodeSize:40,defaultNodeColor:u.blue,defaultEdgeColor:u.edge,concentricCircleColor:"#ffffff",concentricCircleNumber:4,nodeTypes:[{name:"Person",color:u.blue},{name:"OnlinePerson",color:u.hemlock},{name:"Organisation",color:u.cayenne},{name:"Professional",color:u.violettulip}]},y=["Barney","Jonathon","Myles","Alethia","Tammera","Veola","Meredith","Renee","Grisel","Celestina","Fausto","Eliana","Raymundo","Lyle","Carry","Kittie","Melonie","Elke","Mattie","Kieth","Lourie","Marcie","Trinity","Librada","Lloyd","Pearlie","Velvet","Stephan","Hildegard","Winfred","Tempie","Maybelle","Melynda","Tiera","Lisbeth","Kiera","Gaye","Edra","Karissa","Manda","Ethelene","Michelle","Pamella","Jospeh","Tonette","Maren","Aundrea","Madelene","Epifania","Olive"];return s.init=function(){s.initKinetic(),s.drawUIComponents(),extend(f,t),window.addEventListener("nodeAdded",function(e){s.addNode(e.details)},!1)},s.addNode=function(e){var t,i=Math.round(randomBetween(0,f.nodeTypes.length-1)),o=window.nodes.length+1,d={coords:[$(window).width()+50,100],id:o,label:y[Math.round(randomBetween(0,y.length-1))],size:f.defaultNodeSize,type:f.nodeTypes[i].name,color:f.nodeTypes[i].color,strokeWidth:4};extend(d,e),d.id=parseInt(d.id,10),d.type="Person";var l=new Kinetic.Group({id:d.id,x:d.coords[0],y:d.coords[1],name:d.label,edges:[],type:d.type,draggable:!0,dragDistance:10});switch(d.type){case"Person":t=new Kinetic.Circle({radius:d.size,fill:d.color,stroke:s.calculateStrokeColor(d.color),strokeWidth:d.strokeWidth});break;case"Organisation":t=new Kinetic.Rect({width:2*d.size,height:2*d.size,fill:d.color,stroke:s.calculateStrokeColor(d.color),strokeWidth:d.strokeWidth});break;case"OnlinePerson":t=new Kinetic.RegularPolygon({sides:3,fill:d.color,radius:1.2*d.size,stroke:s.calculateStrokeColor(d.color),strokeWidth:d.strokeWidth});break;case"Professional":t=new Kinetic.Star({numPoints:6,fill:d.color,innerRadius:d.size-d.size/3,outerRadius:d.size+d.size/3,stroke:s.calculateStrokeColor(d.color),strokeWidth:d.strokeWidth})}var h=new Kinetic.Text({text:d.label,fontFamily:"Lato",fill:"white",align:"center",fontStyle:500});if(notify("Putting node "+d.label+" at coordinates x:"+d.coords[0]+", y:"+d.coords[1],2),l.on("dragstart",function(){notify("dragstart",2),this.attrs.oldx=this.attrs.x,this.attrs.oldy=this.attrs.y,this.moveToTop(),a.draw()}),l.on("dragmove",function(){notify("Dragmove",2);var e=this;$.each(r.children,function(t,n){if(n.attrs.from===e||n.attrs.to===e){var i=[n.attrs.from.attrs.x,n.attrs.from.attrs.y,n.attrs.to.attrs.x,n.attrs.to.attrs.y];n.attrs.points=i}}),r.draw()}),l.on("tap click",function(){var e=new CustomEvent("log",{detail:{eventType:"nodeClick",eventObject:this.attrs.id}});window.dispatchEvent(e),this.moveToTop(),a.draw()}),l.on("dbltap dblclick",function(){notify("double tap",2),c.push(this),2===c.length?(s.addEdge(c[0],c[1])||s.removeEdge(c[0],c[1]),c[0].children[0].stroke(s.calculateStrokeColor(s.getNodeColorByType(c[0].attrs.type))),c[1].children[0].stroke(s.calculateStrokeColor(s.getNodeColorByType(c[1].attrs.type))),c=[],a.draw()):(this.children[0].stroke(u.selected),a.draw())}),l.on("dragend",function(){notify("dragend",2);var e={},t={};e.x=this.attrs.oldx,e.y=this.attrs.oldy,t.x=this.attrs.x,t.y=this.attrs.y;var n={from:e,to:t},i=this,o=new CustomEvent("log",{detail:{eventType:"nodeMove",eventObject:n}});window.dispatchEvent(o);var r=session.returnData("nodes");$.each(r,function(e,t){t.id===i.attrs.id&&(t.coords=[i.attrs.x,i.attrs.y],t.type=i.attrs.type,t.color=i.attrs.color)}),session.addData("nodes",r,!1),delete this.attrs.oldx,delete this.attrs.oldy}),n(h,t,10),l.add(t),l.add(h),a.add(l),l.moveToBottom(),a.draw(),!d.coords){var w=new Kinetic.Tween({node:l,x:$(window).width()-150,y:100,duration:.7,easing:Kinetic.Easings.EaseOut});w.play()}return l},s.addEdge=function(e,t){var n=!1,i,o,d;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t?(i=e,o=t):(i=this.getNodeByID(e),o=this.getNodeByID(t)),r.children.length>0&&$.each(r.children,function(e,t){(t.attrs.from===i&&t.attrs.to===o||t.attrs.to===i&&t.attrs.from===o)&&(d=t,n=!0)}),n)return!1;var c=[i.attrs.x,i.attrs.y,o.attrs.x,o.attrs.y],l=new Kinetic.Line({strokeWidth:2,opacity:.5,stroke:f.defaultEdgeColor,from:i,to:o,points:c});r.add(l),r.draw(),a.draw(),notify("Created Edge between "+i.children[1].attrs.text+" and "+o.children[1].attrs.text,"success",2);var h=s.getSimpleEdge(r.children.length-1),u=new CustomEvent("log",{detail:{eventType:"createEdge",eventObject:h}});return window.dispatchEvent(u),!0},s.removeEdge=function(e){notify("Removing edge."),$.each(r.children,function(t,n){n===e&&(r.children[t].remove(),r.draw())})},s.calculateStrokeColor=function(e){return modifyColor(e,15)},s.clearGraph=function(){r.removeChildren(),r.clear(),a.removeChildren(),a.clear()},s.initKinetic=function(){i=new Kinetic.Stage({container:"kineticCanvas",width:window.innerWidth,height:window.innerHeight}),o=new Kinetic.Layer,a=new Kinetic.Layer,r=new Kinetic.Layer,d=new Kinetic.Layer,i.add(o),i.add(r),i.add(a),i.add(d),notify("Kinetic stage initialised.",1)},s.drawUIComponents=function(){for(var e,t,n=f.concentricCircleColor,i=window.innerHeight-2*f.defaultNodeSize,r=.1,a=0;a<f.concentricCircleNumber;a++){var c=1-a/f.concentricCircleNumber,l=i/2*c;t=new Kinetic.Circle({x:window.innerWidth/2,y:window.innerHeight/2,radius:l,stroke:"white",strokeWidth:1.5,opacity:0}),e=new Kinetic.Circle({x:window.innerWidth/2,y:window.innerHeight/2,radius:l,fill:n,opacity:r,strokeWidth:0}),r+=(.3-r)/f.concentricCircleNumber,o.add(e),o.add(t)}var h=new Kinetic.Circle({radius:50,stroke:"#666",strokeWidth:0,y:window.innerHeight-100,x:100});h.on("click tap",function(){}),d.add(h),o.draw(),d.draw(),s.initNewNodeForm(),notify("User interface initialised.",1)},s.initNewNodeForm=function(){var e=$('<div class="new-node-form"></div>'),t=$('<div class="new-node-inner"></div>');e.append(t),t.append("<h1>Add a new contact</h1>"),t.append("<p>Some text accompanying the node creation box.</p>"),t.append('<input type="text" class="form-control name-box"></input>'),$(".content").after(e),$(document).on("keypress",function(e){if(!h&&(l||($(".new-node-form").addClass("node-form-open"),$(".content").addClass("blurry"),l=!0,$(".name-box").focus()),8!==e.which||$(e.target).is("input, textarea, div")||e.preventDefault(),13===event.which)){$(".new-node-form").removeClass("node-form-open"),$(".content").removeClass("blurry"),l=!1;var t={label:$(".name-box").val()};s.addNode(t),$(".name-box").val("")}})},s.getKineticNodes=function(){return a.children},s.getKineticEdges=function(){return r.children},s.getSimpleNodes=function(){var e={},t=s.getKineticNodes();return $.each(t,function(t,n){e[n.attrs.id]={},e[n.attrs.id].x=n.attrs.x,e[n.attrs.id].y=n.attrs.y,e[n.attrs.id].name=n.attrs.name,e[n.attrs.id].type=n.attrs.type,e[n.attrs.id].size=n.attrs.size,e[n.attrs.id].color=n.attrs.color}),e},s.getSimpleEdges=function(){var e={},t=0;return $.each(r.children,function(n,i){e[t]={},e[t].from=i.attrs.from.attrs.id,e[t].to=i.attrs.to.attrs.id,t++}),e},s.getSimpleEdge=function(e){var t=s.getSimpleEdges();if(!e)return!1;var n=t[e];return n},s.getEdgeLayer=function(){return r},s.getNodeByID=function(e){var t={},n=s.getKineticNodes();return $.each(n,function(n,i){i.attrs.id===e&&(t=i)}),t},s.getNodeColorByType=function(e){var t=null;return $.each(f.nodeTypes,function(n,i){i.name===e&&(t=i.color)}),t?t:!1},s.init(),s};
//# sourceMappingURL=./NetworkCanvas-min.map