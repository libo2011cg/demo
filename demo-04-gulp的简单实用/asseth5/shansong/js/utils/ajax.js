
// document.write("<script type='text/javascript' src='/asseth5/shansong/js/jquery.form.3.51.0.min.js'></script>");
var ajaxSetting = new AjaxSetting();

LZBUtil.prototype.ajaxRequest = function(config){
    var settings = ajaxSetting.get(config);
    settings.beforeSend = settings.before;
    $.ajax(settings);
}

LZBUtil.prototype.ajaxGet = function(config){
    config.type = 'GET';
    this.ajaxRequest(config);
}

LZBUtil.prototype.ajaxPost = function(config){
    config.type = 'POST';
    this.ajaxRequest(config);
}

LZBUtil.prototype.ajaxSubmit = function(ele,config){
    var settings = ajaxSetting.get(config);
    settings.type = 'POST';
    settings.beforeSubmit = settings.before;
    settings.uploadProgress = settings.process;
    $(ele).ajaxSubmit(settings);
}



/*------配置--------*/
function AjaxSetting(){
    this.async = true;
    this.dataType = 'json';
    this.type = 'GET';
    this.timeout = 5;
    this.showLoading = false;
}

AjaxSetting.prototype.get = function(config){
    var settings = {};
    settings.async = (typeof config.async  == 'undefined') ? this.async : config.async;
    settings.dataType = (typeof config.dataType == 'undefined') ? this.dataType : config.dataType;
    settings.data = (typeof config.data == 'undefined') ? {} : config.data;
    settings.type = (typeof config.type == 'undefined') ? this.type : config.type;
    settings.timeout = ((typeof config.timeout == 'undefined') ? this.timeout : config.timeout) * 1000;
    settings.url = (typeof config.url == 'undefined') ? '' : config.url;
    //settings.data.__ajax = '√';

    var before = function(){};
    if(typeof config.before != 'undefined' && jQuery.isFunction(config.before)){
        before = config.before;
    }
    var widget = new LZBWidget();
    settings.before = function(arr, form, options){
        if(typeof config.showLoading != 'undefined' && config.showLoading){
            //TODO: loading action
            widget.Loading.show();
        }
        before();
    }

    var process = function(event, position, total, percentComplete){}
    if(typeof config.process != 'undefined' && jQuery.isFunction(config.process)){
        process = config.process;
    }
    settings.process = function(event, position, total, percentComplete){
        process(event, position, total, percentComplete);
    }

    var success = function(response){};
    if(typeof config.success != 'undefined' && jQuery.isFunction(config.success)){
        success = config.success;
    }
    settings.complete = function(XMLHttpRequest, textStatus){
        if(typeof config.showLoading != 'undefined' && config.showLoading){
            widget.Loading.hide();
        }
        var response = XMLHttpRequest.responseJSON;
        switch(textStatus){
            case 'success':
                if(typeof response == 'undefined'){
                    widget.alert('解析失败');
                }else{
                    success(response);
                }
                break;
            case 'timeout':
                widget.alert('请求超时');
                break;
            default:
                switch(XMLHttpRequest.status){
                    case 403:
                        location.href = '/';
                        break;
                    case 404:
                        widget.alert('无效请求');
                        break;
                    case 500:
                        widget.alert('请求失败，请稍后重试！');
                        break;
                    case 0:
                        console.log(XMLHttpRequest);
                        break;
                    default:
                        widget.alert('请求失败');
                        break;
                }
                break;
        }
    }
    return settings;
}

