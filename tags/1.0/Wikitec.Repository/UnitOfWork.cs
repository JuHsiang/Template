//-----------------------------------------------------------------------
// <copyright file="UnitOfWork.cs" company="Tiki Tec">
//     Tiki Tec copyright.
// </copyright>
// <author>张宇</author>
// <date>2014-05-30</date>
//-----------------------------------------------------------------------

using System.Data.Entity;
using Wikitec.Infrastructure.Data;

namespace Wikitec.Repository
{
    using System;

    /// <summary>
    /// 数据库提交辅助类
    /// </summary>
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        /// <summary>
        /// 数据库上下文
        /// </summary>
        private readonly DataContext _dataContext;

        /// <summary>
        /// 构造函数，用于设置数据库上下午文
        /// </summary>
        /// <param name="context">传递进来的数据库上下文</param>
        public UnitOfWork(DataContext context)
        {
            this._dataContext = context;
        }

        /// <summary>
        /// 数据库上下文
        /// </summary>
        protected DbContext DataContext
        {
            get
            {
                return this._dataContext;
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
            if (this._dataContext != null)
            {
                this._dataContext.Dispose();
            }
        }
    }
}
