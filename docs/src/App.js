import React from "react";
import ShardDocs from "@fa-repo/shard-docs";

// Introduction
import getStarted from "./pages/1-introduction-get-started";
import createAShard from "./pages/1-introduction-create-a-shard";

// Bundled shards
import blockImageShard from "./pages/2-shards-block-image";
import blogHeaderShard from "./pages/2-shards-blog-header";
import markdownShard from "./pages/2-shards-markdown";
import navShard from "./pages/2-shards-nav";

// API reference
import shardEditorReference from "./pages/3-reference-shard-editor";
import baseshardReference from "./pages/3-reference-base-shard";

// API resources
import sourceObjectResource from "./pages/4-resources-source-object";
import inserterObjectResource from "./pages/4-resources-inserter-object";
import shardObjectResource from "./pages/4-resources-shard-object";

// Examples
import ControlledExample from "./pages/5-examples-controlled";
import UncontrolledExample from "./pages/5-examples-uncontrolled";

import "./App.scss";
import "@fa-repo/shard-editor/dist/shard-editor.css";
import "@fa-repo/shard-docs/dist/shard-docs.css";
import "@fa-repo/shard-docs/dist/shards/section-shard.css";
import "@fa-repo/shard-docs/dist/shards/markdown-shard.css";
import "@fa-repo/shard-docs/dist/shards/code-example-shard.css";
import "@fa-repo/shard-editor/dist/shards/markdown.css";

/**
 * App
 */

const App = props => (
  <>
    <ShardDocs
      title="ShardEditor docs"
      description="An extendable engine for presenting your content your way."
      source={[
        // { page: "Scratch pad", composition: scratchPad },
        {
          group: "Introduction",
          pages: [
            { page: "Get started", composition: getStarted },
            { page: "Create a shard", composition: createAShard }
          ]
        },

        {
          group: "Bundled shards",
          pages: [
            { page: "<BlockImageShard />", composition: blockImageShard },
            { page: "<BlogHeaderShard />", composition: blogHeaderShard },
            { page: "<MarkdownShard />", composition: markdownShard },
            { page: "<NavShard />", composition: navShard }
          ]
        },

        {
          group: "API reference",
          pages: [
            { page: "<ShardEditor />", composition: shardEditorReference },
            { page: "<BaseShard />", composition: baseshardReference }
          ]
        },

        {
          group: "API objects",
          pages: [
            { page: "SourceObject", composition: sourceObjectResource },
            { page: "InserterObject", composition: inserterObjectResource },
            { page: "ShardObject", composition: shardObjectResource }
          ]
        },
        {
          group: "Examples",
          pages: [
            { page: "Uncontrolled editor", composition: [<UncontrolledExample />] },
            { page: "Controlled editor", composition: [<ControlledExample />] }
          ]
        },
        {
          group: "Links",
          pages: [{ external: "Github", link: "https://github.com/fa-repo/shard-editor" }]
        }
      ]}
    />
  </>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
