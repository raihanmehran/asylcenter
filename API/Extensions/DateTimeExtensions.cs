// namespace API.Extensions
// {
//     public static class DateTimeExtensions
//     {
//         public static int CalculateAge(this DateOnly dob)
//         {
//             // var today = DateOnly.FromDateTime(DateTime.UtcNow);
//             // var age = today.Year - dob.Year;

//             // if (dob > today.AddYears(-age)) age--;

//             // return age;

//             var today = DateOnly.FromDateTime(DateTime.UtcNow);
//             var age = today.Year - dob.Year;

//             if (today.Month < dob.Month ||
//                 (today.Month == dob.Month && today.Day < dob.Day))
//             {
//                 age--;
//             }

//             return age;
//         }
//     }
// }

namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalcuateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var age = today.Year - dob.Year;

            if (dob > today.AddYears(-age)) age--;

            return age;
        }
    }
}