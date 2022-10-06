using Catalog.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace Catalog.Respositories
{


    public class InMemItemsRepository : IItemsRepository
    {
        private readonly List<Item> items = new()
        {
            new Item {Id = Guid.NewGuid(), Name = "Bow & Arrow Set", Price = 980, CreatedDate = DateTimeOffset.UtcNow},
            new Item {Id = Guid.NewGuid(), Name = "Deluxe Shovel", Price = 200, CreatedDate = DateTimeOffset.UtcNow},
            new Item {Id = Guid.NewGuid(), Name = "Shield L1", Price = 20, CreatedDate = DateTimeOffset.UtcNow},
            new Item {Id = Guid.NewGuid(), Name = "Arrows x10", Price = 10, CreatedDate = DateTimeOffset.UtcNow},
            new Item {Id = Guid.NewGuid(), Name = "Bombs x 10", Price = 10, CreatedDate = DateTimeOffset.UtcNow},
            new Item {Id = Guid.NewGuid(), Name = "Recovery Hearts x3", Price = 10, CreatedDate = DateTimeOffset.UtcNow}
        };

        public async Task CreateItemAsync(Item item)
        {
            items.Add(item);
            await Task.CompletedTask;
        }

        public async Task DeleteItemAsync(Guid id)
        {
            var index = items.FindIndex(existingItem => existingItem.Id == id);
            items.RemoveAt(index);
        }

        public async Task<Item> GetItemAsync(Guid id)
        {
            var item = items.Where(Item => Item.Id == id).SingleOrDefault();
            return await Task.FromResult(item);
        }

        public async Task<IEnumerable<Item>> GetItemsAsync()
        {
            return await Task.FromResult(items);
        }

        public async Task UpdateItemAsync(Item item)
        {
            var index = items.FindIndex(existingItem => existingItem.Id == item.Id);
            items[index] = item;
            await Task.CompletedTask;
        }
    }
}