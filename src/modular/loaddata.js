define(["jquery"], function ($) {
    function LoadData(data) {
        var opts = {
            url: "/happigo",
            type: "GET",
            data: data,
            context: this
        }
        return $.ajax(opts);
    }
    return LoadData;
})
