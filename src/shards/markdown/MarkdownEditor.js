import React from "react";
import PropTypes from "prop-types";

import Textarea from "react-autosize-textarea";

/**
 * MarkdownEditor
 */

const MarkdownEditor = ({ sourceObject, onChange, wantsToFocus }) => {
  return (
    <Textarea
      name="markdown"
      className="markdown-editor-input"
      value={sourceObject.markdown}
      onKeyDown={e => e.key === "Escape" && e.target.blur()}
      onChange={e => onChange({ ...sourceObject, markdown: e.target.value })}
      spellCheck={false}
      autoFocus={wantsToFocus}
    />
  );
};

MarkdownEditor.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["markdown"]).isRequired,
    markdown: PropTypes.string
  }),
  wantsToFocus: PropTypes.bool,
  onChange: PropTypes.func
};

MarkdownEditor.defaultProps = {
  sourceObject: {
    type: "markdown",
    markdown: ""
  },
  wantsToFocus: false,
  onChange: () => {}
};

export default MarkdownEditor;
