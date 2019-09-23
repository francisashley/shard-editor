import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import isEqual from "lodash/isEqual";
import Actions from "../ShardActions";
import "./BaseShard.scss";

/**
 * BaseShard
 */

class Shard extends React.Component {
  static propTypes = {
    /* API props */
    type: PropTypes.string.isRequired,
    renderer: PropTypes.func.isRequired,
    editor: PropTypes.func,
    /* Internal props */
    sourceObject: PropTypes.object,
    wantsToFocus: PropTypes.bool,
    isEditing: PropTypes.bool,
    editable: PropTypes.bool,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
  };

  static defaultProps = {
    /* API props */
    type: null,
    renderer: () => {},
    editor: () => {},
    /* Internal props */
    sourceObject: {},
    wantsToFocus: false,
    isEditing: false,
    editable: false,
    onDelete: () => {},
    onMoveUp: () => {},
    onMoveDown: () => {},
    onCancel: () => {},
    onSave: () => {}
  };

  state = {
    originalSourceObject: this.props.sourceObject,
    currentSourceObject: this.props.sourceObject
  };

  componentDidUpdate(prevProps, prevState) {
    const sourceObject = this.props.sourceObject;
    const sourceObjectPropDidUpdate = !isEqual(sourceObject, this.state.originalSourceObject);

    if (sourceObjectPropDidUpdate) {
      this.setState({ originalSourceObject: sourceObject, currentSourceObject: sourceObject });
    }
  }

  handleCancel = () => {
    const currentSourceObject = this.state.originalSourceObject;
    this.setState({ currentSourceObject }, () => this.props.onCancel(currentSourceObject.id));
  };

  handleSave = () => {
    const currentSourceObject = this.state.currentSourceObject;
    this.setState({ originalSourceObject: currentSourceObject }, () =>
      this.props.onSave(currentSourceObject)
    );
  };

  render() {
    const Renderer = this.props.renderer;
    const Editor = this.props.editor;
    const isEditing = this.props.isEditing;
    const editable = this.props.editable;
    const type = this.props.type;
    const wantsToFocus = this.props.wantsToFocus;

    const className = classnames("shard", editable && "is-editable", isEditing && "is-editing");
    const sourceObject = this.state.currentSourceObject;

    return (
      <section data-shard-type={type} className={className}>
        <div className="shard-scroll-boundary" />
        <div className="shard-renderer">
          <Renderer {...sourceObject} />
          {editable && (
            <Actions
              isEditing={isEditing}
              onDelete={this.props.onDelete}
              onMoveUp={this.props.onMoveUp}
              onMoveDown={this.props.onMoveDown}
              onEdit={this.props.onEdit}
              onCancel={this.handleCancel}
              onSave={this.handleSave}
            />
          )}
        </div>
        {isEditing && (
          <form className="shard-form">
            <Editor
              sourceObject={sourceObject}
              wantsToFocus={wantsToFocus}
              change={currentSourceObject => this.setState({ currentSourceObject })}
            />
          </form>
        )}
      </section>
    );
  }
}

export default Shard;
