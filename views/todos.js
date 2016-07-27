define([
  "backbone",
  "jquery",
  "underscore",
  "text!templates/todos.html"
  ], function (Backbone, $, _, TodosTemplate) {
  var TodoView = Backbone.View.extend({
    tagName: "li",
    template: _.template(TodosTemplate),
    events: {
      "click .toggle": "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy": "delete",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "update"
    },
    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass("done", this.model.get("done"));
      this.input = this.$(".edit");
      return this;
    },
    toggleDone: function () {
      this.model.toggle();
    },
    edit: function () {
      this.$el.addClass("editing");
      this.input.focus();
    },
    delete: function () {
      this.model.destroy();
    },
    updateOnEnter: function (e) {
      if (e.keyCode == 13) this.update();
    },
    update: function () {
      var _val = this.input.val();
      if (!_val) {
        this.delete();
      } else {
        this.model.save({title: _val});
        this.$el.removeClass("editing");
      }

    }
  });
  return TodoView;
});
