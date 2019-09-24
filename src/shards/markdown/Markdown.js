import React from "react";
import PropTypes from "prop-types";
import BaseShard from "../../BaseShard";
import Renderer from "./MarkdownRenderer";
import Editor from "./MarkdownEditor";
import "./Markdown.scss";

/**
 * MarkdownShard
 */

const MarkdownShard = props => {
  return (
    <BaseShard
      // Shard type
      type="markdown"
      // Shard renderer
      renderer={({ sourceObject }) => <Renderer sourceObject={sourceObject} />}
      // Shard editor
      editor={({ sourceObject, wantsToFocus, change }) => (
        <Editor
          sourceObject={sourceObject}
          onChange={sourceObject => change(sourceObject)}
          wantsToFocus={wantsToFocus}
        />
      )}
      {...props}
    />
  );
};

MarkdownShard.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["markdown"]).isRequired,
    markdown: PropTypes.string
  })
};
MarkdownShard.defaultProps = {};

export default MarkdownShard;
