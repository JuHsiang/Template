//------------------------------------------------------------
// <copyright file="ListOptionRepository.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 13:15:57</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Repository.Repositories.Systems
{
    using System;
    using System.Linq;
    using Wikitec.Domain.Systems;
    using Wikitec.Domain.Systems.IRepository;
    using Wikitec.Infrastructure.Data.IQueryable;

    /// <summary>
    /// 选项列表信息数据存储器
    /// </summary>
    public class ListOptionRepository : RepositoryBaseForOrg<ListOption>, IListOptionRepository
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="context">数据库上下文</param>
        public ListOptionRepository(DataContext context)
            : base(context)
        {
        }

        /// <summary>
        /// 复制数据
        /// </summary>
        /// <param name="orgId">机构Id</param>
        /// <param name="loginUserId">当前登陆用户Id</param>
        public void Copy(int orgId, long loginUserId)
        {
            var options = this.GetFilteredElementsWithout(p => p.OrgId == orgId).ToList();

            if (options.Count != 0)
            {
                return;
            }
               
            this.DataContext.Configuration.AutoDetectChangesEnabled = false;
            this.DataContext.Configuration.ValidateOnSaveEnabled = false;
            var list = this.GetFilteredElementsWithout(p => p.OrgId == 1).ToList();
            foreach (var option in list.Select(model => new ListOption
            {
                CreationTime = DateTime.Now,
                CreatorUserId = loginUserId,
                Description = model.Description,
                IsOk = model.IsOk,
                Name = model.Name,
                Type = model.Type,
                OrgId = orgId
            }))
            {
                this.AddForNoOrg(option);
            }
        }
    }
}