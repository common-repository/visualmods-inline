 (function() {
     /* Register the buttons */
     tinymce.create('tinymce.plugins.visualMCEInline', {
          init : function(ed, url) {
               
            
               ed.addButton( 'cell_padding', {
                    title : visualMCEInlineTranslated.padding,
                    image : visualMCEInlineURL+'images/cell-padding.png',
                    onclick : function(event) {
                      cellPaddingClick(event);
                    }
               });
            
               ed.addButton( 'cell_margin', {
                    title : visualMCEInlineTranslated.margin,
                    image : visualMCEInlineURL+'images/cell-margin.png',
                    onclick : function(event) {
                      cellMarginClick(event);
                    }
               });
            
               ed.addButton( 'cell_corners', {
                    title : visualMCEInlineTranslated.round,
                    image : visualMCEInlineURL+'images/round-corners.png',
                    onclick : function(event) {
                      cellCornersClick(event);
                    }
               });
            
               ed.addButton( 'cell_color', {
                    title : visualMCEInlineTranslated.bgColor,
                    image : visualMCEInlineURL+'images/tango_rgb.png',
                    onclick : function(event) {
                      cellColorClick(event);
                    }
               });
               
               ed.addButton( 'bg_editor', {
                    title : visualMCEInlineTranslated.bgImage,
                    image : visualMCEInlineURL+'images/tango-generic-image.png',
                    onclick : function(event) {
                      bgEditorClick(event);
                    }
               });
               
            
          },
          createControl : function(n, cm) {
               return null;
          },
     });
     /* Start the buttons */
     tinymce.PluginManager.add( 'visualMCEInline', tinymce.plugins.visualMCEInline );
})();