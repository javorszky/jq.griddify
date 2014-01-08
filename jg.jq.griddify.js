// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "griddify",
		defaults = {
			height: "240"
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype = {
		init: function () {
			// console.log(this.element);
			$(window).load(function() {
				this.images = $(this.element).find("img");
				this.imgLoaded = 0;
				this.imgTotal = this.images.length;
				this.containerWidth = $(this.element).width();
				this.getRows();

			});
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			// console.log("xD");
		},
		adjust: function (distinctRows) {
			var self = this;

			_.each(distinctRows, function (element, index, list) {
                console.log(index, list.length);
				if( index === list.length-1) {
					console.log(index);
					return;
				}
				var adjustSize = element.width - self.containerWidth,
					margin = parseInt(adjustSize / (element.images.length*2)),
					marginLast = (adjustSize - (element.images.length*2*margin)) + margin;

				_.each(element.images, function (element, index, list) {
					var _width;
					if (index === list.length-1) {
						_width = element.width() - margin - marginLast;
						element.css({
							'margin-left': -margin,
							'margin-right': -marginLast
						});

						element.parent().width(_width);
					} else {
						_width = element.width() - 2*margin;
						element.css({
							'margin-left': -margin,
							'margin-right': -margin
						});
						element.parent().width(_width);
					}
				});

			});
		},
		getRows: function () {
			var distinctRows = [],
				rowIndex = 0,
				_width = 0,
				self = this;

			_.each(self.images, function (element, index) {
				distinctRows[rowIndex] = distinctRows[rowIndex] || [];
				distinctRows[rowIndex]['images'] = distinctRows[rowIndex]['images'] || [];
				distinctRows[rowIndex]['width'] = distinctRows[rowIndex]['width'] || 0;

				var $el = $(element);
				_width += $el.width()+10;
				// console.log(rowIndex);
				// console.log($el);
				if(_width < self.containerWidth) {
					distinctRows[rowIndex]['images'].push($el);
				} else {
					distinctRows[rowIndex]['images'].push($el);
					distinctRows[rowIndex]['width'] = _width;
					_width = 0;
					rowIndex += 1;
				}

			});
			this.adjust(distinctRows);
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );