;
(function ($) {
    var app = {
        init: function () {
            this.components();
        },
        components: function () {
            $.fn.extend({
                /* 滑动组件 */
                syqSlider: function (param) {
                    var elem = this;
                    sliderApp._init(elem, param);
                }
            })
        }
    }
    app.init();
})(jQuery)
var tr = 0;
/* 滑动组件 */
var sliderApp = {
    _init: function (elem, param) {
        var that = this;
        var $elem,defaults,options;
        $elem = elem;
        $elem.animateFlag = true;        //标志动画
        if (param.data.length == 0) {
            throw new Error("data不能为空");
        }
        //默认配置
        defaults = {
            type: 1,             //滑动组件的类型，1：纯图片，2：有商品内容
            width: 800,          //滑动组件宽度
            disPlayNum: 4,      //可展示的卡片数
            rollingNum: 4,      //每次滑动的卡片数
            animateTime: 1000,  //动画的速度
            autoPlay: true       //是否自动播放
        }
        options = $.extend(true,{}, defaults, param);
            that._renderDom($elem, options);
        that._event($elem, options);
        if (options.autoPlay) {
            that.isAutoPlay(elem, options);
        }
    },
    /* 渲染dom结构 */
    _renderDom: function ($elem, options) {
        var that = this;
        var data, containerWidth, cardWidth, allCardsLength;
        data = options.data;
        containerWidth = options.width;
        disPlayNum = options.disPlayNum;
        cardWidth = containerWidth / disPlayNum;
        $elem.addClass("syq-slider-container");
        var ulDom, liDom, btnDom;
        ulDom = '<ul class="allWidth clearfix"></ul>';
        btnDom = ' <button class="left-btn"><</button>' +
            '<button class="right-btn">></button>'
        if ($elem.html() == "") {                       //避免在同一个DOM重复渲染
            $elem.append(ulDom);
            $elem.append(btnDom);
            data.forEach(function (elem) {
                var type = options.type,
                    imgUrl = elem.imgUrl,
                    product = elem.product,
                    newPrice = elem.newPrice,
                    oldPrice = elem.oldPrice;
                if (type == 1) {
                    liDom = '<li class="pic">' +
                        '<img src=' + imgUrl + ' alt="slider" class="imgSlider">' +
                        '</li>'
                }
                if (type == 2) {
                    liDom = '<li class="pic">' +
                        '<img src=' + imgUrl + ' alt="slider">' +
                        '<div class="productDes">' +
                        '<p class="productName" title="' + product + '">' + product + '</p>' +
                        '<p class="price">' +
                        '<span class="newPrice">' +
                        '<i>¥</i>' +
                        '<span>' + newPrice + '</span>' +
                        '</span>' +
                        '<span class="oldPrice">' +
                        '<i>¥</i>' +
                        '<del>' + oldPrice + '</del>' +
                        '</span>' +
                        '</p>' +
                        ' </div>' +
                        '</li>'
                }
                $elem.find(".allWidth").append(liDom);
            })
            $elem.css("width", containerWidth);
            $elem.find(".pic").css("width", cardWidth);
            allCardsLength = $elem.find(".pic").length * cardWidth;  //初始所有卡片的长度
            var $copyPic = $elem.find(".pic").clone(true);
            $elem.find(".allWidth").css("width", 2 * allCardsLength);
            $elem.find(".allWidth").append($copyPic);
        }

    },
    /* 事件 */
    _event: function ($elem, options) {
        var that = this;
        var $pic = $elem.find(".pic"),
            $allWidth = $elem.find(".allWidth"),
            $leftBtn = $elem.find(".left-btn"),
            $rightBtn = $elem.find(".right-btn"),
            $copyPic = $pic.clone(true),
            singleWidth = $pic.width() + 1,
            allCardsNum = $pic.length / 2,
            allCardsLength = singleWidth * allCardsNum,
            displayNum = options.disPlayNum,            //展示图片数
            displayLength = singleWidth * displayNum,
            rollingNum = options.rollingNum,         //一次滚动图片数
            amimateTime = options.amimateTime;       //动画执行的时间
        /* 左移 */
        $leftBtn.on("click", function () {
            var currentLeft, moveDistance;
                currentLeft = Math.abs(parseInt($allWidth.css("left"))),
                moveDistance = currentLeft + singleWidth * rollingNum;
            if ($elem.animateFlag) {
                $elem.animateFlag = false;
                $allWidth.animate({ left: - moveDistance }, amimateTime, function () {
                    var currentRight = parseInt($allWidth.css("right"));
                    if (currentRight >= 0) {
                        $allWidth.css("left", -(allCardsLength - (displayLength - currentRight)));
                    }
                    $elem.animateFlag = true;
                });
            }
            
        })
        /* 右移 */
        $rightBtn.on("click", function () {
            var currentLeft, moveDistance;
            currentLeft = parseInt($allWidth.css("left"));
            if (currentLeft >= 0) {
                $allWidth.css("left", -(allCardsLength + Math.abs(currentLeft)));
            }
            currentLeft = Math.abs(parseInt($allWidth.css("left"))),
                moveDistance = currentLeft - singleWidth * rollingNum;
            if ($elem.animateFlag) {
                $elem.animateFlag = false;
                $allWidth.animate({ left: -moveDistance }, amimateTime, function () {
                    $elem.animateFlag = true;
                });
            }
        })
    },
    /* 自动播放 */
    isAutoPlay: function ($elem, options) {
        var that = this;
        function play() {
            $elem.timer = setInterval(function () {
                var $leftBtn = $elem.find(".left-btn");
                $leftBtn.click();
            }, 1000);
          
        };
        play();
        function stop(){
            clearInterval($elem.timer);
        }
        $elem.on("mouseover",function(){
            stop();
        })
        $elem.on("mouseout",function(){
            play();
        })
    }

}