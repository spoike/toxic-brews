requirejs.config({
    baseUrl: 'scripts',
    paths: {
        'jquery': 'lib/jquery-1.10.1.min',
        'bootstrap': 'lib/bootstrap.min',
        'knockout': 'lib/knockout-3.0.0.min',
        'knockout-amd-helpers': 'lib/knockout-amd-helpers.0.6.1.min',
        'text': 'lib/text-2.0.10'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'knockout': {
            exports: 'ko'
        },
        'knockout-amd-helpers': {
            deps: ['knockout']
        }
    }
});

define(['jquery', 'knockout', 'bootstrap', 'knockout-amd-helpers'], function($, ko) {

    function GameModel() {
        this.currentModule = ko.observable('index');
    }

    ko.amdTemplateEngine.defaultPath = "templates/";
    ko.bindingHandlers.module.baseDir = "game/";

    ko.applyBindings(new GameModel(), $('.game')[0]);

});