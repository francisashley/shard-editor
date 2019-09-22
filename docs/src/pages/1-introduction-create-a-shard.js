import React from "react";
import ShardEditor from "@fa-repo/shard-editor";

import CodeExampleShard from "@fa-repo/shard-docs/dist/shards/code-example-shard";
import MarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";

import YoutubeShard from "./introduction-resources/YoutubeShard";
import "./introduction-resources/YoutubeShard.scss";

import "@fa-repo/shard-editor/dist/shard-editor.css";
import "@fa-repo/shard-editor/dist/base-shard.css";

/**
 * Build a custom shard
 */

export default [
  <MarkdownShard
    markdown={`
  # Build a custom shard

  For this guide, we're going to build a shard that renders a youtube video.`}
  />,
  <CodeExampleShard className="markdown-shard-code-example">
    <ShardEditor
      editable
      source={[{ id: 0, type: "youtube", videoId: "eY52Zsg-KVI", height: 315, width: 560 }]}
      shards={[{ type: "youtube", shard: YoutubeShard }]}
    />
  </CodeExampleShard>,
  <MarkdownShard
    markdown={`

  #### First let's describe the source object so that we know what we're working with

  \`\`\`jsx
  {
    id: 0,                  // required for internals to keep track of state
    type: "youtube",        // type is required for all objects and indicates to ShardEditor which renderer to use
    videoId: "eY52Zsg-KVI", // id of a youtube video
    height: 315,            // video player height
    width: 560              // video player width
  }
  \`\`\`

  #### Next import &lt;BaseShard />

  BaseShard contains a pluggable API for us to develop our own shards.

  **Note:** ensure that props are spread into BaseShard.
  \`\`\`jsx
  import React from "react";

  import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
  import "@fa-repo/shard-editor/dist/base-shard.css";

  const YoutubeShard = props => {
    return <BaseShard type="youtube" renderer={()=>{}} editor={()=>{}} {...props} />
  }
  \`\`\`

  #### Add the renderer

  The renderer is a stateless function called by ShardEditor to render a source object. The object is fed into the renderer as a single argument and it is up to you how to present it.

  \`\`\`jsx
  import React from "react";

  import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
  import "@fa-repo/shard-editor/dist/base-shard.css";

  const YoutubeShard = props => {
    return (
      <BaseShard
        type="youtube"
        renderer={({ width, height, videoId }) => (
          <iframe
            width={width}
            height={height}
            src={videoId && "https://www.youtube.com/embed/" + videoId}
            allowFullScreen
          />
        )}
        editor={...}
        {...props}
      />
    )
  }
  \`\`\`

  #### Add the editor
  The editor takes two props: \`sourceObject\` with the source object and \`change\` function to update your object.

  \`\`\`jsx
  import React from "react";

  import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
  import "@fa-repo/shard-editor/dist/base-shard.css";

  const YoutubeShard = props => {
    return (
      <BaseShard
        type="youtube"
        renderer={...}
        editor={({ sourceObject, change }) => {
          return (
            <>
              <div>
                <label>videoId:</label>
                <input
                  type="text"
                  value={sourceObject.videoId}
                  onChange={e => change({ ...sourceObject, videoId: e.target.value })}
                />
              </div>
              <div>
                <label>height:</label>
                <input
                  type="number"
                  value={sourceObject.height}
                  onChange={e => change({ ...sourceObject, height: e.target.value }) }
                />
              </div>
              <div>
                <label>width:</label>
                <input
                  type="number"
                  value={sourceObject.width}
                  onChange={e => change({ ...sourceObject, width: e.target.value })}
                />
              </div>
            </>
          );
        }}
        {...props}
      />
    )
  }
  \`\`\`

  #### At this point we should have a fully functioning shard
  \`\`\`jsx
  import React from "react";

  import BaseShard from "@fa-repo/shard-editor/dist/base-shard";
  import "@fa-repo/shard-editor/dist/base-shard.css";

  const YoutubeShard = props => {
    return (
      <BaseShard
        type="youtube"
        renderer={({ width, height, videoId }) => (
          <iframe
            width={width}
            height={height}
            src={videoId && "https://www.youtube.com/embed/" + videoId}
            allowFullScreen
          />
        )}
        editor={({ sourceObject, change }) => {
          return (
            <>
              <div>
                <label>videoId:</label>
                <input
                  type="text"
                  value={sourceObject.videoId}
                  onChange={e => change({ ...sourceObject, videoId: e.target.value })}
                />
              </div>
              <div>
                <label>height:</label>
                <input
                  type="number"
                  value={sourceObject.height}
                  onChange={e => change({ ...sourceObject, height: e.target.value }) }
                />
              </div>
              <div>
                <label>width:</label>
                <input
                  type="number"
                  value={sourceObject.width}
                  onChange={e => change({ ...sourceObject, width: e.target.value })}
                />
              </div>
            </>
          );
        }}
        {...props}
      />
    )
  }

  export default YoutubeShard;
  \`\`\`

#### All we have to do is import the shard into ShardEditor

  \`\`\`jsx
  import React from "react";
  import ShardEditor from "@fa-repo/shard-editor";
  import "@fa-repo/shard-editor/dist/shard-editor.css";

  import YoutubeShard from "path/to/shard";

  const App = props => {
    return (
      <ShardEditor
        source={[
          { id: 0, type: "youtube", videoId: "eY52Zsg-KVI", height: 315, width: 560 }
        ]}
        shards={[
          { type: "youtube", shard: YoutubeShard }
        ]}
      />
    )
  }
  \`\`\`

  #### and voilà`}
  />,
  <CodeExampleShard className="markdown-shard-code-example">
    <ShardEditor
      editable
      source={[
        {
          id: 0,
          type: "youtube",
          videoId: "eY52Zsg-KVI",
          height: 315,
          width: 560
        }
      ]}
      shards={[{ type: "youtube", shard: YoutubeShard }]}
    />
  </CodeExampleShard>
];
