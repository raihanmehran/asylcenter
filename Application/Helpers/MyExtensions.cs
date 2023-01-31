using System.Security.Claims;

namespace asylcenter.Application.Helpers
{
    public static class MyExtensions
    {
        public static string MyExtensionsMethod(this string input)
        {
            ClaimsPrincipal principal= null;
            string username = principal.GetUsername();
            return input + " extended";
        }
    }
}
