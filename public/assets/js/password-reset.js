// 为修改密码表单绑定提交事件
$('#modifyForm').submit(function (e) {
	// 阻止表单默认提交行为
	e.preventDefault();
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 调用接口，实现修改密码功能
	$.ajax({
		type: "put",
		url: "/users/password",
		data: formData,
		success: function () {
			// 密码修改成功后，需要进行重新登陆
			location.href = '/admin/login.html'
		}
	});

})