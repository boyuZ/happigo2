const gulp = require("gulp");//加载gulp模块;
const connect = require("gulp-connect");//加载 gulp-connect 插件;
const sass = require("gulp-sass-china");

gulp.task("html", () => {
	return gulp
		.src(["page/*.html"])
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());//自动刷新;
})

gulp.task("script", () => {
	return gulp
		.src(["src/libs/*.js", "src/main/*.js", "src/modular/*.js"])
		.pipe(connect.reload())
		.pipe(gulp.dest("dist/scripts"))
})

gulp.task("sass", () => {
	return gulp.src('src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/css'));
})

gulp.task("watch", () => {
	gulp.watch(["page/*.html"], ["html"]);
	gulp.watch(["src/libs/*.js", "src/main/*.js", "src/modular/*.js"], ["script"]);
	gulp.watch(["src/scss/*.scss"], ["sass"]);
})

gulp.task('server', function () {
	connect.server({
		root: 'dist',//以谁为服务器根目录
		port: 88,// 端口号 
		livereload: true //开启自动刷新;
	});
});


gulp.task("default", ["watch", "server"]);







/* const gulp = require("gulp");//加载gulp模块;
const connect = require("gulp-connect");//加载 gulp-connect 插件;
// const babel = require("gulp-babel");//加载gulp-babel 插件；
const sass = require("gulp-sass-china");


gulp.task("html",()=>{
	return gulp
				.src(["page/*.html"])
			 	.pipe(gulp.dest("dist"))
			 	.pipe(connect.reload());//自动刷新;
})
gulp.task("watch",()=>{
	gulp.watch(["src/scss/*.scss","page/*.html"],["sass","html"]);
})
gulp.task('server',function(){
    connect.server({
        root:'dist',  //以谁为服务器根目录
        port:88,  // 端口号 
        livereload:true //开启自动刷新;
    });
});

gulp.task("sass",()=>{
	 return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

gulp.task("default",["watch","server"]); */