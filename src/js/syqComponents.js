;
(function ($) {
    var app = {
        _init: function () {
            this._components();
        },
        _components: function () {
            $.fn.extend({
                /* 滑动组件 */
                syqSlider: function (param) {
                    var elem = this;
                    sliderApp._init(elem, param);
                }
            })
            $.extend({
                /* 弹窗 */
                syqModal:function(param){
                    modalApp._init(param);
                }
            })

        }
    }
    app._init();
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
/* 模态框 */
var modalApp = {
      /**配置参数
       * @param {object}
       *   - btn       {array}   //内容下方按钮组
       *   - backdrop  {boolean} //是否可以点击背景关闭，默认为true
       *   - isDrag    {boolean}  //是否可以拖动内容块
       */
    _init:function(param){
        var that = this,
            defaults = {
                title:"信息",
                width:200,
                content:"我是默认内容",
                btn:["确定","取消"],
                backdrop:true,            
                isDrag:true             
            },
        options  = $.extend(true,{},defaults,param)
        that._renderDom(options);
        that._event(options);
    },
    _renderDom:function(options){
        var shadeDom = '<div class="syq-modal-shade"></div>',
            shadeCon = '<div class="syq-modal-container"></div>';
        if($("body .syq-modal-container").length == 0){
            var titleConDom = '<div class="modal-title">' + options.title + '</div>'
                            +' <div class="modal-content">' + options.content + '</div>',
                btnsDom = '<div class="modal-btn"></div>',
                closeDom = '<div class="modal-close">'
                            + '<i class="iconfont icon-close"></i>'
                            + '</div>'
                singleBtnDom = "";
            for(var i=0;i<options.btn.length;i++){
                var btnName = options.btn[i];
                if(i == 0){
                    singleBtnDom = '<button class="btn btn-primary">' + btnName + '</button>'
                }else{
                    singleBtnDom = singleBtnDom + '<button class="btn btn-default">' + btnName + '</button>';
                }
                
            }
            $("body").append(shadeDom + shadeCon);
            $(".syq-modal-container").html(titleConDom + btnsDom + closeDom);
            $(".syq-modal-container").css("width",options.width)
            $(".modal-btn").html(singleBtnDom);
        }
    },
    _event:function(options){
        $(".modal-close").on("click",function(){
            $(".syq-modal-shade").remove();
            $(".syq-modal-container").remove();
        })
        if(options.backdrop && $("body .syq-modal-container").length != 0){
            $(document).on("click",function(event){
                console.log(event.target);
                var $popCon = $(".syq-modal-container"),
                    $shade = $(".syq-modal-shade");
                /* 点击目标区域不是内容以及内容内元素 */
                if($shade.is(event.target)&&!$popCon.is(event.target) && $popCon.has(event.target).length == 0){  
                    $(".syq-modal-shade").remove();
                    $(".syq-modal-container").remove();
                }
            })
        }   
        if(options.isDrag){
            var origTop = 0,
                origLeft = 0,
                mouseOrigTop = 0,
                mouseOrigLeft = 0,
                mouseMovedTop = 0,
                mouseMovedLeft = 0,
                diffDisTop = 0,
                diffDisLeft = 0;
            var $moveWrap,dragFlag;
            $(document).on("mousedown",".modal-title",function(e){
                dragFlag = true;
                $moveWrap = $(this).closest(".syq-modal-container");
                origTop = $moveWrap.offsetTop;
                origLeft = $moveWrap.offsetLeft;
                mouseOrigTop = e.clientX;
                mouseOrigLeft = e.clientY;
                diffDisTop = mouseOrigTop - origTop;
                diffDisLeft = mouseOrigLeft - origLeft;
                if(dragFlag){
                    $(document).on("mousemove",function(e){
                        mouseMovedTop = e.clientX;
                        mouseMovedLeft = e.clientY;
                        $moveWrap.css("top",mouseMovedTop - diffDisTop);
                        $moveWrap.css("left",mouseMovedLeft - diffDisLeft);
                    })
                    $(document).on("mouseup",function(e){
                        console.log($moveWrap)
                        mouseMovedTop = e.clientX;
                        mouseMovedLeft = e.clientY;
                        $moveWrap.css("top",mouseMovedTop - diffDisTop+"px");
                        $moveWrap.css("left",mouseMovedLeft - diffDisLeft+"px");
                        dragFlag = false
                    })
                }
            })
          
           

            // $(document).on("dragover",".syq-modal-shade",function(e){
            //     e.preventDefault();
            // })
            // $(document).on("dragend",".syq-modal-container",function(e){
            //     console.log(origLeft);
            //     console.log(origTop);
            //     console.log(e);
            // })
        }
    }
}