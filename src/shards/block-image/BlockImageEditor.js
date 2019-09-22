import React from "react";
import PropTypes from "prop-types";

import Label from "@fa-repo/base-react/dist/label";
import Input from "@fa-repo/base-react/dist/input";

/**
 * BlockImageShard
 */

const BlockImageShard = ({ sourceObject, onChange, wantsToFocus, ...props }) => {
  return (
    <>
      <div className="shard-form-row">
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="image" text="Image:" />
          <Input
            name="image"
            className="option-input--text"
            defaultValue={sourceObject.image}
            onChangeValue={image => onChange({ ...sourceObject, image })}
            autoFocus={wantsToFocus}
          />
        </div>
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="sml-image" text="Low resolution placeholder:" />
          <Input
            name="sml-image"
            className="option-input--text"
            defaultValue={sourceObject.placeholder}
            onChangeValue={placeholder => onChange({ ...sourceObject, placeholder })}
          />
        </div>
      </div>

      <div className="shard-form-row">
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="sml-image" text="Aspect ratio:" />
          <div style={{ display: "flex" }}>
            <Input
              type="number"
              name="aspect-ratio-height"
              className="option-input--text"
              defaultValue={sourceObject.aspectRatio.height}
              onChangeValue={height =>
                onChange({
                  ...sourceObject,
                  aspectRatio: { ...sourceObject.aspectRatio, height: Number(height) }
                })
              }
              min={0}
            />
            &nbsp;x&nbsp;
            <Input
              type="number"
              name="aspect-ratio-width"
              className="option-input--text"
              defaultValue={sourceObject.aspectRatio.width}
              onChangeValue={width =>
                onChange({
                  ...sourceObject,
                  aspectRatio: { ...sourceObject.aspectRatio, width: Number(width) }
                })
              }
              min={0}
            />
          </div>
        </div>
      </div>
    </>
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
  sourceObject: {
    type: "block-image",
    image: "",
    placeholder: "",
    aspectRatio: {
      height: 1920,
      width: 1080
    }
  },
  wantsToFocus: false,
  onChange: () => {}
};

export default BlockImageShard;
