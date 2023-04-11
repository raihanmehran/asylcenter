namespace API.DTOs
{
    public class UsersByRoleAndMonthDto
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public int Count { get; set; }
        public string RoleName { get; set; }
    }
}