define(["jquery", "loaddata"], function ($, loaddata) {


    //多个楼层加载-----------------
    class Floor {
        constructor(obj) {
            this.init(obj);
        }
        init(obj) {
            this.ele = $(obj.floor_index);
            this.data_id = this.ele.attr("data-id");
            //数据获取
            var data = {
                act: "index",
                op: "floorMore",
                token: "ok",
                type: "info",
                pc_id: this.data_id
            }
            var _this = this;
            loaddata(data).then(function (res) {
                var json = JSON.parse(res);
                //----
                //console.log(JSON.stringify(json));
                //----

                if (json)
                    _this.json = json;
                //给上面的标签绑定事件，每次滑过，获取到hover_id，从而加载相应的数据
                var arr_btn = Array.from($(obj.btn_li));
                arr_btn.forEach(function (item, index) {
                    $(item).on("mouseover", function () {
                        arr_btn.forEach(function (item1) {
                            $(item1).removeClass("on");
                        })
                        var dat_id = $(item).addClass("on").attr("data-id");
                        _this.rendingCards(dat_id);
                    })
                })
                //加载唯一大图
                _this.loadMainImg();
                //加载底部商标，一次完成加载
                _this.loadBottomLogo();
                //获取到当前的hover_id值
                var hover_id = $(obj.btn_li).first().attr("data-id");
                _this.rendingCards(hover_id);

            })
        }
        loadMainImg() {
            if (this.json["brandBigInfo"])
                this.ele.find(".li_first img").attr("src", this.json["brandBigInfo"]["top_pic"]);
        }
        rendingCards(hover_id) {
            let cur_data = this.json["goodsInfo"][hover_id];
            var arr_li = Array.from(this.ele.find(".hot_item2"))
            arr_li.forEach(function (item, index) {
                var crd = cur_data[index];
                if (crd)
                    $(item).attr("goods-id", crd["goods_commonid"]).find("img").attr("src", crd["pic"]).end()
                        .find("h5").html(crd["goods_jingle"]).end()
                        .find("p").children("a").html(crd["goods_name"]).end().end()
                        .find(".price").children().eq(1).html(crd["goods_price1"]).next().html("¥" + crd["goods_price2"]);
            })
        }
        loadBottomLogo() {
            var logo_arr = this.json["brandInfo"];
            var ele_arr = Array.from(this.ele.find(".floor_hot_pp img"));
            ele_arr.forEach(function (item, index) {
                if (logo_arr[index])
                    $(item).attr("src", logo_arr[index]["brandPic"]);
            })
        }
    }

    return Floor;
});