define(['jquery', 'jquery.validate'], function ($) {

    /*  Form validator via jQuery validate
	 *  Example:
	 *  if(wikitec.FormValidator('formid')){
	 *		console.log('validate pass');
	 *	}
	 *	for DOM please add the following tags:
	 *	required – Makes the element required.
	 *	remote – Requests a resource to check the element for validity.
	 *	minlength – Makes the element require a given minimum length.
	 *	maxlength – Makes the element require a given maxmimum length.
	 *	rangelength – Makes the element require a given value range.
	 *	min – Makes the element require a given minimum.
	 *	max – Makes the element require a given maximum.
	 *	range – Makes the element require a given value range.
	 *	email – Makes the element require a valid email
	 *	url – Makes the element require a valid url
	 *	date – Makes the element require a date.
	 *	dateISO – Makes the element require an ISO date.
	 *	number – Makes the element require a decimal number.
	 *	digits – Makes the element require digits only.
	 *	creditcard – Makes the element require a credit card number.
	 *	equalTo – Requires the element to be the same as another one
	 *   Or use the pre-defined rules
	 ************************************************************/
    //自定义表单验证方法声明
    //1 验证机构别名只能输入数字、字母、下划线
    jQuery.validator.addMethod("isTenantAlisa", function (value, element) {
        var reg = new RegExp("^(?!_)(?![0-9])(?!.*?_$)[a-zA-Z0-9_]+$");
        var reslut = reg.test(value);
        console.log(reslut);
        return reslut;
    }, "机构别名只能以字母开头,由下划线和数字组成。");

    // 手机号码验证
    jQuery.validator.addMethod("mobileNumber", function (value, element) {
        var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(value)) {
            return false;
        }

        return true;
    }, "请输入正确格式的手机号。");

    // 电话号码验证
    jQuery.validator.addMethod("telNumber", function (value, element) {
        var reg = /^\d{3}-\d{8}|\d{4}-\d{7,8}$/;
        if (!reg.test(value)) {
            return false;
        }

        return true;
    }, "请输入正确格式的电话号。");

    // 验证是否正整数
    jQuery.validator.addMethod("positiveIntegerValidate", function (value, element) {
        var reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
            return false;
        }

        return true;
    }, "请输入正整数！");

    // 验证是否正浮点数
    jQuery.validator.addMethod("floatNumValidate", function (value, element) {
        var reg = /(^\d+(\.\d+)?$)/;
        if (!reg.test(value)) {
            return false;
        }

        return true;
    }, "请输入正浮点数！");

    var FormValidator = function () {
        jQuery.extend(jQuery.validator.messages, {
            required: "此项必填。",
            remote: "请修正此项。",
            email: "请输入一个合法的电子邮件地址。",
            url: "请输入合法网址。",
            date: "请输入合法日期。",
            dateISO: "请输入合法日期（ISO格式）。",
            number: "请输入合法数字。",
            file: "请选择要上传的附件",
            digits: "请只输入数字。",
            creditcard: "请输入一个有效的信用卡号。",
            equalTo: "请再次输入相同的值。",
            maxlength: jQuery.validator.format("请输入不超过{0}个字符。"),
            minlength: jQuery.validator.format("请输入至少{0}个字符。"),
            rangelength: jQuery.validator.format("请输入介于{0}和{1}个长的字符值。"),
            range: jQuery.validator.format("请输入介于{0}和{1}的值。"),
            max: jQuery.validator.format("请输入一个小于或等于{0}的值。"),
            min: jQuery.validator.format("请输入一个大于或等于{0}的值。")
        });

        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation
        var init = function (formId, ruleOptions) {
            var form1 = $('#' + formId);

            var error1 = $('.alert-danger', form1);
            var success1 = $('.alert-success', form1);

            //if (error1.length === 0) {
            //    error1 = $('<div class="alert alert-danger display-hide" style="margin-bottom: 10px;"><button class="close" data-close="alert"></button>表单验证错误，请检查输入。 </div>');
            //    form1.prepend(error1);
            //}

            if (success1.length === 0) {
                success1 = $('<div class="alert alert-success display-hide" style="margin-bottom: 10px;"><button class="close" data-close="alert"></button>表单验证通过</div>');
                form1.prepend(success1);
            }

            var rules = {
                name: {
                    minlength: 2,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                url: {
                    required: true,
                    url: true
                },
                number: {
                    required: true,
                    number: true
                },
                intNumber: {
                    number: true
                },
                digits: {
                    required: true,
                    digits: true
                },
                creditcard: {
                    required: true,
                    creditcard: true
                },
                occupation: {
                    minlength: 5,
                },
                select: {
                    required: true
                },
                select_multi: {
                    required: true,
                    minlength: 1,
                    maxlength: 3
                },
                account: {
                    required: true
                },
                idCardNo: {
                    required: true
                },
                pwd: {
                    required: true
                },
                confirmationPwd: {
                    required: true,
                    equalTo: "#newPwd"
                },
                tenantAlisa: {
                    required: true,
                    isTenantAlisa: true,
                    minlength: 6,
                    maxlength: 18
                },
                datetime: {
                    required: true,
                    date: true
                },
                date: {
                    date: true
                },
                telphone: {
                    required: true,
                    telNumber: true
                },
                mobilephone: {
                    required: true,
                    mobileNumber: true
                },
                file: {
                    required: true,
                }
            };

            if (ruleOptions) {
                $.extend(rules, ruleOptions);
            }

            var result = form1.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "", // validate all fields including form hidden input
                rules: rules,

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    success1.hide();
                    error1.show();
                    Metronic.scrollTo(error1, -200);

                    event.preventDefault();
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
						.closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
						.closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
						.closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    //console.log("submitHandler");
                    //success1.show();
                    error1.hide();
                }
            });

            return result;
        };

        var check = function (formId, ruleOptions) {
            var result = init(formId, ruleOptions);
            return result.form();
        };

        var reset = function (formId) {
            var form1 = $('#' + formId);
            form1.find(".alert").hide();
            form1.find(".has-error").removeClass('has-error');
            form1.validate().resetForm();
            form1.find(".help-block-error").hide();
        };

        return {
            Init: init,
            Check: check,
            Reset: reset
        };
    }();

    return { FormValidator: FormValidator };
});