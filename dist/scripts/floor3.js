define(["jquery"], function ($) {

    //精选活动-----------------
    var imgs = ["../images/web-103-123-1-1516091368[1].jpg", "../images/web-103-123-2-1516091294[1].jpg", "../images/web-103-123-3-1516091340[1].jpg", "../images/web-103-123-4-1516091275[1].jpg"]
    class Floor {
        constructor() {
        }
        init() {
            imgs.forEach(function (item, index) {
                $("#ppsx_ul")[0].innerHTML += `<li><a href="javascript:void(0);"><img src="${item}" alt=""></a></li>`;
            })
        }
    }

    return new Floor();
});