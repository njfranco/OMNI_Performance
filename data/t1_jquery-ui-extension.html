/**
 * Override selectable() to extend functionality for shift selections and scrollbar detection.
 */
(function($){ 
	// To override widget just give him the same name
	$.widget("shift.selectable", $.ui.selectable, {
	    options: {}, // required
	    previousIndex: -1, // additional attribute to store previous selection index
	    currentIndex: -1, // additional attribute to store current selection index
	    scrolling: false,
	    _create: function() { // required
	        var self = this;
	
	        $.ui.selectable.prototype._create.call(this); // default implementation
	
	        // here we are catching "selecting" event with shift key
	        $(this.element).on('selectableselecting', function(event, ui){
	            self.currentIndex = $(ui.selecting.tagName, event.target).index(ui.selecting);
	            if(event.shiftKey && self.previousIndex > -1) {
	                $(ui.selecting.tagName, event.target).slice(Math.min(self.previousIndex, self.currentIndex), 1 + Math.max(self.previousIndex, self.currentIndex)).addClass('ui-selected');
	            } else {
	                self.previousIndex = self.currentIndex;
	            }
	        });
	    },
	    _mouseStart: function(event) {
	    	// detect scroll bars. Short-circuit if clicked within scrollbar
	    	if (event.pageX > $(event.target)[0].clientWidth + $(event.target).offset().left) {
	    		scrolling = true;
	    		return;
	    	}
    		scrolling = false;
	        $.ui.selectable.prototype._mouseStart.call(this, event); // default implementation
	    },
	    _mouseDrag: function(event) {
	    	// don't worry about mouse drag events when scrolling
	    	if (scrolling) {
	    		return;
	    	}
	        $.ui.selectable.prototype._mouseDrag.call(this, event); // default implementation
	    },
	    destroy: function() { // required, default implementation
	        $.ui.selectable.prototype.destroy.call(this);
	    },
	    _setOption: function() { // required, default implementation
	        $.ui.selectable.prototype._setOption.apply(this, arguments);
	    }
	});
})(jQuery);