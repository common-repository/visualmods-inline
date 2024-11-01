
document.addEventListener('DOMContentLoaded', function(){
	
	 jQuery('._enyrgy_cell_color').wpColorPicker();
	 jQuery('._enyrgy_slide_color').wpColorPicker();
	 jQuery('._enyrgy_page_color').wpColorPicker();

});

/*
 * Attaches the image uploader to the input field
 */

window.addEventListener('load', function() {
		
	jQuery('#enyrgy-color .ui-slider-handle, #enyrgy-color .iris-palette').on('mouseup', function(event){e=event.target; setTimeout(function(){BGcolor(e)}, 500)});
		
		
	jQuery('#enyrgy-cell-color .ui-slider-handle, #enyrgy-cell-color .iris-palette').on('mouseup', function(event){e=event.target; setTimeout(function(){BGcellcolor('enyrgy-cell-color')}, 500)});
		
	// Instantiates the variable that holds the media library frame.
	var meta_image_frame;
	// Sets up the media library frame
	meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
			title: 'Choose or Upload an Image',
			button: { text:	'Use this image',
			close:	false,
			reset: false},
			library: { type: 'image' }
	});
	
}, false);


function cssIncrement(attribute, plus, toolType, forbidNegative){
	if(typeof(forbidNegative) == 'undefined'){
		forbidNegative = true;
	}
	increment=jQuery('#'+toolType+'-increment').val();
	if(typeof(increment) == 'undefined'){
		increment = 10;
	}
	increment = parseInt(increment);
	checked=jQuery('input[name="'+toolType+'levelorcell"]:checked').val();
	outerCell=visualMCE.getParent(checked);

	if(outerCell==false){return;}

	currentPX= parseInt( window.getComputedStyle(outerCell).getPropertyValue(attribute).replace('px', ''));
	if(plus==true){addPX=increment}
	else{
		if(plus==false){addPX=(0-increment);
			if(currentPX-increment<0 && forbidNegative){currentPX=currentPX + (increment - currentPX);}
		}
	}
	addStyle(outerCell, attribute, (currentPX+addPX)+'px');
	outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
}


function popupRemoveStyle(style, input){	
	checked=jQuery('input[name="' + input + '"]:checked').val();
	outerCell=visualMCE.getParent(checked);
	if(outerCell){
		removeStyle(outerCell, style);
		outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));}
	};		
function BGcellcolor(parentIDstring){
	checked=jQuery('input[name="bgcolorlevelorcell"]:checked').val();
	outerCell=visualMCE.getParent(checked)
	if(outerCell){
		jQuery(outerCell).css('background-color', jQuery('#'+parentIDstring+' .wp-color-result').css('background-color'));
		outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}
}

function removecellBgColor(e, slideNum){	
	outerCell=visualMCE.parentByClass('outer-cell');
	if(outerCell){
		removeStyle(outerCell, 'background-color');
		outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));}
	};
	
	// Runs when the image button is clicked.
function metaImgClick(event, id){
				// Prevents the default action from occuring.
	event.preventDefault();
				//Get the ID of the button that was clicked, then remove -button & get the image element
	e=event.target;
				// Opens the media library frame.
	
	
	checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
	console.log(checked)
	outerCell=visualMCE.getParent(checked);
	console.log(outerCell)
	if(!outerCell){return;}
	wp.media.frames.meta_image_frame.open();
				
	selectButton = wp.media.frames.meta_image_frame.el.getElementsByClassName('media-button-select')[0];

	eventFunction=function(event2){metaSelect(event2)}
			 // Runs when an image is selected and the insert image button is clicked.
	selectButton.addEventListener("click", eventFunction, false);
}
		function metaSelect(event2){
			event2.preventDefault();
			// Grabs the attachment selection and creates a JSON representation of the model.
			var media_attachment = wp.media.frames.meta_image_frame.state().get('selection')._single.toJSON();
			 // Sends the attachment URL to our custom image input field.
			selectButton.removeEventListener("click", eventFunction, false);
			mceDoc=tinyMCE.activeEditor.contentDocument;
		
		enyrgyIMG=mceDoc.createElement("img");
		enyrgyIMG.src=media_attachment.url;
		jQuery(outerCell).css('background-image', "url('"+media_attachment.url+"')");
		outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
		 
	wp.media.frames.meta_image_frame.reset();
	wp.media.frames.meta_image_frame.close();
			return;
}

function bgPosition(value){
	checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
	outerCell=visualMCE.getParent(checked);
	if(outerCell){
		MCEaddStyle(outerCell, 'background-position', value);
	}
}
	 
	function removeSlideBg(e, slideNum){	
		if(!slideNum){slideNum=getSlideNumber();}
		if(!slideNum){return;}
				//clear hidden input
		document.getElementById(e.getAttribute('id').replace('-link', slideNum)).setAttribute('value', '');
		mceDoc=tinyMCE.activeEditor.contentDocument;
		enyrgySlide=mceDoc.getElementById('enyrgy-'+slideNum);
		addStyle(enyrgySlide, 'background-image', "none ");
		enyrgySlide.setAttribute('data-mce-style', enyrgySlide.getAttribute('style'));
		return;
	};
	function removeSlideBgColor(e, slideNum){
		if(!slideNum){slideNum=getSlideNumber();}
		if(!slideNum){return;}
				//clear hidden input
		document.getElementById(e.getAttribute('id').replace('-link', slideNum)).setAttribute('value', '');
		mceDoc=tinyMCE.activeEditor.contentDocument;
		enyrgySlide=mceDoc.getElementById('enyrgy-'+slideNum);
		removeStyle(enyrgySlide, 'background-color');
		enyrgySlide.setAttribute('data-mce-style', enyrgySlide.getAttribute('style'));
		return;
	};
	
function BGlevelcolor(parentIDstring){
	outerCell=visualMCE.parentByClass('content-container');
	if(outerCell){
		jQuery(outerCell).css('background-color', jQuery('#'+parentIDstring+' .wp-color-result').css('background-color'));
		outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
	}
	
}
	
	function BGtexture(value){
		var checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
		var outerCell=visualMCE.getParent(checked);
		if(outerCell){
			var repeat = window.getComputedStyle(outerCell).getPropertyValue('background-repeat');
			var newRepeat = false;
			if(repeat == 'repeat'){
				newRepeat = 'repeat-x';
			}
			if(repeat == 'repeat-x'){
				newRepeat = 'repeat-y';
			}
			if(repeat == 'repeat-y'){
				newRepeat = 'no-repeat';
			}
			if(repeat == 'no-repeat'){
				newRepeat = 'repeat';
			}
			addStyle(outerCell, 'background-repeat', newRepeat);
			outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
		}
	}
	
	
	function bgHeight(){
		var checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
		var outerCell=visualMCE.getParent(checked);
		if(outerCell){
			var size = window.getComputedStyle(outerCell).getPropertyValue('background-size');
			if( size == 'auto 100%' ){
				addStyle(outerCell, 'background-size', 'auto auto');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}else{
				addStyle(outerCell, 'background-size', 'auto 100%');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}
		}
	}
	function bgWidth(){
		var checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
		var outerCell=visualMCE.getParent(checked);
		if(outerCell){
			var size = window.getComputedStyle(outerCell).getPropertyValue('background-size');
			if( size == '100% auto' ||	size == '100%'){
				addStyle(outerCell, 'background-size', 'auto auto');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}else{
				addStyle(outerCell, 'background-size', '100% auto');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}
		}
	}
	function bgFull(){
		var checked=jQuery('input[name="bgeditorlevelorcell"]:checked').val();
		var outerCell=visualMCE.getParent(checked);
		if(outerCell){
			var size = window.getComputedStyle(outerCell).getPropertyValue('background-size');
			if( size == '100% 100%' ){
				addStyle(outerCell, 'background-size', 'auto auto');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}else{
				addStyle(outerCell, 'background-size', '100% 100%');
				outerCell.setAttribute('data-mce-style', outerCell.getAttribute('style'));
			}
		}
	}