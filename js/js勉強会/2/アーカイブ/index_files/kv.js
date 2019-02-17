this.jQuery && (function (window, jQuery) {
    var document = window.document;

    /**
     * CSS zoom プロパティのみサポートしているなら true。<br />
     * transform: scale() をサポートしている、どちらもサポートしていないなら false。
     *
     * @type boolean
     */
    jQuery.support.zoomOnly = (function () {
        var testNode = document.createElement('div'),
            style = testNode.style;

        return !(
            'webkitTransform' in style ||
            'MozTransform' in style    ||
            'msTransform' in style     ||
            'OTransform' in style      ||
            'transform' in style
        ) && 'zoom' in style;
    }());


    jQuery.SimpleRotationBanner = function (/* ... */) {
        this.root = null;
        this.view = null;
        this.itemRoot = null;
        this.items = null;
        this.ctrlRoot = null;
        this.ctrls = null;

        this.nowId = 0;
        this.nowViewSize = 0;
        this.defaultViewSize = 0;
        this.beforeScale = 1;
        this.beforeAdjustDiff = 0;

        this.minViewSize = 0;
        this.minScale = 0;

        this.waitTime = 5000;
        this.waitId = null;
        this.waitDfd = jQuery.Deferred().resolve();

        this.activeCN = 'active';
        this.animatingCN = 'kv_animating';

        this.animateOptions = {
            duration : 500
        };
        this.animateDfd = jQuery.Deferred().resolve();

        this.started = false;

        this._setScaleB = jQuery.proxy(this.setScale, this);
        this._moveNextB = jQuery.proxy(this.moveNext, this);
        this._startB = jQuery.proxy(this.start, this);
        this._stopB = jQuery.proxy(this.stop, this);
        this._waitB = jQuery.proxy(this.wait, this);
        this._clearWaitB = jQuery.proxy(this.clearWait, this);
        this._startAnimationB = jQuery.proxy(this.startAnimation, this);
        this._stopAnimationB = jQuery.proxy(this.stopAnimation, this);

        this.setOptions.apply(this, arguments);
    };

    jQuery.SimpleRotationBanner.prototype = {
        setOptions : function (options) {
            for (o in options) {
                if (options.hasOwnProperty(o)) {
                    this[o] = options[o];
                }
            }

            return this;
        },

        create : function () {
            this.defaultViewSize = this.getMaxItemSize();
            this.setSize();
            this.setScale();
            this.active(this.nowId);

            this.ctrls.each(jQuery.proxy(function (i, item) {
                jQuery(item).on('click.' + this.eventSuffix, jQuery.proxy(function (event) {
                    var dfd;

                    event.preventDefault();

                    if (this.started) {
                        this.stopAnimation(true);
                    }

                    dfd = this.move(i);

                    if (this.started) {
                        dfd.done(this._startAnimationB);
                    }
                }, this));
            }, this));

            jQuery(window).on('resize', this._setScaleB);

            return this;
        },

        destroy : function () {
            this.stop();
            this.ctrls.off('click.' + this.eventSuffix)
            jQuery(window).off('resize', this._setScaleB);
            this.resetScale();
            this.resetSize();
            this.defaultViewSize = 0;

            return this;
        },

        setScale : function () {
            var ret = this,
                minViewSize = this.minViewSize,
                minScale = this.minScale,
                adjustDiff = 0,
                viewSize = this.getViewSize(),
                beforeScale = this.beforeScale,
                scale, value;

            if (viewSize < minViewSize) {
                adjustDiff = (viewSize - minViewSize) / 2;
                // 最小値丸め
                viewSize = minViewSize;
            }

            scale = viewSize / this.defaultViewSize;
            if (scale < minScale) {
                // 最小値丸め
                scale = minScale;
            }

            if (this.beforeAdjustDiff !== adjustDiff) {
                this.beforeAdjustDiff = adjustDiff;
                // 倍率とは無関係に適用する必要がある
                this.view.css('left', adjustDiff);
            }

            // 多重指定を防止
            if (beforeScale !== scale) {
                this.beforeScale = scale;

                if (jQuery.support.zoomOnly) {
                    // IE6-7:
                    //   zoom では包含ブロックのサイズ変更が発生する
                    this.view.css('zoom', scale);
                    // IE8:
                    //   包含ブロックのサイズ変更が発生しない
                    if (7 < (document.documentMode || 0)) {
                        // 前のスタイルをリセット
                        this.root.height('');
                        // 差分を加えて追従させる
                        this.root.css('height', this.root.height() * scale);
                    }
                } else {
                    value = 'scale(' + scale + ')';
                    this.view.css({
                        'webkitTransform' : value,
                        'MozTransform'    : value,
                        'msTransform'     : value,
                        'OTransform'      : value,
                        'transform'       : value
                    });

                    // transform では包含ブロックのサイズ変更が発生しない
                    // 前のスタイルをリセット
                    this.root.height('');
                    // 差分を加えて追従させる
                    this.root.css('height', this.root.height() * scale);
                }
            }

            return this;
        },

        resetScale : function () {
            this.beforeScale = 1;
            this.beforeAdjustDiff = 0;

            if (jQuery.support.zoomOnly) {
                this.view.css({
                    'left' : '',
                    'zoom' : ''
                });
            } else {
                this.view.css({
                    'left'            : '',
                    'webkitTransform' : '',
                    'MozTransform'    : '',
                    'msTransform'     : '',
                    'OTransform'      : '',
                    'transform'       : ''
                });
                this.root.css('height');
            }
        },

        getMaxItemSize : function () {
            var sizes = [],
                items = this.items,
                nitems = items.length,
                i;

            for (i = 0; i < nitems; i++) {
                sizes[i] = items[i].offsetWidth;
            }

            return Math.max.apply(Math.max, sizes);
        },

        getViewSize : function () {
            var size = this.root.innerWidth(),
                max = this.getMaxItemSize();

            if (max <= size) {
                size = max;
            }

            return size;
        },

        setSize : function () {
            var size = this.getMaxItemSize();

            this.nowViewSize = size;
            this.items.width(size);
            this.itemRoot.width(size * this.items.length);
            this.view.width(size);

            return this;
        },

        resetSize : function () {
            this.nowViewSize = 0;
            this.view.width('');
            this.itemRoot.width('');
            this.items.width('');

            return this;
        },

        active : function (afterId) {
            var items = this.items,
                ctrls = this.ctrls,
                activeCN = this.activeCN,
                beforeId = this.nowId;

            if (beforeId !== afterId) {
                items.eq(beforeId).removeClass(activeCN);
                ctrls.eq(beforeId).removeClass(activeCN);
            }

            items.eq(afterId).addClass(activeCN);
            ctrls.eq(afterId).addClass(activeCN);

            this.nowId = afterId;
        },

        inactive : function () {
            var activeCN = this.activeCN,
                beforeId = this.nowId;

            items.eq(beforeId).removeClass(activeCN);
            ctrls.eq(beforeId).removeClass(activeCN);

            this.nowId = 0;
        },

        move : function (id) {
            var root = this.root,
                itemRoot = this.itemRoot,
                dfd = this.animateDfd,
                animatingCN = this.animatingCN,
                nowId = this.nowId,
                nitems = this.items.length;

            id = id % nitems;

            if (id < 0) {
                id = nitems - id;
            }

            if ('pending' !== dfd.state()) {
                dfd = this.animateDfd = jQuery.Deferred();
            }

            dfd.done(function () {
                root.removeClass(animatingCN);
            });

            // アニメーション開始
            root.addClass(animatingCN);
            this.active(id);
            itemRoot.animate({
                'left' : -(id * this.nowViewSize)
            }, this.animateOptions);

            itemRoot.promise().done(dfd.resolve).fail(dfd.reject);

            return dfd.promise();
        },

        movePrev : function () {
            return this.move(this.nowId - 1);
        },

        moveNext : function () {
            return this.move(this.nowId + 1);
        },

        wait : function (time) {
            var dfd = this.waitDfd;

            if ('pending' !== dfd.state()) {
                dfd = this.waitDfd = jQuery.Deferred();

                if ('number' !== typeof time || isNaN(time)) {
                    time = this.waitTime;
                }

                this.waitId = setTimeout(function () {
                    dfd.resolve();
                }, time);
            }

            return dfd.promise();
        },

        clearWait : function () {
            var dfd = this.waitDfd;

            clearTimeout(this.waitId);
            this.waitId = null;

            if ('pending' === dfd.state()) {
                dfd.reject();
            }

            return this;
        },

        startAnimation : function () {
            var itemRoot = this.itemRoot,
                dfd = this.animateDfd;

            if ('pending' !== dfd.state()) {
                dfd = this.animateDfd = jQuery.Deferred();

                if ('number' !== typeof id || isNaN(id)) {
                    id = this.nowId + 1;
                }

                this.wait().done(this._moveNextB).fail(dfd.reject);

                dfd.done(this._startAnimationB);
                dfd.fail(this._clearWaitB);
            }

            return this;
        },

        stopAnimation : function (deep) {
            var animateDfd = this.animateDfd,
                waitDfd = this.waitDfd;

            waitDfd.reject();
            animateDfd.reject();

            if (true === deep) {
                this.itemRoot.stop(true, false);
            }

            return this;
        },

        start : function () {
            if (!this.started) {
                this.started = true;
                this.root.on('mouseenter focusin', this._stopAnimationB);
                this.root.on('mouseleave focusout', this._startAnimationB);
            }

            this.startAnimation();

            return this;
        },

        stop : function (event) {
            if (this.started) {
                this.started = false;
                this.root.off('mouseenter focusin', this._stopAnimationB);
                this.root.off('mouseleave focusout', this._startAnimationB);
            }

            this.stopAnimation();

            return this;
        }
    };

    jQuery(window).on('load', function () {
        jQuery('.kv').addClass('kv_enabled').each(function () {
            var root = jQuery(this),
                view = root.find('.kv_view'),
                itemRoot = root.find('.kv_view_items'),
                items = itemRoot.children(),
                ctrlRoot = root.find('.kv_control'),
                ctrls = ctrlRoot.children(),
                banner;

            banner = new jQuery.SimpleRotationBanner({
                root        : root,
                view        : view,
                itemRoot    : itemRoot,
                items       : items,
                ctrlRoot    : ctrlRoot,
                ctrls       : ctrls,
                minViewSize : 320
            });

            banner.create().start();
        });
    });
}(this, this.jQuery));
