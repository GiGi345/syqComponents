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

/* 滑动组件 */
var sliderApp = {
    $elem:null,       //元素本身
    options:null,        //配置参数
    _init:function(elem, param){
        var that = this;
        that.$elem = elem;
        //默认配置
        if (param.data.length == 0) {
            throw new Error("data不能为空");
        }
        defaults = {
            type:1,             //滑动组件的类型，1：纯图片，2：有商品内容
            width:800,          //滑动组件宽度
            disPlayNum: 4,      //可展示的卡片数
            rollingNum: 4,      //每次滑动的卡片数
            animateTime: 1000,  //动画的速度
            autoPlay: true       //是否自动播放
        }
        that.options = $.extend(true, defaults, param),
        that._renderDom();
        that._event();
        if(that.options.autoPlay){
            that.isAutoPlay();
        }
    },
    /* 渲染dom结构 */
    _renderDom: function () {
        var that = this;
        var data,containerWidth,cardWidth,allCardsLength;
        data = that.options.data;
        containerWidth = that.options.width;
        disPlayNum = that.options.disPlayNum;
        cardWidth = containerWidth / disPlayNum;
        that.$elem.addClass("slider-container");
        var ulDom, liDom, btnDom;
        ulDom = '<ul class="allWidth clearfix"></ul>';
        btnDom = ' <button class="left-btn"><</button>' +
            '<button class="right-btn">></button>'
        that.$elem.append(ulDom);
        that.$elem.append(btnDom);
        data.forEach(function (elem) {
            var type = that.options.type,
                imgUrl = elem.imgUrl,
                product = elem.product,
                newPrice = elem.newPrice,
                oldPrice = elem.oldPrice;
            if(type == 2){
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
            if(type == 1){
                liDom = '<li class="pic">' +
                '<img src=' + imgUrl + ' alt="slider" class="imgSlider">' +
                '</li>'
            }
            that.$elem.find(".allWidth").append(liDom);
        })
        that.$elem.css("width",containerWidth);
        that.$elem.find(".pic").css("width",cardWidth);
        allCardsLength = that.$elem.find(".pic").length * cardWidth;  //初始所有卡片的长度
        var $copyPic = that.$elem.find(".pic").clone(true);
        that.$elem.find(".allWidth").css("width",2*allCardsLength);
        that.$elem.find(".allWidth").append($copyPic);
    },
    /* 事件 */
    _event:function(){
        var that = this;
        var $pic =  that.$elem.find(".pic"),
            $allWidth = that.$elem.find(".allWidth"),
            $leftBtn = that.$elem.find(".left-btn"),
            $rightBtn = that.$elem.find(".right-btn"),
            $copyPic = $pic.clone(true);
            singleWidth = $pic.width() + 1,
            allCardsLength = singleWidth * allCardsNum,
            displayNum = that.options.disPlayNum,            //展示图片数
            displayLength = singleWidth * displayNum,
            rollingNum = that.options.rollingNum,         //一次滚动图片数
            amimateTime = that.options.amimateTime;       //动画执行的时间
        /* 左移 */
        $leftBtn.on("click",function(){
            var currentLeft,moveDistance;
            currentLeft = Math.abs(parseInt($allWidth.css("left"))),
            moveDistance = currentLeft + singleWidth*rollingNum;
            if(animateFlag){
                animateFlag = false;
                $allWidth.animate({left:- moveDistance},amimateTime,function(){
                    var currentRight = parseInt($allWidth.css("right"));
                    if(currentRight >= 0){
                        $allWidth.css("left",-(allCardsLength - (displayLength - currentRight)));
                    }
                    animateFlag = true;
                });
            }
        })
        /* 右移 */
        $rightBtn.on("click",function(){
            var currentLeft,moveDistance;
            currentLeft = parseInt($allWidth.css("left"));
            if(currentLeft>=0){    
                $allWidth.css("left",-(allCardsLength  +  Math.abs(currentLeft)));
            }
            currentLeft = Math.abs(parseInt($allWidth.css("left"))),
            moveDistance = currentLeft - singleWidth*rollingNum;
            if(animateFlag){
                animateFlag = false;
                $allWidth.animate({left:-moveDistance},amimateTime,function(){
                    animateFlag = true;
                });  
            }
        })
    },
    /* 自动播放 */
    isAutoPlay:function(){
        var that = this,
            $rightBtn = that.$elem.find(".right-btn"),
            timer;
       function play(){
            timer = setInterval(function(){
                $rightBtn.click();
            },1000)
        };
        play();
        function stop(){
            clearInterval(timer);
        }
        that.$elem.on("mouseover",function(){
            stop();
        })
        that.$elem.on("mouseout",function(){
            play();
        })
    }

}