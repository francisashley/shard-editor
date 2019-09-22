import React from "react";
import PropTypes from "prop-types";
import BaseShard from "../../BaseShard";
import Renderer from "./BlockImageRenderer";
import Editor from "./BlockImageEditor";
import "./BlockImage.scss";

/**
 * BlockImageShard
 */

const BlockImageShard = props => {
  return (
    <BaseShard
      // Shard type
      type="block-image"
      // Shard renderer
      renderer={sourceObject => <Renderer sourceObject={sourceObject} />}
      // Shard editor
      editor={({ sourceObject, wantsToFocus, change }) => (
        <Editor sourceObject={sourceObject} wantsToFocus={wantsToFocus} onChange={change} />
      )}
      {...props}
    />
  );
};

BlockImageShard.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["block-image"]).isRequired,
    image: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    aspectRatio: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    })
  }),
  wantsToFocus: PropTypes.bool,
  onChange: PropTypes.func
};

BlockImageShard.defaultProps = {
  wantsToFocus: false,
  onChange: () => {}
};

export default BlockImageShard;
