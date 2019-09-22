import React, { Component } from "react";
import ShardEditor from "@fa-repo/shard-editor";

import BlockImageShard from "@fa-repo/shard-editor/dist/shards/block-image";
import BlogHeaderShard from "@fa-repo/shard-editor/dist/shards/blog-header";
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import NavShard from "@fa-repo/shard-editor/dist/shards/nav";
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
      aspectRatio: {
        width: 1824,
        height: 746
      }
    })
  },
  {
    type: "blog-header",
    shard: BlogHeaderShard,
    builder: ({ id, type }) => ({
      id,
      type,
      date: Date.now(),
      tags: ["languages", "japanese"],
      title: "Studying Japanese in France",
      author: "John Smith",
      showDate: true,
      showTags: true,
      dateFormat: "DD MMM YYYY",
      showAuthor: true,
      email: "webmaster@website.com"
    })
  },
  {
    type: "markdown",
    shard: MarkdownShard,
    builder: ({ id, type }) => ({ id, type, markdown: "" })
  },
  { type: "nav", shard: NavShard, builder: ({ id, type }) => ({ id, type, items: [] }) }
];

const inserterList = [
  { type: "block-image", label: "Block image" },
  { type: "blog-header", label: "Blog header" },
  { type: "markdown", label: "Markdown" },
  { type: "nav", label: "Nav" }
];

class UncontrolledExample extends Component {
  render() {
    return (
      <div>
        <ShardEditor editable source={source} shards={shards} inserterList={inserterList} />
      </div>
    );
  }
}
export default UncontrolledExample;
