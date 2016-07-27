//------------------------------------------------------------
// <copyright file="service.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/9/25 9:56:35</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['jquery'], function ($) {
    var service = {
        // 字典数据查询条件
        SearchDto: function () {
            this.Type = "",
            this.StartDate = "",
            this.EndDate = "",
            this.PagerDto = {
                PageIndex: 1,
                PageSize: 10
            }
        },
        // 字典数据信息
        Dto: function () {
            this.Id = 0,
            this.Name = "",
            this.OrderNumber = "",
            this.Description = "",
            this.Type = "";
        },

        //获取字典数据信息列表
        getOptions: function (searchInput) {
            return $.get('/ListOption/GetListOptions', {
                "listOptionSearchDto": searchInput
            });
        },

        getOrderNum: function (type) {
            return $.get('/ListOption/GetOrderNum', {
                "type": type
            });
        },

        //查询字典数据
        getOption: function (id) {
            return $.get('/ListOption/GetListOption', {
                "id": id
            });
        },

        //启用禁用字典
        updateStatus: function (id, status) {
            return $.post('/ListOption/UpdateStatus', {
                "id": id,
                "status": status
            });
        },

        //保存字典数据信息
        saveOption: function (listOptionDto) {
            return $.post('/ListOption/AddOrUpdate', {
                "listOptionDto": listOptionDto
            });
        },
    };

    return service;
});