$(document).ready(function (e) {
    var wms2 = new WidgetSelector({
        title: "选择期限",
        lang: "zh-cn",
        data: [{text: "1个月"}, {text: "2个月"}, {text: "3个月"}, {text: "4个月"}, {text: "5个月"}, {text: "6个月"}, {text: "7个月"}, {text: "8个月"}, {text: "9个月"}, {text: "10个月"}, {text: "11个月"}, {text: "12个月"}]
    });
    wms2.onSelect = function (list) {
        $('body').animate({'margin-top': '0px'}, 100);
        document.removeEventListener('touchmove', wms2.handler, false);
        $("#selected-time").text(list[0].text);
    };
    ModuleTouch.tap("#guarantee-time", function () {
        wms2.show();

        var a = ($(document).height());//窗口文档的高度
        var b = ($(window).height());//可视窗口的高度
        var c = ($('#guarantee-time').height());//点击的盒子的高度
        var d = ($('#guarantee-time').offset().top);//盒子距离顶部的距离
        var e = $(document).scrollTop();//页面被卷曲的高度
        var f = $('.widgetSelectorBody').height();//选择框的高度

        var g = b - (d - e + c);//点击的盒子距离底部的距离
        if (f > g) {
            var toTop = f - g;
            $('body').animate({'margin-top': -toTop + 'px'}, 100)
        }
        document.addEventListener("touchmove", wms2.handler, false);
        document.getElementsByClassName('widgetSelectorBody')[0].addEventListener('touchmove', function (e) {
            e.stopPropagation();
        }, false);
        return false;
    });

});