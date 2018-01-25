require(["scripts/config.js"], function () {
    require(["jquery", "cookie", "counter", "shoppingcar"], function ($, cookie, counter, shoppingcar) {
        $("#footer").load("./footer.html");
        //动态生成当前页面
        var data = {
            url: "http://localhost:81/json/items.json",
            type: "GET",
            context: this
        }

        $.ajax(data).then(function (res) {
            res = res.items;
            var slist = $.cookie("shopping_list");
            var alist = JSON.parse(slist);
            if (alist.length) {
                //控制初始界面的显示与隐藏
                $(".no_goods_outer").css({
                    display: "none"
                })
                //-----
                var str = "";
                for (var i = 0; i < alist.length; i++) {
                    // alist[i].id
                    var cur_res = res[alist[i].id];
                    str += `<div class="item_list" id="item_list${i}" data-id="${alist[i].id}">
                                <div class="item_form">
                                    <div class="p_checkbox">
                                        <input type="checkbox" checked="" storeid="shop1" class="cb_s_goods" id="ck_box">
                                    </div>
                                    <div class="p_goods">
                                        <div class="goods_item">
                                            <div class="p_img">
                                                <a target="_blank" href="item.html?id=${alist[i].id}">
                                                    <img src="${cur_res.pic[0]}">
                                                </a>
                                            </div>
                                            <div class="item_msg">
                                                <div class="p_name">
                                                    <a target="_blank" href="item.html?id=${alist[i].id}">${cur_res.goods_name}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p_prices">
                                        <p class="p_prices1">￥${cur_res.goods_price1}</p>
                                        <p class="p_prices2">￥<b>${cur_res.goods_price2}</b></p>
                                    </div>
                                    <div class="p_quantity">
                                        <div class="quantity_form" id="quantity_form${i}">
                                            <a class="a_decrease " href="javascript:void(0);">-</a>
                                            <input maxlength="3" type="text" value="${alist[i].num}">
                                            <a class="a_add" href="javascript:void(0);">+</a>
                                        </div>
                                    </div>
                                    <div class="p_sum">
                                        <strong>￥
                                            <em>${alist[i].num * cur_res.goods_price2}</em>
                                        </strong>
                                    </div>
                                    <div class="p_ops">
                                        <a href="javascript:void(0);" class="car_remove" id="car_remove">删除</a>
                                    </div>
                                </div>
                            </div>`;
                }
                $("#item_outer").html(str);
                for (var p = 0; p < $(".item_list").length; p++) {
                    var outer = "#quantity_form" + p;
                    //计数器
                    var obj_counter = {
                        btn_sub: outer + " .a_decrease",
                        btn_add: outer + " .a_add",
                        input_count: outer + " input"
                    }
                    new counter().init(obj_counter);
                    //-----end
                    //删除----
                    var item_lst = "#item_list" + p;
                    !function (item_lst) {
                        var data_id = $(item_lst).attr("data-id");
                        $(item_lst + " #car_remove").on("click", function () {
                            //确认删除吗？

                            //删除cookie中的数据
                            shoppingcar.removeList(data_id);
                            console.log(JSON.parse($.cookie("shopping_list")))
                            $(item_lst).remove();
                            sum();
                            if ($(".item_list").length <= 0) {
                                $(".no_goods_outer").css({
                                    display: "block"
                                })
                            }
                        })
                        //-----end
                        //++-------------------------
                        var obj_shppingcar = {
                            cur_id: data_id,
                            count: obj_counter.input_count,
                            cover: true
                        }
                        $(obj_counter.btn_sub).on("click", function () {
                            shoppingcar.changeList(obj_shppingcar);
                            $(item_lst + " .p_sum em").html($(obj_shppingcar.count).val() * ($(item_lst + " .p_prices2 b").html()));
                            sum();
                        })
                        //--
                        $(obj_counter.btn_add).on("click", function () {
                            shoppingcar.changeList(obj_shppingcar);
                            $(item_lst + " .p_sum em").html($(obj_shppingcar.count).val() * ($(item_lst + " .p_prices2 b").html()));
                            sum();
                        })
                        //内容发生改变，即手动输入的时候
                        $(obj_counter.input_count).change(function () {
                            shoppingcar.changeList(obj_shppingcar);
                            $(item_lst + " .p_sum em").html($(obj_shppingcar.count).val() * ($(item_lst + " .p_prices2 b").html()));
                            sum();
                        })
                        //------------------------
                    }(item_lst)
                }
                //实时计算总数
                sum();
                $(".cb_s_goods").change(function () {
                    sum();
                })
                selectAll("#order_check,#cbox_djj_ck,#s_allgoods_ck", ".cb_s_goods,#cbox_djj_ck,#s_allgoods_ck,#order_check");
            } else {
                $(".no_goods_outer").css({
                    display: "block"
                })
            }
        });

        function sum() {
            //首先获取所有被选中的元素
            var c_arr = Array.from($(".item_list"));
            var sum = 0, count = 0;
            c_arr.forEach(function (item, index) {
                if ($(item).find("#ck_box")[0].checked) {
                    sum += parseInt($(item).find(".p_sum em").html());
                    count++;
                }
            })
            //总数
            $("#sunm").html(count);
            $("#cartTotal").html(sum);

            /*  //总价
             var arr = Array.from($(".p_sum em"));
             var sum = 0;
             arr.forEach(function (item, index) {
                 sum += parseInt(item.innerHTML);
             })
             //总数
             $("#sunm").html($(".item_list").length);
             $("#cartTotal").html(sum); */
        }
        function selectAll(select, all) {
            $(select).change(function () {
                var checked_flag = this.checked;
                var arr = Array.from($(all));
                arr.forEach(function (item) {
                    item.checked = checked_flag;
                })
                sum();
            })
        }
    })
})