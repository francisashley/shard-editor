import React from "react";
import ShardDocsCodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";
import BlogHeaderShard from "@fa-repo/shard-editor/dist/shards/blog-header";
import "@fa-repo/shard-editor/dist/shards/blog-header.css";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import ShardEditor from "@fa-repo/shard-editor";

/**
 * Blog header shard
 */

const GetStartedPage = [
  <ShardDocsMarkdownShard
    markdown={`
# BlogHeaderShard
Renders blog post info.

#### Preview
`}
  />,
  <ShardDocsCodeExampleShard className="markdown-shard-code-example">
    <ShardEditor
      editable
      source={[
        {
          id: 0,
          date: 1552953600000,
          tags: ["languages", "japanese"],
          type: "blog-header",
          title: "Studying Japanese in France",
          author: "John Smith",
          showDate: true,
          showTags: true,
          dateFormat: "DD MMM YYYY",
          showAuthor: true,
          email: "webmaster@website.com"
        }
      ]}
      shards={[
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
        }
      ]}
      inserters={[{ type: "blog-header", label: "Blog header" }]}
    />
  </ShardDocsCodeExampleShard>,

  <ShardDocsMarkdownShard
    markdown={`
#### Import
\`\`\`jsx
import BlogHeaderShard from "@fa-repo/shard-editor/dist/shards/blog-header";
import "@fa-repo/shard-editor/dist/shards/blog-header.css";
\`\`\`

#### Input schema

| Name       | Type    | Required | Description                                    |
|------------|---------|----------|------------------------------------------------|
| id         | string/number | required | A unique id is required for internals to keep track of state.  |
| type	     | string	 | required	| Set to "blog-header".           |
| author	   | string	 | required	| Author is displayed as plain text by default or as link when an email is provided. |
| email	     | string	 | required	| Clicking on the author opens this email in a local email client. |
| tags       | array	 | required	| Tags displayed in the shard.                    |
| date       | integer | required	| Date stored as timestamp.           |
| dateFormat | string	 | required	| Custom date format as defined [here](https://date-fns.org/v1.30.1/docs/format). Defaults to \`"DD MMM YYYY"\`.  |
| showAuthor | boolean | required	| Choose whether to display author. Defaults to \`true\`.           |
| showDate   | boolean | required	| Choose whether to display date. Defaults to \`true\`.               |
| showTags   | boolean | required	| Choose whether to display tags. Defaults to \`true\`.               |

#### Source code example
\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";

import ShardEditor from "@fa-repo/shard-editor";
import "@fa-repo/shard-editor";

import BlogHeaderShard from "@fa-repo/shard-editor/dist/shards/blog-header";
import "@fa-repo/shard-editor/dist/shards/blog-header.css";

const source = [
  {
    id: 0,
    date: 1552953600000,
    tags: [ "languages", "japanese" ],
    type: "blog-header",
    title: "Studying Japanese in France",
    author: "John Smith",
    showDate: true,
    showTags: true,
    dateFormat: "DD MMM YYYY",
    showAuthor: true,
    email: "webmaster@website.com"
  }
];

const shards = [
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
  }
]

const inserters = [
  { type: "blog-header", label: "Blog Header" }
];

ReactDOM.render(
  <ShardEditor
    source={source}
    shards={shards}
    inserters={inserters}
    editable
  />,
  root
);
\`\`\`
`}
  />
];
export default GetStartedPage;
