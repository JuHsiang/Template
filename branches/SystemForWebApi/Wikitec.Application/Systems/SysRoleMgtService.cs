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

namespace Wikitec.Application.Systems
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Wikitec.Domain.Systems;
    using Wikitec.Domain.Systems.IRepository;
    using Wikitec.DTO.Systems.SysRole;
    using Wikitec.DTO.Systems.SysUser;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// 角色管理
    /// </summary>
    public class SysRoleMgtService : InterceptiveObject
    {
        /// <summary>
        /// 角色管理容器
        /// </summary>
        private readonly ISysRoleRepository sysRoleRepository;

        /// <summary>
        /// 用户数据库容器
        /// </summary>
        private readonly ISysUserRepository sysUserRepository;

        /// <summary>
        /// 系统功能数据库容器
        /// </summary>
        private readonly ISysFuncRepository sysFuncRepository;

        /// <summary>
        /// 用户和角色关联实体数据储存器接口
        /// </summary>
        private readonly ISysUserRoleRepository sysUserRoleRepository;

        /// <summary>
        /// 提交单元管理容器
        /// </summary>
        private readonly IUnitOfWork unitOfWork;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="sysRoleRepository">角色管理容器</param>
        /// <param name="sysUserRepository">用户数据库容器</param>
        /// <param name="sysFuncRepository">系统功能数据库容器</param>
        /// <param name="sysUserRoleRepository">用户和角色关联实体数据储存器接口</param>
        /// <param name="unitOfWork">提交单元管理容器</param>
        public SysRoleMgtService(ISysRoleRepository sysRoleRepository, ISysUserRepository sysUserRepository, ISysFuncRepository sysFuncRepository, ISysUserRoleRepository sysUserRoleRepository, IUnitOfWork unitOfWork)
        {
            this.sysRoleRepository = sysRoleRepository;
            this.sysUserRepository = sysUserRepository;
            this.sysFuncRepository = sysFuncRepository;
            this.sysUserRoleRepository = sysUserRoleRepository;
            this.unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 新增或修改角色
        /// </summary>
        /// <param name="sysRoleDto">角色信息</param>
        public void AddOrUpdate(SysRoleDto sysRoleDto)
        {
            // 新增角色
            if (sysRoleDto.Id == 0)
            {
                // 如果角色存在，则返回错误信息
                if (this.sysRoleRepository.IsExsist(m => m.Name == sysRoleDto.Name && m.IsDeleted == false))
                {
                    throw new UserFriendlyException("角色名称已存在");
                }

                var sysRole = sysRoleDto.MapTo<SysRole>();
                sysRole.SysFuncs = this.SplitFuncsFromStr(sysRoleDto.SelectedIds);
                this.sysRoleRepository.Add(sysRole);
            }
            else
            {
                // 如果修改的名称在数据库存在，也返回错误信息
                if (this.sysRoleRepository.IsExsist(m => m.Name == sysRoleDto.Name
                    && m.Id != sysRoleDto.Id && m.IsDeleted == false))
                {
                    throw new UserFriendlyException("角色名已存在");
                }

                //// 因为SysRole有很多字段都没有在前台页面绑定，addTime,SysFuncs等。
                //// 所以直接用前台得到的数据更新数据库加载的角色，再用数据库加载的角色提交更改。
                var sysRole = this.sysRoleRepository.GetFilteredElements(p => p.Id == sysRoleDto.Id).FirstOrDefault();
                if (sysRole != null)
                {
                    sysRole.Name = sysRoleDto.Name;
                    sysRole.Mark = sysRoleDto.Mark;
                    sysRole.SysFuncs.Clear();
                    sysRole.SysFuncs = this.SplitFuncsFromStr(sysRoleDto.SelectedIds);
                    this.sysRoleRepository.Modify(sysRole);
                }
            }

            this.unitOfWork.Commit();
        }

        /// <summary>
        /// 获取角色列表
        /// </summary>
        /// <param name="sysRoleSearchDto">角色查询条件</param>
        /// <returns>角色列表</returns>
        public PagedResult<SysRoleItemDto> GetSysRoles(SysRoleSearchDto sysRoleSearchDto)
        {
            Expression<Func<SysRole, bool>> filter = s => s.IsDeleted == false;

            var sysRoles = this.sysRoleRepository.GetFilteredPageResult(filter, sysRoleSearchDto.PagerDto.PageIndex, sysRoleSearchDto.PagerDto.PageSize, s => s.CreationTime, false);

            var sysRoleItemDtos = sysRoles.ToPagedResult<SysRole, SysRoleItemDto>();

            return sysRoleItemDtos;
        }

        /// <summary>
        /// 根据角色Id获取角色信息
        /// </summary>
        /// <param name="id">角色id</param>
        /// <returns>角色信息</returns>
        public SysRoleDto GetSysRole(long? id)
        {
            var sysRole = this.sysRoleRepository.GetFilteredElements(p => p.Id == id);
            var sysRoleDto = sysRole.ToFirstOrDefault<SysRoleDto>();
            return sysRoleDto;
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="id">角色Id</param>
        public void Delete(int id)
        {
            if (!this.sysRoleRepository.IsExsist(p => p.Id == id))
            {
                throw new UserFriendlyException("改记录已不存在，请刷新再试");
            }

            var sysRole = this.sysRoleRepository.GetFilteredElements(p => p.Id == id).FirstOrDefault();
            if (sysRole != null && sysRole.Name.Equals("系统管理员"))
            {
                throw new UserFriendlyException("系统管理员角色不能删除！");
            }

            // 删除角色前首先要判断角色下是否还有员工
            var sysUsers = this.sysUserRoleRepository.GetFilteredElements(p => p.SysRoleId == id).ToList();
            if (sysUsers.Count == 0)
            {
                if (sysRole != null)
                {
                    sysRole.IsDeleted = true;
                    this.sysRoleRepository.Modify(sysRole);
                }

                this.unitOfWork.Commit();
            }
            else
            {
                throw new UserFriendlyException("角色下有员工,请先移除员工角色！");
            }
        }

        /// <summary>
        /// 获取角色下拉框选项
        /// </summary>
        /// <returns>角色下拉框选项</returns>
        public List<ComboboxItemDto> GetSysRoleCombobox()
        {
            Expression<Func<SysRole, bool>> filter = p => p.IsDeleted == false;
            return this.sysRoleRepository.GetFilteredElements(filter)
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
        public List<SysFunc> SplitFuncsFromStr(string selectedFuncIds)
        {
            ICollection<SysFunc> selectedFuncs = new List<SysFunc>();
            if (!string.IsNullOrEmpty(selectedFuncIds))
            {
                var selectedIds = selectedFuncIds.TrimEnd(',').Split(",".ToCharArray());
                foreach (var selectedId in selectedIds)
                {
                    selectedFuncs.Add(this.sysFuncRepository.GetModel(int.Parse(selectedId)));
                }
            }

            return selectedFuncs.ToList<SysFunc>();
        }

        /// <summary>
        /// 判断指定的用户是否有权限访问目标路径
        /// </summary>
        /// <param name="url">目标路径</param>
        /// <param name="sysUserLoginDto">用户</param>
        /// <returns>指定的用户是否有权限访问目标路径</returns>
        public bool IsGranted(string url, SysUserLoginDto sysUserLoginDto)
        {
            try
            {
                var urlList = new List<string>();
                if (!this.sysUserRepository.IsExsist(p => p.Id == sysUserLoginDto.Id))
                {
                    return false;
                }

                if (sysUserLoginDto.OrgId == 0)
                {
                    return true;
                }

                var sysUserRole = this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == sysUserLoginDto.Id && p.SysRole.OrgId == sysUserLoginDto.OrgId).ToFirstOrDefault<SysUserRolesDto>();

                if (sysUserRole == null || sysUserRole.SysRole == null)
                {
                    return false;
                }

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
