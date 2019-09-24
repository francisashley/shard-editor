import React from "react";
import ShardDocsMarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";
import "@fa-repo/shard-editor/dist/shards/block-image.css";

/**
 * BaseShard reference
 */

const BaseShardReferencePage = [
  <ShardDocsMarkdownShard
    markdown={`
# BaseShard

A component with a pluggable API for developing custom shards.

#### Import
\`\`\`jsx
import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
import "@fa-repo/shard-editor/dist/base-shard.css";
\`\`\`

#### BaseShard properties

| Name      | Type      | Required  | Description                                                  |
|-----------|-----------|-----------|--------------------------------------------------------------|
| type      | string    | required  | Type is added to the dom like \`data-shard-type="type"\` to enable css styling. |
| renderer  | function  | required  | Your chance to present to the world the contents of the matched sourceObject. |
| editor    | function  | sometimes | A form the user can access in editable mode to update the sourceObject.                                                               |

#### BaseShard prop: renderer function parameters
This function requires that a react component is returned.
| Name         | Type      | Description                                                           |
|--------------|-----------|-----------------------------------------------------------------------|
| sourceObject | object    | A SourceObject                                                        |

#### BaseShard prop: editor function parameters
This function requires that a react component is returned.
| Name         | Type      | Description                                                           |
|--------------|-----------|-----------------------------------------------------------------------|
| sourceObject | object    | A SourceObject                                                        |
| change       | function  | Call change() on a modified SourceObject to update the object across ShardEditor. |
| wantsToFocus | boolean  | It's a good idea to set autoFocus on the first input element in the editor. An issue can arise however when the DOM rerenders and multiple editors are open as the last input will always focus. \`wantsToFocus\` takes care of this issue and should be passed into the autoFocus prop. |


#### Usage example

\`\`\`jsx
import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
import "@fa-repo/shard-editor/dist/base-shard.css";

const MarkdownShard = props => {
  return (
    <BaseShard
      type="markdown"
      renderer={({ sourceObject }) => (
        <div dangerouslySetInnerHTML={{ __html: markdownParser.render(sourceObject.markdown) }} />
      )}
      editor={({ sourceObject, wantsToFocus, change }) => {
        return (
          <textarea
            value={sourceObject.markdown}
            onChange={e => onChange({ ...sourceObject, markdown: e.target.value })}
            autoFocus={wantsToFocus}
          />
        );
      }}
      {...props}
    />
  )
}
\`\`\`
`}
  />
];
export default BaseShardReferencePage;
