using Catalog.Dtos;
using Catalog.Entities;
using Microsoft.AspNetCore.Diagnostics;
using System.Xml.Linq;

namespace Catalog
{
    public static class Extensions
    {
        public static ItemDto AsDto(this Item item)
        {
            return new ItemDto
            {

                Id = item.Id,
                Name = item.Name,
                Price = item.Price,
                CreatedDate = item.CreatedDate

            };
        }
    }
}
