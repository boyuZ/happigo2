require(["scripts/config.js"], function () {
    require(["jquery"], function ($) {
        //-----
        $("#header").load("./header.html");
        $("#footer").load("./footer.html");
        $("#right").load("./right.html");
        //-----
        require(["banner", "loaddata", "template", "tabswitch", "tab", "fl1", "fl2", "fl3", "fls", "stairsTab", "loadList"], function (ban, loaddata, template, tabswitch, tab, fl1, fl2, fl3, fls, stairsTab, loadList) {
            // //加载头部的html
            // $("#header").load("./header.html");
            // $("#footer").load("./footer.html");
            /*轮播图*/
            $(".full_ban").banner({
                src: [
                    "images/web-101-101-2-1515981584[1].jpg",
                    "images/web-101-101-5-1516071154[1].jpg",
                    "images/web-101-101-1-1515463753[1].jpg",
                    "images/web-101-101-3-1515980168[1].jpg",
                    "images/web-101-101-4-1515463779[1].jpg"
                ],
                autoplay: true,
            })
            /*左侧菜单选项显示隐藏*/
            //创建lst_detail部分

            //var $lst = $(".lst_detail");
            $(".lst_l_ul li").on({
                "mouseover": function () {
                    var $lst = $(this).children("div");
                    if ($lst.length == 0)
                        $lst = $("<div></div>").addClass("lst_detail").appendTo($(this));
                    $lst.show();
                    var $i = $(this).addClass("cur").children("a").css("color", "#ce4261").children("i");
                    var str = $i.attr("class").replace("init", "hover");
                    $i.attr("class", str);
                },
                "mouseout": function () {
                    var $lst = $(this).children("div");
                    $lst.hide();
                    var $i = $(this).removeClass("cur").children("a").css("color", "#000").children("i");
                    var str = $i.attr("class").replace("hover", "init");
                    $i.attr("class", str);
                }
            });

            //左右按钮显示隐藏
            objbtnSH = {
                "mouseover": function () {
                    $(this).find(".btn_l").show();
                    $(this).find(".btn_r").show();
                },
                "mouseout": function () {
                    $(this).find(".btn_l").hide();
                    $(this).find(".btn_r").hide();
                }
            }
            //分别绑定事件
            $("#hotspot").on(objbtnSH);
            $("#floor1").on(objbtnSH);

            var obj_ls1 = {
                pc_id: 1088,//data里的pc_id区分获取的不同的数据
                ul_cls_name: "ul1",
                ul_height: 304,
                data_max_count: 30,
                ul_outer_cls: "dul1"
            }
            loadList(obj_ls1);
            var obj_ls2 = {
                pc_id: 1097,//data里的pc_id区分获取的不同的数据
                ul_cls_name: "ul2",
                ul_height: 304,
                data_max_count: 40,
                ul_outer_cls: "dul2"
            }
            loadList(obj_ls2);
            //选项卡部分
            new tab().init({
                btn: "#hot_title li",
                content: "#hot_inner>div",
                active: "active",
                type: "active"
            })
            //------------结束

            //限时抢购
            fl1.init();

            //新品推荐
            fl2.init();
            $("#change").on("click", function () {
                fl2.load();
            })
            //活动
            fl3.init();
            //重复楼层加载
            for (var i = 4; i <= 10; i++) {
                var obj = {
                    floor_index: "#floor" + i,
                    btn_li: "#floor_title" + i + " li"
                }
                //多层楼加载
                new fls(obj);
            }
            //楼梯选项卡
            var obj = {
                stair: "#left_slider", //左侧楼梯整体
                step: "#left_slider li", //每一层台阶
                level: ".content_con>div:not(.no_stairs)", //每一级内容
                active: "fl_on",
            }
            stairsTab.init(obj);
        })
    })



})