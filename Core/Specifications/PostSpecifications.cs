using Core.Entities;

namespace Core.Specifications
{
    public class PostSpecifications : BaseSpecification<Post>
    {
        public PostSpecifications(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Comments);
            AddInclude(x => x.Likes);
        }
    }
}