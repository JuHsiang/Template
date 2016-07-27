//------------------------------------------------------------
// <copyright file="ListOptionMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/3/9 10:50:34</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application.Systems
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using Wikitec.Domain.Systems;
    using Wikitec.Domain.Systems.IRepository;
    using Wikitec.DTO.Systems.ListOption;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Data.Specification;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// 基础字典数据业务逻辑
    /// </summary>
    public class ListOptionMgtService : InterceptiveObject
    {
        /// <summary>
        /// 基础字典数据接口
        /// </summary>
        private IListOptionRepository listOptionRepository;

        /// <summary>
        /// 提交数据接口
        /// </summary>
        private IUnitOfWork unitOfWork;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="listOptionRepository">基础字典数据接口</param>
        /// <param name="unitOfWork">提交数据接口</param>
        public ListOptionMgtService(IListOptionRepository listOptionRepository, IUnitOfWork unitOfWork)
        {
            this.listOptionRepository = listOptionRepository;
            this.unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 获取分页的字典数据
        /// </summary>
        /// <param name="listOptionSearchDto">查询条件对象</param>
        /// <returns>返回分页的字典数据</returns>
        public PagedResult<ListOptionItemDto> GetListOptions(ListOptionSearchDto listOptionSearchDto)
        {
            Expression<Func<ListOption, bool>> filter = p => true;

            if (listOptionSearchDto.Type != null)
            {
                filter = filter.And(p => p.Type == listOptionSearchDto.Type);
            }

            if (listOptionSearchDto.StartDate != null)
            {
                filter = filter.And(p => p.CreationTime >= listOptionSearchDto.StartDate);
            }

            if (listOptionSearchDto.EndDate != null)
            {
                filter = filter.And(p => p.CreationTime <= listOptionSearchDto.EndDate.Value.AddDays(1).AddSeconds(-1));
            }

            var listOptions = this.listOptionRepository.GetFilteredPageResult(filter, listOptionSearchDto.PagerDto.PageIndex, listOptionSearchDto.PagerDto.PageSize, s => s.CreationTime, false);
            var listOptionItemDtos = listOptions.ToPagedResult<ListOption, ListOptionItemDto>();
            return listOptionItemDtos;
        }

        /// <summary>
        /// 添加或修改字典数据
        /// </summary>
        /// <param name="listOptionDto">字典数据</param>
        public void AddOrUpdate(ListOptionDto listOptionDto)
        {
            if (listOptionDto.Id == 0)
            {
                if (this.listOptionRepository.IsExsist(p => p.Type == listOptionDto.Type && p.Name == listOptionDto.Name))
                {
                    throw new UserFriendlyException("该选项已经存在，请输入其他名称！");
                }

                if (this.listOptionRepository.IsExsist(p => p.Type == listOptionDto.Type && p.OrderNumber == listOptionDto.OrderNumber && p.OrderNumber != null))
                {
                    throw new UserFriendlyException("该选项序号已经存在！");
                }

                var listOption = listOptionDto.MapTo<ListOption>();
                this.listOptionRepository.Add(listOption);
                this.unitOfWork.Commit();
            }
            else
            {
                if (this.listOptionRepository.IsExsist(p => p.Type == listOptionDto.Type && p.Name == listOptionDto.Name && p.Id != listOptionDto.Id))
                {
                    throw new UserFriendlyException("该选项已经存在，请输入其他名称！");
                }

                if (this.listOptionRepository.IsExsist(p => p.Type == listOptionDto.Type && p.OrderNumber == listOptionDto.OrderNumber && p.OrderNumber != null && p.Id != listOptionDto.Id))
                {
                    throw new UserFriendlyException("该选项序号已经存在！");
                }

                var listOption = this.listOptionRepository.GetFilteredElements(p => p.Id == listOptionDto.Id).FirstOrDefault();
                if (listOption == null)
                {
                    throw new UserFriendlyException("该记录已不存在，请刷新再试！");
                }

                listOption = listOptionDto.MapTo(listOption);
                this.listOptionRepository.Modify(listOption);
                this.unitOfWork.Commit();
            }
        }

        /// <summary>
        /// 获取单个字典数据
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <returns>字典数据</returns>
        public ListOptionDto GetListOption(int id)
        {
            var listOption = this.listOptionRepository.GetFilteredElements(p => p.Id == id).FirstOrDefault();
            if (listOption == null)
            {
                throw new UserFriendlyException("该记录已不存在，请刷新再试！");
            }

            return listOption.MapTo<ListOptionDto>();
        }

        /// <summary>
        /// 根据类型获取编号
        /// </summary>
        /// <param name="type">类型</param>
        /// <returns>编号</returns>
        public int GetOrderNum(int type)
        {
            var listOption = this.listOptionRepository.GetFilteredElements(p => p.Type == type).OrderByDescending(p => p.OrderNumber).FirstOrDefault();
            if (listOption != null)
            {
                return listOption.OrderNumber != null ? Convert.ToInt32(listOption.OrderNumber + 1) : 1;
            }
            else
            {
                return 1;
            }
        }

        /// <summary>
        /// 更新字典数据的状态
        /// </summary>
        /// <param name="id">字典Id</param>
        /// <param name="status">状态的值</param>
        public void UpdateStatus(int id, bool status)
        {
            var listOption = this.listOptionRepository.GetFilteredElements(p => p.Id == id).FirstOrDefault();
            if (listOption == null)
            {
                throw new UserFriendlyException("该记录已不存在，请刷新再试！");
            }

            listOption.IsOk = status;
            this.listOptionRepository.Modify(listOption);
            this.unitOfWork.Commit();
        }
    }
}