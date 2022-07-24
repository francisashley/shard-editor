import React from "react";
import ShardDocs from "@fa-repo/shard-docs";
import CodeBlock from "@fa-repo/shard-docs/dist/renderers/CodeBlockRenderer";
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
import "@fa-repo/shard-docs/dist/index.css";
import "@fa-repo/shard-docs/dist/shards/SectionShard.css";
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
        content={[
          {
            type: 'category',
            name: "Introduction",
            items: [
              { type: 'document', name: "Get started", document: <GetStarted /> },
              { type: 'document', name: "Build a shard", document: <BuildAShard /> }
            ]
          },
          {
            type: 'category',
            name: "Bundled shards",
            items: [
              { type: 'document', name: "<BlockImageShard />", document: <BlockImageShard /> },
              { type: 'document', name: "<BlogHeaderShard />", document: <BlogHeaderShard /> },
              { type: 'document', name: "<MarkdownShard />", document: <MarkdownShard /> },
              { type: 'document', name: "<NavShard />", document: <NavShard /> }
            ]
          },
          {
            type: 'category',
            name: "API reference",
            items: [
              { type: 'document', name: "<ShardEditor />", document: <ShardEditorReference /> },
              { type: 'document', name: "<BaseShard />", document: <BaseshardReference /> }
            ]
          },
          {
            type: 'category',
            name: "API objects",
            items: [
              { type: 'document', name: "SourceObject", document: <SourceObjectResource /> },
              { type: 'document', name: "InserterObject", document: <InserterObjectResource /> },
              { type: 'document', name: "ShardObject", document: <ShardObjectResource /> }
            ]
          },
          {
            type: 'category',
            name: "Examples",
            items: [
              { type: 'document', name: "Uncontrolled editor", document: <UncontrolledExample /> },
              { type: 'document', name: "Controlled editor", document: <ControlledExample /> }
            ]
          },
          {
            type: 'category',
            name: "Links",
            items: [
              { type: 'link', name: "Github", url: "https://github.com/fa-repo/shard-editor", external: true }
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
