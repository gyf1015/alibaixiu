// 表单提交事件
$("#userForm").submit(function (e) {
    // 阻止表单的默认行为
    e.preventDefault();
    // 获取用户在表单中输入的数据并将数据格式化成字符串
    var formData = $(this).serialize();
    // 向服务器端发送请求
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function () {
            // 刷新页面
            location.reload();
        },
        error: function () {
            alert("添加失败");
        },
    });
});

// 文件选择事件 （事件委托）
$("#modifyBox").on("change", "#avatar", function () {
    // 用户选择的文件: this.files[0]
    var formData = new FormData();
    formData.append("avatar", this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 不要解析请求参数
        processData: false,
        // 不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            // 头像预览功能
            $("#preview").attr("src", response[0].avatar);
            $("#hiddenAvatar").val(response[0].avatar);
        },
    });
});

// 向服务器段端发送请求，获取用户数据
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // 使用模板引擎将数据和html字符串进行拼接
        var html = template("userTpl", { data: response });
        // 展示用户数据列表
        $("#userBox").html(html);
    },
});

// 通过事件委托的方式为编辑按钮添加点击事件 （事件委托）
$("#userBox").on("click", ".edit", function () {
    // 获取被点击的用户的id值
    var id = $(this).attr("data-id");
    // 根据id获取用户的详细信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            console.log(response);
            var html = template("modifyTpl", response);
            $("#modifyBox").html(html);
        },
    });
});

// 为修改表单添加表单提交事件 （事件委托）
$("#modifyBox").on("submit", "#modifyForm", function (e) {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的用户的id
    var id = $(this).attr("data-id");
    // 阻止表单默认提交
    e.preventDefault();
    // 发送请求 修改用户信息
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function () {
            // 修改信息成功后，重新加载页面
            location.reload();
        },
    });
});

// 通过事件委托的方式为删除按钮添加点击事件 （事件委托）
$("#userBox").on("click", ".delete", function () {
    // 确认管理员是否删除用户,返回布尔值
    var isConfirm = confirm("是否删除用户？");
    // 判断是否进行删除
    if (isConfirm) {
        // 获取需要删除的用户的id
        var id = $(this).attr("data-id");
        // 向服务器发送请求，删除该用户
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function () {
                // 删除成功，刷新页面
                location.reload();
            },
            error: function () {
                alert("删除失败！");
            },
        });
    }
});

// 获取全选按钮
var selectAll = $("#selectAll");
// 获取批量删除按钮
var deleteMany = $("#deleteMany");

// 为全选按钮状态发生改变时
selectAll.change(function () {
    // 获取全选框的状态，返回布尔值
    var status = $(this).prop("checked");
    // 判断全选框是否选中
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
    // 设置所有复选框的状态与全选框相同
    $("#userBox").find("input").prop("checked", status);
});

// 为所有复选框绑定change事件（事件委托）
$("#userBox").on("change", ".userStatus", function () {
    // 获取所有的复选框按钮
    var inputs = $("#userBox").find("input");
    // 当所有的复选框全选中时，全选框选中
    if ($(".userStatus:checked").length < inputs.length) {
        // alert("所有用户并未选中")
        selectAll.prop("checked", false);
    } else {
        // alert("所有用户均选中");
        selectAll.prop("checked", true);
    }
    // 选中状态的复选框个数大于0时，显示批量删除按钮
    if ($(".userStatus:checked").length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击事件
deleteMany.click(function () {
    // 用于存放需要删除的所有用户的id
    var ids = [];
    // 获取所有被选中的复选框
    var checkedUser = $("#userBox").find("input:checked");
    // 遍历元素
    checkedUser.each(function (index, element) {
        // element == this
        ids.push($(element).attr("data-id"));
    });
    // 判断是否删除用户
    if (confirm("是否进行批量删除？")) {
        $.ajax({
            type: "delete",
            // 按照请求路径要求拼接字符串
            url: "/users/" + ids.join("-"),
            success: function () {
                // 删除成功后刷新页面
                location.reload();
            },
        });
    }
});
