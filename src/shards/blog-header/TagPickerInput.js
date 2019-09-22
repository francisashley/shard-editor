import React from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import classnames from "classnames";

/**
 * TagPickerInput
 */

const TagPickerInput = ({ tags, onChange, placeholder, ...props }) => {
  const className = classnames("blog-header-tag-picker", !tags.length && "is-empty");
  return (
    <div {...props} className={className}>
      <TagsInput
        inputProps={{ placeholder }}
        value={tags}
        onChange={onChange}
        addKeys={[9, 13, 32]}
        onlyUnique
        validationRegex={/^#?[a-zA-Z0-9_\-\.]*$/}
      />
    </div>
  );
};

TagPickerInput.propTypes = {
  tags: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

TagPickerInput.defaultProps = {
  tags: [],
  placeholder: "Add a tag",
  onChange: () => {}
};

export default TagPickerInput;
