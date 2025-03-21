/*! UEditorPlus v2.0.0*/
!function(){function a(){for(var a=$G("tabHeads").children,b=0;b<a.length;b++)domUtils.on(a[b],"click",function(b){var c,d,e=b.target||b.srcElement;for(c=0;c<a.length;c++)d=a[c].getAttribute("data-content-id"),a[c]==e?(domUtils.addClass(a[c],"focus"),domUtils.addClass($G(d),"focus")):(domUtils.removeClasses(a[c],"focus"),domUtils.removeClasses($G(d),"focus"))});r.disableUpload||($G("tabHeads").querySelector('[data-content-id="upload"]').style.display="inline-block"),r.selectCallback&&($G("audioSelect").style.display="inline-block",domUtils.on($G("audioSelect"),"click",function(a){r.selectCallback(editor,function(a){a&&($G("audioUrl").value=a.path,k(a.path))})}))}function b(){g(["audioFloat","upload_alignment"]),i($G("audioUrl")),c(),function(){var a,b=editor.selection.getRange().getClosedNode();if(b&&b.className){var c="edui-faked-audio"==b.className,e=b.className.indexOf("edui-upload-audio")!=-1;if(c||e){$G("audioUrl").value=a=b.getAttribute("_url");var f=domUtils.getComputedStyle(b,"float"),g=domUtils.getComputedStyle(b.parentNode,"text-align");d("center"===g?"center":f)}e&&(q=!0)}k(a)}()}function c(){dialog.onok=function(){$G("preview").innerHTML="";var a=f("tabHeads","tabSrc");switch(a){case"audio":return e();case"upload":return l()}},dialog.oncancel=function(){$G("preview").innerHTML=""}}function d(a){for(var b,c=$G("audioFloat").children,d=0;b=c[d++];)b.getAttribute("name")==a?"focus"!=b.className&&(b.className="focus"):"focus"==b.className&&(b.className="")}function e(){var a=$G("audioUrl").value;f("audioFloat","name");return!!a&&void editor.execCommand("insertaudio",{url:a},q?"upload":null)}function f(a,b){for(var c,d,e=$G(a).children,f=0;d=e[f++];)if("focus"==d.className){c=d.getAttribute(b);break}return c}function g(a){for(var b,c=0;b=a[c++];){var d=$G(b),e={none:lang["default"],left:lang.floatLeft,right:lang.floatRight,center:lang.block};for(var f in e){var g=document.createElement("div");g.setAttribute("name",f),"none"==f&&(g.className="focus"),g.style.cssText="background:url(images/"+f+"_focus.jpg);",g.setAttribute("title",e[f]),d.appendChild(g)}h(b)}}function h(a){for(var b,c=$G(a).children,d=0;b=c[d++];)domUtils.on(b,"click",function(){for(var a,b=0;a=c[b++];)a.className="",a.removeAttribute&&a.removeAttribute("class");this.className="focus"})}function i(a){browser.ie?a.onpropertychange=function(){k(this.value)}:a.addEventListener("input",function(){k(this.value)},!1)}function j(a,b){b=b||{};var c=["<audio",b.id?' id="'+b.id+'"':"",b.cls?' class="'+b.cls+'"':""," controls >",'<source src="'+a+'" type="audio/mpeg" />',"</audio>"];return c.join("")}function k(a){a&&($G("preview").innerHTML='<div class="previewMsg"><span>'+lang.urlError+'</span></div><div style="position: absolute; inset: 0; background: #FFF; text-align: center; display: flex; justify-items: center; align-items: center;"><div style="text-align:center;flex-grow:1;">'+j(a)+"</div></div>")}function l(){var a=[],b=editor.getOpt("audioUrlPrefix"),c=f("upload_alignment","name")||"none";for(var d in p){var e=p[d];a.push({url:b+e.url,align:c})}var g=o.getQueueCount();return g?($(".info","#queueList").html('<span style="color:red;">'+"还有2个未上传文件".replace(/[\d]/,g)+"</span>"),!1):void editor.execCommand("insertaudio",a,"upload")}function m(){o=new n("queueList")}function n(a){this.$wrap=a.constructor==String?$("#"+a):$(a),this.init()}var o,p=[],q=!1,r={};window.onload=function(){r=editor.getOpt("audioConfig"),$focus($G("audioUrl")),a(),b(),m()},n.prototype={init:function(){this.fileList=[],this.initContainer(),this.initUploader()},initContainer:function(){this.$queue=this.$wrap.find(".filelist")},initUploader:function(){function a(a){var b=h('<li id="'+a.id+'"><p class="title">'+a.name+'</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),c=h('<div class="file-panel"><span class="cancel">'+lang.uploadDelete+'</span><span class="rotateRight">'+lang.uploadTurnRight+'</span><span class="rotateLeft">'+lang.uploadTurnLeft+"</span></div>").appendTo(b),d=b.find("p.progress span"),e=b.find("p.imgWrap"),g=h('<p class="error"></p>').hide().appendTo(b),i=function(a){switch(a){case"exceed_size":text=lang.errorExceedSize;break;case"interrupt":text=lang.errorInterrupt;break;case"http":text=lang.errorHttp;break;case"not_allow_type":text=lang.errorFileType;break;default:text=lang.errorUploadRetry}g.text(text).show()};"invalid"===a.getStatus()?i(a.statusText):(e.text(lang.uploadPreview),"|png|jpg|jpeg|bmp|gif|".indexOf("|"+a.ext.toLowerCase()+"|")==-1?e.empty().addClass("notimage").append('<i class="file-preview file-type-'+a.ext.toLowerCase()+'"></i><span class="file-title">'+a.name+"</span>"):browser.ie&&browser.version<=7?e.text(lang.uploadNoPreview):f.makeThumb(a,function(a,b){if(a||!b||/^data:/.test(b)&&browser.ie&&browser.version<=7)e.text(lang.uploadNoPreview);else{var c=h('<img src="'+b+'">');e.empty().append(c),c.on("error",function(){e.text(lang.uploadNoPreview)})}},u,v),x[a.id]=[a.size,0],a.rotation=0,a.ext&&B.indexOf(a.ext.toLowerCase())!=-1||(i("not_allow_type"),f.removeFile(a))),a.on("statuschange",function(e,f){"progress"===f?d.hide().width(0):"queued"===f&&(b.off("mouseenter mouseleave"),c.remove()),"error"===e||"invalid"===e?(i(a.statusText),x[a.id][1]=1):"interrupt"===e?i("interrupt"):"queued"===e?x[a.id][1]=0:"progress"===e&&(g.hide(),d.css("display","block")),b.removeClass("state-"+f).addClass("state-"+e)}),b.on("mouseenter",function(){c.stop().animate({height:30})}),b.on("mouseleave",function(){c.stop().animate({height:0})}),c.on("click","span",function(){var b,c=h(this).index();switch(c){case 0:return void f.removeFile(a);case 1:a.rotation+=90;break;case 2:a.rotation-=90}y?(b="rotate("+a.rotation+"deg)",e.css({"-webkit-transform":b,"-mos-transform":b,"-o-transform":b,transform:b})):e.css("filter","progid:DXImageTransform.Microsoft.BasicImage(rotation="+~~(a.rotation/90%4+4)%4+")")}),b.insertBefore(n)}function b(a){var b=h("#"+a.id);delete x[a.id],c(),b.off().find(".file-panel").off().end().remove()}function c(){var a,b=0,c=0,d=q.children();h.each(x,function(a,d){c+=d[0],b+=d[0]*d[1]}),a=c?b/c:0,d.eq(0).text(Math.round(100*a)+"%"),d.eq(1).css("width",Math.round(100*a)+"%"),e()}function d(a,b){if(a!=w){var c=f.getStats();switch(m.removeClass("state-"+w),m.addClass("state-"+a),a){case"pedding":j.addClass("element-invisible"),k.addClass("element-invisible"),o.removeClass("element-invisible"),q.hide(),l.hide(),f.refresh();break;case"ready":o.addClass("element-invisible"),j.removeClass("element-invisible"),k.removeClass("element-invisible"),q.hide(),l.show(),m.text(lang.uploadStart),f.refresh();break;case"uploading":q.show(),l.hide(),m.text(lang.uploadPause);break;case"paused":q.show(),l.hide(),m.text(lang.uploadContinue);break;case"confirm":if(q.show(),l.hide(),m.text(lang.uploadStart),c=f.getStats(),c.successNum&&!c.uploadFailNum)return void d("finish");break;case"finish":q.hide(),l.show(),c.uploadFailNum?m.text(lang.uploadRetry):m.text(lang.uploadStart)}w=a,e()}g.getQueueCount()?m.removeClass("disabled"):m.addClass("disabled")}function e(){var a,b="";"ready"===w?b=lang.updateStatusReady.replace("_",r).replace("_KB",WebUploader.formatSize(s)):"confirm"===w?(a=f.getStats(),a.uploadFailNum&&(b=lang.updateStatusConfirm.replace("_",a.successNum).replace("_",a.successNum))):(a=f.getStats(),b=lang.updateStatusFinish.replace("_",r).replace("_KB",WebUploader.formatSize(s)).replace("_",a.successNum),a.uploadFailNum&&(b+=lang.updateStatusError.replace("_",a.uploadFailNum))),l.html(b)}var f,g=this,h=jQuery,i=g.$wrap,j=i.find(".filelist"),k=i.find(".statusBar"),l=k.find(".info"),m=i.find(".uploadBtn"),n=(i.find(".filePickerBtn"),i.find(".filePickerBlock")),o=i.find(".placeholder"),q=k.find(".progress").hide(),r=0,s=0,t=window.devicePixelRatio||1,u=113*t,v=113*t,w="",x={},y=function(){var a=document.createElement("p").style,b="transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"OTransition"in a;return a=null,b}(),z=editor.getActionUrl(editor.getOpt("audioActionName")),A=editor.getOpt("audioMaxSize"),B=(editor.getOpt("audioAllowFiles")||[]).join("").replace(/\./g,",").replace(/^[,]/,"");if(!WebUploader.Uploader.support())return void h("#filePickerReady").after(h("<div>").html(lang.errorNotSupport)).hide();if(!editor.getOpt("audioActionName"))return void h("#filePickerReady").after(h("<div>").html(lang.errorLoadConfig)).hide();var C={pick:{id:"#filePickerReady",label:lang.uploadSelectFile},swf:"../../third-party/webuploader/Uploader.swf",server:z,fileVal:editor.getOpt("audioFieldName"),duplicate:!0,fileSingleSizeLimit:A,headers:editor.getOpt("serverHeaders")||{},compress:!1};editor.getOpt("uploadServiceEnable")&&(C.customUpload=function(a,b){editor.getOpt("uploadServiceUpload")("audio",a,{success:function(c){b.onSuccess(a,{_raw:JSON.stringify(c)})},error:function(c){b.onError(a,c)},progress:function(c){b.onProgress(a,c)}},{from:"audio"})}),f=g.uploader=WebUploader.create(C),f.addButton({id:"#filePickerBlock"}),f.addButton({id:"#filePickerBtn",label:lang.uploadAddFile}),d("pedding"),f.on("fileQueued",function(b){r++,s+=b.size,1===r&&(o.addClass("element-invisible"),k.show()),a(b)}),f.on("fileDequeued",function(a){r--,s-=a.size,b(a),c()}),f.on("filesQueued",function(a){f.isInProgress()||"pedding"!=w&&"finish"!=w&&"confirm"!=w&&"ready"!=w||d("ready"),c()}),f.on("all",function(a,b){switch(a){case"uploadFinished":d("confirm",b);break;case"startUpload":var c=utils.serializeParam(editor.queryCommandValue("serverparam"))||"",e=utils.formatUrl(z+(z.indexOf("?")==-1?"?":"&")+"encode=utf-8&"+c);f.option("server",e),d("uploading",b);break;case"stopUpload":d("paused",b)}}),f.on("uploadBeforeSend",function(a,b,c){z.toLowerCase().indexOf("jsp")!=-1&&(c.X_Requested_With="XMLHttpRequest")}),f.on("uploadProgress",function(a,b){var d=h("#"+a.id),e=d.find(".progress span");e.css("width",100*b+"%"),x[a.id][1]=b,c()}),f.on("uploadSuccess",function(a,b){var c=h("#"+a.id);try{var d=b._raw||b,e=utils.str2json(d);e=editor.getOpt("serverResponsePrepare")(e),"SUCCESS"==e.state?(p.push({url:e.url,type:e.type,original:e.original}),c.append('<span class="success"></span>')):c.find(".error").text(e.state).show()}catch(f){c.find(".error").text(lang.errorServerUpload).show()}}),f.on("uploadError",function(a,b){}),f.on("error",function(a,b,c){"F_EXCEED_SIZE"===a?editor.getOpt("tipError")(lang.errorExceedSize+" "+(b/1024/1024).toFixed(1)+"MB"):console.log("error",a,b,c)}),f.on("uploadComplete",function(a,b){}),m.on("click",function(){return!h(this).hasClass("disabled")&&void("ready"===w?f.upload():"paused"===w?f.upload():"uploading"===w&&f.stop())}),m.addClass("state-"+w),c()},getQueueCount:function(){var a,b,c,d=0,e=this.uploader.getFiles();for(b=0;a=e[b++];)c=a.getStatus(),"queued"!=c&&"uploading"!=c&&"progress"!=c||d++;return d},refresh:function(){this.uploader.refresh()}}}();