import React from "react";
import { mount } from "enzyme";
import { Map } from "immutable";

import BaseShard from "../BaseShard";

const sourceObject = Map({ type: "title", title: "Hello world" });

describe("<BaseShard />", () => {
  const mountBaseShard = ({
    type = "title",
    includeRenderer = true,
    includeEditor = false,
    isEditing = false,
    editable = false
  } = {}) => {
    const onChangeMock = jest.fn();
    const onMoveUpMock = jest.fn();
    const onMoveDownMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onEditMock = jest.fn();
    const onCancelMock = jest.fn();
    const onSaveMock = jest.fn();

    const renderer = ({sourceObject}) => <h1>{sourceObject.title}</h1>;
    const editor = ({ sourceObject, change }) => (
      <>
        <label>Title:</label>
        <input
          value={sourceObject.title}
          onChange={e => change({ ...sourceObject, title: e.target.value })}
        />
      </>
    );

    const wrapper = mount(
      <BaseShard
        type={type}
        sourceObject={sourceObject.toJS()}
        renderer={includeRenderer ? renderer : null}
        editor={includeEditor ? editor : null}
        isEditing={isEditing}
        editable={editable}
        onChange={onChangeMock}
        onMoveUp={onMoveUpMock}
        onMoveDown={onMoveDownMock}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        onCancel={onCancelMock}
        onSave={onSaveMock}
      />
    );

    return {
      wrapper,
      onChangeMock,
      onMoveUpMock,
      onMoveDownMock,
      onDeleteMock,
      onEditMock,
      onCancelMock,
      onSaveMock
    };
  };

  it("renders renderer", () => {
    const { wrapper } = mountBaseShard();

    expect(wrapper.find("renderer").contains(<h1>Hello world</h1>)).toBe(true);
  });

  it("renders editor", () => {
    const { wrapper } = mountBaseShard({ includeEditor: true, isEditing: true });

    expect(wrapper.find("editor").contains(<label>Title:</label>)).toBe(true);
    expect(wrapper.find("editor").containsMatchingElement(<input />)).toBe(true);
  });

  it("adds type to DOM as data-shard-type", () => {
    const { wrapper } = mountBaseShard();

    expect(wrapper.getDOMNode().getAttribute("data-shard-type")).toEqual("title");
  });

  it("updates sourceObject from editor", () => {
    const { wrapper } = mountBaseShard({ includeEditor: true, isEditing: true });

    wrapper.find("input").simulate("change", { target: { value: "Hello galaxy" } });

    expect(wrapper.find("renderer").contains(<h1>Hello galaxy</h1>)).toBe(true);
  });

  it("displays ShardActions when editable is true", () => {
    const { wrapper } = mountBaseShard({ editable: true });

    expect(wrapper.find("ShardActions").exists()).toEqual(true);
  });

  it("hides ShardActions when editable is false", () => {
    const { wrapper } = mountBaseShard();

    expect(wrapper.find("ShardActions").exists()).toEqual(false);
  });

  it("triggers onMoveUp from ActionMenu", () => {
    const { wrapper, onMoveUpMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onMoveUp")();

    expect(onMoveUpMock.mock.calls.length).toEqual(1);
  });

  it("triggers onMoveDown from ActionMenu", () => {
    const { wrapper, onMoveDownMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onMoveDown")();

    expect(onMoveDownMock.mock.calls.length).toEqual(1);
  });

  it("triggers onDelete from ActionMenu", () => {
    const { wrapper, onDeleteMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onDelete")();

    expect(onDeleteMock.mock.calls.length).toEqual(1);
  });

  it("triggers onDelete from ActionMenu", () => {
    const { wrapper, onEditMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onEdit")();

    expect(onEditMock.mock.calls.length).toEqual(1);
  });

  it("triggers onCancel from ActionMenu", () => {
    const { wrapper, onCancelMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onCancel")();

    expect(onCancelMock.mock.calls.length).toEqual(1);
  });

  it("triggers onSave from ActionMenu", () => {
    const { wrapper, onSaveMock } = mountBaseShard({ editable: true });

    wrapper.find("ShardActions").prop("onSave")();

    expect(onSaveMock.mock.calls.length).toEqual(1);
  });
});
