//------------------------------------------------------------
// <copyright file="Global.asax.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>02/26/2016 15:09:29</date>
// <summary>
// Global，全局对象的注册
// </summary>
//------------------------------------------------------------

namespace Web.Portal
{
    using System.Collections.Generic;
    using System.Data.Entity.Core.Mapping;
    using System.Data.Entity.Core.Metadata.Edm;
    using System.Data.Entity.Infrastructure;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Wikitec.Application;
    using Wikitec.Infrastructure;
    using Wikitec.Infrastructure.Mvc;
    using Wikitec.Infrastructure.Unity.Ioc;
    using Wikitec.Repository;

    /// <summary>
    /// 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    /// http://go.microsoft.com/?LinkId=9394801
    /// </summary>
    public class MvcApplication : HttpApplication
    {
        /// <summary>
        /// 程序启动
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var container = IocManager.Instance.GetContainer();
            var factory = new UnityControllerFactory(container);
            ControllerBuilder.Current.SetControllerFactory(factory);
            AppInit.Run();

            Log.WriteLine("**AppStart**");

            using (var dbcontext = new DataContext("dbConStr"))
            {
                var objectContext = ((IObjectContextAdapter)dbcontext).ObjectContext;
                var mappingCollection = (StorageMappingItemCollection)objectContext.MetadataWorkspace.GetItemCollection(DataSpace.CSSpace);
                mappingCollection.GenerateViews(new List<EdmSchemaError>());
            }
        }
    }
}