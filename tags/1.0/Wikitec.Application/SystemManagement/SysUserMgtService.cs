//------------------------------------------------------------
// <copyright file="SysUserMgtService.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 14:38:48</date>
// <summary>
//  员工业务逻辑类
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application.SystemManagement
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IO;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Net;
    using System.Text;
    using Wikitec.Application.ApiManagement;
    using Wikitec.DataTransferObject.SystemConfig;
    using Wikitec.Domain.Option.IRepository;
    using Wikitec.Domain.SystemConfig;
    using Wikitec.Domain.SystemConfig.IRepository;
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Data;
    using Wikitec.Infrastructure.Data.Specification;
    using Wikitec.Infrastructure.Dto;
    using Wikitec.Infrastructure.Exceptions;
    using Wikitec.Infrastructure.Toolkit;
    using Wikitec.Infrastructure.Unity.Aop;
    using Wikitec.Infrastructure.Unity.Ioc;

    /// <summary>
    /// 员工业务逻辑类
    /// </summary>
    public class SysUserMgtService : InterceptiveObject
    {
        /// <summary>
        /// 员工数据存储器
        /// </summary>
        private readonly ISysUserRepository userRepo;

        /// <summary>
        /// 角色接口
        /// </summary>
        private ISysRoleRepository roleRepo;

        /// <summary>
        /// 用户和角色关联实体数据储存器接口
        /// </summary>
        private readonly ISysUserRoleRepository userRoleRepo;

        /// <summary>
        /// 基础数据数据库容器
        /// </summary>
        private IListOptionRepository listRepo;

        /// <summary>
        /// 数据提交单元
        /// </summary>
        private readonly IUnitOfWork unitOfWork;

        /// <summary>
        /// 构造函数
        /// </summary>
        public SysUserMgtService()
        {
            this.userRepo = IocManager.Instance.Resolve<ISysUserRepository>();
            this.roleRepo = IocManager.Instance.Resolve<ISysRoleRepository>();
            this.userRoleRepo = IocManager.Instance.Resolve<ISysUserRoleRepository>();
            this.listRepo = IocManager.Instance.Resolve<IListOptionRepository>();
            this.unitOfWork = IocManager.Instance.Resolve<IUnitOfWork>();
        }

        /// <summary>
        /// 获取员工信息
        /// </summary>
        /// <param name="id">员工Id</param>
        /// /// <param name="orgId">机构Id</param>
        /// <returns>员工信息</returns>
        public SysUserDto GetSysUserInfo(long id, int orgId)
        {
            var querable = this.userRepo.GetFilteredElements(p => p.Id == id);
            var result = querable.ToFirstOrDefault<SysUserDto>();
            if (result == null) throw new UserFriendlyException("没有权限");
            var userRole =
                this.userRoleRepo.GetFilteredElements(p => p.SysUserId == id && p.SysRole.OrgId == orgId)
                    .ToFirstOrDefault<SysRolesItem>();
            if (userRole != null && userRole.SysRole != null)
            {
                result.SysRole = userRole.SysRole;
            }

            return result;
        }

        /// <summary>
        /// 根据用户名称获得用户对象
        /// </summary>
        /// <param name="account">用户登录账号</param>
        /// <returns>SysUserLoginItem</returns>
        public SysUserLoginItem GetSysUserByLoginName(string account)
        {
            var querable = this.userRepo.GetFilteredElements(a => a.IsDeleted == false && a.Account == account);
            var result = querable.ToFirstOrDefault<SysUserLoginItem>();

            if (result == null)
            {
                throw new AppAuthorizationException("没有权限");
            }

            var roles = this.userRoleRepo.GetFilteredElements(p => p.SysUserId == result.Id).ToArray<SysRolesItem>();
            foreach (var item in roles)
            {
                if (item != null && item.SysRole != null)
                {
                    result.SysRoles.Add(item.SysRole);
                }

            }

            return result;
        }

        /// <summary>
        /// 根据登录名获取用户信息及相应机构部门信息
        /// </summary>
        /// <param name="account">登录名</param>
        /// <returns>获取用户信息及相应机构部门信息</returns>
        public UserItem JsonToUser(string account)
        {
            return ApiRequest.GetUserItem(account);
        }

        /// <summary>
        /// 根据机构Id获取用户分页列表信息
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="search">查询条件</param>
        /// <returns>用户分页列表信息</returns>
        public ApiPagedResult<UserItem> GetUserByOrgId(int orgId, SysUserSearch search)
        {
            // 根据机构Id获取用户分页列表信息
            var userListItem = ApiRequest.GetUserListItem(orgId, search);
            var users = new ApiPagedResult<UserItem> { List = new List<UserItem>() };

            if (userListItem != null && userListItem.List != null && userListItem.List.Count > 0)
            {
                foreach (var item in userListItem.List.Where(item => item != null))
                {
                    item.Gender = item.Gender == "1" ? "男" : "女";
                    var orgs = item.SysOrgs.Where(p => p.Id == orgId).ToList();
                    item.DepartmentName = orgs.Count > 0 && orgs[0].SysDep != null ? orgs[0].SysDep.Name : "";

                    var user = item;
                    if (this.userRepo.IsExsist(p => p.Id == user.Id))
                    {
                        var sysUserRole =
                            this.userRoleRepo.GetFilteredElements(
                                p => p.SysUserId == user.Id && p.SysRole.OrgId == orgId)
                                .ToFirstOrDefault<SysRolesItem>();

                        item.SysRoleName = sysUserRole != null && sysUserRole.SysRole != null
                            ? sysUserRole.SysRole.Name
                            : string.Empty;
                        if (search.RoleId > -1 && sysUserRole != null && sysUserRole.SysRole != null &&
                            sysUserRole.SysRole.Id == search.RoleId)
                        {
                            users.List.Add(item);
                        }
                    }



                }
            }

            if (search.RoleId > -1)
            {
                users.PageIndex = search.PagerDto.PageIndex;
                users.PageSize = search.PagerDto.PageSize;
                users.RecordCount = users.List.Count;
                users.List = users.List.Skip((users.PageIndex - 1) * users.PageSize).Take(users.PageSize).ToList();
            }
            else
            {
                users = userListItem;
            }
            return userListItem;
        }

        /// <summary>
        /// 根据登录账号获取用户信息
        /// </summary>
        /// <param name="account">登录账号</param>
        /// <param name="orgId">机构Id</param>
        /// <returns>登录账号</returns>
        public SysUserDto GetUserOfHttp(string account, int orgId)
        {
            //根据登录账户获取用户信息的请求地址
            var userItem = ApiRequest.GetUserItem(account);

            var sysUserDto = new SysUserDto
            {
                Id = userItem.Id,
                Name = userItem.Name,
                Account = userItem.Account,
                Gender = int.Parse(userItem.Gender)
            };
            var orgs = userItem.SysOrgs.Where(p => p.Id == orgId).ToList();

            sysUserDto.DepartmentName = orgs.Count > 0 && orgs[0].SysDep != null ? orgs[0].SysDep.Name : "";

            var sysUserRole = this.userRoleRepo.GetFilteredElements(p => p.SysUserId == userItem.Id).ToFirstOrDefault<SysRolesItem>();
            sysUserDto.SysRoleId = sysUserRole != null && sysUserRole.SysRole != null ? sysUserRole.SysRole.Id : 0;

            return sysUserDto;
        }

        /// <summary>
        /// 新增或修改用户
        /// </summary>
        /// <param name="dto">用户dto</param>
        /// <param name="orgId">机构Id</param>
        public void UpdateUser(SysUserDto dto, int orgId)
        {
            if (!this.userRepo.IsExsist(p => p.Id == dto.Id))
            {
                // 新增用户
                var sysUser = new SysUser { Id = dto.Id, Name = dto.Name, Account = dto.Account };
                this.userRepo.Add(sysUser);

                var sysUserRole = this.userRoleRepo.GetFilteredElements(p => p.SysUserId == dto.Id && p.SysRole.OrgId == orgId).FirstOrDefault();
                if (sysUserRole != null && dto.SysRoleId != null)
                {
                    //存在角色信息，修改角色Id
                    sysUserRole.SysUser = sysUser;
                    sysUserRole.SysRoleId = dto.SysRoleId;
                    this.userRoleRepo.Modify(sysUserRole);
                }
                else
                {
                    if (dto.SysRoleId != null)
                    {
                        //不存在角色信息，添加新的角色信息
                        var sysRole = this.roleRepo.GetFilteredElements(p => p.Id == dto.SysRoleId).FirstOrDefault();
                        if (sysRole != null)
                        {
                            var userRole = new SysUserRole { SysUser = sysUser, SysRole = sysRole };
                            this.userRoleRepo.Add(userRole);
                        }
                    }
                }
            }
            else
            {
                var sysUser = this.userRepo.GetFilteredElements(p => p.Id == dto.Id).FirstOrDefault();
                if (sysUser != null)
                {
                    sysUser.Id = dto.Id;
                    sysUser.Name = dto.Name;
                    sysUser.Account = dto.Account;
                    this.userRepo.Modify(sysUser);

                    var sysUserRole = this.userRoleRepo.GetFilteredElements(p => p.SysUserId == dto.Id).FirstOrDefault();
                    if (sysUserRole != null)
                    {
                        //存在角色信息，修改角色Id
                        sysUserRole.SysUser = sysUser;
                        sysUserRole.SysRoleId = dto.SysRoleId;
                        this.userRoleRepo.Modify(sysUserRole);
                    }
                    else
                    {
                        if (dto.SysRoleId != null)
                        {
                            //不存在角色信息，添加新的角色信息
                            var sysRole = this.roleRepo.GetFilteredElements(p => p.Id == dto.SysRoleId).FirstOrDefault();
                            if (sysRole != null)
                            {
                                var userRole = new SysUserRole { SysUser = sysUser, SysRole = sysRole };
                                this.userRoleRepo.Add(userRole);
                            }
                        }
                    }
                }
            }
            this.unitOfWork.Commit();
        }

        /// <summary>
        /// 初始化机构数据
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="loginUserId">登陆用户Id</param>
        public void Init(int orgId, long loginUserId)
        {
            this.listRepo.Copy(orgId, loginUserId);
            this.CopyRole(orgId, loginUserId);
            this.unitOfWork.Commit();
        }

        /// <summary>
        /// 复制角色信息
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="loginUserId">登陆用户Id</param>
        private void CopyRole(int orgId, long loginUserId)
        {
            var roles = this.roleRepo.GetFilteredElementsWithout(p => p.OrgId == orgId).ToList();
            if (roles.Count != 0) return;
            var role = this.roleRepo.GetFilteredElementsWithout(p => p.Id == 1).FirstOrDefault();
            var user = this.userRepo.GetFilteredElements(p => p.Id == loginUserId).FirstOrDefault();
            if (role != null)
            {
                ICollection<SysFunc> funcs = role.SysFuncs;
                role.CreationTime = DateTime.Now;
                role.CreatorUserId = loginUserId;
                role.OrgId = orgId;
                role.SysFuncs = funcs;
                this.roleRepo.AddForNoOrg(role);
                var sysUserRole = new SysUserRole { SysUser = user, SysRole = role };
                this.userRoleRepo.Add(sysUserRole);
            }
        }
    }
}
