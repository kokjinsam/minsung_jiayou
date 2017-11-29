import { Template } from "meteor/templating";
import { data } from "../api/data";

Template.collection.helpers({
  courses: function() {
    return data.courses.completed;
  },
});
