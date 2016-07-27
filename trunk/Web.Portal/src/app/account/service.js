//------------------------------------------------------------
// <copyright file="service.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/11/11 15:52:25</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['jquery'], function ($) {
    var service = {
        getUser: function () {
            return $.get('/Home/GetUser');
        }
    };

    return service;
});