import { Mongo } from "meteor/mongo";

export const Blogs = new Mongo.Collection("blogs");
export const BlogComments = new Mongo.Collection("blog_comments");
