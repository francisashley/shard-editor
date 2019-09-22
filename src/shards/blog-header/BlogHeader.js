import React from "react";
import PropTypes from "prop-types";
import BaseShard from "../../BaseShard";
import Renderer from "./BlogHeaderRenderer";
import Editor from "./BlogHeaderEditor";

import "./BlogHeader.scss";
import "./TagPickerInput.scss";

/**
 * BlogHeaderShard
 */

const BlogHeaderShard = props => {
  return (
    <BaseShard
      // Shard type
      type="blog-header"
      // Shard renderer
      renderer={sourceObject => <Renderer sourceObject={sourceObject} />}
      // Shard editor
      editor={({ sourceObject, wantsToFocus, change }) => (
        <Editor
          sourceObject={sourceObject}
          wantsToFocus={wantsToFocus}
          onChange={sourceObject => change(sourceObject)}
        />
      )}
      {...props}
    />
  );
};

BlogHeaderShard.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["blog-header"]).isRequired,
    author: PropTypes.string,
    authorEmail: PropTypes.string,
    tags: PropTypes.array,
    date: PropTypes.number,
    dateFormat: PropTypes.string.isRequired,
    showAuthor: PropTypes.bool.isRequired,
    showDate: PropTypes.bool.isRequired,
    showTags: PropTypes.bool.isRequired
  }),
  wantsToFocus: PropTypes.bool,
  onChange: PropTypes.func
};
BlogHeaderShard.defaultProps = {
  sourceObject: {
    type: "blog-header",
    author: "",
    authorEmail: "",
    tags: [],
    date: null,
    dateFormat: "DD MMM YYYY",
    showAuthor: false,
    showDate: false,
    showTags: false
  },
  wantsToFocus: false,
  onChange: () => {}
};

export default BlogHeaderShard;
