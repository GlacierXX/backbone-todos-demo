define([
  "backbone",
  "jquery",
  "underscore",
  "text!templates/stats.html",
  "collections/todos",
  "views/todos"
  ], function (Backbone, $, _, statsTemplate, Todos, TodoView) {
  var AppView = Backbone.View.extend({
    el: $("#todoapp"),
    template: _.template(statsTemplate),
    events: {
      "keypress #new-todo": "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllCompleted"
    },
    initialize: function () {
      this.input = this.$("#new-todo");
      this.allCheckBox = this.$("#toggle-all")[0];
      this.listenTo(Todos, "add", this.addOne);
      this.listenTo(Todos, "reset", this.addAll);
      this.listenTo(Todos, "all", this.render);
      this.footer = this.$("footer");
      this.main = this.$("#main");
      Todos.fetch();
    },
    render: function () {
      var _done = Todos.done().length;
      var _remaining = Todos.remaining().length;
      if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.template({
          done: _done,
          remaining: _remaining
        }));
      } else {
        this.main.hide();
        this.footer.hide();
      }
      this.allCheckBox.checked = !_remaining;
    },
    createOnEnter: function (e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      Todos.create({title: this.input.val(), order: Todos.nextOrder()});
      this.input.val("");
    },
    clearCompleted: function () {
      _.invoke(Todos.done(), "destory");
    },
    toggleAllCompleted: function () {
      var _done = this.allCheckBox.checked;
      Todos.each(function (todo) {
        todo.save({"done": _done});
      });
    },
    addOne: function (todo) {
      var _view = new TodoView({model: todo});
      this.$("#todo-list").append(_view.render().el);
    },
    addAll: function () {
      Todos.each(this.addOne(), this);
    }
  });
  return AppView;
});
