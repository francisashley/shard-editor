import React from "react";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import "@fa-repo/shard-editor/dist/shards/block-image.css";

/**
 * SourceObject
 */

const SourceObjectPage = [
  <ShardDocsMarkdownShard
    markdown={`
# SourceObject
SourceObjects contain the data used by individual shards. While the object schema may change from one shard type to another all require at minimum the properties described here.

#### Object Shape
\`\`\`jsx
{
  id: "XyI0P",
  type: "markdown",
  ...
}
\`\`\`

#### Object properties
| Name | Type          | Description                                             |
|------|---------------|---------------------------------------------------------|
| id   | number/string | Required to keep track of internal state                |
| type | string        | Required to match the SourceObject to a shard.          |

#### Used by
- [&#60;ShardEditor />](#/shard-editor)
- [&#60;BaseShard />](#/base-shard)
`}
  />
];
export default SourceObjectPage;
