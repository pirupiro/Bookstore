using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BookstoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using BookstoreWebAPI.Services;
using System.IO;
using Microsoft.Extensions.FileProviders;

namespace BookstoreWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );

            services.AddDbContext<BookstoreContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Bookstore"))
            );

            services.AddTransient<EmployeeService>()
                .AddTransient<AccountService>()
                .AddTransient<BookService>()
                .AddTransient<OtherService>()
                .AddTransient<AgencyService>()
                .AddTransient<WarehouseService>()
                .AddTransient<VendorService>()
                .AddTransient<ImportService>()
                .AddTransient<ExportService>()
                .AddTransient<OrderService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider
                (
                    Path.Combine(Directory.GetCurrentDirectory(), "Images")
                ),
                RequestPath = "/images"
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
