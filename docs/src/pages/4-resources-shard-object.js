import React from "react";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import "@fa-repo/shard-editor/dist/shards/block-image.css";

/**
 * ShardObject
 */

const ShardObjectPage = [
  <ShardDocsMarkdownShard
    markdown={`
# ShardObject

The shard object contains a component for rendering matched SourceObjects and related config.

#### Shape
\`\`\`jsx
{
  type: "markdown",
  shard: MarkdownShard,
  builder: ({ id, type }) => ({ id, type, markdown: '' })
}
\`\`\`

#### Properties
| Name    | Type       | Required      | Description                                             |
|---------|------------|---------------|---------------------------------------------------------|
| type    | string     | Required              | Links the shard to a SourceObject with matching type.          |
| shard   | Component  | Required | A component that extends &#60;BaseShard /> enabling you to render and edit your SourceObject. You can use one of the [bundled shards](#/bundled-shards) or [create your own](#/create-a-shard). |
| builder | function   | Sometimes | When a request is made to create a shard, an object containing the type and a unique id is generated. This function is your chance to transform that object into a shape the shard can use.          |

#### Used by
- [&#60;ShardEditor />](#/shard-editor)
`}
  />
];
export default ShardObjectPage;
