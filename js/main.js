(function ($) {
	$(window).load(function () {
		var container = $('.container'),
			images = container.find('img'),
			imgLoaded = 0,
			imgTotal = images.length,
			containerWidth = container.width(),
			adjust = function (distinctRows) {
				_.each(distinctRows, function (element, index, list) {
                    console.log(index, list.length);
					if( index === list.length-1) {
						console.log(index);
						return;
					}
					var adjustSize = element.width - containerWidth,
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
			}
			getRows = function () {
				var distinctRows = [],
					rowIndex = 0,
					_width = 0;
				_.each(images, function (element, index) {
					distinctRows[rowIndex] = distinctRows[rowIndex] || [];
					distinctRows[rowIndex]['images'] = distinctRows[rowIndex]['images'] || [];
					distinctRows[rowIndex]['width'] = distinctRows[rowIndex]['width'] || 0;
					var $el = $(element);
					_width += $el.width()+10;
					// console.log(rowIndex);
					// console.log($el);
					if(_width < containerWidth) {
						distinctRows[rowIndex]['images'].push($el);
					} else {
						distinctRows[rowIndex]['images'].push($el);
						distinctRows[rowIndex]['width'] = _width;
						_width = 0;
						rowIndex += 1;
					}

				});
				adjust(distinctRows);
			};
			// rows = getRows();
	});
	console.log('jquery loaded');
	console.log($.fn);
	$('.container').griddify();
}(jQuery));
