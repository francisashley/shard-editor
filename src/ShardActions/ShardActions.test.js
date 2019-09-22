import React from "react";
import { shallow, mount } from "enzyme";
import { Map } from "immutable";

import ShardActions from "./ShardActions";

describe("ShardActions", () => {
  it("should render when `show` is true", () => {
    const wrapper = shallow(<ShardActions show />);

    expect(wrapper.find(".shard-actions").exists()).toEqual(true);
  });
  it("should render move-up button", () => {
    const wrapper = shallow(<ShardActions show />);

    expect(wrapper.find("MoveUpButton").exists()).toEqual(true);
  });
  it("should render move-down button", () => {
    const wrapper = shallow(<ShardActions show />);

    expect(wrapper.find("MoveDownButton").exists()).toEqual(true);
  });
  it("should render delete button when isEditing is true", () => {
    const wrapper = shallow(<ShardActions show isEditing />);

    expect(wrapper.find("DeleteButton").exists()).toEqual(true);
  });
  it("should render delete button when isEditing is true", () => {
    const wrapper = shallow(<ShardActions show isEditing />);

    expect(wrapper.find("EditButton").exists()).toEqual(true);
  });
  it("should render cancel button when isEditing is false", () => {
    const wrapper = shallow(<ShardActions show isEditing={false} />);

    expect(wrapper.find("CancelButton").exists()).toEqual(true);
  });
  it("should render save button when isEditing is false", () => {
    const wrapper = shallow(<ShardActions show isEditing={false} />);

    expect(wrapper.find("SaveButton").exists()).toEqual(true);
  });
  it("should call onMoveUp when move-up button clicked", () => {
    const onMoveUpMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing={false} onMoveUp={onMoveUpMock} />);

    wrapper.find("MoveUpButton").simulate("click");

    expect(onMoveUpMock.mock.calls.length).toEqual(1);
  });
  it("should call onMoveDown when move-down button clicked", () => {
    const onMoveDownMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing={false} onMoveDown={onMoveDownMock} />);

    wrapper.find("MoveDownButton").simulate("click");

    expect(onMoveDownMock.mock.calls.length).toEqual(1);
  });
  it("should call onDelete when delete button clicked", () => {
    const onDeleteMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing={false} onDelete={onDeleteMock} />);

    wrapper.find("DeleteButton").simulate("click");

    expect(onDeleteMock.mock.calls.length).toEqual(1);
  });
  it("should call onEdit when delete button clicked", () => {
    const onEditMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing={false} onEdit={onEditMock} />);

    wrapper.find("EditButton").simulate("click");

    expect(onEditMock.mock.calls.length).toEqual(1);
  });
  it("should call onEdit when delete button clicked", () => {
    const onEditMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing={false} onEdit={onEditMock} />);

    wrapper.find("EditButton").simulate("click");

    expect(onEditMock.mock.calls.length).toEqual(1);
  });
  it("should call onCancel when cancel button clicked", () => {
    const onCancelMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing onCancel={onCancelMock} />);

    wrapper.find("CancelButton").simulate("click");

    expect(onCancelMock.mock.calls.length).toEqual(1);
  });

  it("should call onSave when Save button clicked", () => {
    const onSaveMock = jest.fn();
    const wrapper = mount(<ShardActions show isEditing onSave={onSaveMock} />);

    wrapper.find("SaveButton").simulate("click");

    expect(onSaveMock.mock.calls.length).toEqual(1);
  });
});
