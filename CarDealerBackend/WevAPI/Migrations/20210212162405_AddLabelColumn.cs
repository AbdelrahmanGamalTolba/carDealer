using Microsoft.EntityFrameworkCore.Migrations;

namespace WevAPI.Migrations
{
    public partial class AddLabelColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "cars",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "cars");
        }
    }
}
