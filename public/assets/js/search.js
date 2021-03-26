// 获取浏览器地址栏中关键字
var key = getUrlParams('key');
// 根据关键字获取文章信息
$.ajax({
    type: "get",
    url: "/posts/search/" + key,
    success: function (response) {
        var html = template('searchTpl', { data: response });
        $('#listBox').html(html);
    }
});