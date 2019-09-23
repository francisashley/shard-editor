import React from "react";
import PropTypes from "prop-types";
import ShardInserter from "../ShardInserter";
import uniqid from "uniqid";
import arrayMove from "array-move";
import scrollIntoView from "scroll-into-view-if-needed";
import UndoRedo from "@fa-repo/undo-redo";
import { purgeArray, insertArray } from "./utils";
import "./ShardEditor.scss";

/**
 * ShardEditor
 */

class ShardEditor extends React.Component {
  static propTypes = {
    source: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        type: PropTypes.string.isRequired
      })
    ),
    shards: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        shard: PropTypes.elementType.isRequired,
        builder: PropTypes.func
      })
    ),
    inserterList: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ),
    editable: PropTypes.bool,
    /* Callbacks */
    getShardEditor: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    source: [],
    inserterList: [],
    shards: [],
    editable: false,
    /* Callbacks */
    getShardEditor: () => {},
    onChange: () => {}
  };

  state = {
    // Data
    source: this.props.source,
    // wantsToFocus lets each editor component know if it's fine to set autoFocus true on its first input field. This solves an issue when multiple editors are open and ShardEditor is open, the last ield always focuses.
    // Shard example: ({sourceObject, wantsToFocus}) => {<input value={sourceObject.value} autoFocus={wantsToFocus}>}
    wantsToFocus: null,
    // Array of sourceObject ids indicating shard editors to show
    editingShards: []
  };

  /* -- Lifecycle methods -- */
  constructor(props) {
    super(props);
    this.undoRedo = new UndoRedo();
  }

  componentDidMount() {
    const commands = {
      createShard: (type, atIndex) => this.createShard(type, atIndex),
      openShardEditor: id => this.openShardEditor(id),
      updateShard: (sourceObject, atIndex) => this.handleUpdateShard(sourceObject, atIndex),
      deleteShard: atIndex => this.deleteShard(atIndex),
      moveShard: (from, to) => this.moveShard(from, to),
      undo: () => this.undoRedo.undo(),
      redo: () => this.undoRedo.redo(),
      canUndo: () => this.undoRedo.canUndo(),
      canRedo: () => this.undoRedo.canRedo()
    };
    this.props.getShardEditor(commands);
  }

  /* -- Boolean methods -- */
  showInsertors = () => {
    return this.props.inserterList.length > 0 && this.props.editable;
  };

  /* -- Getter methods -- */
  getShard = type => {
    const shard = this.props.shards.find(shard => shard.type === type);
    return shard && shard.shard;
  };

  /* -- Action methods -- */

  generateId = () => {
    const id = uniqid();
    if (this.state.source.some(sourceObject => sourceObject.id == id)) {
      this.generateId();
    } else {
      return id;
    }
  };

  createShard = (type, atIndex) => {
    let source = JSON.parse(JSON.stringify(this.state.source));

    const builder = this.props.shards.find(shard => shard.type === type).builder;

    let sourceObject = { id: this.generateId(), type };
    sourceObject = typeof builder === "function" ? builder(sourceObject) : sourceObject;

    atIndex = Number.isInteger(atIndex) ? atIndex : source.length;

    return new Promise((resolve, reject) => {
      this.undoRedo.add(`Create shard ${sourceObject.type} at ${atIndex}`, {
        do: () => {
          source = insertArray(atIndex, sourceObject, source);
          const editingShards = [...this.state.editingShards, sourceObject.id];
          this.setState({ source, editingShards });
          this.props.onChange(source);
          resolve(sourceObject);
        },
        undo: () => {
          source = purgeArray(source, atIndex);
          const editingShards = [...this.state.editingShards].filter(
            editingShardId => editingShardId === sourceObject.id
          );
          this.setStatePromise({ source, editingShards });
          this.props.onChange(source);
        }
      });
    });
  };

  deleteShard = async atIndex => {
    let source = JSON.parse(JSON.stringify(this.state.source));
    const deletedShard = source[atIndex];

    this.undoRedo.add(`Delete shard at ${atIndex}`, {
      do: () => {
        source = purgeArray(source, atIndex);
        this.setState({ source });
        this.props.onChange(source);
      },
      undo: () => {
        source = insertArray(atIndex, deletedShard, source);
        this.setState({ source });
        this.props.onChange(source);
      }
    });
  };

  moveShard = (from, to) => {
    if (this.state.source[from] && this.state.source[to]) {
      let source = JSON.parse(JSON.stringify(this.state.source));

      this.undoRedo.add(`Move shard from ${from} to ${to}`, {
        do: () => {
          source = arrayMove(source, from, to);
          this.setState({ source });
          this.props.onChange(source);
        },
        undo: () => {
          source = arrayMove(source, to, from);
          this.setState({ source });
          this.props.onChange(source);
        }
      });
    }
  };

  scrollShardIntoView = atIndex => {
    const shard = this.ref.querySelectorAll(`section`)[atIndex];
    scrollIntoView(shard.querySelector(".shard-scroll-boundary"), {
      scrollMode: "if-needed",
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  };

  openShardEditor = id => {
    const editingShards = [...this.state.editingShards, id];
    this.setState({ editingShards: editingShards, wantsToFocus: id });
  };

  closeShardEditor = id => {
    const editingShards = [...this.state.editingShards].filter(editingId => editingId !== id);
    this.setState({ editingShards });
  };

  /* -- Utility methods -- */

  setStatePromise = async (state, returnedData) => {
    return new Promise(resolve => this.setState(state, () => resolve(returnedData)));
  };

  /* -- Handler methods -- */
  handleDeleteShard = atIndex => {
    if (confirm("Are you sure you want to delete this shard?")) {
      this.deleteShard(atIndex);
    }
  };

  handleInsertShard = (type, atIndex) => {
    this.createShard(type, atIndex).then(sourceObject => {
      this.scrollShardIntoView(atIndex);
      this.openShardEditor(atIndex);
    });
  };

  handleUpdateShard = (sourceObject, atIndex) => {
    let unchangedSource = JSON.parse(JSON.stringify(this.state.source));
    let changedSource = JSON.parse(JSON.stringify(this.state.source));
    if (unchangedSource[atIndex]) changedSource[atIndex] = sourceObject;

    this.undoRedo.add(`Update shard \`{sourceObject.id}\``, {
      do: () => {
        this.setState({ source: changedSource });
        this.props.onChange(changedSource);
        this.closeShardEditor(sourceObject.id);
      },
      undo: () => {
        this.setState({ source: unchangedSource });
        this.props.onChange(unchangedSource);
      }
    });
  };

  /* -- Render methods -- */

  render() {
    return (
      <article className="shard-editor" ref={ref => (this.ref = ref)}>
        {this.state.source.map((sourceObject, index) => {
          const Shard = this.getShard(sourceObject.type);
          const isLastItem = this.state.source.length - 1 === index;
          const wantsToFocus =
            this.state.wantsToFocus != null && this.state.wantsToFocus === sourceObject.id;
          const isEditing =
            this.props.editable && this.state.editingShards.some(id => id === sourceObject.id);

          if (!Shard) return null;

          return (
            <React.Fragment key={sourceObject.id}>
              {this.showInsertors() && (
                <ShardInserter
                  sourceObject={sourceObject}
                  onInsert={type => this.handleInsertShard(type, index)}
                  items={this.props.inserterList}
                />
              )}
              <Shard
                sourceObject={sourceObject}
                wantsToFocus={wantsToFocus}
                isEditing={isEditing}
                onDelete={() => this.handleDeleteShard(index)}
                onMoveUp={() => this.moveShard(index, index - 1)}
                onMoveDown={() => this.moveShard(index, index + 1)}
                onEdit={() => this.openShardEditor(sourceObject.id)}
                onCancel={() => this.closeShardEditor(sourceObject.id)}
                onSave={sourceObject => this.handleUpdateShard(sourceObject, index)}
                editable={this.props.editable}
              />
              {this.showInsertors() && isLastItem && (
                <ShardInserter
                  sourceObject={sourceObject}
                  onInsert={type => this.handleInsertShard(type, index + 1)}
                  items={this.props.inserterList}
                />
              )}
            </React.Fragment>
          );
        })}
      </article>
    );
  }
}

export default ShardEditor;
