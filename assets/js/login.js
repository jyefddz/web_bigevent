$(function () {
    //点击注册账号 让登录框隐藏 注册框显示
    $('#link_reg').click(() => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录 让登录框显示 注册框隐藏
    $('#link_login').click(() => {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 先引入from 来自layui
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        // 数组方式
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 函数方式
        repwd: (value) => {
            // 先获取密码框的值
            const pwd = $('.reg-box [name=password]').val()
            //console.log(pwd,value);
            // 判断两次密码是否一致
            if (pwd !== value) return "两次密码不一致"
        }
    })

    //const baseUrl = 'http://www.liulongbin.top:3007'

    $("#form_reg").submit((e) => {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                //console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $("#link_login").click()
                });
            }
        })
    })

    // 监听登录表单提交事件 发送登录请求
    $("#form_login").submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})