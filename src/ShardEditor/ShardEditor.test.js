import React from "react";
import { mount } from "enzyme";
import { List } from "immutable";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";

import ShardEditor from "./ShardEditor";
import MarkdownShard from "../shards/markdown";

global.confirm = () => true;

const source = List([
  { id: 0, type: "markdown", markdown: "# Hello earth" },
  { id: 1, type: "markdown", markdown: "# Hello galaxy" }
]);

const shards = [{ type: "markdown", shard: MarkdownShard }];

const inserters = [{ type: "markdown", label: "Markdown" }];

describe("<ShardEditor />", () => {
  const mountShardEditor = ({ inserters = [], shards = [], editable = false } = {}) => {
    const onChangeMock = jest.fn();
    const getShardEditorMock = jest.fn();

    const wrapper = mount(
      <ShardEditor
        source={source.toJS()}
        inserters={inserters}
        shards={shards}
        editable={editable}
        getShardEditor={getShardEditorMock}
        onChange={onChangeMock}
      />
    );

    return {
      wrapper,
      onChangeMock,
      getShardEditorMock
    };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardEditor();

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders shards", () => {
    const { wrapper } = mountShardEditor({ shards });

    expect(wrapper.find("MarkdownShard").length).toEqual(2);
  });

  it("renders ShardActions when editable is true", () => {
    const { wrapper } = mountShardEditor({ shards, editable: true });

    expect(wrapper.find(".shard-actions").length).toEqual(2);
  });

  it("renders inserter menu when inserters contains items and editable is true", () => {
    const { wrapper } = mountShardEditor({ shards, inserters, editable: true });

    expect(wrapper.find(".shard-inserter").length).toEqual(3);
  });

  it("moves shard up when shard calls onMoveUp", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.move-up").last().simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("moves shard down when shard calls onMoveDown", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.move-down").first().simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("deletes shard when shard calls onDelete", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.delete").first().simulate("click");

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("opens shard editor when shard calls onEdit", () => {
    const { wrapper } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.edit").first().simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(true);
  });

  it("cancels changes and closes form when shard calls onCancel", () => {
    const { wrapper } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.edit").first().simulate("click");
    wrapper.find(".shard-actions button.cancel").first().simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(false);
    expect(wrapper.state().source).toEqual([
      { id: 0, type: "markdown", markdown: "# Hello earth" },
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("saves changes and closes form when shard calls onSave", () => {
    const { wrapper } = mountShardEditor({ shards, editable: true });

    wrapper.find(".shard-actions button.edit").first().simulate("click");
    wrapper
      .find("MarkdownShard .shard-form .markdown-editor-input")
      .first()
      .simulate("change", { target: { value: "# Hello universe" } });
    wrapper.find(".shard-actions .save").first().simulate("click");

    expect(wrapper.find(".shard-form").exists()).toEqual(false);
    expect(wrapper.state().source).toEqual([
      { id: 0, type: "markdown", markdown: "# Hello universe" },
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("creates an object containing unique id and shard type when shardInserter calls onInsert", () => {
    const { wrapper } = mountShardEditor({ shards, inserters, editable: true });

    wrapper.find(".shard-inserter-button").first().simulate("click");
    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(wrapper.state().source.length).toEqual(3);
    expect(
      typeof wrapper.state().source[0].id === "string" ||
        typeof wrapper.state().source[0].id === "number"
    ).toBeTruthy();
  });

  it("create a transformed object when shardInserter calls onInsert on a shard type with a builder", () => {
    let shards2 = shards;
    shards2[0].builder = ({ id, type }) => ({ id, type, markdown: "" });
    const { wrapper } = mountShardEditor({ shards: shards2, inserters, editable: true });

    wrapper.find(".shard-inserter-button").first().simulate("click");
    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(wrapper.state().source.length).toEqual(3);
    expect(wrapper.state().source[0].markdown).toBe("");
  });

  it("creates a shard with getShardEditor", () => {
    const { wrapper, getShardEditorMock } = mountShardEditor({ shards, editable: true });

    getShardEditorMock.mock.calls[0][0].createShard("markdown");

    const source = wrapper.state().source
    expect(source.length).toEqual(3);
    expect(source[2].type).toEqual("markdown");
    expect(isNumber(source[2].id) || isString(source[2].id)).toBeTruthy();
  });

  it("updates a shard with getShardEditor", () => {
    const { wrapper, getShardEditorMock } = mountShardEditor({ shards, editable: true });
    let sourceObject = source.toJS()[0];
    sourceObject.markdown = "# Hello universe";

    getShardEditorMock.mock.calls[0][0].updateShard(sourceObject, 0);

    expect(wrapper.state().source[0].markdown).toBe("# Hello universe");
  });

  it("deletes a shard with getShardEditor", () => {
    const { getShardEditorMock, onChangeMock } = mountShardEditor({ shards, editable: true });
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.deleteShard(0);

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" }
    ]);
  });

  it("opens a shard form with getShardEditor", () => {
    const { wrapper, getShardEditorMock } = mountShardEditor({ shards, editable: true });
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.openShardEditor(0);
    wrapper.update();

    expect(wrapper.find("section.shard .shard-form").first().exists()).toBe(true);
  });

  it("moves a shard with getShardEditor", () => {
    const { getShardEditorMock, onChangeMock } = mountShardEditor({ shards, editable: true });
    const commands = getShardEditorMock.mock.calls[0][0];

    commands.moveShard(0, 1);

    expect(onChangeMock.mock.calls[0][0]).toEqual([
      { id: 1, type: "markdown", markdown: "# Hello galaxy" },
      { id: 0, type: "markdown", markdown: "# Hello earth" }
    ]);
  });

  it("undo / redos changes with getShardEditor", () => {
    const { wrapper, getShardEditorMock, onChangeMock } = mountShardEditor({
      shards,
      editable: true
    });
    const onChangeMockCalls = onChangeMock.mock.calls;
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

    wrapper.find(".shard-actions").first().find(".edit").simulate("click");
    wrapper
      .find("MarkdownShard")
      .first()
      .find(".shard-form textarea.markdown-editor-input")
      .simulate("change", { target: { value: "# Hello universe" } });
    wrapper.find(".shard-actions").first().find(".save").simulate("click");
    expect(onChangeMockCalls[8][0][0].markdown).toEqual("# Hello universe");

    commands.undo();
    wrapper.update();
    expect(wrapper.find("MarkdownRenderer").first().render().text().trim()).toEqual("Hello earth");
  });

  it("checks if changes can be undone with getShardEditor", () => {
    const { getShardEditorMock } = mountShardEditor({ shards, editable: true });
    const commands = getShardEditorMock.mock.calls[0][0];

    expect(commands.canUndo()).toBe(false);

    commands.moveShard(0, 1);
    expect(commands.canUndo()).toBe(true);

    commands.undo();
    expect(commands.canUndo()).toBe(false);
  });

  it("checks if changes can be redone with getShardEditor", () => {
    const { getShardEditorMock } = mountShardEditor({ shards, editable: true });
    const commands = getShardEditorMock.mock.calls[0][0];

    expect(commands.canRedo()).toBe(false);

    commands.moveShard(0, 1);
    expect(commands.canRedo()).toBe(false);

    commands.undo();
    expect(commands.canRedo()).toBe(true);

    commands.redo();
    expect(commands.canRedo()).toBe(false);
  });

  it("calls onChange when shard created", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, inserters, editable: true });

    wrapper.find(".shard-inserter-button").first().simulate("click");
    wrapper.find(".shard-inserter-list button").simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });

  it("calls onChange when shard deleted", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, inserters, editable: true });

    wrapper.find(".shard-actions .delete").first().simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });

  it("calls onChange when shard moved", () => {
    const { wrapper, onChangeMock } = mountShardEditor({ shards, inserters, editable: true });

    wrapper.find(".shard-actions .move-down").first().simulate("click");

    expect(onChangeMock.mock.calls.length).toBe(1);
  });
});
