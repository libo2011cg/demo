function LZBUtil(){
}

LZBUtil.prototype.bytesToSize = function(bytes){
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

LZBUtil.prototype.getFileName = function(o){
    var pos = o.lastIndexOf("\\");
    return o.substring(pos+1);
};

LZBUtil.prototype.uuid = function(len, radix){
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
}

LZBUtil.prototype.getObjectURL = function(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url;
};

LZBUtil.prototype.getCode = function(code){
    return Number(code.toString().substr(-3));
}

LZBUtil.prototype.isMail = function(mail){
    return /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($.trim(mail));
}

/*
LZBUtil.prototype.isPwd = function(pwd){
    return /[0-9A-Za-z]{8,18}$/.test($.trim(pwd));
}
*/

LZBUtil.prototype.isPwd = function(pwd){
    /*
    // 8 -18
    if(pwd.length < 8 || pwd.length > 18) {
        return false;
    }
    // 必须有 数字
    if(!/[0-9]{1,}/.test($.trim(pwd))) {
        return false;
    }
    // 必须有 大写字母
    if(!/[A-Z]{1,}/.test($.trim(pwd))) {
        return false;
    }
    // 必须有 小写字母
    if(!/[a-z]{1,}/.test($.trim(pwd))) {
        return false;
    }
    // 必须有 特殊字符
    if(!/[~!@#$%^&*]{1,}/.test($.trim(pwd))) {
        return false;
    }
    */

    if((pwd.length < 8 || pwd.length > 18) ||
            !/[0-9]{1,}/.test($.trim(pwd)) ||
            !/[a-z]{1,}/.test($.trim(pwd)) ||
            !/[A-Z]{1,}/.test($.trim(pwd)) ||
            !/[~!@#$%^&*\(\)\_\-]{1,}/.test($.trim(pwd))
        ) {
        return false;
    }
    return true;
}

LZBUtil.prototype.isName = function(name) {
    return /[\u4e00-\u9fa5_a-zA-Z0-9]$/.test($.trim(name))
}

LZBUtil.prototype.isCellphone = function(cellphone) {
    return /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[1,0,6,7,8]{1}\d{8}$|^18[\d]{9}|^168\d{8}$/.test($.trim(cellphone));
}


LZBUtil.prototype.isIDCard = function(idno) {
   return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test($.trim(idno));
}
