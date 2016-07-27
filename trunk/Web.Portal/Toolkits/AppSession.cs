//------------------------------------------------------------
// <copyright file="AppSession.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 15:12:43</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Toolkits
{
    using System;
    using Wikitec.Infrastructure.Runtime.Session;

    /// <summary>
    /// AppSession
    /// </summary>
    public class AppSession : IAppSession
    {
        /// <summary>
        /// 当前用户id
        /// </summary>
        public long? UserId
        {
            get
            {
                if (UserIdentity.CurrentSysUser != null)
                {
                    return UserIdentity.CurrentSysUser.Id;
                }
                return null;
            }
        }

        /// <summary>
        /// 机构Id
        /// </summary>
        public int? OrgId
        {
            get
            {
                if (UserIdentity.CurrentSysUser != null)
                {
                    return UserIdentity.CurrentSysUser.OrgId;
                }

                return null;
            }
        }

        /// <summary>
        /// 当前用户的租户ID
        /// </summary>
        public int? TenantId
        {
            get { throw new NotImplementedException(); }
        }
    }
}