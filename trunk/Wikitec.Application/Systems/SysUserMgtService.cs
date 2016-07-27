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

namespace Wikitec.Application.Systems
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Wikitec.Application.Apis;
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
    /// 员工业务逻辑类
    /// </summary>
    public class SysUserMgtService : InterceptiveObject
    {
        /// <summary>
        /// 员工数据存储器
        /// </summary>
        private readonly ISysUserRepository sysUserRepository;

        /// <summary>
        /// 角色接口
        /// </summary>
        private readonly ISysRoleRepository sysRoleRepository;

        /// <summary>
        /// 用户和角色关联实体数据储存器接口
        /// </summary>
        private readonly ISysUserRoleRepository sysUserRoleRepository;

        /// <summary>
        /// 基础数据数据库容器
        /// </summary>
        private readonly IListOptionRepository listOptionRepository;

        /// <summary>
        /// 数据提交单元
        /// </summary>
        private readonly IUnitOfWork unitOfWork;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="sysUserRepository">员工数据存储器</param>
        /// <param name="sysRoleRepository">角色接口</param>
        /// <param name="sysUserRoleRepository">用户和角色关联实体数据储存器接口</param>
        /// <param name="listOptionRepository">基础数据数据库容器</param>
        /// <param name="unitOfWork">数据提交单元</param>
        public SysUserMgtService(ISysUserRepository sysUserRepository, ISysRoleRepository sysRoleRepository, ISysUserRoleRepository sysUserRoleRepository, IListOptionRepository listOptionRepository, IUnitOfWork unitOfWork)
        {
            this.sysUserRepository = sysUserRepository;
            this.sysRoleRepository = sysRoleRepository;
            this.sysUserRoleRepository = sysUserRoleRepository;
            this.listOptionRepository = listOptionRepository;
            this.unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 获取员工信息
        /// </summary>
        /// <param name="id">员工Id</param>
        /// /// <param name="orgId">机构Id</param>
        /// <returns>员工信息</returns>
        public SysUserDto GetSysUser(long id, int orgId)
        {
            var sysUsers = this.sysUserRepository.GetFilteredElements(p => p.Id == id);
            var sysUserDto = sysUsers.ToFirstOrDefault<SysUserDto>();

            if (sysUserDto == null)
            {
                throw new UserFriendlyException("没有权限");
            }

            var sysUserRoleDto =
                this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == id && p.SysRole.OrgId == orgId)
                    .ToFirstOrDefault<SysUserRolesDto>();
            if (sysUserRoleDto != null && sysUserRoleDto.SysRole != null)
            {
                sysUserDto.SysRole = sysUserRoleDto.SysRole;
            }

            return sysUserDto;
        }

        /// <summary>
        /// 根据用户名称获得用户对象
        /// </summary>
        /// <param name="account">用户登录账号</param>
        /// <returns>SysUserLoginItem</returns>
        public SysUserLoginDto GetSysUserByAccount(string account)
        {
            var sysUsers = this.sysUserRepository.GetFilteredElements(a => a.IsDeleted == false && a.Account == account);
            var sysUserLoginDto = sysUsers.ToFirstOrDefault<SysUserLoginDto>();

            if (sysUserLoginDto == null)
            {
                throw new AppAuthorizationException("没有权限");
            }

            var sysUserRolesQuery = this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == sysUserLoginDto.Id);
            var sysUserRoles = sysUserRolesQuery.ToArray<SysUserRolesDto>();
            foreach (var sysUserRole in sysUserRoles)
            {
                if (sysUserRole != null && sysUserRole.SysRole != null)
                {
                    sysUserLoginDto.SysRoles.Add(sysUserRole.SysRole);
                }
            }

            return sysUserLoginDto;
        }

        /// <summary>
        /// 根据登录名获取用户信息及相应机构部门信息
        /// </summary>
        /// <param name="account">登录名</param>
        /// <returns>获取用户信息及相应机构部门信息</returns>
        public ApiUserDto GetSysUserFromApi(string account)
        {
            return ApiMgtService.GetApiSysUser(account);
        }

        /// <summary>
        /// 根据机构Id获取用户分页列表信息
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="sysUserSearchDto">查询条件</param>
        /// <returns>用户分页列表信息</returns>
        public ApiPagedResult<ApiUserDto> GetUserByOrgId(int orgId, SysUserSearchDto sysUserSearchDto)
        {
            // 根据机构Id获取用户分页列表信息
            var apiSysUsers = ApiMgtService.GetApiSysUsers(orgId, sysUserSearchDto);
            var users = new ApiPagedResult<ApiUserDto> { List = new List<ApiUserDto>() };

            if (apiSysUsers != null && apiSysUsers.List != null && apiSysUsers.List.Count > 0)
            {
                foreach (var apiSysUser in apiSysUsers.List.Where(item => item != null))
                {
                    apiSysUser.Gender = apiSysUser.Gender == "1" ? "男" : "女";
                    var orgs = apiSysUser.SysOrgs.Where(p => p.Id == orgId).ToList();
                    apiSysUser.DepartmentName = orgs.Count > 0 && orgs[0].SysDep != null ? orgs[0].SysDep.Name : string.Empty;

                    var user = apiSysUser;
                    if (this.sysUserRepository.IsExsist(p => p.Id == user.Id))
                    {
                        var sysUserRole =
                            this.sysUserRoleRepository.GetFilteredElements(
                                p => p.SysUserId == user.Id && p.SysRole.OrgId == orgId)
                                .ToFirstOrDefault<SysUserRolesDto>();

                        apiSysUser.SysRoleName = sysUserRole != null && sysUserRole.SysRole != null
                            ? sysUserRole.SysRole.Name
                            : string.Empty;
                        if (sysUserSearchDto.RoleId > -1 && sysUserRole != null && sysUserRole.SysRole != null &&
                            sysUserRole.SysRole.Id == sysUserSearchDto.RoleId)
                        {
                            users.List.Add(apiSysUser);
                        }
                    }
                }
            }

            if (sysUserSearchDto.RoleId > -1)
            {
                users.PageIndex = sysUserSearchDto.PagerDto.PageIndex;
                users.PageSize = sysUserSearchDto.PagerDto.PageSize;
                users.RecordCount = users.List.Count;
                users.List = users.List.Skip((users.PageIndex - 1) * users.PageSize).Take(users.PageSize).ToList();
            }
            else
            {
                users = apiSysUsers;
            }

            return users;
        }

        /// <summary>
        /// 根据登录账号获取用户信息
        /// </summary>
        /// <param name="account">登录账号</param>
        /// <param name="orgId">机构Id</param>
        /// <returns>用户信息</returns>
        public SysUserDto GetSysUserFromApi(string account, int orgId)
        {
            // 根据登录账户获取用户信息的请求地址
            var apiUserDto = ApiMgtService.GetApiSysUser(account);

            var sysUserDto = new SysUserDto()
            {
                Id = apiUserDto.Id,
                Name = apiUserDto.Name,
                Account = apiUserDto.Account,
                Gender = int.Parse(apiUserDto.Gender)
            };
            var orgs = apiUserDto.SysOrgs.Where(p => p.Id == orgId).ToList();

            sysUserDto.DepartmentName = orgs.Count > 0 && orgs[0].SysDep != null ? orgs[0].SysDep.Name : string.Empty;

            var sysUserRoleDto = this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == apiUserDto.Id && p.SysRole.OrgId == orgId).ToFirstOrDefault<SysUserRolesDto>();
            sysUserDto.SysRoleId = sysUserRoleDto != null && sysUserRoleDto.SysRole != null ? sysUserRoleDto.SysRole.Id : 0;

            return sysUserDto;
        }

        /// <summary>
        /// 新增或修改用户
        /// </summary>
        /// <param name="sysUserDto">用户dto</param>
        /// <param name="orgId">机构Id</param>
        public void AddOrUpdateSysUser(SysUserDto sysUserDto, int orgId)
        {
            if (!this.sysUserRepository.IsExsist(p => p.Id == sysUserDto.Id))
            {
                // 新增用户
                var sysUser = new SysUser { Id = sysUserDto.Id, Name = sysUserDto.Name, Account = sysUserDto.Account };
                this.sysUserRepository.Add(sysUser);

                var sysUserRole = this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == sysUserDto.Id && p.SysRole.OrgId == orgId).FirstOrDefault();
                if (sysUserRole != null && sysUserDto.SysRoleId != null)
                {
                    // 存在角色信息，修改角色Id
                    sysUserRole.SysUser = sysUser;
                    sysUserRole.SysRoleId = sysUserDto.SysRoleId;
                    this.sysUserRoleRepository.Modify(sysUserRole);
                }
                else
                {
                    if (sysUserDto.SysRoleId != null)
                    {
                        // 不存在角色信息，添加新的角色信息
                        var sysRole = this.sysRoleRepository.GetFilteredElements(p => p.Id == sysUserDto.SysRoleId).FirstOrDefault();
                        if (sysRole != null)
                        {
                            var userRole = new SysUserRole { SysUser = sysUser, SysRole = sysRole };
                            this.sysUserRoleRepository.Add(userRole);
                        }
                    }
                }
            }
            else
            {
                var sysUser = this.sysUserRepository.GetFilteredElements(p => p.Id == sysUserDto.Id).FirstOrDefault();
                if (sysUser != null)
                {
                    sysUser.Id = sysUserDto.Id;
                    sysUser.Name = sysUserDto.Name;
                    sysUser.Account = sysUserDto.Account;
                    this.sysUserRepository.Modify(sysUser);

                    var sysUserRole = this.sysUserRoleRepository.GetFilteredElements(p => p.SysUserId == sysUserDto.Id && p.SysRole.OrgId == orgId).FirstOrDefault();
                    if (sysUserRole != null)
                    {
                        // 存在角色信息，修改角色Id
                        sysUserRole.SysUser = sysUser;
                        sysUserRole.SysRoleId = sysUserDto.SysRoleId;
                        this.sysUserRoleRepository.Modify(sysUserRole);
                    }
                    else
                    {
                        if (sysUserDto.SysRoleId != null)
                        {
                            // 不存在角色信息，添加新的角色信息
                            var sysRole = this.sysRoleRepository.GetFilteredElements(p => p.Id == sysUserDto.SysRoleId).FirstOrDefault();
                            if (sysRole != null)
                            {
                                var userRole = new SysUserRole { SysUser = sysUser, SysRole = sysRole };
                                this.sysUserRoleRepository.Add(userRole);
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
            this.listOptionRepository.Copy(orgId, loginUserId);
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
            var roles = this.sysRoleRepository.GetFilteredElementsWithout(p => p.OrgId == orgId).ToList();
            if (roles.Count != 0)
            {
                return;
            }

            var role = this.sysRoleRepository.GetFilteredElementsWithout(p => p.Id == 1).FirstOrDefault();
            var user = this.sysUserRepository.GetFilteredElements(p => p.Id == loginUserId).FirstOrDefault();
            if (role != null)
            {
                ICollection<SysFunc> funcs = role.SysFuncs;
                role.CreationTime = DateTime.Now;
                role.CreatorUserId = loginUserId;
                role.OrgId = orgId;
                role.SysFuncs = funcs;
                this.sysRoleRepository.AddForNoOrg(role);
                var sysUserRole = new SysUserRole { SysUser = user, SysRole = role };
                this.sysUserRoleRepository.Add(sysUserRole);
            }
        }
    }
}
