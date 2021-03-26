// 管理员选择文件时
$('#file').change(function (e) {
    e.preventDefault();
    // 用户
    var file = this.files[0];
    // 创建formData对象实现二进制文件上传
    var formData = new FormData();
    // 将选择的文件添加到formData对象中
    formData.append('image', file);
    // 实现图片上传功能
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image)
        }
    });
});

// 轮播图表单提交时
$('#slidesForm').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 获取表单输入的数据
    var formData = $(this).serialize();
    // 实现添加轮播图功能
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function () {
            location.reload();
        }
    });
})

// 请求图片轮播列表数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        console.log(response);
        var html = template('slidesTpl', { data: response });
        $('#slidesBox').html(html);
    }
});

// 图片轮播数据删除事件
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('是否删除？')) {
        // 获取要删除的数据的id
        var id = $(this).attr('data-id');
        // 实现删除轮播图片功能
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function () {
                location.reload();
            }
        });
    }
})