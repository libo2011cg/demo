var WidgetSelector = (function () {
    function WidgetSelector(opts) {
        this._lang = "en-us";
        this.langList = {
            "en-us": {
                "cancel": "Cancel",
                "ok": "OK"
            },
            "zh-cn": {
                "cancel": "取消",
                "ok": "确定"
            },
            "zh-tw": {
                "cancel": "取消",
                "ok": "確認"
            }
        };
        this._title = "Selector";
        this.onSelect = function () { };
        var dom = $("<div class=\"widgetSelector\">\n            <div class=\"widgetSelectorBody\">\n                <div class=\"widgetSelectorTitle\">\n                    <div class=\"widgetSelectorLeft\">Cancel</div>\n                    <div class=\"widgetSelectorText\">Selector</div>\n                    <div class=\"widgetSelectorRight\">OK</div>\n                </div>\n                <div class=\"widgetSelectorContent\">\n                    <div class=\"widgetSelectorList\">\n                        <div class=\"widgetSelectorBlank\"></div>\n                    </div>\n                    <div class=\"widgetSelectorList\" style=\"display: none;\"></div>\n                    <div class=\"widgetSelectorList\" style=\"display: none;\"></div>\n                    <div class=\"widgetSelectorTop\"></div>\n                    <div class=\"widgetSelectorBottom\"></div>\n                </div>\n            </div>\n        </div>");
        ModuleTouch.tap(dom, (function (e) {
            if ($(e.target).hasClass("widgetSelector")){
                $('body').animate({'margin-top':'0px'},100);
                this.hide();
            }
            return false;
        }).bind(this));
        ModuleTouch.tap(dom.find(".widgetSelectorLeft"), (function () {
            this.hide();
            $('body').animate({'margin-top':'0px'},100);
            document.removeEventListener('touchmove', this.handler, false);
            return false;
        }).bind(this));
        ModuleTouch.tap(dom.find(".widgetSelectorRight"), (function () {
            var list = [];
            dom.find(".widgetSelectorSelected").each(function (i, item) {
                var itemDom = $(item);
                list.push({
                    // text: itemDom.text(),
                    // value: itemDom.attr("value")
                    text: itemDom.text(),
                    value: itemDom.attr("time"),
                    price: itemDom.attr("price"),
                    period: itemDom.attr("period")
                });
            });
            if (this.onSelect(list) !== false)
                this.hide();
            return false;
        }).bind(this));
        $("body").append(dom);
        var listDom1 = dom.find(".widgetSelectorList:eq(0)");
        var i = 0;
        for (var _i = 0, _a = opts.data; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.value === undefined)
                item.value = item.text;
            var itemDom = $("<div class=\"widgetSelectorItem\" price=\"" + item.price + "\" period=\"" + item.period + "\" time=\"" + item.time + "\"  value=\"" + item.value + "\">" + item.text + "</div>").appendTo(listDom1);
            itemDom.data("data", item.data ? item.data : {});
            if (i === 0) {
                itemDom.addClass("widgetSelectorSelected");
                if (item.data)
                    this.activeItem(itemDom);
            }
            ++i;
        }
        listDom1.append("<div class=\"widgetSelectorBlank\"></div>");
        var listDoms = dom.find(".widgetSelectorList");
        listDoms.each((function (i, item) {
            var listDom = $(item);
            ModuleTouch.scrollEnd(listDom, (function () {
                var itemHeight = parseInt(parseFloat($('html').css('font-size'))*1.2);
                var index = Math.round(listDom.scrollTop() / itemHeight);
                if (listDom.scrollTop() !== index * itemHeight) {
                    listDom.animate({
                        "scrollTop": index * itemHeight + "px"
                    }, 50);
                }
                else {
                    listDom.children(".widgetSelectorItem:eq(" + index + ")").addClass("widgetSelectorSelected").siblings(".widgetSelectorSelected").removeClass("widgetSelectorSelected");
                    this.activeItem(listDom.children(".widgetSelectorSelected"));
                }
            }).bind(this));
        }).bind(this));
        this.dom = dom;
        if (opts.lang) {
            this.lang = opts.lang;
        }
        if (opts.title) {
            this.title = opts.title;
        }
    }
    Object.defineProperty(WidgetSelector.prototype, "lang", {
        get: function () {
            return this._lang;
        },
        set: function (val) {
            if (val !== this._lang) {
                if (this.langList[val]) {
                    this._lang = val;
                    this.dom.find(".widgetSelectorLeft").text(this.langList[val]["cancel"]);
                    this.dom.find(".widgetSelectorRight").text(this.langList[val]["ok"]);
                }
                else {
                    alert("Error: langList[" + val + "] not found!");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetSelector.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (val) {
            if (val !== this._title) {
                this._title = val;
                this.dom.find(".widgetSelectorText").text(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    WidgetSelector.prototype.show = function () {
        this.dom.addClass("widgetSelectorShow");
        $("body").addClass("show-ws");
    };
    WidgetSelector.prototype.hide = function () {
        this.dom.removeClass("widgetSelectorShow");
        $("body").removeClass("show-ws");
        document.removeEventListener('touchmove', this.handler, false);
    };
    WidgetSelector.prototype.activeItem = function (dom) {
        var data = dom.data("data");
        var thisListDom = dom.parents(".widgetSelectorList:eq(0)");
        if (data.length > 0) {
            var nextListDom = thisListDom.next();
            if (thisListDom.hasClass("widgetSelectorList")) {
                nextListDom = thisListDom.next();
                nextListDom.html("<div class=\"widgetSelectorBlank\"></div>").removeAttr("style");
                var i = 0;
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    if (item.value === undefined)
                        item.value = item.text;
                    var itemDom = $("<div class=\"widgetSelectorItem\" value=\"" + item.value + "\">" + item.text + "</div>").appendTo(nextListDom);
                    itemDom.data("data", item.data ? item.data : {});
                    if (i === 0) {
                        itemDom.addClass("widgetSelectorSelected");
                        if (item.data)
                            this.activeItem(itemDom);
                    }
                    ++i;
                }
                nextListDom.append("<div class=\"widgetSelectorBlank\"></div>");
                nextListDom.scrollTop(0);
            }
            else {
                alert("Error: max 3!");
            }
        }
    };
    WidgetSelector.prototype.handler = function () {
        event.preventDefault();
    }
    WidgetSelector.verison = "0.3";
    return WidgetSelector;
}());
$("head:eq(0)").prepend("<style>\nbody.show-ws{overflow: hidden;}\n.widgetSelector{position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, .5); font-size: 14px; z-index: 1000; display: none; -webkit-user-select: none;}\n.widgetSelectorShow{display: block;}\n.widgetSelectorBody{height: 4.1rem; background-color: #f9f9f9; position: absolute; width: 100%; left: 0; bottom: 0;}\n.widgetSelectorTitle{box-sizing: border-box; border-top: 1px solid #cacaca; display: -webkit-box;}\n.widgetSelectorTitle > div{height: 0.8rem; line-height: 0.8rem;}\n.widgetSelectorText{text-align: center; -webkit-box-flex: 2; font-size: 0.32rem; width: 0;}\n.widgetSelectorLeft,.widgetSelectorRight{text-align: center; -webkit-box-flex: 1; width: 0;}\n.widgetSelectorLeft.active-mt,.widgetSelectorRight.active-mt{background-color: rgba(0,0,0,.05);}\n.widgetSelectorContent{box-sizing: border-box; position: relative; background-color: #FFF; display: -webkit-box;}\n.widgetSelectorList{overflow: scroll; height: 3.3rem; -webkit-box-flex: 1; width: 0;}\n.widgetSelectorItem{height: 1.2rem; line-height: 1.2rem; text-align: center;}\n.widgetSelectorBlank{height: 1.2rem;}\n.widgetSelectorTop,.widgetSelectorBottom{height: 1.2rem; background-color: rgba(255,255,255,.7); position: absolute; left: 0; width: 100%; pointer-events: none; box-sizing: border-box;}\n.widgetSelectorTop{top: 0; border-bottom: 1px solid #e1e5e7;}\n.widgetSelectorBottom{bottom: 0; border-top: 1px solid #e1e5e7;}\n</style>");
