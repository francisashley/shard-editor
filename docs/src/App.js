import React from "react";
import ShardDocs from "@fa-repo/shard-docs";
import CodeBlock from "@fa-repo/shard-docs/dist/renderers/codeblock";
import { MDXProvider } from "@mdx-js/react";

// Introduction
import GetStarted from "./1-introduction-get-started.mdx";
import BuildAShard from "./1-introduction-build-a-shard.mdx";

// Bundled shards
import BlockImageShard from "./2-shards-block-image.mdx";
import BlogHeaderShard from "./2-shards-blog-header.mdx";
import MarkdownShard from "./2-shards-markdown.mdx";
import NavShard from "./2-shards-nav.mdx";

// API reference
import ShardEditorReference from "./3-reference-shard-editor.mdx";
import BaseshardReference from "./3-reference-base-shard.mdx";

// API resources
import SourceObjectResource from "./4-resources-source-object.mdx";
import InserterObjectResource from "./4-resources-inserter-object.mdx";
import ShardObjectResource from "./4-resources-shard-object.mdx";

// Examples
import ControlledExample from "./5-examples-controlled.mdx";
import UncontrolledExample from "./5-examples-uncontrolled.mdx";

import "./App.scss";
import "@fa-repo/shard-docs/dist/shard-docs.css";
import "@fa-repo/shard-docs/dist/shards/section.css";
import "@fa-repo/shard-docs/dist/shards/code-sample.css";
import "@fa-repo/shard-editor/dist/shard-editor.css";
import "@fa-repo/shard-editor/dist/base-shard.css";
import "@fa-repo/shard-editor/dist/shards/block-image.css";
import "@fa-repo/shard-editor/dist/shards/blog-header.css";
import "@fa-repo/shard-editor/dist/shards/markdown.css";
import "@fa-repo/shard-editor/dist/shards/nav.css";

/**
 * App
 */

const components = {
  pre: props => {
    if (props?.children?.props?.mdxType === "code") {
      return props.children;
    } else {
      return <pre {...props} />;
    }
  },
  code: CodeBlock
};

const App = props => (
  <MDXProvider components={components}>
    <>
      <ShardDocs
        title="ShardEditor docs"
        description="An extendable engine for presenting your content your way."
        source={[
          {
            title: "Introduction",
            folder: [
              { title: "Get started", document: <GetStarted /> },
              { title: "Build a shard", document: <BuildAShard /> }
            ]
          },
          {
            title: "Bundled shards",
            folder: [
              { title: "<BlockImageShard />", document: <BlockImageShard /> },
              { title: "<BlogHeaderShard />", document: <BlogHeaderShard /> },
              { title: "<MarkdownShard />", document: <MarkdownShard /> },
              { title: "<NavShard />", document: <NavShard /> }
            ]
          },
          {
            title: "API reference",
            folder: [
              { title: "<ShardEditor />", document: <ShardEditorReference /> },
              { title: "<BaseShard />", document: <BaseshardReference /> }
            ]
          },
          {
            title: "API objects",
            folder: [
              { title: "SourceObject", document: <SourceObjectResource /> },
              { title: "InserterObject", document: <InserterObjectResource /> },
              { title: "ShardObject", document: <ShardObjectResource /> }
            ]
          },
          {
            title: "Examples",
            folder: [
              { title: "Uncontrolled editor", document: <UncontrolledExample /> },
              { title: "Controlled editor", document: <ControlledExample /> }
            ]
          },
          {
            title: "Links",
            folder: [{ title: "Github", externalLink: "https://github.com/fa-repo/shard-editor" }]
          }
        ]}
      />
    </>
  </MDXProvider>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
