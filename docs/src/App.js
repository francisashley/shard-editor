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
import "@fa-repo/shard-docs/dist/shards/CodeSampleShard.css";
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
            type: 'folder',
            title: "Introduction",
            folder: [
              { type: 'document', title: "Get started", document: <GetStarted /> },
              { type: 'document', title: "Build a shard", document: <BuildAShard /> }
            ]
          },
          {
            type: 'folder',
            title: "Bundled shards",
            folder: [
              { type: 'document', title: "<BlockImageShard />", document: <BlockImageShard /> },
              { type: 'document', title: "<BlogHeaderShard />", document: <BlogHeaderShard /> },
              { type: 'document', title: "<MarkdownShard />", document: <MarkdownShard /> },
              { type: 'document', title: "<NavShard />", document: <NavShard /> }
            ]
          },
          {
            type: 'folder',
            title: "API reference",
            folder: [
              { type: 'document', title: "<ShardEditor />", document: <ShardEditorReference /> },
              { type: 'document', title: "<BaseShard />", document: <BaseshardReference /> }
            ]
          },
          {
            type: 'folder',
            title: "API objects",
            folder: [
              { type: 'document', title: "SourceObject", document: <SourceObjectResource /> },
              { type: 'document', title: "InserterObject", document: <InserterObjectResource /> },
              { type: 'document', title: "ShardObject", document: <ShardObjectResource /> }
            ]
          },
          {
            type: 'folder',
            title: "Examples",
            folder: [
              { type: 'document', title: "Uncontrolled editor", document: <UncontrolledExample /> },
              { type: 'document', title: "Controlled editor", document: <ControlledExample /> }
            ]
          },
          {
            type: 'folder',
            title: "Links",
            folder: [
              { type: 'document', title: "Github", externalLink: "https://github.com/fa-repo/shard-editor" }
            ]
          }
        ]}
      />
    </>
  </MDXProvider>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
