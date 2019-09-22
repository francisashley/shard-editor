import React from "react";
import { shallow, mount } from "enzyme";
import { Map } from "immutable";

import BaseShard from "./BaseShard";

const sourceObject = Map({ type: "something", someText: "Hello world" });

describe("BaseShard", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<BaseShard type="something" renderer={() => {}} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should add type prop to the DOM", () => {
    const wrapper = shallow(<BaseShard type="something" renderer={() => {}} />);

    expect(wrapper.find('section[data-shard-type="something"]').exists()).toEqual(true);
  });

  it("should render renderer prop", () => {
    const wrapper = mount(
      <BaseShard
        type="something"
        sourceObject={sourceObject.toJS()}
        renderer={({ someText }) => <h1>{someText}</h1>}
      />
    );

    expect(wrapper.find("renderer h1").text()).toEqual("Hello world");
  });

  it("editor prop should render", () => {
    const wrapper = mount(
      <BaseShard
        type="something"
        sourceObject={sourceObject.toJS()}
        renderer={({ someText }) => <h1>{someText}</h1>}
        editor={({ sourceObject, change }) => (
          <div>
            <label>Some text:</label>
            <input
              type="text"
              value={sourceObject.someText}
              onChange={e => change({ ...sourceObject, someText: e.target.value })}
            />
          </div>
        )}
        isEditing
      />
    );

    expect(wrapper.find("editor input").exists()).toEqual(true);
  });

  it("editor prop can update source object", () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <BaseShard
        type="something"
        sourceObject={sourceObject.toJS()}
        renderer={({ someText }) => <h1>{someText}</h1>}
        editor={({ sourceObject, change }) => (
          <div>
            <label>Some text:</label>
            <input
              type="text"
              value={sourceObject.someText}
              onChange={e => change({ ...sourceObject, someText: e.target.value })}
            />
          </div>
        )}
        isEditing
        onChange={onChangeMock}
      />
    );

    wrapper.find("input").simulate("change", { target: { value: "Hello worlds" } });

    expect(wrapper.find("renderer h1").text()).toEqual("Hello worlds");
  });

  describe("internals", () => {
    it("should display action menu when editable prop is true", () => {
      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editable
        />
      );

      expect(wrapper.find("ShardActions").exists()).toEqual(true);
    });

    it("should call onMoveUp when up button on ActionMenu is clicked", () => {
      const onMoveUp = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          onMoveUp={onMoveUp}
        />
      );

      wrapper.find("button.move-up").simulate("click");

      expect(onMoveUp.mock.calls.length).toEqual(1);
    });

    it("should call onMoveDown when up button on ActionMenu is clicked", () => {
      const onMoveDown = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          onMoveDown={onMoveDown}
        />
      );

      wrapper.find("button.move-down").simulate("click");

      expect(onMoveDown.mock.calls.length).toEqual(1);
    });

    it("should call onDelete when up button on ActionMenu is clicked", () => {
      const onDelete = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          onDelete={onDelete}
        />
      );

      wrapper.find("button.delete").simulate("click");

      expect(onDelete.mock.calls.length).toEqual(1);
    });

    it("should call onEdit when up button on ActionMenu is clicked", () => {
      const onEdit = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          onEdit={onEdit}
        />
      );

      wrapper.find("button.edit").simulate("click");

      expect(onEdit.mock.calls.length).toEqual(1);
    });

    it("should call onCancel when up button on ActionMenu is clicked", () => {
      const onCancel = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          isEditing
          onCancel={onCancel}
        />
      );

      wrapper.find("button.cancel").simulate("click");

      expect(onCancel.mock.calls.length).toEqual(1);
    });

    it("should call onSave when up button on ActionMenu is clicked", () => {
      const onSave = jest.fn();

      const wrapper = mount(
        <BaseShard
          type="something"
          sourceObject={sourceObject.toJS()}
          renderer={({ someText }) => <h1>{someText}</h1>}
          editor={({ sourceObject, change }) => (
            <div>
              <label>Some text:</label>
              <input
                type="text"
                value={sourceObject.someText}
                onChange={e => change({ ...sourceObject, someText: e.target.value })}
              />
            </div>
          )}
          editable
          isEditing
          onSave={onSave}
        />
      );

      wrapper.find("button.save").simulate("click");

      expect(onSave.mock.calls.length).toEqual(1);
    });
  });
});
