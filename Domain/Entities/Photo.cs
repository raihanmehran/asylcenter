using System.ComponentModel.DataAnnotations.Schema;

namespace asylcenter.Domain.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
