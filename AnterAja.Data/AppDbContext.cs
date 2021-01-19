using AnterAja.Models;

using Microsoft.EntityFrameworkCore;

namespace AnterAja.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Package> Packages { get; set; }
    }
}
