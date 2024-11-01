
visualMCE = {
    popup: false,

    parentNames: {
    	closest: visualmceTranslated.element,
    	closestParent: visualmceTranslated.parent
    },

    findParent: {
    	closest: function(){
    		return tinymce.activeEditor.selection.getNode();
    	},
    	closestParent: function(){
    		return tinymce.activeEditor.selection.getNode().parentNode;
    	}
    },

	getParent: function(checked){
			var findParent = visualMCE.findParent[checked];
			return findParent();
		},
    parentByClass: function(IDstring){
            e=tinymce.activeEditor.selection.getNode();
            return this.getParentByClass(IDstring, e);
        },

    getParentByClass: function(IDstring, e){
        	var	mceWindow=tinyMCE.activeEditor.contentWindow;
        	var mceDoc=mceWindow.document;
        	var IDregex = new RegExp(IDstring);
        	while(!IDregex.test(e.getAttribute('class')) && e!=mceDoc.body){
        		e=e.parentNode;
        	}
        	if(e==mceDoc.body){return undefined;}
            return e;
        },

    loadPopup: function(popupInnerHTML, event, name){
			if(!this.popup){
				this.popup=document.createElement('div');
				this.popup.setAttribute('id', 'drag-popup');
				this.popup.setAttribute('class', 'drag-popup visualmods-popup');
				this.popup.setAttribute('onclick', "event.stopPropagation();");
				document.body.appendChild(this.popup);
				
			
				jQuery(this.popup).hide();
			}
			if(typeof(name) == 'undefined'){
			   name = '';
			}
			var popupContent="<div id='drag-popup-content'><div draggable='true' class='visualmods-popup-top visualmods-drag-top' ><a class='popup-top-x' onclick='visualMCE.hideBox(this)'>X</a><span selectable='false' class='popup-name'>"+name+"</span></div><div id='drag-popup-inner'>"+popupInnerHTML+"</div></div>";
			this.popup.innerHTML=popupContent;
			var docScroll = document.body.parentNode.scrollTop;
			if(docScroll == 0){
				docScroll = document.body.scrollTop;
			}
			this.popup.style.top=(event.pageY - docScroll)+'px';
			this.popup.style.left=event.pageX+'px';
			jQuery('.popup-top-x').on('touchstart mousedown', function(event){
				event.stopPropagation();
			})
			jQuery('.visualmods-drag-top').on('touchstart mousedown', function(event){
				event.preventDefault();
				dragMousedown=true;
				document.addEventListener('mousemove', visualMCE.dragBox, false)
				document.addEventListener('touchmove', visualMCE.dragBox, false)
			});
			jQuery(document).on('touchend touchcancel mouseup', function(){
				dragMousedown=false;		
				document.removeEventListener('mousemove', visualMCE.dragBox, false);
				document.removeEventListener('touchmove', visualMCE.dragBox, false);
			});
		 
			jQuery('.visualmods-drag-top').on('touchend touchcancel mouseup', function(){
				dragMousedown=false;		
				document.removeEventListener('mousemove', visualMCE.dragBox, false);
				document.removeEventListener('touchmove', visualMCE.dragBox, false);
			});
		    jQuery('.cvm_tab_container').each(function(){
				this.removeEventListener('click', function(){visualMCE.tabClicked(this);}, false);
				this.addEventListener('click', function(){visualMCE.tabClicked(this);}, false);
			});
			
			if(jQuery(this.popup).filter(":visible").length==1){
			   jQuery(this.popup).hide();
			}else{
				jQuery(this.popup).show();
				setTimeout(function(){jQuery(document).one('click', function(){jQuery(visualMCE.popup).hide();});}, 500);
				
			}
			jQuery('form.visualMCE.targets').each(function(){
				this.innerHTML = visualMCE.makeForm(this.getAttribute('data-slug'), 'all') + this.innerHTML;

			});
			jQuery('form.visualMCE.default').each(function(){
				this.innerHTML = visualMCE.makeForm(this.getAttribute('data-slug'), 'default') + this.innerHTML;

			});
			var names = this.parentNames;
			var targets = Object.getOwnPropertyNames(names);
			for(var i=0; i<targets.length; i++){
				jQuery('form.visualMCE.'+targets[i]).each(function(){
					this.innerHTML = visualMCE.makeForm(this.getAttribute('data-slug'), targets[i]) + this.innerHTML;

				});
			}


		 
		},
	makeForm: function(slug, option){
		var names = this.parentNames;
		if(option == 'all'){
			var targets = Object.getOwnPropertyNames(names);
		}else{
			if(option == 'default'){
				var targets = ['closest', 'closestParent'];
			}else{
				var targets = [option];
			}
		}
			var inputs = '';
			var checked = "checked='checked'";
			for(var i=0; i<targets.length; i++){
				inputs = inputs + "<input type='radio' name='" + slug + "' value='" + targets[i] + "' " + checked + ">" + names[targets[i]] + "</input>";
				checked = '';
			}
			return inputs;
		}, 

	tabClicked: function(e){
			jQuery('.cvm_tab_container').removeClass('selected');
			jQuery(e).addClass('selected');
		},

	dragBox: function(event){
			if(event.type=='touchmove'){
				var pageY=event.changedTouches[0].pageY;pageX=event.changedTouches[0].pageX;
			}
			else{
				var pageY=event.pageY;pageX=event.pageX
			}
			var docScroll=document.body.parentNode.scrollTop;
			if(docScroll==0){
				docScroll=document.body.scrollTop;
			}
			visualMCE.popup.style.top=(pageY - (docScroll+30))+'px';
			visualMCE.popup.style.left=(pageX-75)+'px';
		},


	 hideBox: function(e){
			thisParent=getParentByClassName(e, 'visualmods-popup');
			jQuery(document).trigger('click')
		},

	

	MCEaddStyle: function(e, eStyle, value){
			addStyle(e, eStyle, value);
			e.setAttribute("data-mce-style", e.getAttribute('style'));
		}
}
