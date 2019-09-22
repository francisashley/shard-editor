import React from "react";
import PropTypes from "prop-types";
import "./ShardInserterList.scss";

/**
 * ShardInserterList
 */

const ShardInserterList = ({ items, onInsert }) => (
  <ul className="shard-inserter-list">
    {items.map((item, i) => (
      <li key={i}>
        <button onClick={() => onInsert(item.type)}>{item.label}</button>
      </li>
    ))}
  </ul>
);

ShardInserterList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  onInsert: PropTypes.func
};

ShardInserterList.defaultProps = {
  items: [],
  onInsert: () => {}
};

export default ShardInserterList;
