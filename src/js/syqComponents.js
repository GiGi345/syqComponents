;(function($){
    var app = {
        init:function(){
            this.components();
        },
        components:function(){
            $.fn.extend({
                //卡片展示器
                syqCardsDisplay:function(param){
                    var elem = this;
                     cardsDisplay(elem,param);
                },
                //轮播组件
                syqSlider:function(param){
                    var elem = this;
                    slider(elem,param)
                }

            })
        }
    }
    app.init();
})(jQuery);

function cardsDisplay(elem,param){
   /* 默认参数 */
   var defaults = {
       width:216,        //卡片默认宽度
       count:5,          //展示卡片个数
       data:[]
   }
   var options = $.extend(true,defaults,param);
   var cardHtml = cardSliderHtml = "";
   /* 卡片内内容 */
   for(var i=0;i<options.data.length;i++){
        cardHtml +='<li class="slider-card">'
                        +'<div class="card-content">' +'<img  src="' + options.data[i].url + '" class="card">'+'</div>'
                        +'<div class="card-content">'
                            +'<p>' + options.data[i].title + '</p>'
                            +'<p><span class="num">+' + options.data[i].num + '</span>'+'</p>'
                        +'</div>'
                    +'</li>'
   }
   /* 整体内容 */
   cardSliderHtml += '<div class="slider-cards">'
                        +'<ul class="slider-cards-ul clearfix">' + cardHtml + '</ul>'
                    +'</div>'
                    +'<div class="card-button">'
                        +'<div class="pre-button">'+'<img src="image/arrow_left.png" alt="向左">'+'</div>'
                        +'<div class="next-button noClick">'+'<img src="image/arrow_right.png" alt="向右">'+'</div>'
                    +'</div>'   
    $(elem).addClass("cardSlider-container");
    $(elem).html(cardSliderHtml);

    /* 功能实现 */
    var cards = $(elem).find(".slider-cards-ul");
    var card = cards.children(".slider-card");
    var ulCards =  $(elem).find(".slider-cards");
    var allcard = card.length;
    var cardsNum = options.count;   
    var cardWidth = options.width;
    var cardsWidth = (cardWidth + 10)*allcard;
    var buttonWidth = $(elem).find(".card-button").width();
    cards.css("width",cardsWidth);
    card.css("width",cardWidth);
    ulCards.css("width",(cardWidth+10)*cardsNum-10);     //卡片容器的宽度
    $(elem).css("width",ulCards.width()+buttonWidth+20);    //整个容器的宽度
    $(elem).find(".pre-button").on("click",function () {
        var that = this;
        var currentLeft = Math.abs(parseInt(cards.css("left")));
        var offsetLeft = parseInt(cardWidth)+currentLeft+10;
        if(offsetLeft<=(cardsWidth-(cardWidth+10)*cardsNum)){
            cards.css("left",-offsetLeft );
            // setTimeout(function(){
            //     cards.css("transform","translateX(-226px)");
            // },2000)
           
            $(that).siblings(".next-button").removeClass("noClick");
        }
        if(offsetLeft<(cardsWidth-(cardWidth+10)*cardsNum)){
            $(that).removeClass("noClick"); 
        }else{
            $(that).addClass("noClick");
        }
    })
    $(elem).find(".next-button").on("click",function () {
        var that = this;
        var currentLeft = Math.abs(parseInt(cards.css("left")));
        var offsetLeft = currentLeft-parseInt(cardWidth)-10;
        if(offsetLeft>=0){
            cards.css("left",-offsetLeft );
            $(that).siblings(".pre-button").removeClass("noClick");
        }
        if(offsetLeft>0){
            $(that).removeClass("noClick");
        }else {
            $(that).addClass("noClick");
        }
    
    })

}
function slider(elem,param){
    /* 默认参数 */
    var defaults = {
        width:216,        //卡片默认宽度
        count:5,          //展示卡片个数
        data:[]
    }
    var options = $.extend(true,defaults,param);
    var cardHtml = cardSliderHtml = "";
    /* 卡片内内容 */
    for(var i=0;i<options.data.length;i++){
         cardHtml +='<li class="slider-card">'
                         +'<div class="card-content">' +'<img  src="' + options.data[i].url + '" class="card">'+'</div>'
                         +'<div class="card-content">'
                             +'<p>' + options.data[i].title + '</p>'
                             +'<p><span class="num">+' + options.data[i].num + '</span>'+'</p>'
                         +'</div>'
                     +'</li>'
    }
    /* 整体内容 */
    cardSliderHtml += '<div class="slider-cards">'
                         +'<ul class="slider-cards-ul clearfix">' + cardHtml + '</ul>'
                     +'</div>'
                     +'<div class="card-button">'
                         +'<div class="pre-button">'+'<img src="image/arrow_left.png" alt="向左">'+'</div>'
                         +'<div class="next-button noClick">'+'<img src="image/arrow_right.png" alt="向右">'+'</div>'
                     +'</div>'   
     $(elem).addClass("slider-container");
     $(elem).html(cardSliderHtml);
 
     /* 功能实现 */
     var cards = $(elem).find(".slider-cards-ul");
     var card = cards.children(".slider-card");
     var ulCards =  $(elem).find(".slider-cards");
     var allcard = card.length;
     var cardsNum = options.count;   
     var cardWidth = options.width;
     var cardsWidth = (cardWidth + 10)*allcard;
     var buttonWidth = $(elem).find(".card-button").width();
     cards.css("width",cardsWidth);
     card.css("width",cardWidth);
     ulCards.css("width",(cardWidth+10)*cardsNum-10);     //卡片容器的宽度
     $(elem).css("width",ulCards.width()+buttonWidth+20);    //整个容器的宽度
     $(elem).find(".pre-button").on("click",function () {
         var that = this;
         var currentLeft = Math.abs(parseInt(cards.css("left")));
         var offsetLeft = parseInt(cardWidth)+currentLeft+10;
         if(offsetLeft<=(cardsWidth-(cardWidth+10)*cardsNum)){
             cards.css("left",-offsetLeft );
             // setTimeout(function(){
             //     cards.css("transform","translateX(-226px)");
             // },2000)
            
             $(that).siblings(".next-button").removeClass("noClick");
         }
         if(offsetLeft<(cardsWidth-(cardWidth+10)*cardsNum)){
             $(that).removeClass("noClick"); 
         }else{
             $(that).addClass("noClick");
         }
     })
     $(elem).find(".next-button").on("click",function () {
         var that = this;
         var currentLeft = Math.abs(parseInt(cards.css("left")));
         var offsetLeft = currentLeft-parseInt(cardWidth)-10;
         if(offsetLeft>=0){
             cards.css("left",-offsetLeft );
             $(that).siblings(".pre-button").removeClass("noClick");
         }
         if(offsetLeft>0){
             $(that).removeClass("noClick");
         }else {
             $(that).addClass("noClick");
         }
     
     })
 
 }