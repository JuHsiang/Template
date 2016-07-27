//-----------------------------------------------------------------------
// <copyright file="UnitOfWork.cs" company="Tiki Tec">
//     Tiki Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:27:48</date>
// <summary>
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository
{
    using System;
    using System.Data.Entity;
    using Wikitec.Infrastructure.Data;

    /// <summary>
    /// 数据库提交辅助类
    /// </summary>
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        /// <summary>
        /// 数据库上下文
        /// </summary>
        private readonly DataContext dataContext;

        /// <summary>
        /// 构造函数，用于设置数据库上下午文
        /// </summary>
        /// <param name="context">传递进来的数据库上下文</param>
        public UnitOfWork(DataContext context)
        {
            this.dataContext = context;
        }

        /// <summary>
        /// 数据库上下文
        /// </summary>
        protected DbContext DataContext
        {
            get
            {
                return this.dataContext;
            }
        }

        /// <summary>
        /// 向数据库提价改变
        /// </summary>
        public void Commit()
        {
            this.DataContext.SaveChanges();
        }

        /// <summary>
        /// 销毁
        /// </summary>
        public void Dispose()
        {
            if (this.dataContext != null)
            {
                this.dataContext.Dispose();
            }
        }
    }
}
