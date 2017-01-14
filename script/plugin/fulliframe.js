
$.fn.fit = function() {
    function getSize(obj, callback) {
        var size = { width: 0, height: 0 },
            originalWidth = obj.data('original-width'),
            originalHeight = obj.data('original-height'),
            onDone = function() {
                (originalWidth === undefined) && obj.data('original-width', size.width);
                (originalHeight === undefined) && obj.data('original-height', size.height);
                $.isFunction(callback) && callback.call(obj, size);
            };

        if (originalWidth && originalHeight) {
            size.width = originalWidth;
            size.height = originalHeight;
        } else if (obj.is('img')) {
            var element = obj.get(0);
            if (element.complete || element.readyState === 4 || (element.width && element.height)) {
                size.width = element.naturalWidth || obj.width();
                size.height = element.naturalHeight || obj.height();
            } else {
                var image = new Image();
                image.onload = function(event) {
                    image.onload = image.onerror = null;
                    size.width = image.naturalWidth || image.width;
                    size.height = image.naturalHeight || image.height;
                    onDone();
                };

                image.onerror = function(event) {
                    image.onload = image.onerror = null;
                    onDone();
                };

                image.src = element.src;
                return;
            }
        } else {
            size.width = obj.width();
            size.height = obj.height();
        }
        onDone();
    }

    return this.each(function() {
        getSize($(this), function(size) {
            var item = this,
                boundClass = 'plugin-fitted',
                wrapper = item.parent(),
                clientWidth = wrapper.width(),
                clientHeight = wrapper.height(),
                zoomScale = clientWidth / size.width,
                fittedWidth = size.width * zoomScale,
                fittedHeight = size.height * zoomScale,
                offsetSize = 2,
                marginLeft = 0,
                marginTop = 0;

            if (fittedHeight < clientHeight) {
                zoomScale = clientHeight / size.height;
                fittedWidth = size.width * zoomScale;
                fittedHeight = size.height * zoomScale;
            }

            fittedWidth = Math.round(fittedWidth) + offsetSize;
            fittedHeight = Math.round(fittedHeight) + offsetSize;
            marginLeft = -Math.round(fittedWidth / 2),
                marginTop = -Math.round(fittedHeight / 2);

            item.css({
                display: 'block',
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: fittedWidth,
                height: fittedHeight,
                marginLeft: marginLeft,
                marginTop: marginTop,
            });

            if (!item.hasClass(boundClass)) {
                item.addClass(boundClass);

                if (String(wrapper.css('position')).toLowerCase() === 'static') {
                    wrapper.css('position', 'relative');
                }

                if (String(wrapper.css('overflow')).toLowerCase() !== 'hidden') {
                    wrapper.css('overflow', 'hidden');
                }

                if (String(item.css('visibility')).toLowerCase() === 'hidden') {
                    item.css('visibility', 'visible');
                }

                if (parseFloat(String(item.css('opacity'))) < 1) {
                    item.css('opacity', '1');
                }
            }
        });
    });
};
