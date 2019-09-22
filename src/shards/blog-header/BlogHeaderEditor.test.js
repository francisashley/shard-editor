import React from "react";
import { shallow, mount } from "enzyme";
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

describe("BlogHeaderShardEditor", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<BlogHeaderEditor sourceObject={sourceObject.toObject()} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should be able to change title", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-title-input")
      .first()
      .simulate("change", { target: { value: "another title" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("title", "another title").toObject());
  });

  it("should be able to change email", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-email-input")
      .first()
      .simulate("change", { target: { value: "another@email.com" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("email", "another@email.com").toObject());
  });

  it("should be able to change date format", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-date-format-input")
      .first()
      .simulate("change", { target: { value: "y m d" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("dateFormat", "y m d").toObject());
  });

  it("should be able to change author", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-author-input")
      .first()
      .simulate("change", { target: { value: "Jason Statham" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("author", "Jason Statham").toObject());
  });

  it("should display the correct author toggle state", () => {
    const wrapper = mount(<BlogHeaderEditor sourceObject={sourceObject.toObject()} />);

    expect(
      wrapper
        .find(".blog-header-shard-author-checkbox")
        .first()
        .props().defaultChecked
    ).toEqual(true);
  });

  it("should be able to toggle author checkbox", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-author-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("showAuthor", false).toObject());
  });

  it("should be able to change date", () => {
    const onChangeMock = jest.fn();
    const wrapper = shallow(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-date-input")
      .first()
      .simulate("change", { target: { value: 2552953600000 } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("date", 2552953600000).toObject());
  });

  it("should display the correct date toggle state", () => {
    const wrapper = mount(<BlogHeaderEditor sourceObject={sourceObject.toObject()} />);

    expect(
      wrapper
        .find(".blog-header-shard-date-checkbox")
        .first()
        .props().defaultChecked
    ).toEqual(true);
  });

  it("should be able to toggle date checkbox", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-date-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });
    expect(onChangeMock).toBeCalledWith(sourceObject.set("showDate", false).toObject());
  });

  it("should display the correct tags toggle state", () => {
    const wrapper = mount(<BlogHeaderEditor sourceObject={sourceObject.toObject()} />);

    expect(
      wrapper
        .find(".blog-header-shard-tags-checkbox")
        .first()
        .props().defaultChecked
    ).toEqual(true);
  });

  it("should be able to toggle tags checkbox", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".blog-header-shard-tags-checkbox")
      .first()
      .simulate("change", { target: { checked: false } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("showTags", false).toObject());
  });

  it("should be able to add tags", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper.find(".react-tagsinput-input").simulate("change", { target: { value: "test-tag" } });
    wrapper.find(".react-tagsinput-input").simulate("keydown", { key: 13 });

    expect(onChangeMock).toBeCalledWith(
      sourceObject.set("tags", [...sourceObject.get("tags"), "test-tag"]).toObject()
    );
  });

  it("should be able to remove tags", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <BlogHeaderEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );

    wrapper
      .find(".react-tagsinput .react-tagsinput-tag")
      .first()
      .find(".react-tagsinput-remove")
      .simulate("click");

    expect(onChangeMock.mock.calls[0][0].tags.length).toEqual(3);
  });
});
