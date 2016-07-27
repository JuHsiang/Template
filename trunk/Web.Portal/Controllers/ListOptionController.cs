//------------------------------------------------------------
// <copyright file="ListOptionController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>03/09/2016 11:21:03</date>
// <summary>
// 
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Web.Mvc;
    using Wikitec.Application.Systems;
    using Wikitec.DTO.Systems.ListOption;
    using Wikitec.Infrastructure.Mvc.ModelBinder;

    /// <summary>
    /// 字典信息控制器
    /// </summary>
    public class ListOptionController : BaseController
    {
        /// <summary>
        /// 字典数据业务逻辑
        /// </summary>
        private readonly ListOptionMgtService listOptionMgtService;

        /// <summary>
        /// 下拉框选项业务逻辑
        /// </summary>
        private readonly ComboboxMgtService comboboxMgtService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="listOptionMgtService">字典数据业务逻辑</param>
        /// <param name="comboboxMgtService">下拉框选项业务逻辑</param>
        public ListOptionController(ListOptionMgtService listOptionMgtService, ComboboxMgtService comboboxMgtService)
        {
            this.listOptionMgtService = listOptionMgtService;
            this.comboboxMgtService = comboboxMgtService;
        }

        /// <summary>
        /// 分页的数据
        /// </summary>
        /// <param name="listOptionSearchDto">查询条件</param>
        /// <returns>分页的字典数据</returns>
        [HttpGet]
        public ActionResult GetListOptions([FromJson]ListOptionSearchDto listOptionSearchDto)
        {
            if (listOptionSearchDto.EndDate != null)
            {
                listOptionSearchDto.EndDate = listOptionSearchDto.EndDate.Value.AddDays(1).AddSeconds(-1);
            }

            var result = this.listOptionMgtService.GetListOptions(listOptionSearchDto);
            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 获取字典数据
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <returns>字典数据</returns>
        [HttpGet]
        public ActionResult GetListOption(int id)
        {
            var result = this.listOptionMgtService.GetListOption(id);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 根据类型获取编号
        /// </summary>
        /// <param name="type">类型</param>
        /// <returns>编号</returns>
        [HttpGet]
        public ActionResult GetOrderNum(int type)
        {
            var result = this.listOptionMgtService.GetOrderNum(type);

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 提交数据
        /// </summary>
        /// <param name="listOptionDto">字典数据</param>
        [HttpPost]
        public void AddOrUpdate([FromJson] ListOptionDto listOptionDto)
        {
            this.listOptionMgtService.AddOrUpdate(listOptionDto);
        }

        /// <summary>
        /// 更新字典状态
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <param name="status">状态值</param>
        [HttpPost]
        public void UpdateStatus(int id, bool status)
        {
            this.listOptionMgtService.UpdateStatus(id, status);
        }

        /// <summary>
        /// 获取字典分组信息
        /// </summary>
        /// <returns>字典分组信息</returns>
        [HttpGet]
        public ActionResult GetListOptionTypeCombobox()
        {
            var result = this.comboboxMgtService.GetListOptionTypeCombobox();

            return this.Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
