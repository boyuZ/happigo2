define(["jquery"], function ($) {

    //新品推荐-----------------
    var opts = {
        url: "http://localhost:81/json/xsqg.json",
        type: "GET",
        context: this
    }
    class Floor {
        constructor() {
            this.index = 20;
        }
        init() {

            $.ajax(opts).then($.proxy(this.load, this));
        }
        load(res) {
            if (res) {
                this.res = res;
            }
            //加载资源
            var obj_length = Object.keys(this.res).length;
            // console.log(Object.keys(res).length )
            var adder = 0;
            while (adder < 5) {
                $("#fl_con2 li").eq(adder).find("img").attr("src", this.res[this.index].pic).end()
                    .find("h5").html(this.res[this.index].goods_jingle).end()
                    .find("p").children("a").html(this.res[this.index].goods_name).end().end()
                    .find(".price").children("span").html(this.res[this.index].goods_price1).end()
                    .children("i").html("¥" + this.res[this.index].goods_price2);
                this.index = obj_length - 1 == this.index ? 0 : (++this.index);
                adder++;
            }
        }
    }

    return new Floor();
});