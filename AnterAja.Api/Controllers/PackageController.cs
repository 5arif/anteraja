using AnterAja.Data;
using AnterAja.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;

namespace AnterAja.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PackageController : ControllerBase
    {
        private readonly ILogger<PackageController> _logger;
        private readonly AppDbContext _context;

        public PackageController(ILogger<PackageController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Package> Get()
        {
            return _context.Packages;
        }

        [HttpGet]
        [Route("{id}")]
        public Package Get(Guid id)
        {
            return _context.Packages.Find(id);
        }


        [HttpPost]
        public Package Post(Package model)
        {
            var entity =  _context.Packages.Add(model);
            _context.SaveChanges();

            var package = _context.Packages.Find(entity.Entity.Id);
            return package;
        }


        [HttpPut]
        [Route("{id}")]
        public Package Put(Guid id,  Package model)
        {
            var package = _context.Packages.Find(id);
            package.PackageName = model.PackageName;
            package.Width = model.Width;
            package.Height = model.Height;
            package.Weight = model.Weight;
            package.SenderAddress = model.SenderAddress;
            package.SenderName = model.SenderName;
            package.PackageRecipient = model.PackageRecipient;
            package.RecipientAddress = model.RecipientAddress;

            _context.Packages.Update(package);
            _context.SaveChanges();

            return package;
        }

        [HttpDelete]
        [Route("{id}")]
        public StatusCodeResult Delete(Guid id)
        {
            var package = _context.Packages.Find(id);
            _context.Packages.Remove(package);
            _context.SaveChanges();

            return Ok();
        }
    }
}
