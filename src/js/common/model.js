define([],function(){
    var baseUrl = "./js/data/";
    var model = {
        getSliderData:function(){
            return $.ajax({
                'url':baseUrl + "slider.json"
            })
        }
    }
    return model;
})