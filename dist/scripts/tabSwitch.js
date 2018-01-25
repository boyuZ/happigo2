
define(["jquery"], function () {
    class TabSwitch {
        constructor() {
        }
        init(obj) {
            this.cur_index = 0;
            this.margin_right = obj.margin_right;
            let _this = this;
            this.$imgUl = obj.imgUl;
            this.aLi = this.$imgUl.children("li");
            let oLeft = obj.out_box.find(".btn_l").on("click", function () {
                //----------
                if (_this.$imgUl.parent().css("display") == "none") return 0;
                //----------
                _this.cur_index = _this.cur_index == 0 ? _this.cur_index : --_this.cur_index;
                _this.move(obj.every_page_count);
            });
            let oRight = obj.out_box.find(".btn_r").on("click", function () {
                //----------
                if (_this.$imgUl.parent().css("display") == "none") return 0;
                //----------
                var page = Math.ceil(_this.aLi.length / obj.every_page_count);
                _this.cur_index = _this.cur_index == page - 1 ? _this.cur_index : ++_this.cur_index;
                _this.move(obj.every_page_count);
            });
        }
        move(count) {

            if (this.cur_index == 0) {
                this.$imgUl.animate({
                    left: 0
                })
            } else {
                var margin_right = this.margin_right ? this.margin_right : 0;
                this.$imgUl.animate({
                    left: -((this.cur_index * count) * (this.aLi[0].offsetWidth + margin_right))
                })
            }
        }
    }
    return TabSwitch;

})






