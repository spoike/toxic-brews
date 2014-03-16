define(['knockout', 'lodash'], function(ko, _) {

    function CombineItem(parent) {
        this.isSelected = ko.observable(false);
        this.item = ko.observable();
        this.parent = parent;
    }

    CombineItem.prototype.select = function() {
        this.parent.resetSelect();
        this.parent.isInventoryOpen(true);
        this.isSelected(true);
    };

    function CombineScene() {
        this.title = "Combine";
        this.itemsToCombine = [
            new CombineItem(this),
            new CombineItem(this),
            new CombineItem(this)
        ];

        this.isInventoryOpen = ko.observable(false);

        document.addEventListener('closeInventory', _.bind(function(e) {
            this.isInventoryOpen(false);
            this.resetSelect();
        }, this), false);

        document.addEventListener('selectInventoryItem', _.bind(function(e) {
            var slot = _.find(this.itemsToCombine, function(combineItem) {
                return combineItem.isSelected();
            });
            slot.item(e.detail);
            console.log(e);
            this.isInventoryOpen(false);
            this.resetSelect();
        }, this), false);
    }

    CombineScene.prototype.resetSelect = function() {
        var i;
        for (i = 0; i < this.itemsToCombine.length; i++) {
            this.itemsToCombine[i].isSelected(false);
        }
    };

    return new CombineScene();

});