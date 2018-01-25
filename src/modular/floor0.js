define([
    'tabswitch',
    'jquery', "loaddata", "template"
], function (tabswitch, $, loaddata, template) {
    //今日直播+昨日疯抢部分
    function loadList(obj) {

        //数据获取
        var data = {
            act: "index",
            op: "floorMore",
            token: "ok",
            type: "info",
            pc_id: obj.pc_id
        }

        var str_tl = `<ul class="<%=cln%>">
                <% for(var i=0; i < Object.keys(data).length; i++) { %>
                                <li class="hot_item" data-id="<%=data[i].goods_commonid%>">
                                <div class="item_img"><a href="javascript:void(0);"><img src="<%=data[i].pic%>" alt=""></a></div>
                                <h5><%=data[i].goods_jingle%></h5>
                                <p><a href=""><%= data[i].goods_name %></a></p>
                                <div class="price">
                                    <strong>¥</strong><span><%= data[i].goods_price1 %></span><i>¥<%= data[i].goods_price2 %></i>
                                </div>
                                <b><%= i+1 %></b>
                            </li>
                            <% } %>
                            </ul>`

        //这样调用，获取数据loaddata(data)

        loaddata(data).then(function (res) {
            var json = JSON.parse(res);
            // console.log(JSON.parse(res));
            //先对json做一个基本的处理
            let count = 0;
            var obj_tl = {};
            for (var key in json.goodsInfo) {
                for (var p in json.goodsInfo[key]) {
                    if (count >= obj.data_max_count) break;
                    obj_tl[count++] = (json.goodsInfo[key][p]);
                }
            }
            // console.log(JSON.stringify(obj_tl));
            //加载字符串模板
            $(".hot_inner").find("." + obj.ul_outer_cls).html(template(str_tl, obj_tl, obj.ul_cls_name)).find("." + obj.ul_cls_name).css({
                width: (180 * (count + 1)),
                height: obj.height,
                position: "absolute"
            })
            //按钮换页
            var obj_page1 = {
                // sLeft: ".btn_l",
                // sRight: ".btn_r",
                out_box: $("#hot_lst"),
                imgUl: $("#hot_inner .ul1"),
                every_page_count: 5
            }
            var obj_page2 = {
                // sLeft: ".btn_l",
                // sRight: ".btn_r",
                out_box: $("#hot_lst"),
                imgUl: $("#hot_inner .ul2"),
                every_page_count: 5
            }

            //tabswitch.init(obj_page);
            if (obj.ul_cls_name == "ul1")
                new tabswitch().init(obj_page1);
            if (obj.ul_cls_name == "ul2")
                new tabswitch().init(obj_page2);

        })
    }
    return loadList;
});