define(["jquery"], function ($) {

    var para = {
        follow: "#mouse_follow",//鼠标跟随
        boost: "#boost",//放大的图片
        overview: "#follow_wrap"//整个图片显示区域最外层的遮罩层
    }

    class Magnifier {
        constructor() { }
        init(para) {
            this.$boost = $(para.boost);
            this.$overview = $(para.overview);
            this.$follow = $(para.follow);
            //计算比例
            this.propX = this.$boost.width() / this.$follow.width();
            this.propY = this.$boost.height() / this.$follow.height();
            var _this = this;
            //事件绑定
            this.$overview.on({
                "mouseover": function (e) {
                    //触发---放大镜功能开始
                    _this.$boost.css("display", "block");
                    _this.$follow.css("display", "block");
                },
                "mouseout": function () {
                    //离开---放大镜功能结束
                    _this.$boost.css("display", "none");
                    _this.$follow.css("display", "none");
                },
                "mousemove": $.proxy(this.mouseMove, this)
            });
        }
        mouseMove(e) {
            var $e = $(e);
            //获取当前值
            var nleft = $e[0].offsetX - this.$follow.height() / 2;
            var ntop = $e[0].offsetY - this.$follow.width() / 2;
            //边界检测
            nleft = nleft <= 0 ? 0 : nleft;
            ntop = ntop <= 0 ? 0 : ntop;
            //
            var max_width = this.$overview[0].offsetWidth - this.$follow.width();
            var max_height = this.$overview[0].offsetHeight - this.$follow.height();
            //
            nleft = nleft >= max_width ? max_width : nleft;
            ntop = ntop >= max_height ? max_height : ntop;
            //follow移动
            this.$follow.css({
                left: nleft,
                top: ntop
            })
            this.boostChange(nleft, ntop);
        }
        boostChange(nleft, ntop) {
            //大图变换
            var bigLeft = nleft * this.propX;
            var bigTop = ntop * this.propY;

            this.$boost.find("img").css({
                left: -bigLeft,
                top: -bigTop
            })
        }
    }

    return Magnifier;
});