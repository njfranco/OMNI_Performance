/**
 * collapsible() is a function that will convert a grouping of h3-div pairs into collapsible sections.
 * When the header (h3) is clicked, the content (div) is dynamically loaded, cached, and expanded or collapsed.
 *    usage: $("#myCollapsibleDiv").collapsible();
 */
(function($) {
	$.fn.collapsible = function(options) {

		var settings = $.extend({
			// Initialization function
			init : function() {},
			
			// If true, will scroll to the banner just expanded
			scrollToBanner: false,
			
			// Callback function envoked after a section's content has been reloaded.
			afterReload : function(header, content) {},

			// Function to execute when header is expanded
			afterExpand: function() {},
			
			// Function to execute when header is collapsed
			afterCollapse: function() {},
			
			// default DOM element used to denote the Header sections
			headerElem: 'h3',
			
			// a second row of the main title, if needed.
			title2: '', 
			
			cached: true
		}, options);

		/**
		 * Reloads a collapsible section below a header element
		 * 
		 * @param header - header element above the collapsible section to reload
		 * @param aSync - passthrough parameter to jQuery to denote if the request should be asynchronous or not
		 * @param complete - a function to call after the data is loaded
		 */
		function reloadContent(header, aSync, complete) {
			if (header.next().data('url')) {
				header.find('.collapsible-header-spinner').addSpinnerPNG();
				header.next().each(function(i, e) {
					var content = $(e);
					$.ajax({
						url:content.data('url'),
						data:{ 
							mode:header.data('mode'), 
							restoreState:header.data('restoreState')
						}, 
						async : aSync
					}).done(function(response, status, xhr) {
						// CQ31040 - the response should be just an html fragment.  But if there is a <body> tag (ie. from a 550.jsp error file), just display the stuff between. 
						var re = /.*<body[^>]*>([\s\S]*)<\/body>.*/i;
						var m = re.exec(response);
						if (m != null) {
							content.html(m[1]);
						}
						else {						
							content.html(response);
						}
			
						// do local callback, if it exists
						if (complete) complete.call(header);
						
						// do global callback, if specified
						settings.afterReload.call(header, content);		
						
						header.find('.collapsible-header-spinner').removeSpinnerPNG();					
					});
				});
			}
		}

		/**
		 * Expands a section 
		 */
		function showContent(e, callback) {
			var header = $(this);
			header.data('state', 'expanded');
			
			// load the content if it's empty
			if (!settings.cached || header.next().html() == '') {
				// reload and show the content on callback
				reloadContent(header, true, function() { showHideContent(header, true, callback); });
			}
			else {
				showHideContent(header, true, callback);
			}
		}

		/**
		 * Collapsed a section
		 */
		function hideContent() {
			var header = $(this);
			header.data('state', 'collapsed');
			showHideContent(header, true);
		}

		/**
		 * Toggles a section's expand/collapse state
		 */
		function toggleContent() {
			var header = $(this);
			if (header.data('state') == 'expanded') {
				header.trigger('header:collapse');
			} 
			else {
				header.trigger('header:expand');
			}
		}

		/**
		 * Does the actual work of expanding/collapsing a section
		 */
		function showHideContent(header, animate, callback) {
			var content = header.next();

			if (header.data('state') == 'expanded') {
				header.find('.collapsible-header-icon')
					.removeClass('collapsible-header-icon-plus')
					.addClass('collapsible-header-icon-minus');
				if (animate) {
			//		if (settings.scrollToBanner) {
					content.slideDown('fast', function() {
						$('html,body').animate({
							scrollTop : header.offset().top
						});
						header.trigger('header:afterExpand');

						// do callback passed in from the trigger, if it exists
						if (callback) callback.call();
					});
			//		}
			//		else {
			//			content.slideDown('fast');
			//		}
				} else {
					content.removeClass('hidden');
					header.trigger('header:afterExpand');
					
					// do callback passed in from the trigger, if it exists
					if (callback) callback.call();
				}
				$('.collapsible a.collapseAll').removeClass('disabled');
			} else {
				header.find('.collapsible-header-icon')
					.removeClass('collapsible-header-icon-minus')
					.addClass('collapsible-header-icon-plus');
				content.slideUp('fast');
				// disable the Collapse All links if all sections are collapsed.
				if ($('.collapsible .collapsible-header').filter(function() {return $(this).data('state') == 'expanded';}).length == 0) {				
					$('.collapsible a.collapseAll').addClass('disabled');
				}
				header.trigger('header:afterCollapse');

				// do callback passed in from the trigger, if it exists
				if (callback) callback.call();
			}			
		}
		
		function setEditMode() {
			$(this).data('mode', 'edit');
			// Disable the [Edit] link
			$(this).find('a.edit').removeClass('cls-link');
			reloadContent($(this), true);
		}
		
		function setViewMode() {
			// Set the header back to view-only mode and reload content
			$(this).data('mode', 'view');
			// Enable the [Edit] link
			$(this).find('a.edit').addClass('cls-link');
			reloadContent($(this), true);
		}

		// Setup DOM, add styles
		this.addClass('collapsible')
			.find(settings.headerElem)
			.addClass('collapsible-header')
			.append('<span class="collapsible-header-icon collapsible-header-icon-plus"></span>')
			.append('<span class="collapsible-header-spinner"></span>')
			.append(settings.title2)
			.next() // the next element after the header (the div), initially set as hidden.
				.addClass('collapsible-content hidden');
		this.find(".collapsible-header .flag").each(function () {
			$(this).appendTo($(this).parent());
		});
		this.find(settings.headerElem).not('.disabled')
			.hover(function() { $(this).toggleClass('collapsible-header-hover'); })
			.on('header:toggle', toggleContent)
			.on('header:expand', showContent)
			.on('header:collapse', hideContent)
			.on('header:edit', setEditMode)
			.on('header:view', setViewMode)
			.on('header:afterExpand', settings.afterExpand)
			.on('header:afterCollapse', settings.afterCollapse)
			.each(function() { $(this).data('mode', 'view'); $(this).data('state', 'collapsed'); $(this).data('restoreState', 'false');})
			.find('a.edit').addClass('href-disabled').addClass('cls-link');

		// Register header click event to toggle the viewing of the content section
		this.find('.collapsible-header').not('.disabled').click(function() {
			$(this).trigger('header:toggle');
		});

		// Add [Edit] click event to reload content in edit mode.
		this.find('.collapsible-header').not('.disabled').find('a.edit').click(function(e) {
			// don't bubble up to header click event
			e.stopPropagation();

			// short-circuit if this header is already in edit mode
			var header = $(this).closest('.collapsible-header');
			if (header.data('mode') == 'edit') return;
			
			// Only one section can be editible at any given time.  Check if page is dirty.
			if (checkFormChanged() == false) return;

			// reload all editable sections in read-only mode
			$(".collapsible .collapsible-header").not('.disabled')
				.filter(function() { return header.attr('id') !== $(this).attr('id'); }) // don't reload this header first in view mode then in edit mode.
				.filter(function() { return $(this).data('mode') == 'edit'; })
				.each(function() { $(this).trigger('header:view'); });

			// only reload the expandable section in edit mode if we haven't already
			if (header.data('mode') != 'edit') {					
				// Disable the [Edit] link
				$(this).removeClass('cls-link');
				
				// We don't want to toggle the section, but we do want to reload the section in edit mode.
				header.data('mode', 'edit');
				reloadContent(header, true, showContent);
			}
		});

		// Return to top links scroll to the top of the section
		this.find('a.collapseAll').addClass('cls-link').click(function(e) {
			$('.collapsible .collapsible-header').each(function() {
				$(this).trigger('header:collapse');
			});
			$('html,body').animate({ scrollTop : 0 });
		});

		settings.init.call();

		// Init - load all sections that should be open to start with.
		this.find('.collapsible-header').not('.disabled').filter(function() {
			return $(this).data('state') == 'expanded';
		}).each(function() {
			var header = $(this);
			reloadContent(header, false);
			showHideContent(header, false);					
		});
		this.find('.collapsible-header').not('.disabled').each(function() {
			var header = $(this);
			// refresh header
			if (header.data('mode') == 'edit') {
				// Disable the [Edit] link
				header.find('a.edit').removeClass('cls-link');
			}
			else {
				// Enable the [Edit] link
				header.find('a.edit').addClass('cls-link');
			}
		});
		
		this.show();
	}
}(jQuery));
