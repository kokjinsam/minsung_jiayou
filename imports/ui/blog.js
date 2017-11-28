import { Template } from "meteor/templating";
import { Blogs } from "../api/blogs.js";

Template.blog.events({
  "click #newEntry"() {
    Router.go("addBlog");
  },
  "click #deleteAll"() {
    let blogs = Blogs.find({});
    blogs.forEach(function(blog) {
      Blogs.remove(blog._id);
    });
  },
});

Template.blog.helpers({
  blog: function() {
    return Blogs.find({}, { sort: { createdOn: 1 } });
  },
  blogCount() {
    return Blogs.find({}).count();
  },
});

Template.addBlog.events({
  "submit form": function(event) {
    event.preventDefault();
    const target = event.target;
    let title = target.title.value;
    let content = target.content.value;
    let date = new Date();
    const blog = Blogs.insert({
      title: title,
      createdOn: date,
      content: content,
    });

    target.title.value = "";
    target.content.value = "";

    console.log(blog);

    Router.go(`/blog/${blog}`);
  },
});

Template.blogItem.helpers({
  isSelected() {
    return this._id != undefined;
  },
});
