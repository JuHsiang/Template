//------------------------------------------------------------
// <copyright file="AppInit.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>朱新亮</author>
// <date>2015/3/25 12:30:33</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace Wikitec.Application
{
    using Wikitec.Infrastructure.AutoMapper;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// Init
    /// </summary>
    public class AppInit
    {
        /// <summary>
        /// Run
        /// </summary>
        public static void Run()
        {
            var initializer = new AutoMapperInitializer();
            initializer.Initialize();

            var interceptionInitializer = new InterceptionRegister();
            interceptionInitializer.Initialize();
        }
    }
}
