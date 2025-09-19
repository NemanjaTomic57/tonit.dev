using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddColumn_BlogPost_Hidden : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Views",
                table: "BlogPosts");

            migrationBuilder.AddColumn<bool>(
                name: "Hidden",
                table: "BlogPosts",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hidden",
                table: "BlogPosts");

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "BlogPosts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
