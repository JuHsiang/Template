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
        getOptions: function (search) {
            return $.get('/api/listoptions', {
                "search": search
            });
        },

        getOrderNum: function (type) {
            return $.get('/api/listoptions/number/' + type);
        },

        //查询字典数据
        getOption: function (id) {
            return $.get('/api/listoptions/' + id);
        },

        //启用禁用字典
        updateStatus: function (id, status) {
            return $.post('/api/listoptions/' + id + '/' + status);
        },

        //保存字典数据信息
        saveOption: function (listOptionDto) {
            return $.post('/api/listoptions', listOptionDto);
        },
    };

    return service;
});