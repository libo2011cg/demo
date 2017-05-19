//document.write('<link type="text/css" rel="stylesheet" href="assets/css/index/new.css" />');
LZBUtil.prototype.widget = new LZBWidget();

function LZBWidget(){
};

// 将提供的元素移动到当前显示的屏幕中间
LZBWidget.prototype.moveToScreenCenter = function(ele){
    ele = $( ele);
    var top = Math.max(0,  ($(window).height() - ele.height()) / 2);
    var left = Math.max(0, ($(window).width() - ele.width()) / 2);
    ele.css({
        top: top,
        left: left
    });
}

/*************全屏透明遮罩*************/
LZBWidget.prototype.mask = new LZBWidget_Mask();
function LZBWidget_Mask(){
}
LZBWidget_Mask.prototype.id = 'lzb_widget_mask';
// 全屏透明遮罩
LZBWidget_Mask.prototype.show = function(config){
    var def = {
        // 背景色颜色
        color: '#000000',
        // 透明度
        alpha: 0.25,
        // style z-index
        zIndex: 1000
    };
    config = $.extend({}, def, config);

    this.id = this.id + "-" + (new LZBUtil()).uuid(16);
    var html = '<div id="' + this.id  + '"></div>';
    $('body').append(html);


    $("#" + this.id)
    .css({
        top: '0px',
        left: '0px',
        position: 'absolute',
        width: $('body').width(),
        height: $('body').height(),
        zIndex: config.zIndex,
        backgroundColor: config.color
    })
    .fadeTo(1, config.alpha)
    .show();
    $("html,body").css({
        overflowY: 'hidden'
    })

    return this.id;
}


LZBWidget_Mask.prototype.hide = function(id){
    if((typeof id != 'undefined') && id.length > 0){
        $("#" + id).remove();
    }else{
        $("#" + this.id).remove();
    }

    $("html,body").css({
        overflowY: 'auto'
    })
}

/****************alert******************/
LZBWidget.prototype.alert = function(msg){
    return this.prompt.show({show_cancel:false,content: msg});
}

LZBWidget.prototype.alertEx = function(data, msg){
    if(typeof msg  == 'undefined'){
        var msg = data.ret_msg;
    }else{
        msg = msg.length ? msg : data.ret_msg;
    }
    msg = msg + " [" + data.ret_code + "]";
    return this.alert(msg);
}

/************提示弹窗**************/
LZBWidget.prototype.prompt = new LZBWidget_Prompt();
function LZBWidget_Prompt(){
};

LZBWidget_Prompt.prototype.id = "lzb_widget_prompt";
LZBWidget_Prompt.prototype._data = {};
LZBWidget_Prompt.prototype.show = function(config){
    if(this.id != "lzb_widget_prompt"){
        this.hide();
        this.id = "lzb_widget_prompt";
        this._data = {};
    }
    var widget = new LZBWidget();
    this._data['mask_id'] = widget.mask.show({zIndex: 5000});

    this.id = this.id + "-" + (new LZBUtil()).uuid(16);
    var _this = this;

    var def = {
        'title' : '提示',
        'content': '这是提示',
        'show_cancel': true,
        'confrim_text': '确认',
        'cancel_text': '取消',
        'confrim_callback': function(){},
        'cancel_callback': function(){},
    };

    config = $.extend({}, def, config);

    var html = '<div id="' + this.id  + '"></div>';
    $('body').append(html);
    var node = $('#' + this.id);
    node.css({
            backgroundColor: '#fff',
            minWidth: '400px',
            width: 'auto',
            height: 'auto',
            borderRadius: '4px',
            zIndex: 5100,
            position: 'fixed',
            padding: "20px"
        })
        .append('<div class="title">' + config.title + '</div>')
        .append('<div class="desc">' + config.content + '</div>')
        .append('<div class="button"><a class="btn btnBule">' + config.confrim_text + '</a><a class="btn btnFrame"> ' + config.cancel_text + ' </a></div>');
    node.children("div").css({width: '100%',textAlign: 'center'});
    node.children(".title").css({
        fontSize: "28px"
    });
    node.children(".desc").css({
        fontSize: "18px",
        margin: "20px 0 40px"
    });

    nodeBtnFrame = node.children(".button").children(".btnFrame");
    nodeBtnFrame.css({marginLeft: "20px",});
    if(!config.show_cancel){
        nodeBtnFrame.css({display: 'none'});
    }
    nodeBtnFrame.on("click", function(){
        _this.hide();
        (config.cancel_callback)();
    })
    nodeBtnBule = node.children(".button").children(".btnBule")
    nodeBtnBule.on("click", function(){
        (config.confrim_callback)();
        _this.hide();
    });

    widget.moveToScreenCenter("#" + this.id);

    return this.id
};
LZBWidget_Prompt.prototype.hide = function(){
    $("#" + this.id).remove();
    (new LZBWidget_Mask()).hide(this._data['mask_id']);
}

/************右侧滑动动画**************/
LZBWidget.prototype.dynamic = new dynamic();
function dynamic(){
	  var childDiv=$('<div class="floating-layer ">登录成功</div>');	
	  childDiv.appendTo('body'); 
	  $('.floating-layer').each(function(i, element) {
		 a=(60*i+60)
		 $(this).css('bottom',a) 
		 $(this).addClass('rotatety')
	  });
	  $(document).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",'.rotatety',function(){
		 $(this).remove()
	  })
}


/************加载动画**************/
LZBWidget.prototype.Loading = new LZBWidget_Loading();
function LZBWidget_Loading(){
};

LZBWidget_Loading.prototype.id = "lzb_widget_loading";
LZBWidget_Loading.prototype._data = {};
LZBWidget_Loading.prototype.show = function(){
    if(this.id != "lzb_widget_loading"){
        this.hide();
        this.id = "lzb_widget_loading";
        this._data = {};
    }
    var widget = new LZBWidget();
    this._data['mask_id'] = widget.mask.show({zIndex: 10000, opacity: .4});

    this.id = this.id + "-" + (new LZBUtil()).uuid(16);
    var _this = this;
    var html = '<div id="' + this.id  + '" style="position: fixed;z-index: 10001;"></div>';
    $('body').append(html);
    var node = $('#' + this.id);
    node.append('<div class="sk-circle" style="width: 100px;height: 100px;"> <div class="sk-circle1 sk-child"></div> <div class="sk-circle2 sk-child"></div> <div class="sk-circle3 sk-child"></div> <div class="sk-circle4 sk-child"></div> <div class="sk-circle5 sk-child"></div> <div class="sk-circle6 sk-child"></div> <div class="sk-circle7 sk-child"></div> <div class="sk-circle8 sk-child"></div> <div class="sk-circle9 sk-child"></div> <div class="sk-circle10 sk-child"></div> <div class="sk-circle11 sk-child"></div> <div class="sk-circle12 sk-child"></div> </div>')
        .append('<link rel="stylesheet" type="text/css" href="/assets/common/css/loading.css">');
    widget.moveToScreenCenter($('#' + this.id));

    return _this.id;
}
LZBWidget_Loading.prototype.hide = function(){
    $("#" + this.id).remove();
    (new LZBWidget_Mask()).hide(this._data['mask_id']);
}
