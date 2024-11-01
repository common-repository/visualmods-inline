<?php
/*
Plugin Name: VisualMods Inline
Plugin URI: http://www.visualmods.com/
Description: Adds easy inline styling tools to mce.
Version: 1.03
Author: Clint Stegman
Author URI: http://www.enyrgy.com
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.en.html
Text Domain: visualmods-inline
*/

add_action( 'plugins_loaded', 'visualmods_inline_load_plugin_textdomain' );
function visualmods_inline_load_plugin_textdomain() {
    load_plugin_textdomain( 'visualmods-inline', FALSE, basename( dirname( __FILE__ ) ) . '/languages/' );
}

add_action( 'admin_init', 'visualmods_inline_tinymce_button' );

function visualmods_inline_tinymce_button() {
		 if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
					add_filter( 'mce_buttons', 'visualmods_inline_register_tinymce_button' );
					add_filter( 'mce_external_plugins', 'visualmods_inline_add_tinymce_button' );
		 }
}

function visualmods_inline_register_tinymce_button( $buttons ) {
		 array_push( $buttons, 
								 "cell_padding",
								 "cell_margin",
								 "cell_corners",
								 "cell_color",
								 "bg_editor"
			 );
		 return $buttons;
}

function visualmods_inline_add_tinymce_button( $plugin_array ) {
	$plugin_array['visualMCEInline'] = plugin_dir_url( __FILE__ ) . 'mce_buttons.js' ;
		 return $plugin_array;
}
	
function visualmods_inline_sanitize_js($string){
	$string = preg_replace('/"/', "\\\"", $string);
	$string = preg_replace('/\t/', "", $string);
	$string = preg_replace('/\s\s/', " ", $string);
	$string = preg_replace('/\s\s/', " ", $string);
	$string = preg_replace('/\n/', "", $string);
	return $string;
}





function get_visualmods_inline_image_controls(){
	ob_start();
	?>
	
		<form class="visualMCE targets" data-slug="bgeditorlevelorcell">
		</form>
		<p>
			<a onclick='event.stopPropagation();metaImgClick(event, "img")'>
				<img src='<?php echo plugin_dir_url( __FILE__ )	?>images/tango-generic-image2.png' style='width:32px;height:auto;' title='<?php _e('Add Background Image', 'visualmods-inline'); ?>'/>
			</a>
			<a onclick='BGtexture()'>
				<img src='<?php echo plugin_dir_url( __FILE__ )	?>images/tiled-image.png' style='width:32px;' title='<?php _e('Tile Background Image', 'visualmods-inline'); ?>'/>
			</a>
			<a onclick='popupRemoveStyle("background-image", "bgeditorlevelorcell")'><?php _e('Clear', 'visualmods-inline'); ?></a>
		</p>
		<div style="background-color:#f6f6f6;">
			<?php _e('Background Position', 'visualmods-inline'); ?><br/>
			<table class="bgposcontrols">
				<tbody>
					<tr>
						<td><img class="angles" onclick="bgPosition('top left')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopleft.png" title='<?php _e('Top Left', 'visualmods-inline'); ?>'/></td>
						<td><img class="updown" onclick="bgPosition('top center')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/blueup.png" title='<?php _e('Top Center', 'visualmods-inline'); ?>'/></td>
						<td><img class="angles" onclick="bgPosition('top right')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopright.png" title='<?php _e('Top Right', 'visualmods-inline'); ?>'/></td>
					</tr><tr>
						<td><img class="leftright" onclick="bgPosition('center left')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/blueleft.png" title='<?php _e('Left Center', 'visualmods-inline'); ?>'/></td>
						<td><img class="leftright" onclick="bgPosition('center center')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/minus.png" title='<?php _e('Central', 'visualmods-inline'); ?>'/></td>
						<td><img class="leftright" onclick="bgPosition('center right')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/blueright.png" title='<?php _e('Right Center', 'visualmods-inline'); ?>'/></td>
					</tr><tr>
						<td><img class="angles" onclick="bgPosition('bottom left')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomleft.png" title='<?php _e('Bottom Left', 'visualmods-inline'); ?>'/></td>
						<td><img class="updown" onclick="bgPosition('bottom center')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottom.png" title='<?php _e('Bottom Center', 'visualmods-inline'); ?>'/></td>
						<td><img class="angles" onclick="bgPosition('bottom right')" src="<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomright.png" title='<?php _e('Bottom Right', 'visualmods-inline'); ?>'/></td>
					</tr>
				</tbody>
			</table>
		</div>

			<p>
				<label>Background Size <br/>
				<a onclick='bgHeight()'>
					<img src='<?php echo plugin_dir_url( __FILE__ )	?>images/updown.png' style='width:32px;' title='<?php _e('100% Height Only', 'visualmods-inline'); ?>'/>
				</a>
				<a onclick='bgWidth()'>
					<img src='<?php echo plugin_dir_url( __FILE__ )	?>images/leftright.png' style='width:32px;' title='<?php _e('100% Width Only', 'visualmods-inline'); ?>'/>
				</a>
				<a onclick='bgFull()'>
					<img src='<?php echo plugin_dir_url( __FILE__ )	?>images/expand.png' style='width:32px;' title='<?php _e('100% Height & Width', 'visualmods-inline'); ?>'/>
				</a>
			</p>
		
		
	<?php
	$visualmods_inline_level_formats = visualmods_inline_sanitize_js(ob_get_contents()); ob_end_clean();
	return $visualmods_inline_level_formats;
}


function get_visualmods_inline_color_picker (){
	ob_start();
	?>
		<form class="visualMCE targets" data-slug="bgcolorlevelorcell">
		<p>
			<a onclick='popupRemoveStyle("background-color", "bgcolorlevelorcell")'><?php _e('Clear', 'visualmods-inline'); ?></a>
		</p>
		<div id='popup-cell-color-picker'>
			<input name='_enyrgy_popup_cell_color' type='text' onchange='BGcellcolor(this)' value='' class='_enyrgy_popup_cell_color' />
		</div>
		</form>
	<?php
	$visualmods_inline_color_picker = visualmods_inline_sanitize_js(ob_get_contents()); ob_end_clean();
	return $visualmods_inline_color_picker;
}

function get_visualmods_inline_padding_tool(){
	ob_start();
	?>
	
		<div id='padding-arrows'>
			<form class="visualMCE default cell cell_parent" data-slug="paddinglevelorcell">
			</form>
			<input id="padding-increment" type="range" min="2" max="50" value="10" step="2" />
			<table class='arrowcontrols'>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td>
							<img class='updown' onclick='cssIncrement("padding-top", false, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueup.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td>
							<img class='updown' onclick='cssIncrement("padding-top", true, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottom.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td>
							<img class='leftright' onclick='cssIncrement("padding-left", false, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueleft.png'/></td>
						<td>
							<img class='leftright' onclick='cssIncrement("padding-left", true, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueright.png'/></td>
						<td>
							<img class='leftright' onclick='cssIncrement("padding-top", true, "padding");cssIncrement("padding-right", true, "padding");cssIncrement("padding-bottom", true, "padding");cssIncrement("padding-left", true, "padding");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/plus.png'/><br/><img class='leftright' onclick='cssIncrement("padding-top", false, "padding");cssIncrement("padding-right", false, "padding");cssIncrement("padding-bottom", false, "padding");cssIncrement("padding-left", false, "padding");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/minus.png'/></td>
						<td>
							<img class='leftright' onclick='cssIncrement("padding-right", true, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueleft.png'/></td>
						<td>
							<img class='leftright' onclick='cssIncrement("padding-right", false, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueright.png'/></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td>
							<img class='updown' onclick='cssIncrement("padding-bottom", false, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueup.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td>
							<img class='updown' onclick='cssIncrement("padding-bottom", true, "padding")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottom.png'/></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>	
	<?php
	$output = visualmods_inline_sanitize_js(ob_get_contents()); ob_end_clean();
	return $output;
}

function get_visualmods_inline_margin_tool(){
	ob_start();
	?>
	
		<div id='margin-arrows'>
			<form class="visualMCE default cell cell_parent" data-slug="marginlevelorcell">
			</form>
			<input id="margin-increment" type="range" min="2" max="50" value="10" step="2" />
			<table class='arrowcontrols'>
				<tbody>
					<tr>
						<td></td>
						<td></td>
						<td><img class='updown' onclick='cssIncrement("margin-top", false, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueup.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td><img class='updown' onclick='cssIncrement("margin-top", true, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottom.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td><img class='leftright' onclick='cssIncrement("margin-left", false, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueleft.png'/></td>
						<td><img class='leftright' onclick='cssIncrement("margin-left", true, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueright.png'/></td>
						<td><img class='leftright' onclick='cssIncrement("margin-top", true, "margin");cssIncrement("margin-right", true, "margin");cssIncrement("margin-bottom", true, "margin");cssIncrement("margin-left", true, "margin");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/plus.png'/><br/><img class='leftright' onclick='cssIncrement("margin-top", false, "margin");cssIncrement("margin-right", false, "margin");cssIncrement("margin-bottom", false, "margin");cssIncrement("margin-left", false, "margin");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/minus.png'/></td>
						<td><img class='leftright' onclick='cssIncrement("margin-right", true, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueleft.png'/></td>
						<td><img class='leftright' onclick='cssIncrement("margin-right", false, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueright.png'/></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td><img class='updown' onclick='cssIncrement("margin-bottom", false, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/blueup.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td><img class='updown' onclick='cssIncrement("margin-bottom", true, "margin", false)' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottom.png'/></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	<?php
	$output = visualmods_inline_sanitize_js(ob_get_contents()); ob_end_clean();
	return $output;
}

function get_visualmods_inline_corners_tool(){
	ob_start();
	?>
	
		<div id='corner-arrows'>
			<form class="visualMCE targets" data-slug="radiuslevelorcell">
			</form>
			<input id="radius-increment" type="range" min="2" max="50" value="10" step="2" />
			<table class='arrowcontrols'>
				<tbody>
					<tr>
						<td><img class='angles' onclick='cssIncrement("border-top-left-radius", false, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopleft.png'/></td>
						<td></td>
						<td></td>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-top-right-radius", false, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopright.png'/></td>
					</tr><tr>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-top-left-radius", true, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomright.png'/></td>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-top-right-radius", true, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomleft.png'/></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td></td>
						<td><img class='leftright' onclick='cssIncrement("border-top-left-radius", true, "radius");cssIncrement("border-top-right-radius", true, "radius");cssIncrement("border-bottom-right-radius", true, "radius");cssIncrement("border-bottom-left-radius", true, "radius");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/plus.png'/><br/><img class='leftright'	onclick='cssIncrement("border-top-left-radius", false, "radius");cssIncrement("border-top-right-radius", false, "radius");cssIncrement("border-bottom-right-radius", false, "radius");cssIncrement("border-bottom-left-radius", false, "radius");' src='<?php echo plugin_dir_url( __FILE__ )	?>images/minus.png'/></td>
						<td></td>
						<td></td>
					</tr><tr>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-bottom-left-radius", true, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopright.png'/></td>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-bottom-right-radius", true, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluetopleft.png'/></td>
						<td></td>
					</tr><tr>
						<td><img class='angles' onclick='cssIncrement("border-bottom-left-radius", false, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomleft.png'/></td>
						<td></td>
						<td></td>
						<td></td>
						<td><img class='angles' onclick='cssIncrement("border-bottom-right-radius", false, "radius")' src='<?php echo plugin_dir_url( __FILE__ )	?>images/bluebottomright.png'/></td>
					</tr>
				</tbody>
			</table>
		</div>
	<?php
	$output = visualmods_inline_sanitize_js(ob_get_contents()); ob_end_clean();
	return $output;
}



function visualmods_inline_head_location() {
	?>
	<script type='text/javascript'>
	visualMCEInlineURL = '<?php echo plugin_dir_url( __FILE__ ) ; ?>';
	visualMCEInlineTranslated = {};
	visualMCEInlineTranslated.padding = "<?php _e('Padding', 'visualmods-inline'); ?>";
	visualMCEInlineTranslated.margin = "<?php _e('Margin', 'visualmods-inline'); ?>";
	visualMCEInlineTranslated.rounded = "<?php _e('Round Corners', 'visualmods-inline'); ?>";
	visualMCEInlineTranslated.bgColor = "<?php _e('Background Color', 'visualmods-inline'); ?>";
	visualMCEInlineTranslated.bgImage = "<?php _e('Background Image', 'visualmods-inline'); ?>";
	</script>
	<?php
}

function visualmods_inline_head_inline() {
	global $visualmods_inline_custom_styles;
	?>
	<script type='text/javascript'>

	themeURL = '<?php echo get_template_directory_uri(); ?>';

	visualMCEInline = {};
	visualMCEInline.bgImageControls = "<?php echo get_visualmods_inline_image_controls(); ?>";
	visualMCEInline.colorPicker = "<?php echo get_visualmods_inline_color_picker(); ?>";
	visualMCEInline.paddingTool = "<?php echo get_visualmods_inline_padding_tool(); ?>";
	visualMCEInline.marginTool = "<?php echo get_visualmods_inline_margin_tool(); ?>";
	visualMCEInline.cornersTool = "<?php echo get_visualmods_inline_corners_tool(); ?>";
	function cellPaddingClick(event){
		visualMCE.loadPopup(visualMCEInline.paddingTool, event, '<?php _e('Padding', 'visualmods-inline'); ?>');
	}

	function cellMarginClick(event){
		visualMCE.loadPopup(visualMCEInline.marginTool, event, '<?php _e('Margin', 'visualmods-inline'); ?>');
	}

	function cellCornersClick(event){
		visualMCE.loadPopup(visualMCEInline.cornersTool, event, '<?php _e('Round Corners', 'visualmods-inline'); ?>');
	}

	function cellColorClick(event){
		visualMCE.loadPopup(visualMCEInline.colorPicker, event, '<?php _e('Background Color', 'visualmods-inline'); ?>');
		
		jQuery('._enyrgy_popup_cell_color').wpColorPicker();
		setTimeout(function(){
			jQuery('#popup-cell-color-picker .wp-color-result').trigger('click');
			jQuery('#popup-cell-color-picker .ui-slider-handle, #popup-cell-color-picker .iris-palette').on('mouseup', function(event){e=event.target; setTimeout(function(){BGcellcolor('popup-cell-color-picker')}, 500)});
		}, 500);
	}

	function bgEditorClick(event) {
		visualMCE.loadPopup(visualMCEInline.bgImageControls, event, '<?php _e('Background Images', 'visualmods-inline'); ?>');
	}
	</script>
	<link rel='stylesheet' id='visualmods_editor-css'	href='<?php echo plugin_dir_url( __FILE__ ); ?>visualmce.css' type='text/css' media='all' />
		
	
	<?php 
	
}
add_action( "mce_external_plugins", 'visualmods_inline_admin_head_require' );
add_action( "mce_external_plugins", 'visualmods_inline_head_location' );
add_action( "customize_controls_enqueue_scripts", 'visualmods_inline_admin_head_require' );
add_action( "customize_controls_print_styles", 'visualmods_inline_head_location' );
add_action('customize_controls_print_styles', 'visualmods_inline_head_inline');
function visualmods_inline_admin_head_require() {
	add_action('admin_footer', 'visualmods_inline_head_inline');
	wp_enqueue_style( 'wp-color-picker' );
	wp_enqueue_script( 'visualmce_styling', plugin_dir_url( __FILE__ ) . 'styling.js', array( 'wp-color-picker' ));
	wp_enqueue_script( 'creatana_library', plugin_dir_url( __FILE__ ) . 'creatanaLibrary.js');
	wp_enqueue_script( 'visualmce_library', plugin_dir_url( __FILE__ ) . 'mcelibrary.js');
	wp_localize_script('visualmce_library', 'visualmceTranslated', array(
			'element' => __('Element', 'visualmods-inline'),
			'parent' => __('Parent', 'visualmods-inline'),
		)
	);
}
	
