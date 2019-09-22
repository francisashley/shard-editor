import React from "react";
import { shallow, mount } from "enzyme";
import BlogHeaderRenderer from "./BlogHeaderRenderer";

const sourceObject = {
  type: "blog-header",
  date: 1552953600000,
  tags: ["health", "confectionary", "fruit", "vegetables"],
  title: "Healthy eating",
  author: "John Smith",
  dateFormat: "DD MMM YYYY",
  email: "js@email.com",
  showDate: true,
  showTags: true,
  showAuthor: true
};

describe("BlogHeaderShard renderer", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<BlogHeaderRenderer sourceObject={sourceObject} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should render author inside an anchor when an email has been provided", () => {
    const wrapper = shallow(<BlogHeaderRenderer sourceObject={sourceObject} />);

    expect(wrapper.find(".blog-header-shard-author").html()).toEqual(
      '<li class="blog-header-shard-author">by <a href="mailto:js@email.com">John Smith</a></li>'
    );
  });

  it("should render author as plane text when no email has been provided", () => {
    const wrapper = shallow(<BlogHeaderRenderer sourceObject={{ ...sourceObject, email: null }} />);

    expect(wrapper.find(".blog-header-shard-author").html()).toEqual(
      '<li class="blog-header-shard-author">by John Smith</li>'
    );
  });

  it("should render date in correct format", () => {
    const wrapper = shallow(<BlogHeaderRenderer sourceObject={sourceObject} />);

    expect(wrapper.find(".blog-header-shard-date").text()).toEqual("19 Mar 2019");
  });

  it("should not render author when `showAuthor` is false", () => {
    const wrapper = shallow(
      <BlogHeaderRenderer sourceObject={{ ...sourceObject, showAuthor: false }} />
    );

    expect(wrapper.find(".blog-header-shard-author").exists()).toEqual(false);
  });

  it("should not render date when `showDate` is false", () => {
    const wrapper = shallow(
      <BlogHeaderRenderer sourceObject={{ ...sourceObject, showDate: false }} />
    );

    expect(wrapper.find(".blog-header-shard-date").exists()).toEqual(false);
  });

  it("should not render tags when `showTags` is false", () => {
    const wrapper = shallow(
      <BlogHeaderRenderer sourceObject={{ ...sourceObject, showTags: false }} />
    );

    expect(wrapper.find(".blog-header-shard-tags").exists()).toEqual(false);
  });
});
