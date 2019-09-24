import React, { Component } from "react";
import ShardEditor from "@fa-repo/shard-editor";
import "./controlled-editor.scss";

import BlockImageShard from "@fa-repo/shard-editor/dist/shards/block-image";
import BlogHeaderShard from "@fa-repo/shard-editor/dist/shards/blog-header";
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import NavShard from "@fa-repo/shard-editor/dist/shards/nav";

import ControlPanel from "./ControlPanel";
import source from "./data.json";

const shards = [
  {
    type: "block-image",
    shard: BlockImageShard,
    builder: ({ id, type }) => ({
      id,
      type,
      image: "",
      placeholder: "",
      aspectRatio: { width: 1824, height: 746 }
    })
  },
  {
    type: "blog-header",
    shard: BlogHeaderShard,
    builder: ({ id, type }) => ({
      id,
      type,
      date: Date.now(),
      tags: [],
      title: "",
      author: "",
      showDate: true,
      showTags: true,
      dateFormat: "DD MMM YYYY",
      showAuthor: true,
      email: ""
    })
  },
  {
    type: "markdown",
    shard: MarkdownShard,
    builder: ({ id, type }) => ({ id, type, markdown: "" })
  },
  {
    type: "nav",
    shard: NavShard,
    builder: ({ id, type }) => ({ id, type, items: [], symlinks: [] })
  }
];

const inserters = [
  { type: "block-image", label: "Block image" },
  { type: "blog-header", label: "Blog header" },
  { type: "markdown", label: "Markdown" },
  { type: "nav", label: "Nav" }
];

class ControlledExample extends Component {
  state = {
    totalShards: shards.length
  };

  insertShard = (type, position) => {
    this.shardEditor.createShard(type, position);
  };

  deleteShard = atIndex => {
    this.shardEditor.deleteShard(atIndex);
  };

  openShardEditor = atIndex => {
    this.shardEditor.openShardEditor(atIndex);
  };

  moveShard = (from, to) => {
    this.shardEditor.moveShard(from, to);
  };

  render() {
    return (
      <div className="controlled-example">
        <ControlPanel
          totalShards={this.state.totalShards}
          onInsert={(type, position) => {
            this.forceUpdate();
            this.insertShard(type, position);
          }}
          onDelete={position => {
            this.forceUpdate();
            this.deleteShard(position);
          }}
          onOpenEditor={position => {
            this.forceUpdate();
            this.openShardEditor(position);
          }}
          onMove={(from, to) => {
            this.forceUpdate();
            this.moveShard(from, to);
          }}
          onUndo={() => {
            this.forceUpdate();
            this.shardEditor.undo();
          }}
          onRedo={() => {
            this.forceUpdate();
            this.shardEditor.redo();
          }}
          canUndo={this.shardEditor && this.shardEditor.canUndo()}
          canRedo={this.shardEditor && this.shardEditor.canRedo()}
          onConsolidateChanges={() => this.shardEditor.consolidateChanges()}
        />

        <ShardEditor
          editable
          getShardEditor={shardEditor => (this.shardEditor = shardEditor)}
          source={source}
          shards={shards}
          inserters={inserters}
          onChange={source => this.setState({ totalShards: source.length })}
        />
      </div>
    );
  }
}
export default ControlledExample;
