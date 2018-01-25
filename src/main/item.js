require(["scripts/config.js"], function () {
    require(["jquery", "counter", "magnifier", "shoppingcar"], function ($, counter, magnifier, shoppingcar) {
        $("#header").load("./header.html");
        $("#footer").load("./footer.html");
        $("#right").load("./right.html");

        //根据地址栏中过的参数，判断当前加载的是哪个商品
        var good_id;
        if (location.href.split("?")[1])
            good_id = location.href.split("?")[1].split("=")[1];
        var data = {
            url: "http://localhost:81/json/items.json",
            type: "GET",
            context: this
        }

        $.ajax(data).then(function (res) {
            res = res.items[good_id];
            rendingPage(res);
            imgTabs(res);
        });

        //页面渲染部分
        function rendingPage(res) {
            $("#good_name").html(res.goods_name);
            $("#over_pic").attr("src", res.pic[0]);
            var str_li = "";
            res.thumbnail.forEach(function (item, index) {
                if (index == 0)
                    str_li += `<li class="on"><img src="${item}" alt=""></li>`;
                else
                    str_li += `<li><img src="${item}" alt=""></li>`;
            })
            $("#top_l_b_ul").html(str_li);
            $("#d_no").html("编号：" + res.goods_commonid);
            $("#overview").attr("data-id", res.goods_commonid);
            $("#detail_r h1").html(res.goods_name);
            $("#detail_r h2").html(res.goods_jingle);
            $("#price1").html(res.goods_price1);
            $("#price2").html(res.goods_price2);

        }
        //计数器
        var obj = {
            btn_sub: "#sub",
            btn_add: "#add",
            input_count: "#counter"
        }
        new counter().init(obj);
        function imgTabs(res) {
            //鼠标滑过小图事件
            var $img_lis = $("#top_l_b_ul li");
            $img_lis.on("mouseover", function () {
                for (var i = 0; i < $img_lis.length; i++) {
                    $($img_lis[i]).removeClass("on");
                }
                var cur_index = $(this).addClass("on").index();
                $("#boost_pic").attr("src", res.zoom[cur_index]);
                $("#over_pic").attr("src", res.pic[cur_index]);
            });
        }

        //放大镜部分
        var para = {
            follow: "#mouse_follow",
            boost: "#boost",
            overview: "#follow_wrap"
        };
        (new magnifier()).init(para);

        //加入购物车运动
        $("#add_car").on("click", function (e) {
            var $div = $("<div></div>");
            $("#over_pic").clone().css({
                width: "100%", borderRadius: "50%"
            }).appendTo($div.css({
                left: e.clientX,
                top: e.clientY,
                zIndex: 9999,
                height: 30, width: 30, position: "fixed"
            }))
            var nleft = $("#rihgt_slider")[0].offsetLeft + $("#shopCart")[0].offsetLeft;
            var nTop = $("#shopCart")[0].offsetTop + $("#f_c_car")[0].offsetTop + $(".f_c_top")[0].offsetTop;
            //
            $div.appendTo("body").animate({
                left: nleft, top: nTop
            }, 1500, function () {
                $div.remove();
            });
        })

        var obj_shppingcar = {
            ele: $("#add_car"),
            count: "#counter",
            cover: false
        }
        shoppingcar.init(obj_shppingcar);

    })
})