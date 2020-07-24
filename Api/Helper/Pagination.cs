using System.Collections.Generic;

namespace Api.Helper
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageSize, int pageIndex, int count, List<T> data)
        {
            PageSize = pageSize;
            PageIndex = pageIndex;
            Count = count;
            Data = data;
        }

        public int PageSize { get; set; }   

        public int PageIndex { get; set; }

        public int Count { get; set; }

        public List<T> Data { get; set; }
    }
}