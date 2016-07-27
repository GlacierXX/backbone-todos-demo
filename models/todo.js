define([
  "backbone",
  "collections/todos"
  ], function (Backbone, Todos) {
  var Todo = Backbone.Model.extend({
    defaults: function () {
      return {
        title: "empty todo...",
        done: false
      };
    },
    toggle: function () {
      this.save({
        done: !this.get("done")
      });
    }
  });
  return Todo;
});

