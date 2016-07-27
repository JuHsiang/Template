//当前时间
//var currentTime = new Date().format("yyyy-MM-dd");
var __avatar_handlerUrl = "/Archive/UploadArchivePhoto?time=" + Math.random();
var avatarFileName = "";
var newName = "";
var __avatar_size = 1;  //缩放比例
var __avatar_x = 0;
var __avatar_y = 0;
var __avatar_w = 0;
var __avatar_h = 0;
var _saveSize = 200;

var avatar_services = {

    //上传初始化
    loadUploaded: function () {
        $("#divBG").resizable().children().not("#divCuter").remove();
        var gbOS = $("#divBG").offset();
        $("#divCuter").resizable({
            containment: "#divBG",
            aspectRatio: 1,
            minHeight: 20,
            minWidth: 20,
            stop: function () {
                avatar_services.viewImg();
            }
        }).draggable({
            containment: "#divBG",
            scroll: false,
            stop: function () {
                avatar_services.viewImg();
            }
        }).offset({ top: gbOS.top + 63, left: gbOS.left + 63 }); //把cuter主位在BG中间
    },

    ///上传成功
    onAvatarUploaded: function (file) {
        $("#img").attr("src", file + "?n=" + Math.random()); //防止缓存
    },

    //文件头像
    uploadImg: function () {
        $.ajaxFileUpload({
            url: __avatar_handlerUrl,
            secureuri: false,
            fileElementId: 'avatarFile',
            data: { "myaction": "upload" },
            success: function (data) {
                var obj = $.parseJSON(data);
                newName = obj.newName;
                if (obj.result == 1) {
                    var file = obj.msg;
                    avatarFileName = file;
                    __avatar_size = obj.size;
                    if (obj.size != 1) {
                        file += ".view.jpg";
                    }
                    var pof = $("#divContenter").offset();
                    $("#divBG").css({ "background-image": "url(" + file + ")", width: obj.w, height: obj.h }).offset({ top: pof.top + (300 - obj.h) / 2 + 1, left: pof.left + (300 - obj.w) / 2 + 1 });
                    //设置cuter大小
                    var mw = Math.min(_saveSize, obj.w);
                    var mh = Math.min(_saveSize, obj.h);
                    $("#divCuter").height(mh).width(mw);
                    //使cuter居中
                    pof = $("#divBG").offset();
                    $("#divCuter").offset({ top: pof.top + (obj.h - mh) / 2 + 1, left: pof.left + (obj.w - mw) / 2 + 1 });
                    avatar_services.viewImg();
                }
                else {
                    message.showError(obj.msg);
                }
            },
            error: function () {
                alert("上传失败，请检查文件是否符合格式要求。");
            }
        });
    },

    //图片保存的文件夹中以后，加载到页面调用的方法
    viewImg: function () {
        //将type=file中的val赋值给伪上传文本框
        $("#upfile-txt").val($("#avatarFile").val());

        if (avatarFileName != "") {
            var c = $("#divCuter");
            var os1 = c.offset();
            var os2 = $("#divBG").offset();
            var width = c.width();
            var height = c.height();
            var x = os1.left - os2.left;
            var y = os1.top - os2.top;
            __avatar_x = x;
            __avatar_y = y;
            __avatar_h = height;
            __avatar_w = width;
            var img = __avatar_handlerUrl + "&myaction=view&file=" + avatarFileName + "&size=" + __avatar_size + "&x=" + x + "&y=" + y + "&w=" + width + "&h=" + height;
            $("#imgAvatarView").attr("src", img).show();
        }
    },

    //点击确定保存
    uploadAvatarOK: function () {
        //初始化文本框信息

        $("#PhotoAdress").val(newName);
        $("#upfile-txt").val("");
        $("#avatarFile").val("");

        //saveFile
        if (avatarFileName != "") {
            $.get(__avatar_handlerUrl,
                {
                    myaction: "save",
                    size: __avatar_size,
                    file: avatarFileName,
                    x: __avatar_x,
                    y: __avatar_y,
                    h: __avatar_h,
                    w: __avatar_w
                },
                function (data, status) {
                    if (data == "1") {
                        avatar_services.onAvatarUploaded(avatarFileName);

                        $("#divSaveInfo").html("保存成功,1秒后窗体关闭").css("color", "orange");
                        setTimeout("$('#upload-photo-model').modal('hide');", 2000);

                    } else {
                        $("#divSaveInfo").html("保存失败").css("color", "red");
                    }

                    $("#divBG").css("background", "none");
                    $("#imgAvatarView").hide();
                    avatarFileName = "";
                    __avatar_size = 1;
                    setTimeout('$("#divSaveInfo").html("");', 2000);
                }
            );
        }
    },

    // 取消上传
    uploadAvatarCancel: function () {
        //初始化文本框信息
        $("#upfile-txt").val("");
        $("#avatarFile").val("");
        $("#PhotoAdress").val("");
        if (avatarFileName != "") {
            $.get(__avatar_handlerUrl, { myaction: "delete", size: __avatar_size, file: avatarFileName }, function (data, status) {
                $("#divBG").css("background", "none");
                $("#imgAvatarView").hide();
                avatarFileName = "";
                __avatar_size = 1;
            });
            if (window.OnAvatarUploadCancel) {//外部的函数
                avatar_services.onAvatarUploadCancel();
            }
        }
    }
};