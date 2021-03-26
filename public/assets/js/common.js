// 退出功能
$('#logout').click(function () {
    var isConfirm = confirm('是否退出')
    if (isConfirm) {
        $.ajax({
            type: 'POST',
            url: '/logout',
            data: 'data',
            success: function () {
                location.href = '/admin/login.html'
            },
            error: function () {
                alert('退出失败')
            },
        })
    }
})

// 获取登录用户信息
$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function (response) {
        console.log(response);
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
});

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}