namespace asylcenter.Application.Helpers
{
    public static class DateTimeHelper
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
