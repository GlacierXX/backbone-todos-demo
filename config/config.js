require.config({
  baseUrl: "./",
  paths: {
    json2: "node_modules/json2/lib/JSON2/static/json2",
    jquery: "node_modules/jquery/dist/jquery.min",
    underscore: "node_modules/backbone/node_modules/underscore/underscore-min",
    backbone: "node_modules/backbone/backbone-min",
    localStorage: "node_modules/backbone.localStorage/backbone.localStorage-min",
    text: "node_modules/requirejs-text/text"
  },
  shim: {
    "backbone": {
      exports: "Backbone",
      deps: ["underscore", "jquery"]
    }
  }
});
define(["views/app"], function (App) {
  new App;
});
