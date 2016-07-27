//------------------------------------------------------------
// <copyright file="Init.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>朱新亮</author>
// <date>2015/3/25 12:30:33</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

using System.Diagnostics;
using Wikitec.Infrastructure.AutoMapper;

namespace Wikitec.Application
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Wikitec.Infrastructure.Unity.Aop;

    /// <summary>
    /// Init
    /// </summary>
    public class AppInit
    {
        public static void Run()
        {
            var initializer = new AutoMapperInitializer();
            initializer.Initialize();

            var interceptionInitializer = new InterceptionRegister();
            interceptionInitializer.Initialize();
        }
    }
}
