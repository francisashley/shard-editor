import React from "react";
import ShardEditor from "@fa-repo/shard-editor";
import ShardDocsCodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import BlockImageShard from "@fa-repo/shard-editor/dist/shards/block-image";
import "@fa-repo/shard-editor/dist/shards/block-image.css";
import "./2-shards-block-image.scss";

/**
 * Block image shard
 */

const GetStartedPage = [
  <ShardDocsMarkdownShard
    markdown={`
# BlockImageShard
Renders a block image.

#### Preview
`}
  />,
  <ShardDocsCodeExampleShard className="markdown-shard-code-example">
    <ShardEditor
      source={[
        {
          id: 0,
          type: "block-image",
          image: "/images/fruit-veg.jpg",
          placeholder: "/images/fruit-veg-placeholder.jpg",
          aspectRatio: { width: 1824, height: 746 }
        }
      ]}
      shards={[
        {
          type: "block-image",
          shard: BlockImageShard,
          builder: ({ type }) => ({
            type,
            image: "/images/fruit-veg.jpg",
            placeholder: "/images/fruit-veg.jpg",
            aspectRatio: { width: 1824, height: 746 }
          })
        }
      ]}
      inserterList={[{ type: "block-image", label: "Block Image" }]}
      editable
    />
  </ShardDocsCodeExampleShard>,
  <ShardDocsMarkdownShard
    markdown={`
#### Import
\`\`\`jsx
import BlockImageShard from "@fa-repo/shard-editor/dist/shards/block-image";
import "@fa-repo/shard-editor/dist/shards/block-image.css";
\`\`\`

#### Input schema

\`\`\`jsx
const source = [
  {
    id: 0,
    type: "block-image",
    image: "/images/fruit-veg.jpg",
    placeholder: "/images/fruit-veg-placeholder.jpg",
    aspectRatio: { width: 1824, height: 746 }
  }
];
\`\`\`

| Name        | Type   | Required | Description                                                    |
|-------------|--------|----------|----------------------------------------------------------------|
| id          | string/number | required | A unique id is required for internals to keep track of state.  |
| type        | string | required | Set to "block-image".                                          |
| image	      | string | required | Image path.                                                    |
| placeholder | string | required | Low res placeholder image path (for progressive enhancement).  |
| aspectRatio | object | required | An object containing a height and width. These values are used to calculate the proportions of the shard resulting in either a letterboxed, pillarboxed or perfectly proportioned image container.                                                            |
| aspectRatio.height | number | required | Aspect ratio height.                                    |
| aspectRatio.width	 | number | required | Aspect ratio width.                                     |

#### Source code example

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor";

import BlockImageShard from "@fa-repo/shard-editor/dist/shards/block-image";
import "@fa-repo/shard-editor/dist/shards/block-image.css";

const source = [
  {
    id: 0,
    type: "block-image",
    image: "/images/fruit-veg.jpg",
    placeholder: "/images/fruit-veg-placeholder.jpg",
    aspectRatio: { width: 1824, height: 746 }
  }
];

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
  }
]

const inserterList = [
  { type: "block-image", label: "Block Image" }
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
