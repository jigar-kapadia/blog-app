using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get;set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Post>()
            .HasOne(x => x.Account)
            .WithMany(x => x.Posts)
            .HasForeignKey(x => x.AccountId);

            modelBuilder.Entity<Comment>()
            .HasOne(x => x.Post)
            .WithMany(x => x.Comments)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
            .HasOne(x => x.Account)
            .WithMany(x => x.Comments)
            .HasForeignKey(x => x.AccountId)
            .OnDelete(DeleteBehavior.Restrict); 
            
             modelBuilder.Entity<Like>()
            .HasOne(x => x.Post)
            .WithMany(x => x.Likes)
            .HasForeignKey(x => x.PostId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Like>()
            .HasOne(x => x.LikedbyAccount)
            .WithMany(x => x.Likes)
            .HasForeignKey(x => x.LikedbyAccountId)
            .OnDelete(DeleteBehavior.Restrict); 
            
        }
    }
}