import React from "react";
import { mount } from "enzyme";
import BlogHeaderEditor from "./BlogHeaderEditor";
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

describe("<BlogHeaderShardEditor />", () => {
  const mountShardEditor = () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <BlogHeaderEditor sourceObject={sourceObject.toObject()} onChange={onChangeMock} />
    );

    return { wrapper, onChangeMock };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardEditor();

    expect(wrapper.exists()).toEqual(true);
  });

  it("can change title", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-title-input")
      .first()
      .simulate("change", { target: { value: "another title" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("title", "another title").toObject());
  });

  it("can change email", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-email-input")
      .first()
      .simulate("change", { target: { value: "another@email.com" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("email", "another@email.com").toObject());
  });

  it("can change date format", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-date-format-input")
      .first()
      .simulate("change", { target: { value: "y m d" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("dateFormat", "y m d").toObject());
  });

  it("can change author", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-author-input")
      .first()
      .simulate("change", { target: { value: "Jason Statham" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("author", "Jason Statham").toObject());
  });

  it("display author toggle state", () => {
    const { wrapper } = mountShardEditor();

    expect(
      wrapper.find(".blog-header-shard-author-checkbox").first().props().defaultChecked
    ).toEqual(true);
  });

  it("can toggle author checkbox", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-author-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("showAuthor", false).toObject());
  });

  it("can change date", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-date-input")
      .first()
      .simulate("change", { target: { value: 2552953600000 } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("date", 2552953600000).toObject());
  });

  it("displays the correct date toggle state", () => {
    const { wrapper } = mountShardEditor();

    expect(
      wrapper.find(".blog-header-shard-date-checkbox").first().props().defaultChecked
    ).toEqual(true);
  });

  it("can toggle date checkbox", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-date-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });

      expect(onChangeMock).toBeCalledWith(sourceObject.set("showDate", false).toObject());
  });

  it("display the correct tags toggle state", () => {
    const { wrapper } = mountShardEditor();

    expect(
      wrapper.find(".blog-header-shard-tags-checkbox").first().props().defaultChecked
    ).toEqual(true);
  });

  it("can  toggle tags checkbox", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".blog-header-shard-tags-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("showTags", false).toObject());
  });

  it("can add tags", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find(".react-tagsinput-input").simulate("change", { target: { value: "test-tag" } });
    wrapper.find(".react-tagsinput-input").simulate("keydown", { key: 13 });

    expect(onChangeMock).toBeCalledWith(
      sourceObject.set("tags", [...sourceObject.get("tags"), "test-tag"]).toObject()
    );
  });

  it("can remove tags", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".react-tagsinput .react-tagsinput-tag")
      .first()
      .find(".react-tagsinput-remove")
      .simulate("click");

    expect(onChangeMock.mock.calls[0][0].tags.length).toEqual(3);
  });
});
