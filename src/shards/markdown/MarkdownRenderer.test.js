import React from "react";
import { mount } from "enzyme";
import MarkdownRenderer from "./MarkdownRenderer";
import { Map } from "immutable";

const sourceObject = Map({
  type: "markdown",
  markdown: `##### 🍫 CONFECTIONARY`
});

describe("<MarkdownShardRenderer />", () => {
  const mountShardRenderer = () => {
    return mount(
      <MarkdownRenderer sourceObject={sourceObject.toObject()}/>
    );
  };

  it("render without crashing", () => {
    const wrapper = mountShardRenderer();

    expect(wrapper.exists()).toEqual(true)}
  );

  it("renders markdown", () => {
    const wrapper = mountShardRenderer();

    expect(wrapper.render().text().trim()).toEqual("🍫 CONFECTIONARY")
  });
});
