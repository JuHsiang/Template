//------------------------------------------------------------
// <copyright file="Program.cs" company="WIKI Tec">
//     WIKI Tec copyright.
// </copyright>
// <author>周夏龙</author>
// <date>2016/2/26 14:19:54</date>
// <summary>
//  主要功能有：
//  
// </summary>
//------------------------------------------------------------

namespace InitDatabase
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Program
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Main
        /// </summary>
        /// <param name="args">args</param>
        public static void Main(string[] args)
        {
            try
            {
                Console.WriteLine(string.Format("[{0}] 正在创建数据库...", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")));

                DataContextFactory.DataContext.Database.Create();
                Console.WriteLine(string.Format("[{0}] 数据库创建成功，准备初始化数据...", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")));

                var initializers = GetInitializers();

                initializers.ForEach(lizer => lizer.Init());
            }
            catch (Exception ex)
            {
                Console.WriteLine("错误:");
                Console.WriteLine(ex.Message);
            }

            Console.WriteLine("完成！！！...");
            Console.Read();
        }

        /// <summary>
        /// GetInitializers
        /// </summary>
        /// <returns>List IInitializer</returns>
        private static List<IInitializer> GetInitializers()
        {
            var list = new List<IInitializer> 
            { 
                new SysInitializer(),
                new ListOptionInitializer(),
            };

            return list;
        }
    }
}
