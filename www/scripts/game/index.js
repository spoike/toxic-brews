define(['knockout', 'lodash'], function(ko, _) {

    function CombineItemSlot(parent) {
        this.isSelected = ko.observable(false);
        this.item = ko.observable();
        this.parent = parent;
    }

    CombineItemSlot.prototype.select = function() {
        this.parent.resetSelect();
        this.parent.isInventoryOpen(true);
        this.isSelected(true);
    };

    function CombineScene() {
        this.title = "Combine";
        this.slots = [
            new CombineItemSlot(this),
            new CombineItemSlot(this),
            new CombineItemSlot(this)
        ];

        this.isInventoryOpen = ko.observable(false);

        document.addEventListener('closeInventory', _.bind(function(e) {
            this.isInventoryOpen(false);
            this.resetSelect();
        }, this), false);

        document.addEventListener('selectInventoryItem', _.bind(function(e) {
            var slot = _.find(this.slots, function(combineItem) {
                return combineItem.isSelected();
            });
            slot.item(e.detail);
            console.log(e);
            this.isInventoryOpen(false);
            this.resetSelect();
        }, this), false);

        this.canCombine = ko.computed(function() {
            return _.filter(this.slots, function(slot) {
                return !!slot.item();
            }).length >= 2;
        }, this);
    }

    CombineScene.prototype.resetSelect = function() {
        var i;
        for (i = 0; i < this.slots.length; i++) {
            this.slots[i].isSelected(false);
        }
    };

    CombineScene.prototype.combine = function() {
        if (this.canCombine()) {
            console.log('Combine!');
        }
    };

    return new CombineScene();

});