import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Actions from "../ShardActions";
import "./BaseShard.scss";

/**
 * Shard
 */

class Shard extends React.Component {
  static propTypes = {
    /* Public props */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string.isRequired,
    renderer: PropTypes.func.isRequired,
    editor: PropTypes.func,

    /* Private props */
    sourceObject: PropTypes.object.isRequired,
    wantsToFocus: PropTypes.bool,
    isEditing: PropTypes.bool.isRequired,
    editable: PropTypes.bool,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
  };

  static defaultProps = {
    id: null,
    type: null,
    renderer: null,
    editor: null,

    sourceObject: {},
    wantsToFocus: false,
    isEditing: false,
    editable: false,
    /* Callbacks */
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

  /* -- Lifecycle methods -- */
  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(this.props.sourceObject) !== JSON.stringify(this.state.originalSourceObject)
    ) {
      this.setState({
        originalSourceObject: this.props.sourceObject,
        currentSourceObject: this.props.sourceObject
      });
    }
  }

  /* -- Getter methods -- */

  /* -- Action methods -- */

  /* -- Utility methods -- */

  /* -- Handler methods -- */
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

  /* -- Render methods -- */

  render() {
    const {
      renderer: Renderer,
      editor: Editor,
      isEditing,
      editable,
      type,
      wantsToFocus
    } = this.props;
    const className = classnames("shard", editable && "is-editable", isEditing && "is-editing");

    return (
      <section data-shard-type={type} className={className}>
        <div className="shard-scroll-boundary" />
        <div className="shard-renderer">
          <Renderer {...this.state.currentSourceObject} />
          <Actions
            show={editable}
            isEditing={isEditing}
            onDelete={() => this.props.onDelete()}
            onMoveUp={() => this.props.onMoveUp()}
            onMoveDown={() => this.props.onMoveDown()}
            onEdit={() => this.props.onEdit()}
            onCancel={() => this.handleCancel()}
            onSave={() => this.handleSave()}
          />
        </div>
        {isEditing && (
          <form className="shard-form">
            <Editor
              sourceObject={this.state.currentSourceObject}
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
