//------------------------------------------------------------
// <copyright file="index.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/25 9:56:21</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['app/config/option/service',
    'util/message',
    'util/validator',
    'lodash'
], function (optionService, message, validator, lodash) {
    var optionGridVm;
    var optionTypesSelVm, optionTypesAddVm;
    var dialogVm;

    var optionVm = avalon.define({
        $id: "optionVm",
        modalTitle: "",
        dto: new optionService.Dto(),
        searchDto: new optionService.SearchDto(),
        $checkForm: {
            txtName: "required",
            txtOrderNumber: {
                numCheck: true
            },
            sltGroup: "required"
        },

        //加载查询条件角色列表
        $selectOptOptionTypes: {
            url: "/api/listoptions/combobox",
            onInit: function (vm) {
                optionTypesSelVm = vm;
            },
            onChanged: function (res) {
                optionVm.searchDto.Type = res;
            }
        },

        //查询列表插件
        $gridOpt: {
            emptyMessage: '当前系统内还没有任何数据',
            loadData: function (page) {
                var model = new optionService.SearchDto();
                var dto = lodash.pick(optionVm.searchDto, Object.getOwnPropertyNames(model));
                dto.PagerDto.PageIndex = page;
                return optionService.getOptions(dto);
            },
            onInit: function (vm) {
                optionGridVm = vm;
            }
        },
        //查询字典数据列表
        search: function () {
            optionGridVm.emptyMessage = '抱歉，当前搜索条件下没有查找到任何数据';
            optionGridVm.refreshAll();
        },

        //创建新建和编辑字典数据对话框
        $dialogOpt: {
            onInit: function (vm) {
                dialogVm = vm;
            },
            onHidden: function () {
                validator.FormValidator.Reset('create-listoption-form');
            }
        },

        //创建字典数据
        create: function () {
            dialogVm.title = "新建字典数据";
            optionVm.dto = new optionService.Dto();
            optionTypesAddVm.init();
            dialogVm.show();
        },

        $selectOptOptionTypesAdd: {
            url: "/api/listoptions/combobox",
            onInit: function (vm) {
                optionTypesAddVm = vm;
            },
            onChanged: function (res) {
                optionVm.dto.Type = res;
                if (res != "") {
                    optionService.getOrderNum(res).done(function (data) {
                        optionVm.dto.OrderNumber = data;
                        optionVm.dto = lodash.pick(optionVm.dto, Object.getOwnPropertyNames(new optionService.Dto()));
                    });
                }
            }
        },

        //编辑查看字典数据
        edit: function (id) {
            dialogVm.title = "查看编辑字典数据";
            optionService.getOption(id).done(function (data) {
                optionVm.dto = new optionService.Dto();
                optionVm.dto = data;
                optionTypesAddVm.init(data.Type);
                dialogVm.show();
            });
        },

        // //启用禁用字典
        updateStatus: function (id, status, title) {
            message.confirm("确定要" + title + "此选项吗？", function () {
                optionService.updateStatus(id, status).done(function () {
                    message.showSuccess(title + "成功");
                    //刷新当前页列表                    
                    optionGridVm.refreshCurrentPage();
                });
            });
        },

        // 保存字典数据信息
        save: function () {
            var res = validator.FormValidator.Check("create-listoption-form", optionVm.$checkForm);
            if (res) {
                var model = lodash.pick(optionVm.dto, Object.getOwnPropertyNames(new optionService.Dto()));
                optionService.saveOption(model).done(function () {
                    message.showSuccess("保存成功");
                    dialogVm.hide();
                    //刷新当前页列表                    
                    optionGridVm.refreshCurrentPage();
                });
            }
        },
    });

    // 正整数验证   
    jQuery.validator.addMethod("numCheck", function (value, element) {
        if (optionVm.dto.OrderNumber != '' && optionVm.dto.OrderNumber != null) {
            var reg = /^[1-9]\d*$/;
            if (!reg.test(optionVm.dto.OrderNumber)) {
                return false;
            }
            else { return true; }
        }
        return true;
    }, "序号只能是正整数");

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param, rs, rj) {

        };

        $ctrl.$onRendered = function () {

        };
    });
});