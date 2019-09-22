import React from "react";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import "@fa-repo/shard-editor/dist/shards/block-image.css";

/**
 * InserterObject
 */

const InserterObjectPage = [
  <ShardDocsMarkdownShard
    markdown={`
# InserterObject

InserterObjects are used to generate a UI menu for adding shards.

#### Object shape
\`\`\`jsx
{
  label: "Markdown",
  type: "markdown"
}
\`\`\`

#### Object properties
| Name | Type    | Description                                                            |
|------|---------|------------------------------------------------------------------------|
| label | string | Button text for letting users know what they're inserting.             |
| type  | string | Type of shard to insert.                                               |

#### Used by
- [&#60;ShardEditor />](#/shard-editor)
`}
  />
];
export default InserterObjectPage;
