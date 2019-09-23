import React from "react";
import { mount } from "enzyme";
import BlogHeaderRenderer from "./BlogHeaderRenderer";
import { Map } from "immutable";

const sourceObject = Map({
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
});

describe("<BlogHeaderShard renderer />", () => {
  const mountShardRenderer = ({ sourceObject = {} } = {}) => {
    return mount(
      <BlogHeaderRenderer sourceObject={sourceObject} />
    );
  };

  it("renders without crashing", () => {
    const wrapper = mountShardRenderer({ sourceObject: sourceObject.toObject() });

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders author inside an anchor when an email has been provided", () => {
    const wrapper = mountShardRenderer({ sourceObject: sourceObject.toObject() });

    expect(wrapper.find(".blog-header-shard-author").html()).toEqual(
      '<li class="blog-header-shard-author">by <a href="mailto:js@email.com">John Smith</a></li>'
    );
  });

  it("renders author as plane text when no email has been provided", () => {
    const sourceObject2 = sourceObject.set('email', null);
    const wrapper = mountShardRenderer({ sourceObject: sourceObject2.toObject() });

    expect(wrapper.find(".blog-header-shard-author").html()).toEqual(
      '<li class="blog-header-shard-author">by John Smith</li>'
    );
  });

  it("renders date in correct format", () => {
    const wrapper = mountShardRenderer({ sourceObject: sourceObject.toObject() });

    expect(wrapper.find(".blog-header-shard-date").text()).toEqual("19 Mar 2019");
  });

  it("does not render author when `showAuthor` is false", () => {
    const sourceObject2 = sourceObject.set('showAuthor', false);
    const wrapper = mountShardRenderer({ sourceObject: sourceObject2.toObject() });

    expect(wrapper.find(".blog-header-shard-author").exists()).toEqual(false);
  });

  it("does not render date when `showDate` is false", () => {
    const sourceObject2 = sourceObject.set('showDate', false);
    const wrapper = mountShardRenderer({ sourceObject: sourceObject2.toObject() });

    expect(wrapper.find(".blog-header-shard-date").exists()).toEqual(false);
  });

  it("does not render tags when `showTags` is false", () => {
    const sourceObject2 = sourceObject.set('showTags', false);
    const wrapper = mountShardRenderer({ sourceObject: sourceObject2.toObject() });

    expect(wrapper.find(".blog-header-shard-tags").exists()).toEqual(false);
  });
});
