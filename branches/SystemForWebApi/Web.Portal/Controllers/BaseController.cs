//------------------------------------------------------------
// <copyright file="BaseController.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>02/26/2016 15:06:06</date>
// <summary>
// 
// </summary>
//------------------------------------------------------------

namespace Web.Portal.Controllers
{
    using System.Web.Mvc;
    using Wikitec.Infrastructure.Mvc.Authorization;
    using Wikitec.Infrastructure.Mvc.Filter;

    /// <summary>
    /// Controller基类
    /// </summary>
    [ExceptionFilter(View = "Error")]
    [AppAuthorize]
    public class BaseController : Controller
    {
    }
}
