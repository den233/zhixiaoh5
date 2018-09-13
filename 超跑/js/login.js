// JavaScript Document
//支持Enter键登录
document.onkeydown = function(e){
	if($(".bac").length==0)
	{
		if(!e) e = window.event;
		if((e.keyCode || e.which) == 13){
			var obtnLogin=document.getElementById("btnSubmit");
			obtnLogin.focus();
		}
	}
}

$(function(){
	//提交表单
	$('#btnSubmit').click(function(){
		show_loading();
	
		if($('#username').val() == ''){
			show_err_msg('请填写账号！');	
			$('#username').focus();
		}else if($('#password').val() == ''){
			show_err_msg('请填写密码！');
			$('#password').focus();
		}else if($('#j_captcha').val() == ''){
			show_err_msg('请填写验证码！');
			$('#j_captcha').focus();
		}else{
            $("#login_form").ajaxSubmit({
                beforeSubmit: showRequest,
                success: showResponse,
                error: showError,
                type: "post",
                dataType: "json",
                timeout: 60000
            });
		}
	});
	
    // 表单提交前
    function showRequest(formData, jqForm, options) {
        $("#btnSubmit").val("正在提交...")
        $("#btnSubmit").prop("disabled", true);
    }
    // 表单提交后
    function showResponse(data, textStatus) {
        if (data.status == 1) { // 成功
            $("#btnSubmit").val("提交成功");
            $("#btnSubmit").prop("disabled", true);
            if (data.msg != undefined && data.msg != "") {
                show_err_msg(data.msg);
            }
            if (data.url != undefined && data.url != "") {
                location.href = data.url;
            }
            if ($("#turl").val()!= "") {
                location.href = $("#turl").val();
            }
        } else { // 失败
            show_err_msg(data.msg);
            $("#btnSubmit").val("再次提交");
            $("#btnSubmit").prop("disabled", false);
        }
    }
    // 表单提交出错
    function showError(XMLHttpRequest, textStatus, errorThrown) {
        show_err_msg("提示出错提示：" + errorThrown);
        $("#btnSubmit").val("再次提交");
        $("#btnSubmit").prop("disabled", false);
    }

});

//切换验证码
function ToggleCode(obj, codeurl) {
    $(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
    return false;
}