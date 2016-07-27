//------------------------------------------------------------
// <copyright file="ListOptionController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>03/09/2016 11:21:03</date>
// <summary>
// 字典信息WebApi Controller
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Wikitec.Application.Systems;
    using Wikitec.DTO.Systems.ListOption;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Unity.Ioc;
    using Wikitec.Infrastructure.WebApi;

    /// <summary>
    /// 字典信息控制器
    /// </summary>
    public class ListOptionsController : WebApiBaseController
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
        public ListOptionsController()
        {
            this.listOptionMgtService = IocManager.Instance.Resolve<ListOptionMgtService>();
            this.comboboxMgtService = IocManager.Instance.Resolve<ComboboxMgtService>();
        }

        /// <summary>
        /// 分页的数据
        /// </summary>
        /// <param name="search">查询条件</param>
        /// <returns>分页的字典数据</returns>
        [HttpGet]
        [Route("api/listoptions")]
        public PagedResult<ListOptionItemDto> GetListOptions(ListOptionSearchDto search)
        {
            if (search.EndDate != null)
            {
                search.EndDate = search.EndDate.Value.AddDays(1).AddSeconds(-1);
            }

            var result = this.listOptionMgtService.GetListOptions(search);

            return result;
        }

        /// <summary>
        /// 获取字典数据
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <returns>字典数据</returns>
        [HttpGet]
        [Route("api/listoptions/{id:min(1)}")]
        public ListOptionDto GetListOption(int id)
        {
            var listOption = this.listOptionMgtService.GetListOption(id);

            return listOption;
        }

        /// <summary>
        /// 根据类型获取编号
        /// </summary>
        /// <param name="type">类型</param>
        /// <returns>编号</returns>
        [HttpGet]
        [Route("api/listoptions/number/{type:int}")]
        public int GetOrderNum(int type)
        {
            int value = this.listOptionMgtService.GetOrderNum(type);

            return value;
        }

        /// <summary>
        /// 提交数据
        /// </summary>
        /// <param name="listOptionDto">字典数据</param>
        [HttpPost]
        [Route("api/listoptions")]
        public void Post([FromBody]ListOptionDto dto)
        {
            this.listOptionMgtService.AddOrUpdate(dto);
        }

        /// <summary>
        /// 更新字典状态
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <param name="status">状态值</param>
        [HttpPost]
        [Route("api/listoptions/{id:min(1)}/{status:bool}")]
        public void UpdateStatus(int id, bool status)
        {
            this.listOptionMgtService.UpdateStatus(id, status);
        }

        /// <summary>
        /// 获取字典分组信息
        /// </summary>
        /// <returns>字典分组信息</returns>
        [HttpGet]
        [Route("api/listoptions/combobox")]
        public List<ComboboxItemDto> GetListOptionTypeCombobox()
        {
            var comboboxItemList = this.comboboxMgtService.GetListOptionTypeCombobox();

            return comboboxItemList;
        }
    }
}
