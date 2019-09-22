import React from "react";
import PropTypes from "prop-types";

import MarkdownIt from "markdown-it";
import highlighter from "highlight.js/lib/highlight";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";

highlighter.registerLanguage("bash", bash);
highlighter.registerLanguage("css", css);
highlighter.registerLanguage("javascript", javascript);
highlighter.registerLanguage("json", json);
highlighter.registerLanguage("markdown", markdown);
highlighter.registerLanguage("php", php);
highlighter.registerLanguage("shell", shell);
highlighter.registerLanguage("xml", xml);
highlighter.registerLanguage("sql", sql);

const markdownParser = new MarkdownIt("default", {
  html: true,
  highlight: function(str, lang) {
    if (lang && highlighter.getLanguage(lang)) {
      try {
        return highlighter.highlight(lang, str).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  }
});

/**
 * MarkdownRenderer
 */

const MarkdownRenderer = ({ sourceObject, ...props }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: markdownParser.render(sourceObject.markdown || "") }} />
  );
};

MarkdownRenderer.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["markdown"]).isRequired,
    markdown: PropTypes.string
  })
};

MarkdownRenderer.defaultProps = {
  sourceObject: {
    type: "markdown",
    markdown: ""
  }
};

export default MarkdownRenderer;
