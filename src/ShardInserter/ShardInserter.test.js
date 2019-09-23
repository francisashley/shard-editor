import React from "react";
import { mount } from "enzyme";
import { List } from "immutable";

import ShardInserter from "./ShardInserter";

const items = List([{ label: "Blog header", type: "blog-header" }]);

describe("<ShardInserter />", () => {
  const mountShardInserter = ({ items = [] } = {}) => {
    const onInsertMock = jest.fn();

    const wrapper = mount(<ShardInserter items={items} onInsert={onInsertMock}/>);

    return { wrapper, onInsertMock };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardInserter();

    expect(wrapper.exists()).toEqual(true);
  });

  it("shows inserter menu when clicking toggle button", () => {
    const { wrapper } = mountShardInserter({ items: items.toJS() });

    wrapper.find("ShardInserterButton").simulate("click");

    expect(wrapper.find("ShardInserterList").exists()).toBe(true);
  });

  it("renders inserter items", () => {
    const { wrapper } = mountShardInserter({ items: items.toJS() });

    wrapper.find("ShardInserterButton").simulate("click");

    expect(wrapper.find(".shard-inserter-list li")).toHaveLength(1);
  });

  it("calls onInsert prop with type when clicking an inserter button", () => {
    const { wrapper, onInsertMock } = mountShardInserter({ items: items.toJS() });

    wrapper.find("ShardInserterButton").simulate("click");
    wrapper.find(".shard-inserter-list li button").simulate("click");

    expect(onInsertMock.mock.calls[0][0]).toBe("blog-header");
  });
});
