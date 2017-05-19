var gulp = require('gulp');
var concat = require('gulp-concat');                //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css');         //- 压缩CSS为一行；
var rev = require('gulp-rev');                      //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');   //- 路径替换
var clean = require('gulp-clean');                  //- 用于删除文件
var uglify = require('gulp-uglify');                //- 压缩js代码
var imagemin = require('gulp-imagemin');            //- 压缩图片
var q = require('q');                               //- q模块可用于解决任务执行顺序的问题（一个任务执行完毕才执行另外一个任务）

/*清理文件*/
gulp.task('clean',function () {                    //删除dist目录下的所有文件
    gulp.src('dist/*',{read:false})
        .pipe(clean());
});

/*压缩js文件，并生成md5后缀的js文件*/
gulp.task('compress-js',function (callback) {
    gulp.src(['shansong/js/**/*.js'])
        .pipe(uglify())                             //压缩文件
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/js'))                 //另存压缩后的文件
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-js'))                                 //- 将 rev-manifest.json 保存到 rev-js 目录内
        .on('end',function () {
            console.log('compress-js has been completed');
            callback();
        });
});

/*压缩css文件，并生成md5后缀的css文件*/
gulp.task('compress-css', function(callback) {                                //- 创建一个名为 concat 的 task
    gulp.src(['shansong/css/**/*.css'])    //- 需要处理的css文件，放到一个字符串数组里
    // .pipe(concat('css/wap.min.css'))                            //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/css'))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('rev-css'))                                 //- 将 rev-manifest.json 保存到 rev 目录内
        .on('end',function () {
            console.log('compress-css has been completed');
            callback();
        });
});

/*修改其他页面引用的css的文件名，并把html文件输出到指定的位置*/
gulp.task('rev-html',['compress-css','compress-js'], function() {
    gulp.src(['rev-css/*.json','rev-js/*.json', 'shansong/views/**/*.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector())                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('dist/views'));                     //- 替换后的文件输出的目录
});

/*复制图片*/
gulp.task('copy-img',function () {
    gulp.src('shansong/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

/*最终执行的任务-css*/
gulp.task('rev',['rev-html','copy-img']);

//***********************************************************************************************

gulp.task('default', ['clean', 'rev']);

//命令行顺序: clean, rev

