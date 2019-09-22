<div align="center">
  <h1>Shard Editor</h1>
  <p>An engine for presenting content your way.</p>
  <a href="#">Read The Docs</a>
</div>

<hr />

[![NPM](https://img.shields.io/npm/v/@fa-repo/shard-editor.svg)](https://www.npmjs.com/package/@fa-repo/shard-editor) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install @fa-repo/shard-editor
```

## Basic usage

```jsx
// The engine
import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

// Import a bundled shard or create your own.
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

// An array of sourceObjects, each rendered by a shard with matching `type` value.
const source = [
  { type: id: 0, "markdown", markdown: "## Hello world\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
];

// An array of shards used to render / edit sourceObjects.
const shards = [
  { type: 'markdown', shard: MarkdownShard, builder: ({ id, type }) => ({ id, type, markdown: '' }) }
];

// A generated menu enabling users to add shards.
const inserters = [
  { type: "markdown", label: "Markdown" }
]

export default () => {
  return (
    <ShardEditor
      source={source}
      shards={shards}
      inserters={inserters}
      editable // Content is readOnly by default. Set `editable` to true to enable editing.
    />
  )
}
```
Results in:

![Usage example](./example.png "Usage example")

## License

mit © [@fa-repo](https://github.com/@fa-repo)
