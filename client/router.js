import "../imports/ui/bio.html";
import "../imports/ui/projects.html";
import "../imports/ui/blog.html";
import "../imports/ui/blog";
import "../imports/ui/collection.html";
import "../imports/ui/collection";
import { Blogs } from "../imports/api/blogs";

Router.configure({
  layoutTemplate: "main",
});

Router.route("/", {
  name: "bio",
  template: "bio",
});

Router.route("/projects", {
  name: "projects",
  template: "projects",
});

Router.route("/addBlog", {
  name: "addBlog",
  template: "addBlog",
});

Router.route("/blog/:_id", {
  name: "blogItem",
  template: "blog",
  data: function() {
    var currentBlog = this.params._id;

    return Blogs.findOne({ _id: currentBlog });
  },
});

Router.route("/collection", {
  name: "collection",
  template: "collection",
});
