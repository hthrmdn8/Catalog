using Catalog.Entities;
using System;
using System.Collections.Generic;

namespace Catalog.Respositories
{
    public interface IItemsRepository
    {
        Task<Item> GetItemAsync(Guid id);
        Task<IEnumerable<Item>> GetItemsAsync();
        Task CreateItemAsync(Item item);
        Task UpdateItemAsync(Item item);

        Task DeleteItemAsync(Guid id);
    }
}