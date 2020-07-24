using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class AppContextSeed
    {
        public static async Task SeedAsync(Infrastructure.Data.AppContext appContext, ILoggerFactory loggerFactory)
        {
            try
            {

                if(!appContext.Accounts.Any())
                {
                    var accountJson = File.ReadAllText("../Infrastructure/Data/SeedData/account.json");
                    var accounts = JsonSerializer.Deserialize<List<Account>>(accountJson);
                    accounts.ForEach(a => { appContext.Accounts.Add(a); });
                    await appContext.SaveChangesAsync();
                }
                if(!appContext.Posts.Any())
                {
                    var postJson = File.ReadAllText("../Infrastructure/Data/SeedData/posts.json");
                    var posts = JsonSerializer.Deserialize<List<Post>>(postJson);
                    posts.ForEach(a => { appContext.Posts.Add(a); });
                    await appContext.SaveChangesAsync();
                }
                if(!appContext.Comments.Any())
                {
                    var accountJson = File.ReadAllText("../Infrastructure/Data/SeedData/comments.json");
                    var accounts = JsonSerializer.Deserialize<List<Comment>>(accountJson);
                    accounts.ForEach(a => { appContext.Comments.Add(a); });
                    await appContext.SaveChangesAsync();
                }
                if(!appContext.Likes.Any())
                {
                    var accountJson = File.ReadAllText("../Infrastructure/Data/SeedData/likes.json");
                    var accounts = JsonSerializer.Deserialize<List<Like>>(accountJson);
                    accounts.ForEach(a => { appContext.Likes.Add(a); });
                    await appContext.SaveChangesAsync();
                }

                // if (!appContext..Any())
                // {
                //     var brandsJson = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                //     var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsJson);
                //     brands.ForEach(brand => { appContext.ProductBrands.Add(brand); });
                //     await appContext.SaveChangesAsync();
                // }
                // if (!appContext.ProductTypes.Any())
                // {
                //     var typesJson = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                //     var types = JsonSerializer.Deserialize<List<ProductType>>(typesJson);
                //     types.ForEach(type => { appContext.ProductTypes.Add(type); });
                //     await appContext.SaveChangesAsync();
                // }
                // if (!appContext.Products.Any())
                // {
                //     var productsJson = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                //     var products = JsonSerializer.Deserialize<List<Product>>(productsJson);
                //     products.ForEach(product => { appContext.Products.Add(product); });
                //     await appContext.SaveChangesAsync();
                // }

                // if (!appContext.DeliveryMethods.Any())
                // {
                //     var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                //     var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                //     methods.ForEach(method => { appContext.DeliveryMethods.Add(method); });
                //     await appContext.SaveChangesAsync();
                // }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<AppContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}