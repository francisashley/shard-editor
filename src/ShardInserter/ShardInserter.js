import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ShardInserterButton from "./ShardInserterButton";
import ShardInserterList from "./ShardInserterList";
import "./ShardInserter.scss";

/**
 * ShardInserter
 */

class ShardInserter extends React.Component {
  static propTypes = {
    onInsert: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, type: PropTypes.string }))
  };

  static defaultProps = {
    onInsert: () => {},
    items: []
  };

  state = {
    open: false
  };

  handleInsert = type => {
    this.setState({ open: false });
    this.props.onInsert(type);
  };

  render() {
    const isOpen = this.state.open;

    return (
      <div className={classnames(["shard-inserter", isOpen && "is-open"])}>
        <ShardInserterButton onClick={() => this.setState({ open: !isOpen })} />
        {isOpen && <ShardInserterList items={this.props.items} onInsert={this.handleInsert} />}
      </div>
    );
  }
}

export default ShardInserter;
