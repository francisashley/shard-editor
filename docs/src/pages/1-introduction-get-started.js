import React from "react";
import CodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";
import ShardEditor from "@fa-repo/shard-editor";
import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";

/**
 * Get started page
 */

const GetStartedPage = [
  <div className="quick-start-page">
    <ShardDocsMarkdownShard
      markdown={`
# Get started
#### Install dependencies

\`\`\`bash
npm install @fa-repo/shard-editor
\`\`\`

#### Import ShardEditor and styles
\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

ReactDOM.render(<ShardEditor source={[...]} shards={[...]} />, root);
\`\`\`

#### Import your data

The source data is constructed from an array of objects (referred to as source objects). Each source object represents an individual shard. While the shape of each object may change based on the shard requirements, each requires at minimum a \`type\` to indicate the relationship between the object/shard and a unique ID for ShardEditors internals to keep track of state.

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

const source = [
  { id: 0, type: "markdown", markdown: "## Hello world" }
]

ReactDOM.render(<ShardEditor source={source} shards={[...]} />, root);
\`\`\`

#### Setup shards to render your content
You can take advantage of some of the prebundled shards listed on the sidebar or import [your own creations](#/create-a-shard).

**Note:** ensure \`type\` is properly set to indicate the relationship between the source objects and shards.

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

const source = [
  { id: 0, type: "markdown", markdown: "## Hello world" }
]

const shards = [
  { type: "markdown", shard: MarkdownShard }
]

ReactDOM.render(<ShardEditor source={source} shards={shards} />, root);
\`\`\`

and voilà
`}
    />
    <CodeExampleShard className="markdown-shard-code-example" noShadow>
      <ShardEditor
        source={[{ id: 0, type: "markdown", markdown: "## Hello world" }]}
        shards={[{ type: "markdown", shard: MarkdownShard }]}
      />
    </CodeExampleShard>
    <ShardDocsMarkdownShard
      markdown={`
------------------------------

## Edit your content

Right off the bat, setting \`editable\` to true will allow you to move, delete and update shards from a popover menu.

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

const source = [
  { id: 0, type: "markdown", markdown: "## Hello world" }
]

const shards = [
  { type: 'markdown', shard: MarkdownShard }
]

ReactDOM.render(<ShardEditor source={source} shards={shards} editable />, root);
\`\`\`
`}
    />
    <CodeExampleShard className="markdown-shard-code-example" noShadow>
      <ShardEditor
        source={[{ id: 0, type: "markdown", markdown: "## Hello world" }]}
        shards={[{ type: "markdown", shard: MarkdownShard }]}
        editable
      />
    </CodeExampleShard>
    <ShardDocsMarkdownShard
      markdown={`
However, **creating** shards requires some configuration. You can go about this in two ways. First you can go down the controlled route by using methods exposed by \`getEditor\` or you could go uncontrolled by configuring the built-in inserter menu. While each differ in approach, both require that a builder function is provided.

**Builder function:** by default when a request is made, a new object containing the type is generated. The builder is your chance to transform this object into a shape the shard can use.

\`\`\`jsx
const shards = [
  {
    type: 'markdown',
    shard: MarkdownShard,
    builder: ({ id, type }) => ({ id, type, markdown: '' })
  }
]
\`\`\`

#### Inserter menu

To keep things simple, we'll use the inserter menu to add shards. All we need to do is populate the \`inserterList\` prop with an array of objects containing \`type\` to indicate the type of shard to create and \`label\` to let us know what we're clicking on.

\`\`\`jsx
const inserterList = [
  { type: "markdown", label: "Markdown" }
]
\`\`\`

Bringing it all together

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor/dist/shard-editor.css";

import MarkdownShard from "@fa-repo/shard-editor/dist/shards/markdown";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

const source = [
  { type: id: 0, "markdown", markdown: "## Hello world" }
];

const shards = [
  {
    type: 'markdown',
    shard: MarkdownShard,
    builder: ({ id, type }) => ({ id, type, markdown: '' })
  }
];

const inserterList = [
  { type: "markdown", label: "Markdown" }
]

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

and voilà
`}
    />
    <CodeExampleShard className="markdown-shard-code-example" noShadow>
      <ShardEditor
        source={[{ id: 0, type: "markdown", markdown: "## Hello world" }]}
        shards={[
          {
            type: "markdown",
            shard: MarkdownShard,
            builder: ({ id, type }) => ({ id, type, markdown: "" })
          }
        ]}
        inserterList={[{ type: "markdown", label: "Markdown" }]}
        editable
      />
    </CodeExampleShard>
  </div>
];

export default GetStartedPage;
