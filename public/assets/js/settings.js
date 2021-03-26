// 选择logo图片时
$('#logo').change(function () {
    // 获取用户选择的图片
    var file = this.files[0];
    // 创建formData对象处理二进制文件
    var formData = new FormData();
    // 将选择的文件添加到FormData对象中
    formData.append('logo', file);
    // 实现图片设置功能
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            // 将logo图片显示在页面中
            $('#preview').attr("src", response[0].logo);
        }
    });
});

// 网站设置表单发生提交行为
$('#settingsForm').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault(0)
    // 获取表单中输入的数据
    var formData = $(this).serialize();
    // 实现网站设置功能
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function () {
            location.reload();
        }
    });
})

// 显示网站数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        console.log(response);
        if (response) {
            // 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo);
            // 将logo显示在页面中
            $('#preview').attr('src', response.logo);
            // 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // 将评论功能显示在页面中
            $('input[name="comment"]').prop('checked', response.comment)
            // 将审核功能显示在页面中
            $('input[name="review"]').prop('checked', response.review);
        }
    }
});