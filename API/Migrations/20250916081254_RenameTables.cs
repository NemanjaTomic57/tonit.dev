using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RenameTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_appointments",
                table: "appointments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lead_magnet_emails",
                table: "lead_magnet_emails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_blog_subscriptions",
                table: "blog_subscriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_blog_posts",
                table: "blog_posts");

            migrationBuilder.RenameTable(
                name: "appointments",
                newName: "Appointments");

            migrationBuilder.RenameTable(
                name: "lead_magnet_emails",
                newName: "LeadMagnetEmails");

            migrationBuilder.RenameTable(
                name: "blog_subscriptions",
                newName: "BlogSubscriptions");

            migrationBuilder.RenameTable(
                name: "blog_posts",
                newName: "BlogPosts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeadMagnetEmails",
                table: "LeadMagnetEmails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BlogSubscriptions",
                table: "BlogSubscriptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BlogPosts",
                table: "BlogPosts",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Appointments",
                table: "Appointments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeadMagnetEmails",
                table: "LeadMagnetEmails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BlogSubscriptions",
                table: "BlogSubscriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BlogPosts",
                table: "BlogPosts");

            migrationBuilder.RenameTable(
                name: "Appointments",
                newName: "appointments");

            migrationBuilder.RenameTable(
                name: "LeadMagnetEmails",
                newName: "lead_magnet_emails");

            migrationBuilder.RenameTable(
                name: "BlogSubscriptions",
                newName: "blog_subscriptions");

            migrationBuilder.RenameTable(
                name: "BlogPosts",
                newName: "blog_posts");

            migrationBuilder.AddPrimaryKey(
                name: "PK_appointments",
                table: "appointments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_lead_magnet_emails",
                table: "lead_magnet_emails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_blog_subscriptions",
                table: "blog_subscriptions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_blog_posts",
                table: "blog_posts",
                column: "Id");
        }
    }
}
