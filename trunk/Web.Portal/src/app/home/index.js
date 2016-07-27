//------------------------------------------------------------
// <copyright file="index.js" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>zhouxialong</author>
// <date>2015/11/12 14:58:10</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

define(['app/home/service'], function (homeService) {

    var homeVm = avalon.define({
        $id: "homeVm",
    });

    return avalon.controller(function ($ctrl) {
        $ctrl.$onEnter = function (param, rs, rj) {

        };

        $ctrl.$onRendered = function () {

        };
    });
});