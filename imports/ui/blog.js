import { Template } from "meteor/templating";
import { Blogs, BlogComments } from "../api/blogs";

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
      author_id: Meteor.userId(),
      author_username: Meteor.user().username,
    });

    target.title.value = "";
    target.content.value = "";

    Router.go(`/blog/${blog}`);
  },
});

Template.blogItem.helpers({
  isSelected() {
    return this._id != undefined;
  },
  blogComments: function() {
    return BlogComments.find({}, { sort: { createdOn: 1 } });
  },
});

Template.addBlogComment.events({
  "submit form": function(event) {
    event.preventDefault();
    const target = event.target;
    let comment = target.comment.value;
    let date = new Date();
    const blogComment = BlogComments.insert({
      comment: comment,
      commentedAt: date,
      author_id: Meteor.userId(),
      author_username: Meteor.user().username,
    });

    console.log(this);

    target.comment.value = "";
  },
});
