require(["scripts/config.js"], function () {
    require(["jquery", "cookie", "shoppingcar"], function ($, cookie, shoppingcar) {

        $(function () {
            var str_un = $.cookie("user_name");
            if (str_un != "null" && str_un != undefined) {
                $("#h_l span").html("欢迎您，");
                $("#h_l i").css("display", "none");
                $("#admin").css("display", "inline-block").html(str_un).next().css({
                    display: "inline-block"
                });
                $("#login").css("display", "none");
                $("#register").css("display", "none");

            } else {
                $("#h_l span").html("欢迎来到快乐购！");
                $("#h_l i").css("display", "inline-block");
                $("#admin").css("display", "none");
                $("#exit").css("display", "none");
                //
                $("#login").css("display", "inline-block");
                $("#register").css("display", "inline-block");
            }
            $("#exit").on("click", function () {
                $.cookie("user_name", null);
            })
            //shoppingcar
            $("#spc").on("mouseover", function () {
                $("#my_car_list").css("display", "block")
            })
            $("#spc").on("mouseout", function () {
                $("#my_car_list").css("display", "none")
            })


            var data = {
                url: "http://localhost:81/json/items.json",
                type: "GET",
                context: this
            }

            $.ajax(data).then(function (res) {
                res = res.items;
                var slist = $.cookie("shopping_list");

                if (!slist) return 0;
                var alist = JSON.parse(slist);
                if (alist.length) {
                    var str = "";
                    for (var i = 0; i < alist.length; i++) {
                        // alist[i].id
                        var cur_res = res[alist[i].id];
                        str += `<li id="item_li${i}" class="item_li" data-id="${alist[i].id}">
                        <a href="item.html?id=${alist[i].id}" class="car_img" target="_blank">
                            <img src="${cur_res.pic[0]}">
                        </a>
                        <a href="item.html?id=${alist[i].id}" class="car_title" target="_blank">${cur_res.goods_name}</a>
                        <div class="car_p">
                            <p>￥
                                <i>${cur_res.goods_price2}</i>×<b>${alist[i].num}</b></p>
                            <a class="car_del" href="javascript:;" id="car_del">删除</a>
                        </div>
                    </li>`
                    }
                    $(".ul_mycarlist").html(str);
                    sum();
                    for (var p = 0; p < $(".item_li").length; p++) {
                        //删除----
                        var item_lst = "#item_li" + p;
                        !function (item_lst) {
                            var data_id = $(item_lst).attr("data-id");
                            $(item_lst + " #car_del").on("click", function () {
                                //确认删除吗？

                                //删除cookie中的数据
                                shoppingcar.removeList(data_id);
                                console.log(JSON.parse($.cookie("shopping_list")))
                                $(item_lst).remove();
                                sum();
                            })
                            //-----end
                        }(item_lst)
                    }
                    //实时计算总数
                } else {

                }
            });

            function sum() {
                //首先获取所有被选中的元素
                var c_arr = Array.from($(".item_li"));
                var sum = 0;
                c_arr.forEach(function (item, index) {
                    sum += parseInt($(item).find(".car_p i").html()) * parseInt($(item).find(".car_p b").html());
                })
                //总数
                $("#goods_num i").html(c_arr.length);
                $("#all_price i").html(sum);
            }
        })

    })
})