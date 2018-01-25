define(["jquery", "tab", "tabswitch"], function ($, tab, tabswitch) {

    //限时抢购-----------------
    //需要分三种情况添加
    var opts_xsqg = {
        url: "http://localhost:81/json/xsqg.json",
        type: "GET",
        context: this
    }
    class Floor {
        constructor() {
        }
        init() {
            $.ajax(opts_xsqg).then(function (res) {
                //console.log(res);
                for (var r in res) {
                    var time_type = res[r].time;
                    var status, ul, clsn, txt;
                    var date = new Date();
                    var hour = date.getHours();
                    var local = "http://localhost:81/item.html"
                    //console.log(hover);
                    switch (true) {
                        case (hour - time_type) >= 0 && (hour - time_type) <= 4: {
                            status = "立即抢购";
                            clsn = "li_start";
                            txt = "距结束";
                        }
                            break;
                        case (hour - time_type) < 0: {
                            status = " 提前看看";
                            clsn = "li_wait";
                            txt = "距开始";
                        }
                            break;
                        case (hour - time_type) > 4: {
                            status = "结束";
                            clsn = "li_over";
                            txt = "已结束"
                        }
                            break;
                        default: break;
                    }
                    switch (time_type) {
                        case 9: ul = "#fl_ul1"; break;
                        case 15: ul = "#fl_ul2"; break;
                        case 20: ul = "#fl_ul3"; break;
                        default: continue;
                    }

                    var str = `<li class="${clsn}" data-id="${res[r].goods_commonid}">
                   <div class="item_img"><a href="${local + "?id=" + res[r].goods_commonid}"><img src="${res[r].pic}" alt=""></a></div>
                   <div class="xsqg_djs">
                       <div class="div_xsqg_djs_time">
                           <i class="div_xsqg_djs_time"></i>
                           ${txt}
                                   <span class="i_xsqg_timer">02:42:09</span>
                       </div>
                   </div>
                   <h5>${res[r].goods_jingle}</h5>
                   <p><a href="${local + "?id=" + res[r].goods_commonid}">${res[r].goods_maidian}</a></p>
                   <div class="xsqg_btn">
                       <div class="xsqg_l">
                           <span class="xsqg_p1">¥<strong>${res[r].goods_price1}</strong></span>
                           <span class="xsqg_p2">${res[r].goods_price2}</span>
                       </div>
                       <a href="${local + "?id=" + res[r].goods_commonid}" class="xsqg_buy">${status}</a>
                   </div>
               </li>`;

                    $(ul).width(($(ul).find("li").length + 1) * 202).height(330);
                    $(ul)[0].innerHTML += str;
                }
                //生成选项卡
                new tab().init({
                    btn: "#floor_title1 li",
                    content: "#floor1_con .d_ul",
                    active: "on",
                    type: "hover"
                })
                //按钮换页
                var arr_ul = Array.from($("#floor1_con").find("ul"));
                arr_ul.forEach(function (item, index) {
                    let obj_f = {
                        out_box: $("#floor1"),
                        imgUl: $(item),
                        every_page_count: 5,
                        margin_right: 10
                    }
                    new tabswitch().init(obj_f);
                })

            });
        }
    }

    return new Floor();
});