import React from "react";
import { shallow, mount } from "enzyme";
import { Map, List } from "immutable";

import ShardEditor from "./ShardEditor";
import MarkdownShard from "../shards/markdown";

global.confirm = () => true;

const source = List([
  { id: 0, type: "markdown", markdown: "# Hello earth" },
  { id: 1, type: "markdown", markdown: "# Hello galaxy" }
]);

const shards = [{ type: "markdown", shard: MarkdownShard }];

const inserterList = [{ type: "markdown", label: "Markdown" }];

describe("ShardEditor", () => {
  /**
   * Render
   */
  it("should render without crashing", () => {
    const wrapper = shallow(<ShardEditor />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should render shards", () => {
    const wrapper = mount(<ShardEditor source={source.toJS()} shards={shards} />);

    expect(wrapper.find("MarkdownShard").length).toEqual(2);
  });

  it("should render shard actionMenus when editable prop is true", () => {
    const wrapper = mount(<ShardEditor source={source.toJS()} shards={shards} editable />);

    expect(wrapper.find(".shard-actions").length).toEqual(2);
  });

  it("should render inserters when inserterList prop is popul. and editable prop is true", () => {
    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards} inserterList={inserterList} editable />
    );

    expect(
      wrapper
        .find(".shard-inserter")
        .first()
        .find(".shard-inserter-button").length
    ).toEqual(1);
  });

  /**
   * Shard actions
   */
  it("should move shard up when shard calls onMoveUp", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards} onChange={onChangeMock} editable />
    );

    wrapper
      .find(".shard-actions")
      .last()
      .find(".move-up")
      .simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("should move shard down when shard calls onMoveDown", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards} onChange={onChangeMock} editable />
    );

    wrapper
      .find(".shard-actions")
      .first()
      .find(".move-down")
      .simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("should delete shard when shard calls onDelete", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards} onChange={onChangeMock} editable />
    );

    wrapper
      .find(".shard-actions")
      .first()
      .find(".delete")
      .simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("should open shard form when shard calls onEdit", () => {
    const wrapper = mount(<ShardEditor source={source.toJS()} shards={shards} editable />);

    wrapper
      .find(".shard-actions")
      .first()
      .find(".edit")
      .simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(true);
  });

  it("should cancel changes and close form when shard calls onCancel", () => {
    const wrapper = mount(<ShardEditor source={source.toJS()} shards={shards} editable />);

    wrapper
      .find(".shard-actions")
      .first()
      .find(".edit")
      .simulate("click");
    wrapper
      .find(".shard-actions")
      .first()
      .find(".cancel")
      .simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(false);
    expect(wrapper.state().source).toEqual([
      { id: 0, type: "markdown", markdown: "# Hello earth" },
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("should save changes and close form when shard calls onSave", () => {
    const wrapper = mount(<ShardEditor source={source.toJS()} shards={shards} editable />);

    wrapper
      .find(".shard-actions")
      .first()
      .find(".edit")
      .simulate("click");
    wrapper
      .find("MarkdownShard")
      .first()
      .find(".shard-form textarea.markdown-editor-input")
      .simulate("change", { target: { value: "# Hello universe" } });
    wrapper
      .find(".shard-actions")
      .first()
      .find(".save")
      .simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(false);
    expect(wrapper.state().source).toEqual([
      { id: 0, type: "markdown", markdown: "# Hello universe" },
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  /**
   * Shard inserter
   */
  it("should create an object containing unique id and shard type when shardInserter calls onInsert", () => {
    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards} inserterList={inserterList} editable />
    );

    wrapper
      .find(".shard-inserter-button")
      .first()
      .simulate("click");

    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(wrapper.state().source.length).toEqual(3);
    expect(
      typeof wrapper.state().source[0].id === "string" ||
        typeof wrapper.state().source[0].id === "number"
    ).toBeTruthy();
  });

  it("should create a transformed object when shardInserter calls onInsert on a shard type with a builder", () => {
    const shards2 = [...shards].map((shard, i) => {
      if (i === 0) {
        return { ...shard, builder: ({ id, type }) => ({ id, type, markdown: "" }) };
      } else {
        return shard;
      }
    });

    const wrapper = mount(
      <ShardEditor source={source.toJS()} shards={shards2} inserterList={inserterList} editable />
    );

    wrapper
      .find(".shard-inserter-button")
      .first()
      .simulate("click");
    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(wrapper.state().source.length).toEqual(3);
    expect(wrapper.state().source[0].markdown).toBe("");
  });

  /**
   * getShardEditor
   */

  it("can create a shard with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        editable
      />
    );

    getShardEditorMock.mock.calls[0][0].createShard("markdown");

    expect(wrapper.state().source.length).toEqual(3);
    expect(wrapper.state().source[2].type).toEqual("markdown");
    expect(
      typeof wrapper.state().source[2].id === "number" ||
        typeof wrapper.state().source[2].id === "string"
    ).toBeTruthy();
  });

  it("can update a shard with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        editable
      />
    );
    let updatedSourceObject = source.toJS()[0];
    updatedSourceObject.markdown = "# Hello universe";

    getShardEditorMock.mock.calls[0][0].updateShard(updatedSourceObject, 0);

    expect(wrapper.state().source[0].markdown).toBe("# Hello universe");
  });

  it("can delete a shard with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    let onChangeMock = jest.fn();
    mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        onChange={onChangeMock}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.deleteShard(0);

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("can open a shard form with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.openShardEditor(0);
    wrapper.update();

    expect(
      wrapper
        .find("section.shard")
        .first()
        .find(".shard-form")
        .exists()
    ).toBe(true);
  });

  it("can move a shard with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    let onChange = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        onChange={onChange}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.moveShard(0, 1);

    expect(onChange.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("can undo / redo changes with getShardEditor", () => {
    const getShardEditorMock = jest.fn();
    const onChangeMock = jest.fn();
    const onChangeMockCalls = onChangeMock.mock.calls;
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        onChange={onChangeMock}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.moveShard(0, 1);

    expect(onChangeMockCalls[0][0].map(({ id }) => id)).toEqual(expect.arrayContaining([1, 0]));
    commands.undo();
    expect(onChangeMockCalls[1][0].map(({ id }) => id)).toEqual(expect.arrayContaining([0, 1]));
    commands.redo();
    expect(onChangeMockCalls[2][0].map(({ id }) => id)).toEqual(expect.arrayContaining([1, 0]));
    commands.undo();
    expect(onChangeMockCalls[3][0].map(({ id }) => id)).toEqual(expect.arrayContaining([0, 1]));
    commands.deleteShard(0);
    expect(onChangeMockCalls[4][0][0].id).toBe(1);
    commands.undo();
    expect(onChangeMockCalls[5][0].map(({ id }) => id)).toEqual(expect.arrayContaining([0, 1]));
    commands.createShard("markdown");
    expect(onChangeMockCalls[6][0].length).toBe(3);
    commands.undo();
    expect(onChangeMockCalls[7][0].length).toBe(2);
    wrapper
      .find(".shard-actions")
      .first()
      .find(".edit")
      .simulate("click");
    wrapper
      .find("MarkdownShard")
      .first()
      .find(".shard-form textarea.markdown-editor-input")
      .simulate("change", { target: { value: "# Hello universe" } });
    wrapper
      .find(".shard-actions")
      .first()
      .find(".save")
      .simulate("click");
    expect(onChangeMockCalls[8][0][0].markdown).toEqual("# Hello universe");
    commands.undo();
    wrapper.update();
    expect(
      wrapper
        .find("MarkdownRenderer")
        .first()
        .render()
        .text()
        .trim()
    ).toEqual("Hello earth");
  });

  it("can check if changes can be undone with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    expect(commands.canUndo()).toBe(false);

    commands.moveShard(0, 1);

    expect(commands.canUndo()).toBe(true);

    commands.undo();

    expect(commands.canUndo()).toBe(false);
  });

  it("can check if changes can be redone with getShardEditor", () => {
    let getShardEditorMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        getShardEditor={getShardEditorMock}
        editable
      />
    );
    const commands = getShardEditorMock.mock.calls[0][0];

    expect(commands.canRedo()).toBe(false);

    commands.moveShard(0, 1);

    expect(commands.canRedo()).toBe(false);

    commands.undo();

    expect(commands.canRedo()).toBe(true);

    commands.redo();

    expect(commands.canRedo()).toBe(false);
  });

  /**
   * callbacks
   */
  it("calls onChange when new shard added", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        inserterList={inserterList}
        onChange={onChangeMock}
        editable
      />
    );

    wrapper
      .find(".shard-inserter-button")
      .first()
      .simulate("click");
    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });

  it("calls onChange when shard delete", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        inserterList={inserterList}
        onChange={onChangeMock}
        editable
      />
    );

    wrapper
      .find(".shard-actions .delete")
      .first()
      .simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });

  it("calls onChange when shard moved", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        shards={shards}
        inserterList={inserterList}
        onChange={onChangeMock}
        editable
      />
    );

    wrapper
      .find(".shard-actions .move-down")
      .first()
      .simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });
});
