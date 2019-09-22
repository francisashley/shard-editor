import React from "react";
import { shallow, mount } from "enzyme";
import MarkdownRenderer from "./MarkdownRenderer";
import { Map } from "immutable";

const sourceObject = Map({
  type: "markdown",
  markdown: `##### 🍫 CONFECTIONARY`
});
describe("MarkdownShardRenderer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MarkdownRenderer sourceObject={sourceObject.toObject()} />);
  });

  it("should render without crashing", () => expect(wrapper.exists()).toEqual(true));

  it("renders markdown", () =>
    expect(
      wrapper
        .render()
        .text()
        .trim()
    ).toEqual("🍫 CONFECTIONARY"));
});
