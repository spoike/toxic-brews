define(['knockout', 'lodash', 'game/items-repo'], function(ko, _, itemsData) {

    function InventoryItem(item, inventory) {
        this.id = item.id;
        this.count = 1;
        this.item = item;
        this.inventory = inventory;
    }

    InventoryItem.prototype.select = function() {
        var evt = new CustomEvent('selectInventoryItem', {
            'detail': this
        });
        document.dispatchEvent(evt);
        this.inventory.unselect();
    };

    function Inventory() {
        this.items = ko.observableArray();

        this.addItem('nirnroot', 5);
        this.addItem('deathcap', 3);
        this.addItem('vampbite', 2);

        this.selectedItem = ko.observable();

        this.closeSelect = _.bind(function() {
            this.selectedItem(null);
        }, this);
    }

    Inventory.prototype.addItem = function(id, amount) {
        var item = new InventoryItem(itemsData.get(id), this);
        item.count = amount;
        this.items.push(item);
    };

    Inventory.prototype.select = function() {
        this.inventory.selectedItem(this);
    };

    Inventory.prototype.unselect = function() {
        this.selectedItem(null);
    };

    Inventory.prototype.closeInventory = function() {
        var evt = new Event('closeInventory');
        this.unselect();
        document.dispatchEvent(evt); 
    };

    return new Inventory();

});