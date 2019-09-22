import React from "react";
import PropTypes from "prop-types";

import ProgressiveImage from "react-progressive-image";

/**
 * BlockImageRenderer
 */

const PlaceholderIcon = () => (
  <svg className="placeholder-icon" width="24" height="24" viewBox="0 0 24 24">
    <path d="M19.999,4h-16c-1.103,0-2,0.897-2,2v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V6C21.999,4.897,21.102,4,19.999,4z M6.499,7c0.829,0,1.5,0.672,1.5,1.5S7.328,10,6.499,10s-1.5-0.672-1.5-1.5S5.67,7,6.499,7z M11.999,17h-3h-4l4-5l1.5,2l3-4l5.5,7 H11.999z" />
  </svg>
);

const BlockImageRenderer = props => {
  let { image, placeholder, aspectRatio } = props.sourceObject;

  aspectRatio = (aspectRatio.height / aspectRatio.width) * 100;

  const style = { paddingTop: `${aspectRatio}%` };

  const imageWasProvided = Boolean(image) || Boolean(placeholder);

  return (
    <div className={"block-image-container"} style={style}>
      {!imageWasProvided && <PlaceholderIcon />}
      {imageWasProvided && (
        <ProgressiveImage src={image} placeholder={placeholder}>
          {src => <img src={src} alt="Block image" />}
        </ProgressiveImage>
      )}
    </div>
  );
};

BlockImageRenderer.propTypes = {
  sourceObject: PropTypes.shape({
    image: PropTypes.string,
    placeholder: PropTypes.string,
    aspectRatio: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    }).isRequired
  })
};

BlockImageRenderer.defaultProps = {
  sourceObject: {
    image: "",
    placeholder: "",
    aspectRatio: {
      width: 1920,
      height: 1080
    }
  }
};

export default BlockImageRenderer;
