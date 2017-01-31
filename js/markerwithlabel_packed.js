function inherits(a,c){function d(){}d.prototype=c.prototype;a.superClass_=c.prototype;a.prototype=new d;a.prototype.constructor=a}
function MarkerLabel_(a,c,d){this.marker_=a;this.handCursorURL_=a.handCursorURL;this.labelDiv_=document.createElement("div");this.labelDiv_.style.cssText="position: absolute; overflow: hidden;";this.eventDiv_=document.createElement("div");this.eventDiv_.style.cssText=this.labelDiv_.style.cssText;this.eventDiv_.setAttribute("onselectstart","return false;");this.eventDiv_.setAttribute("ondragstart","return false;");this.crossDiv_=MarkerLabel_.getSharedCross(c)}inherits(MarkerLabel_,google.maps.OverlayView);
MarkerLabel_.getSharedCross=function(a){var c;"undefined"===typeof MarkerLabel_.getSharedCross.crossDiv&&(c=document.createElement("img"),c.style.cssText="position: absolute; z-index: 1000002; display: none;",c.style.marginLeft="-8px",c.style.marginTop="-9px",c.src=a,MarkerLabel_.getSharedCross.crossDiv=c);return MarkerLabel_.getSharedCross.crossDiv};
MarkerLabel_.prototype.onAdd=function(){var a=this,c=!1,d=!1,k,l,m,h,f,n,p,q="url("+this.handCursorURL_+")",g=function(a){a.preventDefault&&a.preventDefault();a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()},r=function(){a.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_);this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_);"undefined"===typeof MarkerLabel_.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),MarkerLabel_.getSharedCross.processed=
!0);this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(b){if(a.marker_.getDraggable()||a.marker_.getClickable())this.style.cursor="pointer",google.maps.event.trigger(a.marker_,"mouseover",b)}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(b){!a.marker_.getDraggable()&&!a.marker_.getClickable()||d||(this.style.cursor=a.marker_.getCursor(),google.maps.event.trigger(a.marker_,"mouseout",b))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",
function(b){d=!1;a.marker_.getDraggable()&&(c=!0,this.style.cursor=q);if(a.marker_.getDraggable()||a.marker_.getClickable())google.maps.event.trigger(a.marker_,"mousedown",b),g(b)}),google.maps.event.addDomListener(document,"mouseup",function(b){var e;c&&(c=!1,a.eventDiv_.style.cursor="pointer",google.maps.event.trigger(a.marker_,"mouseup",b));if(d){if(f){e=a.getProjection().fromLatLngToDivPixel(a.marker_.getPosition());e.y+=20;a.marker_.setPosition(a.getProjection().fromDivPixelToLatLng(e));try{a.marker_.setAnimation(google.maps.Animation.BOUNCE),
setTimeout(r,1406)}catch(g){}}a.crossDiv_.style.display="none";a.marker_.setZIndex(k);h=!0;d=!1;b.latLng=a.marker_.getPosition();google.maps.event.trigger(a.marker_,"dragend",b)}}),google.maps.event.addListener(a.marker_.getMap(),"mousemove",function(b){var e;c&&(d?(b.latLng=new google.maps.LatLng(b.latLng.lat()-l,b.latLng.lng()-m),e=a.getProjection().fromLatLngToDivPixel(b.latLng),f&&(a.crossDiv_.style.left=e.x+"px",a.crossDiv_.style.top=e.y+"px",a.crossDiv_.style.display="",e.y-=20),a.marker_.setPosition(a.getProjection().fromDivPixelToLatLng(e)),
f&&(a.eventDiv_.style.top=e.y+20+"px"),google.maps.event.trigger(a.marker_,"drag",b)):(l=b.latLng.lat()-a.marker_.getPosition().lat(),m=b.latLng.lng()-a.marker_.getPosition().lng(),k=a.marker_.getZIndex(),n=a.marker_.getPosition(),p=a.marker_.getMap().getCenter(),f=a.marker_.get("raiseOnDrag"),d=!0,a.marker_.setZIndex(1E6),b.latLng=a.marker_.getPosition(),google.maps.event.trigger(a.marker_,"dragstart",b)))}),google.maps.event.addDomListener(document,"keydown",function(b){d&&27===b.keyCode&&(f=!1,
a.marker_.setPosition(n),a.marker_.getMap().setCenter(p),google.maps.event.trigger(document,"mouseup",b))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(b){if(a.marker_.getDraggable()||a.marker_.getClickable())h?h=!1:(google.maps.event.trigger(a.marker_,"click",b),g(b))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(b){if(a.marker_.getDraggable()||a.marker_.getClickable())google.maps.event.trigger(a.marker_,"dblclick",b),g(b)}),google.maps.event.addListener(this.marker_,
"dragstart",function(a){d||(f=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(b){!d&&f&&(a.setPosition(20),a.labelDiv_.style.zIndex=1E6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(b){d||f&&a.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){a.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){a.setZIndex()}),google.maps.event.addListener(this.marker_,
"visible_changed",function(){a.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){a.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){a.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){a.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){a.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){a.setStyles()}),
google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){a.setStyles()})]};MarkerLabel_.prototype.onRemove=function(){var a;this.labelDiv_.parentNode.removeChild(this.labelDiv_);this.eventDiv_.parentNode.removeChild(this.eventDiv_);for(a=0;a<this.listeners_.length;a++)google.maps.event.removeListener(this.listeners_[a])};MarkerLabel_.prototype.draw=function(){this.setContent();this.setTitle();this.setStyles()};
MarkerLabel_.prototype.setContent=function(){var a=this.marker_.get("labelContent");"undefined"===typeof a.nodeType?(this.labelDiv_.innerHTML=a,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(a),a=a.cloneNode(!0),this.eventDiv_.innerHTML="",this.eventDiv_.appendChild(a))};MarkerLabel_.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""};
MarkerLabel_.prototype.setStyles=function(){var a,c;this.labelDiv_.className=this.marker_.get("labelClass");this.eventDiv_.className=this.labelDiv_.className;this.labelDiv_.style.cssText="";this.eventDiv_.style.cssText="";c=this.marker_.get("labelStyle");for(a in c)c.hasOwnProperty(a)&&(this.labelDiv_.style[a]=c[a],this.eventDiv_.style[a]=c[a]);this.setMandatoryStyles()};
MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute";this.labelDiv_.style.overflow="hidden";"undefined"!==typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")");this.eventDiv_.style.position=this.labelDiv_.style.position;this.eventDiv_.style.overflow=
this.labelDiv_.style.overflow;this.eventDiv_.style.opacity=.01;this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"';this.eventDiv_.style.filter="alpha(opacity=1)";this.setAnchor();this.setPosition();this.setVisible()};MarkerLabel_.prototype.setAnchor=function(){var a=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-a.x+"px";this.labelDiv_.style.marginTop=-a.y+"px";this.eventDiv_.style.marginLeft=-a.x+"px";this.eventDiv_.style.marginTop=-a.y+"px"};
MarkerLabel_.prototype.setPosition=function(a){var c=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"===typeof a&&(a=0);this.labelDiv_.style.left=Math.round(c.x)+"px";this.labelDiv_.style.top=Math.round(c.y-a)+"px";this.eventDiv_.style.left=this.labelDiv_.style.left;this.eventDiv_.style.top=this.labelDiv_.style.top;this.setZIndex()};
MarkerLabel_.prototype.setZIndex=function(){var a=this.marker_.get("labelInBackground")?-1:1;"undefined"===typeof this.marker_.getZIndex()?this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+a:this.labelDiv_.style.zIndex=this.marker_.getZIndex()+a;this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex};
MarkerLabel_.prototype.setVisible=function(){this.marker_.get("labelVisible")?this.labelDiv_.style.display=this.marker_.getVisible()?"block":"none":this.labelDiv_.style.display="none";this.eventDiv_.style.display=this.labelDiv_.style.display};
function MarkerWithLabel(a){a=a||{};a.labelContent=a.labelContent||"";a.labelAnchor=a.labelAnchor||new google.maps.Point(0,0);a.labelClass=a.labelClass||"markerLabels";a.labelStyle=a.labelStyle||{};a.labelInBackground=a.labelInBackground||!1;"undefined"===typeof a.labelVisible&&(a.labelVisible=!0);"undefined"===typeof a.raiseOnDrag&&(a.raiseOnDrag=!0);"undefined"===typeof a.clickable&&(a.clickable=!0);"undefined"===typeof a.draggable&&(a.draggable=!1);"undefined"===typeof a.optimized&&(a.optimized=
!1);a.crossImage=a.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";a.handCursor=a.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";a.optimized=!1;this.label=new MarkerLabel_(this,a.crossImage,a.handCursor);google.maps.Marker.apply(this,arguments)}inherits(MarkerWithLabel,google.maps.Marker);
MarkerWithLabel.prototype.setMap=function(a){google.maps.Marker.prototype.setMap.apply(this,arguments);this.label.setMap(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=MarkerWithLabel),exports._=_):root._=_;
