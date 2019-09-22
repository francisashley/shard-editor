import React from "react";
import { shallow, mount } from "enzyme";
import { Map } from "immutable";

import ShardInserter from "./ShardInserter";

const sourceObject = Map({ type: "something", someText: "Hello world" });

describe("BaseShard", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<ShardInserter />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show inserter menu when clicking toggle button", () => {
    const wrapper = shallow(
      <ShardInserter items={[{ label: "Blog header", type: "blog-header" }]} />
    );

    wrapper.find("ShardInserterButton").simulate("click");

    expect(wrapper.find("ShardInserterList").exists()).toBe(true);
  });

  it("should render inserter items", () => {
    const wrapper = mount(
      <ShardInserter items={[{ label: "Blog header", type: "blog-header" }]} />
    );

    wrapper.find("ShardInserterButton").simulate("click");

    expect(wrapper.find(".shard-inserter-list li")).toHaveLength(1);
  });

  it("should call onInsert prop with type when clicking an inserter button", () => {
    const onInsertMock = jest.fn();
    const wrapper = mount(
      <ShardInserter
        items={[{ label: "Blog header", type: "blog-header" }]}
        onInsert={onInsertMock}
      />
    );

    wrapper.find("ShardInserterButton").simulate("click");
    wrapper.find(".shard-inserter-list li button").simulate("click");

    expect(onInsertMock.mock.calls[0][0]).toBe("blog-header");
  });
});
