var self = document.querySelector('.slider-container');
var $pic =  $(self).find(".pic"),
    $allWidth = $(self).find(".allWidth"),
    $leftBtn = $(self).find(".left-btn"),
    $rightBtn = $(self).find(".right-btn"),
    $copyPic = $pic.clone(true);
    singleWidth = $pic.width() + 1,
    allCardsNum = $pic.length,             //卡片的数量
    displayNum = 3,            //展示图片数
    allCardsLength = singleWidth*allCardsNum,   //初始所有卡片的长度
    displayLength = singleWidth*displayNum,
    rollingNum = 4,         //一次滚动图片数
    amimateTime = 1000;       //动画执行的时间

$allWidth.css("width",2*allCardsLength);
$allWidth.append($copyPic);

var animateFlag = true;
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
$rightBtn.on("click",function(){
    var currentLeft,moveDistance;
    currentLeft = Math.abs(parseInt($allWidth.css("left")));
    if(currentLeft <=allCardsLength){    
        $allWidth.css("left",-(allCardsLength  + currentLeft));
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

