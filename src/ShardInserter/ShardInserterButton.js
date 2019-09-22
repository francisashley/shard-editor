import React from "react";
import PropTypes from "prop-types";
import "./ShardInserterButton.scss";

/**
 * ShardInserterButton
 */

const ShardInserterButton = props => (
  <button className="shard-inserter-button" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M11 3L11 11 3 11 3 13 11 13 11 21 13 21 13 13 21 13 21 11 13 11 13 3z" />
    </svg>
  </button>
);

ShardInserterButton.propTypes = {};
ShardInserterButton.defaultProps = {};

export default ShardInserterButton;
