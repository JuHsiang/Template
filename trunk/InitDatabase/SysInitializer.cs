//------------------------------------------------------------
// <copyright file="SysInitializer.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/25 09:40:14</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace InitDatabase
{
    using System;
    using System.Linq;
    using Wikitec.Domain.Systems;
    using Wikitec.Infrastructure.Toolkit;

    /// <summary>
    /// 初始化系统功能
    /// </summary>
    public class SysInitializer : IInitializer
    {
        /// <summary>
        /// Init
        /// </summary>
        public void Init()
        {
            InitHome();
            InitConfigFunc();
            InitSysFunc();
            InitAdminUser();
        }

        /// <summary>
        /// 初始化首页 0
        /// </summary>
        public void InitHome()
        {
            Console.WriteLine("初始化 首页功能");

            var sysIndexFunc = new SysFunc
            {
                Name = "首页",
                FuncType = 1,
                OrderNumber = 0,
                Url = "/home",
                Icon = "icon-home"
            };

            var dbSet = DataContextFactory.DataContext.Set<SysFunc>();
            dbSet.Add(sysIndexFunc);
            DataContextFactory.DataContext.SaveChanges();
        }

        /// <summary>
        /// 初始化参数配置功能 9
        /// </summary>
        public void InitConfigFunc()
        {
            Console.WriteLine("初始化 参数配置功能");

            var configFunc = new SysFunc
            {
                Name = "参数配置",
                FuncType = 1,
                OrderNumber = 9,
                Icon = "icon-film",
                Url = "config"
            };


            var listOptionFunc = new SysFunc
            {
                Name = "字典维护",
                FuncType = 2,
                Url = "/config/option",
                Icon = "icon-grid",
                OrderNumber = 1,
                ParentFunc = configFunc
            };

            var dbSet = DataContextFactory.DataContext.Set<SysFunc>();

            dbSet.Add(configFunc);
            dbSet.Add(listOptionFunc);
            DataContextFactory.DataContext.SaveChanges();
        }

        /// <summary>
        /// 初始化系统功能 10
        /// </summary>
        public void InitSysFunc()
        {
            Console.WriteLine("初始化 系统功能");

            var sysFunc = new SysFunc
            {
                Name = "系统设置",
                FuncType = 1,
                OrderNumber = 10,
                Url = "sys",
                Icon = "icon-settings"
            };

            var roleFunc = new SysFunc
            {
                Name = "角色管理",
                FuncType = 2,
                OrderNumber = 1,
                Url = "/sys/role",
                Icon = "icon-user-following",
                ParentFunc = sysFunc
            };

            var userFunc = new SysFunc
            {
                Name = "员工管理",
                FuncType = 2,
                OrderNumber = 2,
                Url = "/sys/user",
                Icon = "icon-user",
                ParentFunc = sysFunc
            };

            var dbSet = DataContextFactory.DataContext.Set<SysFunc>();
            dbSet.Add(sysFunc);
            dbSet.Add(roleFunc);
            dbSet.Add(userFunc);
            DataContextFactory.DataContext.SaveChanges();
        }

        /// <summary>
        /// 初始化用户和角色信息
        /// </summary>
        public void InitAdminUser()
        {
            Console.WriteLine("初始化 管理员");

            var funcSet = DataContextFactory.DataContext.Set<SysFunc>();
            // 创建角色
            var adminRole = new SysRole
            {
                Name = "系统管理员",
                OrgId = 1,
                CreationTime = DateTime.Now,
                SysFuncs = funcSet.AsEnumerable<SysFunc>().ToList()

            };

            var roleSet = DataContextFactory.DataContext.Set<SysRole>();
            roleSet.Add(adminRole);

            // 创建用户
            var admin = new SysUser()
            {
                Account = "admin",
                Pwd = EncryptHelper.MD5With32("1"),
                Gender = 1,
                Name = "管理员",
                CreationTime = DateTime.Now
            };

            var userSet = DataContextFactory.DataContext.Set<SysUser>();
            userSet.Add(admin);

            // 创建用户角色关联数据
            var sysUserRole = new SysUserRole()
            {
                SysUser = admin,
                SysRole = adminRole,
            };

            var userRoleSet = DataContextFactory.DataContext.Set<SysUserRole>();
            userRoleSet.Add(sysUserRole);
            DataContextFactory.DataContext.SaveChanges();
        }
    }
}