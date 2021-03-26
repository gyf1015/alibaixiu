// 展示页面数据的公共文件
// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
// 请求随机推荐数据
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}`;
        var html = template.render(randomTpl, { data: response });
        $('#randomBox').html(html);
    }
});

// 请求最新评论数据
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        var commentTpl = `
			{{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
        var html = template.render(commentTpl, { data: response });
        $('#commentBox').html(html);
    }
});

// 请求文章分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response);
        var navTpl = `
        {{each data}}
            <li>
                <a href="list.html?categoryId={{$value._id}}">
                    <i class="fa {{$value.className}}"></i>{{$value.title}}
                </a>
            </li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: response });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});

// 获取搜索表单，绑定提交事件
$('.search form').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 获取用户输入的关键字
    var key = $(this).find('.keys').val();
    // 跳转到搜索页面
    location.href = '/search.html?key=' + key;
})