import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ControlPanel.scss";

class ControlPanel extends Component {
  static propTypes = {
    onInsert: PropTypes.func,
    onDelete: PropTypes.func,
    onOpenEditor: PropTypes.func,
    onMove: PropTypes.func,
    onUndo: PropTypes.func,
    onRedo: PropTypes.func,
    canUndo: PropTypes.bool,
    canRedo: PropTypes.bool,
    totalShards: PropTypes.number
  };

  static defaultProps = {
    onInsert: (type, position) => {},
    onDelete: (type, position) => {},
    onOpenEditor: (type, position) => {},
    onMove: (from_position, to_position) => {},
    onUndo: () => {},
    onRedo: () => {},
    canUndo: false,
    canRedo: false,
    totalShards: 0
  };

  state = {
    insert_type: "markdown",
    insert_position: 0,
    delete_position: 0,
    open_editor_position: 0,
    move_from_position: 0,
    move_to_position: 1
  };

  render() {
    const {
      insert_type,
      insert_position,
      delete_position,
      open_editor_position,
      move_from_position,
      move_to_position
    } = this.state;

    const { onInsert, onDelete, onOpenEditor, onMove, onUndo, onRedo, totalShards } = this.props;

    return (
      <div className="control-bar">
        <div className="control-bar-inner">
          <div className="column">
            <h3>
              Insert{" "}
              <select
                onChange={e => this.setState({ insert_type: e.target.value })}
                value={insert_type}
              >
                <option value="markdown">Markdown shard</option>
                <option value="block-image">BlockImage shard</option>
                <option value="blog-header">BlogHeader shard</option>
                <option value="nav">Nav shard</option>
              </select>
            </h3>
            <button onClick={e => onInsert(insert_type, 0)}>at start</button>
            <button onClick={e => onInsert(insert_type, totalShards)}>at end</button>
            <button onClick={e => onInsert(insert_type, insert_position)}>
              at position{" "}
              <input
                className="position-input"
                type="number"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => this.setState({ insert_position: Number(e.target.value) })}
                value={insert_position}
              />
            </button>
          </div>
          <div className="column">
            <h3>Delete</h3>
            <button onClick={e => onDelete(0)}>first shard</button>
            <button onClick={e => onDelete(totalShards - 1)}>last shard</button>
            <button onClick={e => onDelete(delete_position)}>
              at position{" "}
              <input
                className="position-input"
                type="number"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => this.setState({ delete_position: Number(e.target.value) })}
                value={delete_position}
              />
            </button>
          </div>
          <div className="column">
            <h3>Open editor</h3>
            <button onClick={e => onOpenEditor(0)}>for first shard</button>
            <button onClick={e => onOpenEditor(totalShards - 1)}>for last shard</button>
            <button onClick={e => onOpenEditor(open_editor_position)}>
              for shard at position{" "}
              <input
                className="position-input"
                type="number"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => this.setState({ open_editor_position: Number(e.target.value) })}
                value={open_editor_position}
              />
            </button>
          </div>
          <div className="column">
            <h3>Move</h3>
            <button onClick={e => onMove(0, 1)}>first shard down</button>
            <button onClick={e => onMove(totalShards - 1, totalShards - 2)}>last shard up</button>
            <button onClick={e => onMove(move_from_position, move_to_position)}>
              shard at position{" "}
              <input
                className="position-input"
                type="number"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => this.setState({ move_from_position: Number(e.target.value) })}
                value={move_from_position}
              />{" "}
              to{" "}
              <input
                className="position-input"
                type="number"
                min="0"
                onClick={e => e.stopPropagation()}
                onChange={e => this.setState({ move_to_position: Number(e.target.value) })}
                value={move_to_position}
              />
            </button>
          </div>
          <div className="column">
            <h3>History</h3>
            <button onClick={onUndo} disabled={!this.props.canUndo}>
              Undo
            </button>
            <button onClick={onRedo} disabled={!this.props.canRedo}>
              Redo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
