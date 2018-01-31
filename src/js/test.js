var self = $(".slider-container").eq(0)[0];
var picDom =  $(self).find(".pic"),
    allWidthDom = $(self).find(".allWidth"),
    leftBtnDom = $(self).find(".left-btn"),
    rightBtnDom = $(self).find(".right-btn"),
    singleWidth = picDom.width() + 1,
    num = picDom.length,
    displayNum = 4;

allWidthDom.css("width",singleWidth*num)
leftBtnDom.on("click",function(){
    currentLeft = Math.abs(parseInt(allWidthDom.css("left")));
    if(currentLeft<singleWidth*(num - displayNum)){
        allWidthDom.css("left",-(currentLeft + singleWidth)+"px");
        console.log(currentLeft + singleWidth)
    }
})
rightBtnDom.on("click",function(){
    currentLeft = Math.abs(parseInt(allWidthDom.css("left")));
    if(currentLeft>0){
        allWidthDom.css("left",-(currentLeft - singleWidth)+"px")
    }
})

var num = 3,
    list1 = {
        "w":"sds",
        "df":"dfs"
    },
    test = {num,list1};
    console.log(test)