$(function () {
	//提交表单
	$('#btnSubmit').click(function () {
		var btn = $(this);
		var form = $("form");
		var txtTitle = btn.val();
		var reg = [];
		show_loading();

		$.ajax({
			type: "POST",
			url: form.attr("url"),
			dataType: "json",
			data: form.serialize(),
			timeout: 20000,
			beforeSend: function (XMLHttpRequest) {
				btn.attr("disabled", true);
				btn.val("正在提交，请稍候...");
			},
			success: function (data, textStatus) {
				if (data.status == 1) {
					if (typeof(data.msg) != "undefined") {
						show_msg(data.msg, "");
					}
					setTimeout(function () {
						if (typeof(data.url) == "undefined") {
							if ($("#turl").length == 0 || $("#turl").val() == "") {
								location.reload();
							} else {
								location.href = $("#turl").val();
							}
						} else {
							location.href = data.url;
						}
					}, 3000);
				} else {
					show_err_msg(data.msg);
				}
				btn.val(txtTitle)
				btn.removeAttr("disabled");
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				show_err_msg("状态：" + textStatus + "；出错提示：" + errorThrown);
				btn.removeAttr("disabled");
			}
		});
		return false;
	});
});

//切换验证码
function ToggleCode(obj, codeurl) {
	$(obj).children("img").eq(0).attr("src", codeurl + "?time=" + Math.random());
	return false;
}

function ViewUsername(obj) {
	var opt = $(obj).val();
	if (opt == "") {
		return;
	}
	$.ajax({
		type: "POST",
		url: "/tools/submit_ajax.ashx?action=user_name",
		dataType: "json",
		data: {
			"txtUserName": opt,
		},
		timeout: 20000,
		beforeSend: function (XMLHttpRequest) {},
		success: function (data, textStatus) {
			if (data.status == 1) {
				$("#txtHint").text(data.msg);
			} else {
				$("#txtHint").text(data.msg);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {}
	});
}