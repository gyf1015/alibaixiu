// 为添加分类表单绑定提交事件
$('#addCategory').submit(function (e) {
    // 阻止表单的默认行为
    e.preventDefault();
    // 获取用户在表单中输入的数据
    var formData = $(this).serialize();
    // 调用接口，实现添加分类功能
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function () {
            location.reload();
        }
    });
})

// 发送请求，向服务器端请求分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // 将服务器端返回的数据和HTMl元素进行拼接
        var html = template('categoryListTpl', { data: response });
        // 将拼接好的内容放入页面中
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件（事件委托）
$('#categoryBox').on('click', '.edit', function () {
    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // 调用接口，实现修改功能
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response);
            console.log(html);
            $('#formBox').html(html);
        },
        error: function () {
            alert("添加失败！")
        }
    });
})

// 为删除按钮添加点击事件（事件委托）
$('#categoryBox').on('click', '.delete', function () {
    if (confirm("是否删除数据?")) {
        // 获取要删除的分类输数据id
        var id = $(this).attr('data-id');
        // 调用接口，实现删除分类功能
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function () {
                // 删除成功后刷新页面
                location.reload();
            },
            error: function () {
                alert("删除失败！")
            }
        });
    }
})
// 为修改表单绑定提交事件（事件委托）
$('#formBox').on('submit', '#modifyCategory', function (e) {
    // 阻止表单的默认行为
    e.preventDefault();
    // 获取表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id');
    // 发送请求，实现修改分类功能
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function () {
            // 修改成功，刷新页面
            location.reload();
        },
        error: function () {
            alert("修改失败！")
        }
    });
})


