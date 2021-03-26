// 获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

// 分页跳转功能
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: { page: page },
        success: function (response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

// 向服务器请求分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);
    }
});

// 为筛选文章绑定事件
$('#filterForm').on('submit', function (e) {
    // 阻止表单的默认行为
    e.preventDefault();
    // 获取过滤的要求
    var formData = $(this).serialize();
    // 实现过滤功能
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
})

// 为删除按钮添加点击事件（事件委托）
$('#postsBox').on('click', '.delete', function () {
    if (confirm("是否删除?")) {
        // 获取要删除的文章的id
        var id = $(this).attr('data-id');
        // 实现删除功能
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function () {
                location.reload();
            }
        });
    }
})