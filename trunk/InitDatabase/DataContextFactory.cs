//------------------------------------------------------------
// <copyright file="DataContextFactory.cs" company="WIKI Tec">
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
    using Wikitec.Repository;

    /// <summary>
    /// DataContextFactory
    /// </summary>
    public sealed class DataContextFactory
    {
        /// <summary>
        /// dbConStr
        /// </summary>
        private static readonly DataContext DContext = new DataContext("dbConStr");

        /// <summary>
        /// DataContext
        /// </summary>
        public static DataContext DataContext
        {
            get
            {
                return DContext;
            }
        }
    }
}
