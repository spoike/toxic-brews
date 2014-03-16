define(['knockout', 'lodash'], function(ko, _) {

    function Inventory() {
        this.items = ko.observableArray();
        this.items.push({
            id: 'nirnroot',
            count: 1,
            item: {
                id: 'nirnroot',
                title: 'Nirnroot',
                description: 'A common yet ugly looking root with many uses'
            },
            inventory: this
        });
        this.items.push({
            id: 'deathcap',
            count: 2,
            item: {
                id: 'deathcap',
                title: 'Death Cap',
                description: 'Looks like a colorful mushroom, but deadly'
            },
            inventory: this
        });
        this.items.push({
            id: 'vampbite',
            count: 3,
            item: {
                id: 'vampbite',
                title: 'Vampire\'s Bite',
                description: 'A harrowing flower, you can feel its blood lust coming from the petals'
            },
            inventory: this
        });

        this.selectedItem = ko.observable();

        this.closeSelect = _.bind(function() {
            this.selectedItem(null);
        }, this);
    }

    Inventory.prototype.select = function() {
        this.inventory.selectedItem(this);
    };

    return new Inventory();

});