import React from "react";
import ShardDocsCodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import ShardEditor from "@fa-repo/shard-editor";
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";

/**
 * Markdown shard
 */

const GetStartedPage = [
  <ShardDocsMarkdownShard
    markdown={`
# MarkdownShard
Renders [markdown](https://www.markdownguide.org) as html.

#### Preview
`}
  />,
  <ShardDocsCodeExampleShard className="markdown-shard-code-example">
    <ShardEditor
      editable
      source={[
        {
          id: 0,
          type: "markdown",
          markdown: `##### 🍫 CONFECTIONARY:
Infantemque valido non quique mora Lemnos? Non *pulsa greges* bella mihi forma, et passa carpsere, Iunonigenaeque. Hylactor semina suae omnibus census carinae, ex cervos crimine cadit. Cecidisse *retractant*, flammaeque alite: fuga artus haeret positi si tendebam. Solis poenam hinc vincat deceant antiqua alter regia habitus fratrisque nomine moenia nunc mihi.`
        }
      ]}
      shards={[
        {
          type: "markdown",
          shard: MarkdownShard,
          builder: ({ id, type }) => ({ id, type, markdown: "" })
        }
      ]}
      inserterList={[{ type: "markdown", label: "Markdown" }]}
    />
  </ShardDocsCodeExampleShard>,
  <ShardDocsMarkdownShard
    markdown={`
#### Import
\`\`\`jsx
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";
\`\`\`

#### Input schema
| Name     | Type   |  Required | Description                                                      |
|----------|--------|----------|-------------------------------------------------------------------|
| id    | string/number | required | A unique id is required for internals to keep track of state. |
| type	   | string	| required |	Set to "markdown".                                               |
| markdown | string	| required | [Markdown](https://www.markdownguide.org/basic-syntax/) content.  |

#### Source code example

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor";

import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

const source = [
  {
    id: 0,
    type: "markdown",
    image: "/images/fruit-veg.jpg",
    markdown: "# Hello world",
  }
];

const shards = [
  {
    type: "markdown",
    shard: MarkdownShard,
    builder: ({ id, type }) => ({
      id,
      type,
      markdown: ""
    })
  }
]

const inserterList = [
  { type: "markdown", label: "Markdown" }
];

ReactDOM.render(
  <ShardEditor
    source={source}
    shards={shards}
    inserterList={inserterList}
    editable
  />,
  root
);
\`\`\`
`}
  />
];
export default GetStartedPage;
