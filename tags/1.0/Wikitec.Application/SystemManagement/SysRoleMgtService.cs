//------------------------------------------------------------
// <copyright file="SysRoleMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:38:48</date>
// <summary>
//  角色管理
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application.SystemManagement
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Linq.Expressions;
    using Wikitec.DataTransferObject.SystemConfig;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Domain.SystemConfig.IRepository;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Data.Specification;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Unity.Aop;
    using Wikitec.Infrastructure.Unity.Ioc;

    /// <summary>
    /// 角色管理
    /// </summary>
    public class SysRoleMgtService : InterceptiveObject
    {
        /// <summary>
        /// 角色管理容器
        /// </summary>
        private readonly ISysRoleRepository roleRepo;

        /// <summary>
        /// 角色数据库容器
        /// </summary>
        private readonly ISysUserRepository userRepo;

        /// <summary>
        /// 系统功能数据库容器
        /// </summary>
        private readonly ISysFuncRepository funcRepo;

        /// <summary>
        /// 用户和角色关联实体数据储存器接口
        /// </summary>
        private readonly ISysUserRoleRepository userRoleRepo;

        /// <summary>
        /// 提交单元管理容器
        /// </summary>
        private readonly IUnitOfWork unitOfWork;

        /// <summary>
        /// 构造函数
        /// </summary>
        public SysRoleMgtService()
        {
            this.roleRepo = IocManager.Instance.Resolve<ISysRoleRepository>();
            this.userRepo = IocManager.Instance.Resolve<ISysUserRepository>();
            this.funcRepo = IocManager.Instance.Resolve<ISysFuncRepository>();
            this.userRoleRepo = IocManager.Instance.Resolve<ISysUserRoleRepository>();
            this.unitOfWork = IocManager.Instance.Resolve<IUnitOfWork>(); ;
        }

        /// <summary>
        /// 新增或修改角色
        /// </summary>
        /// <param name="dto">角色信息</param>
        /// <returns>操作结果</returns>
        public void AddOrUpdate(SysRoleDto dto)
        {
            // 新增角色
            if (dto.Id == 0)
            {
                // 如果角色存在，则返回错误信息
                if (this.roleRepo.IsExsist(m => m.Name == dto.Name && m.IsDeleted == false))
                {
                    throw new UserFriendlyException("角色名称已存在");
                }

                var sysRole = dto.MapTo<SysRole>();
                sysRole.SysFuncs = this.SplitFuncsFromStr(dto.SelectedIds);
                this.roleRepo.Add(sysRole);
            }
            else
            {
                // 如果修改的名称在数据库存在，也返回错误信息
                if (this.roleRepo.IsExsist(m => m.Name == dto.Name
                    && m.Id != dto.Id && m.IsDeleted == false))
                {
                    throw new UserFriendlyException("角色名已存在");
                }

                //// 因为SysRole有很多字段都没有在前台页面绑定，addTime,SysFuncs等。
                //// 所以直接用前台得到的数据更新数据库加载的角色，再用数据库加载的角色提交更改。
                var sysRole = this.roleRepo.GetFilteredElements(p => p.Id == dto.Id).FirstOrDefault();
                if (sysRole != null)
                {
                    sysRole.Name = dto.Name;
                    sysRole.Mark = dto.Mark;
                    sysRole.SysFuncs.Clear();
                    sysRole.SysFuncs = this.SplitFuncsFromStr(dto.SelectedIds);
                    this.roleRepo.Modify(sysRole);
                }
            }

            this.unitOfWork.Commit();
        }

        /// <summary>
        /// 获取角色列表
        /// </summary>
        /// <returns>角色列表</returns>
        public PagedResult<SysRoleItem> GetSysRoleList(SysRoleSearch search)
        {
            Expression<Func<SysRole, bool>> filter = p => true;
            filter = filter.And(s => s.IsDeleted == false);

            var queryable = this.roleRepo.GetFilteredPageResult(filter, search.PagerDto.PageIndex, search.PagerDto.PageSize, s => s.CreationTime, false);
            var result = queryable.ToPagedResult<SysRole, SysRoleItem>();

            return result;
        }

        /// <summary>
        /// 根据角色Id获取角色信息
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns>角色信息</returns>
        public SysRoleDto GetSysRoleInfo(long? id)
        {
            var querable = this.roleRepo.GetFilteredElements(p => p.Id == id);
            var result = querable.ToFirstOrDefault<SysRoleDto>();
            return result;
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="id">角色Id</param>
        /// <returns>操作结果</returns>
        public void Delete(int id)
        {
            if (!this.roleRepo.IsExsist(p => p.Id == id))
            {
                throw new UserFriendlyException("改记录已不存在，请刷新再试");
            }
            var sysRole = this.roleRepo.GetFilteredElements(p => p.Id == id).FirstOrDefault();
            if (sysRole != null && sysRole.Name.Equals("系统管理员"))
            {
                throw new UserFriendlyException("系统管理员角色不能删除！");
            }
            // 删除角色前首先要判断角色下是否还有员工
            var sysUsers = this.userRoleRepo.GetFilteredElements(p => p.SysRoleId == id).ToList();
            if (sysUsers.Count == 0)
            {
                if (sysRole != null)
                {
                    sysRole.IsDeleted = true;
                    this.roleRepo.Modify(sysRole);
                }
                this.unitOfWork.Commit();
            }
            else
                throw new UserFriendlyException("角色下有员工,请先移除员工角色！");
        }

        /// <summary>
        /// 获取角色下拉框选项
        /// </summary>
        /// <returns>角色下拉框选项</returns>
        public List<ComboboxItemDto> GetSysRoleCombobox()
        {
            Expression<Func<SysRole, bool>> filter = p => p.IsDeleted == false;
            return this.roleRepo.GetFilteredElements(filter)
                .Select(m => new ComboboxItemDto
                {
                    Value = m.Id.ToString(),
                    DisplayText = m.Name
                }).ToList();
        }

        /// <summary>
        /// 根据功能ID拼成的字符串返回对应能功能列表
        /// </summary>
        /// <param name="selectedFuncIds">根据功能ID拼成的字符串</param>
        /// <returns>功能列表</returns>
        private List<SysFunc> SplitFuncsFromStr(string selectedFuncIds)
        {
            ICollection<SysFunc> selectedFuncs = new List<SysFunc>();
            if (!string.IsNullOrEmpty(selectedFuncIds))
            {
                var selectedIds = selectedFuncIds.TrimEnd(',').Split(",".ToCharArray());
                foreach (var selectedId in selectedIds)
                {
                    selectedFuncs.Add(this.funcRepo.GetModel(int.Parse(selectedId)));
                }
            }

            return selectedFuncs.ToList<SysFunc>();
        }

        /// <summary>
        /// 判断指定的用户是否有权限访问目标路径
        /// </summary>
        /// <param name="url">目标路径</param>
        /// <param name="user">用户</param>
        /// <returns>指定的用户是否有权限访问目标路径</returns>
        public bool IsGranted(string url, SysUserLoginItem user)
        {
            try
            {
                var urlList = new List<string>();
                if (!this.userRepo.IsExsist(p => p.Id == user.Id)) return false;
                if (user.OrgId == 0) return true;

                var sysUserRole = this.userRoleRepo.GetFilteredElements(p => p.SysUserId == user.Id).ToFirstOrDefault<SysRolesItem>();

                if (sysUserRole == null || sysUserRole.SysRole == null) return false;

                urlList.Clear();
                urlList.AddRange(sysUserRole.SysRole.SysFuncs.Select(func => func.Url));

                if (urlList.Any(u => string.Equals(u, url, StringComparison.CurrentCultureIgnoreCase)))
                {
                    return true; // 当前角色有权限，直接返回
                }

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
