define([
  "models/todo",
  "localStorage"
  ], function (Todo, LocalStorage) {
  var Todos = Backbone.Collection.extend({
    model: Todo,
    localStorage: new LocalStorage("todos-backbone"),
    done: function () {
      return this.where({done: true});
    },
    remaining: function () {
      return this.where({done: false});
    },
    nextOrder: function () {
      if (!this.length) return 1;
      return this.last().get("order") + 1;
    },
    comparator: "order"
  });
  return new Todos();
});
