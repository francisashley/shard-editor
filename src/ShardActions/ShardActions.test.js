import React from "react";
import { mount } from "enzyme";

import ShardActions from "./ShardActions";

describe("<ShardActions />", () => {
  const mountShardActions = ({ isEditing = false } = {}) => {
    const onMoveUpMock = jest.fn();
    const onMoveDownMock = jest.fn();
    const onDeleteMock = jest.fn();
    const onEditMock = jest.fn();
    const onCancelMock = jest.fn();
    const onSaveMock = jest.fn();
    const wrapper = mount(
      <ShardActions
        onMoveUp={onMoveUpMock}
        onMoveDown={onMoveDownMock}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
        onCancel={onCancelMock}
        onSave={onSaveMock}
        isEditing={isEditing}
      />
    );
    return {
      wrapper,
      onMoveUpMock,
      onMoveDownMock,
      onDeleteMock,
      onEditMock,
      onCancelMock,
      onSaveMock
    };
  };

  it("renders move-up button", () => {
    const { wrapper } = mountShardActions();

    expect(wrapper.find("MoveUpButton").exists()).toEqual(true);
  });

  it("renders move-down button", () => {
    const { wrapper } = mountShardActions();

    expect(wrapper.find("MoveDownButton").exists()).toEqual(true);
  });

  it("renders delete button when isEditing is true", () => {
    const { wrapper } = mountShardActions({ isEditing: true });

    expect(wrapper.find("DeleteButton").exists()).toEqual(true);
  });

  it("renders delete button when isEditing is true", () => {
    const { wrapper } = mountShardActions({ isEditing: true });

    expect(wrapper.find("EditButton").exists()).toEqual(true);
  });

  it("renders cancel button when isEditing is false", () => {
    const { wrapper } = mountShardActions();

    expect(wrapper.find("CancelButton").exists()).toEqual(true);
  });

  it("renders save button when isEditing is false", () => {
    const { wrapper } = mountShardActions();

    expect(wrapper.find("SaveButton").exists()).toEqual(true);
  });

  it("calls onMoveUp when move-up button clicked", () => {
    const { wrapper, onMoveUpMock } = mountShardActions();

    wrapper.find("MoveUpButton").simulate("click");

    expect(onMoveUpMock.mock.calls.length).toEqual(1);
  });

  it("calls onMoveDown when move-down button clicked", () => {
    const { wrapper, onMoveDownMock } = mountShardActions();

    wrapper.find("MoveDownButton").simulate("click");

    expect(onMoveDownMock.mock.calls.length).toEqual(1);
  });

  it("calls onDelete when delete button clicked", () => {
    const { wrapper, onDeleteMock } = mountShardActions();

    wrapper.find("DeleteButton").simulate("click");

    expect(onDeleteMock.mock.calls.length).toEqual(1);
  });

  it("calls onEdit when delete button clicked", () => {
    const { wrapper, onEditMock } = mountShardActions();

    wrapper.find("EditButton").simulate("click");

    expect(onEditMock.mock.calls.length).toEqual(1);
  });

  it("calls onEdit when delete button clicked", () => {
    const { wrapper, onEditMock } = mountShardActions();

    wrapper.find("EditButton").simulate("click");

    expect(onEditMock.mock.calls.length).toEqual(1);
  });

  it("calls onCancel when cancel button clicked", () => {
    const { wrapper, onCancelMock } = mountShardActions({ isEditing: true });

    wrapper.find("CancelButton").simulate("click");

    expect(onCancelMock.mock.calls.length).toEqual(1);
  });

  it("calls onSave when Save button clicked", () => {
    const { wrapper, onSaveMock } = mountShardActions({ isEditing: true });

    wrapper.find("SaveButton").simulate("click");

    expect(onSaveMock.mock.calls.length).toEqual(1);
  });
});
