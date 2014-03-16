define(['knockout', 'lodash'], function(ko, _) {

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
        this.items.push(new InventoryItem({
            id: 'nirnroot',
            title: 'Nirnroot',
            description: 'A common yet ugly looking root with many uses'
        }, this));
        this.items.push(new InventoryItem({
            id: 'deathcap',
            title: 'Death Cap',
            description: 'Looks like a colorful mushroom, but deadly'
        }, this));
        this.items.push(new InventoryItem({
            id: 'vampbite',
            title: 'Vampire\'s Bite',
            description: 'A harrowing flower, you can feel its blood lust coming from the petals'
        }, this));

        this.items()[0].count = 5;
        this.items()[1].count = 3;
        this.items()[2].count = 2;

        this.selectedItem = ko.observable();

        this.closeSelect = _.bind(function() {
            this.selectedItem(null);
        }, this);
    }

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