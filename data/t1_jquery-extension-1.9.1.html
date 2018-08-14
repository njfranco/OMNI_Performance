//
// This file contains custom jQuery functions not in the basic jQuery library.
//

// for legacy browser detection.  $.browser was removed in jQuery 1.9
jQuery.browser={};
(function(){
   jQuery.browser.msie=false;
   jQuery.browser.version=0;
   if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
      jQuery.browser.msie=true;
      jQuery.browser.version=RegExp.$1;
   }
})();

/**
 * Escape an element id so that it can be used in a jQuery selector
 *
 * usage: $("#" + escape('myid.with.spec.chars'))
 */
function escape( elemID ) {
	return elemID.replace( /(:|\.|\[|\])/g, "\\$1" );
}
esc = escape;

/**
 * jQuery custom function to set the css 'visibility' style to 'visible'.
 * Note: This is different than hide()/show() which toggles the css 'display' attribute.
 *
 * usage: $('#myid').visible();
 */
jQuery.fn.visible = function() {
	return this.css('visibility', 'visible');
}

/**
 * jQuery custom function to set the css 'visibility' style to 'hidden'.
 * Note: This is different than hide()/show() which toggles the css 'display' attribute.
 *
 * usage: $('#myid').invisible();
 */
jQuery.fn.invisible = function() {
	return this.css('visibility', 'hidden');
}

/**
 * Returns true if the current object is visible.
 */
jQuery.fn.isVisible = function() {
	return this.css('visibility') == 'visible';
}

/**
 * Sets the css 'visibility' style to 'visible' or 'hidden' based on the isVisible parameter
 *
 * usage: $('#myid').setVisible(true);
 *
 * @param isVisible
 *            boolean, 'true' or 'false'
 */
jQuery.fn.setVisible = function( isVisible ) {
	return isVisible ? this.visible() : this.invisible();
}

/**
 * Shows or hides (sets the css 'display' style to 'inline' or 'none') this element based on
 * the isDisplayed parameter.
 *
 * usage: $('#myid').setDisplayed(true);
 *
 * @param isDisplayed
 *            boolean, 'true' or 'false'
 */
jQuery.fn.setDisplayed = function( isDisplayed ) {
	return isDisplayed ? this.show() : this.hide();
}

/**
 * Forces a redraw.  There is a bug with IE9 where sometimes a manipulated table or DIV will not re-render properly
 */
jQuery.fn.redraw = function() {
	this.hide();
	jQuery(this).each(function(){
		// simply access this variable to force a flush of the rendering queue
	    var redraw = this.offsetHeight;
	 });
	// now redraw/re-layout
	this.show();
}

/**
 * Limits a textarea to the specified number of characters.  Optionally, if charCountElem is specified,
 * will display the number of character remaining.
 * 
 * (This function doesn't really work all that well ... it flashes and jumps the scroll of the 
 * textarea randomly in IE8, though in other browsers is works well)
 */
jQuery.fn.maxLength = function(limit, charCountElem) {
	// normally this would be an oninput event, but that's only supported in IE9+
	if (jQuery.browser.msie && jQuery.browser.version <= 8) {
		jQuery(this).on("keyup paste", function() { //focus blur
			var _this = this;
			// IE8 hack - short pause to wait for paste to complete
			setTimeout(function() { 
		        setCount(_this, charCountElem);
			}, 100);
	    });
	}
	else {
		jQuery(this).on("input", function() {
	        setCount(this, charCountElem);
	    });
	}
    function setCount(src, charCountElem) {
    	if (src != undefined) {
	        var chars = src.value.length;
	        if (chars > limit) {
	            src.value = src.value.substr(0, limit);
	            chars = limit;
	        }     	
	        if (charCountElem != null) {   
	        	charCountElem.html( limit - chars );
	        }
    	}
    }
    setCount(jQuery(this)[0], charCountElem);
};

(function($){ 

    $.fn.extend({  
    	/**
    	 * Same as the maxLength function for textareas, but this just displays the count of characters remaining.
    	 *    usage: $("#myTextArea").report(500, "#myTxtCounterDiv");
    	 */
        report: function(limit,element) {
        	$(this).on('input', report);
        	var self = $(this);
			function report() { 
				var val = $(self).val();
			    var length = (val == undefined) ? 0 : val.length;
			    if($(element).html() == '' || $(element).html() != limit-length) {
			        $(element).html(limit-length);
			    }
			}
			report();
        }
	}); 
    
    
    $.extend({  
    	/**
    	 * This function will parse a URL string and return the parameters as a hashmap.
    	 * 
    	 * Usage: 
    	 * var params = $.parseParams("?docNb=800550&d-3670149-o=1&d-3670149-p=2");
    	 * var docNb = params['docNb'];
    	 */
        parseParams: function(url) {
			var params = {}, m, re = /([^&=]+)=([^&]*)/g;
			while (m = re.exec(url.slice(url.indexOf("?")+1))) {
			    params[m[1]] = m[2];
			}
			return params;
        },

        /**
         * Opens a CSS modal dialog displaying the contents of the disclaimer (title, body).
         * When OK is pressed, an acknowledgment POST request is sent to "/omni/advcor/needs/disclaimer.json" with the given offender, domain, and screen
         * 
         * @param options an object with following structure
         * 	{
         * 	  title: "",    - title of the dialog
         * 	  body: "",     - body text of the dialog
         *    docNb: "",    - offender this acknowledgment is for
         *    ofnntyCd: "", - a reference to a TbOfnNdsTypCd code
         *    screen: "",   - a reference to a DisclaimerScreen
         * 	}
         */
    	disclaimerDialog: function disclaimerDialog(options, onSuccessCallback, onCancelCallback) {
			// add an empty input element to trick IE to giving this popup focus (and not the DOC No field at the top of the most screens)
			var body = "<input autofocus=\"autofocus\" style=\"display:none;\" />" + options.body;
			var dialog = openDialog(options.title, body, function() {
					// Tell the DisclaimerController of the decision to store in the user's session.
					$.post(
						"/omni/advcor/needs/disclaimer.json", 
						{ "docNb": options.docNb, "ofnntyCd": options.ofnntyCd, "screen": options.screen },
						function( json, textStatus, jqXHR ) {
							if (json.error) {
								window.alert("There was an error saving the disclaimer: " + json.error);
								console.error("There was an error saving the disclaimer: " + json.error);
							}
							else {
								if (onSuccessCallback) onSuccessCallback.call();
							}
						}
					);
				}, onCancelCallback
			);
		}
    }); 

    
	/**
	 * Override the get() method on textareas so they return \r\n for carriage returns, not just \n.
	 * .val() calls this method.
	 */
	$.valHooks.textarea = {
		get: function( elem ) {
			return elem.value.replace( /\r?\n/g, "\r\n" );
		}
	};

	/**
	 * Aggregate function use sum all digits found in input fields
	 * usage: $("input").sum()
	 */
	$.fn.sum = function() {
		var sum = 0;
		this.each(function() {
			if ($(this).is(':input')) {
				var val = $(this).val();
			}
			else {
				var val = $(this).text();
			}
			val = '0' + val;
			if (val.indexOf('-') > -1) val = '-' + val.replace(/\-/g, '');
			sum += parseFloat( val.replace(/[^0-9\-\.]/g, ''), 10 );
		});
		return sum;
	}
	
	/** 
	 * Function used to add change listeners on every form element below this DOM element.  
	 * An isDirty hidden input field is updated when input elements are changed.
	 *   usage: $("#myForm").enableIsDirtyListeners();
	 */   
	$.fn.enableIsDirtyListeners = function() {
		// Identify the isDirty hidden form element within this form 
		var isDirty = this.find("input[name='isDirty']");
		
		// Add an onChange listener for every input field in this form that sets the isDirty value to true
		getInputElements(this).change(function() {
			isDirty.val("true").trigger('change');
		});
		
		// For chaining jQuery commands.
		return this;
	};
	
	/**
	 * Adds a PNG spinner (animated wait icon) to a DOM element with a transparent png background icon.
	 */
	$.fn.addSpinnerPNG = function( options ) {
		// default options
		var settings = $.extend({
			speed: 100,
			frames: 12,
			frameWidth: 15
		}, options);
		
		return this.removeSpinnerPNG().addClass("spinner-pngicon").each(function() {					
			
			var e = $(this);
			var index = 0;
			
			var intervalId = setInterval(function() {
				if (index == settings.frames) { index = 0; }
				e.css('backgroundPosition', -(index++ * settings.frameWidth) + 'px 0px');
			}, settings.speed);
			$.data(this, 'aimg.intervalId', intervalId);
				
		});
	};
	
	/**
	 * Removes a PNG spinner (animated wait icon) from a DOM element.
	 */
	$.fn.removeSpinnerPNG = function() {
		return this.removeClass("spinner-pngicon").each(function() {
			clearInterval($.data(this, 'aimg.intervalId'));
		});
	};
	
	/**
	 * Adds a .spinner-icon class (an animated gif image) to the specified element after a delay.  
	 * If removeSpinner() is called before the delay elapses, this method is effectively cancelled.
	 * usage: $("#myspan").addSpinner();
	 *        $("#myspan").addSpinner( { delay: 3000 } );
	 * 
	 * @param options.delay time in milliseconds to wait before applying the class.  Defaults to 1 second.
	 * 
	 * @see removeSpinner()
	 */
	$.fn.addSpinner = function( options ) {
		// default options
		var settings = $.extend({
			delay: 1000	// a short delay in milliseconds to wait before adding the style
		}, options);
		
		var _this = $(this);
		var timeout = setTimeout(function(){ _this.addClass("spinner-icon"); }, settings.delay);
		_this.data("aimg.timeoutId", timeout);
	}
	
	/**
	 * Removes a spinner (animated wait icon) from a DOM element.
	 * usage: $("#myspan").removeSpinner();
	 */
	$.fn.removeSpinner = function() {
		return this.removeClass("spinner-icon").each(function() {
			clearTimeout($.data(this, 'aimg.timeoutId'));
		});
	};
	
	/**
	 * Enables a standard radio button to be "deselected", like a checkbox.
	 * usage: $("input[type='radio']").uncheckableRadio();
	 */
    $.fn.uncheckableRadio = function () {
        return this.each(function () {
            var radio = this;
            if (! $(radio).prop('disabled')) {            	
	            var label = $('label[for="' + radio.id + '"]');
	            if (label.length === 0) {
	                label = $(radio).closest("label");
	            }
	            var label_radio = label.add(radio);
	            label_radio.mousedown(function () {
	                $(radio).data('wasChecked', radio.checked);
	            });
            	$(radio).click(function () {
	                if ($(radio).data('wasChecked')) {
	                    radio.checked = false;
	                    $(radio).trigger('change');
	                }
	            });
            }
        });
    };
	
}( jQuery ));

