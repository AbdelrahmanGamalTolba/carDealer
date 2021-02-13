using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WevAPI.Migrations
{
    public partial class AddLastUpdatedFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastUpdateBy",
                table: "cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastupdateOn",
                table: "cars",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdateBy",
                table: "cars");

            migrationBuilder.DropColumn(
                name: "LastupdateOn",
                table: "cars");
        }
    }
}
