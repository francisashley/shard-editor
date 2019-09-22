import React from "react";
import PropTypes from "prop-types";

import format from "date-fns/format";

/**
 * BlogHeaderRenderer
 */

const BlogHeaderRenderer = ({ sourceObject }) => {
  return (
    <>
      <h1 className="blog-header-shard-title">{sourceObject.title}</h1>
      <ul className="blog-header-shard-meta">
        {sourceObject.showAuthor && (
          <li className="blog-header-shard-author">
            by {!sourceObject.email && sourceObject.author}
            {sourceObject.email && (
              <a href={"mailto:" + sourceObject.email}>{sourceObject.author}</a>
            )}
          </li>
        )}
        {sourceObject.showDate && (
          <li className="blog-header-shard-date">
            {format(new Date(sourceObject.date), sourceObject.dateFormat)}
          </li>
        )}
        {sourceObject.showTags && sourceObject.tags.length > 0 && (
          <li className="blog-header-shard-tags">
            <ul>
              {sourceObject.tags.map(tag => (
                <li key={tag}>
                  <a href="#">#{tag}</a>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </>
  );
};

BlogHeaderRenderer.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["blog-header"]).isRequired,
    author: PropTypes.string,
    email: PropTypes.string,
    tags: PropTypes.array,
    date: PropTypes.number,
    dateFormat: PropTypes.string.isRequired,
    showAuthor: PropTypes.bool.isRequired,
    showDate: PropTypes.bool.isRequired,
    showTags: PropTypes.bool.isRequired
  })
};

BlogHeaderRenderer.defaultProps = {
  sourceObject: {
    type: "blog-header",
    author: "",
    email: "",
    tags: [],
    date: null,
    dateFormat: "DD MMM YYYY",
    showAuthor: false,
    showDate: false,
    showTags: false
  }
};

export default BlogHeaderRenderer;
