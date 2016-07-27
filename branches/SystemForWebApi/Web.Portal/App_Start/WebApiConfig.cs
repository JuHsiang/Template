using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Web.Portal.Toolkits;

namespace Web.Portal
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // 把返回结果格式化为Json数据
            var jsonFormatter = new JsonMediaTypeFormatter();
            config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(jsonFormatter));

            // 注册WebApi的过滤器
            config.MapHttpAttributeRoutes();

            // 注册WebApi route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
