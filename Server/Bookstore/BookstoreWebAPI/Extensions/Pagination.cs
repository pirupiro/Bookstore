using System;
using System.Collections.Generic;
using System.Linq;

namespace BookstoreWebAPI.Extensions
{
    public abstract class PagedResultBase
    {
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
        public int RowCount { get; set; }

        public int FirstRowOnPage
        {
            get => (CurrentPage - 1) * PageSize + 1;
        }

        public int LastRowOnPage
        {
            get => Math.Min(CurrentPage * PageSize, RowCount);
        }
    }

    public class PagedResult<T> : PagedResultBase where T : class
    {
        public IList<T> Results { get; set; }
    }

    public static class Pagination
    {
        public static PagedResult<T> GetPaged<T>(this IQueryable<T> query,
                                                 int page,
                                                 int pageSize,
                                                 bool reversed = false) where T : class
        {
            var pageResult = new PagedResult<T>();
            pageResult.CurrentPage = page;
            pageResult.PageSize = pageSize;
            pageResult.RowCount = query.Count();
            pageResult.PageCount = (int)Math.Ceiling((double)pageResult.RowCount / pageSize);

            if (reversed)
                pageResult.Results = query.AsEnumerable().SkipLast((page - 1) * pageSize).TakeLast(pageSize).Reverse().ToList();
            else
                pageResult.Results = query.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return pageResult;
        }
    }
}
