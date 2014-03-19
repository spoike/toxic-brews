define(['lodash', 'text!../../data/ingredients.json'], function(_, ingredients) {

    var items = _.reduce(JSON.parse(ingredients), function(memo, item) {
        memo[item.id] = item;
        return memo;
    }, {});

    var get = function(id) {
        return items[id];
    };

    return {
        get: get
    };

});