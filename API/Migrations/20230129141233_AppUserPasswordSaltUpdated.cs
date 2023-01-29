using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace asylcenter.API.Migrations
{
    /// <inheritdoc />
    public partial class AppUserPasswordSaltUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordSale",
                table: "Users",
                newName: "PasswordSalt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PasswordSalt",
                table: "Users",
                newName: "PasswordSale");
        }
    }
}
