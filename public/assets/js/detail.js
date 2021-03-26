// 从地址栏中获取文章id
var postId = getUrlParams('id');
var review;
// 根据id获取文章详细信息
$.ajax({
    type: "get",
    url: "/posts/" + postId,
    success: function (response) {
        console.log(response);
        var html = template('postTpl', response);
        $('#article').html(html);
    }
});

// 为点赞按钮绑定点击事件（事件委托）
$('#article').on('click', '#like', function () {
    // 实现点赞功能
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + postId,
        success: function () {
            alert('点赞成功！')
        }
    });
})

// 获取网站的配置信息
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        review = response.review;
        console.log(response.review);
        // 判断是否开启了评论功能
        if (response.comment) {
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

//
$('#comment').on('submit', 'form', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 获取用户输入的内容
    var content = $(this).find('textarea').val();
    // 获取评论的状态
    var state;
    if (review) {
        // 需要审核
        state = 0;
    } else {
        // 不需要审核
        state = 1;
    }
    // 实现评论功能
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function () {
            alert('评论成功');
            location.reload();
        },
        error: function () {
            alert('评论失败');
        }
    });
})