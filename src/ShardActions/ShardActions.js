import React from "react";
import PropTypes from "prop-types";
import { UpArrow, DownArrow, Trash, Pencil, Cross, Tick } from "./icons";
import "./ShardActions.scss";

/**
 * ShardActions
 */

const MoveUpButton = ({ show, ...props }) => (
  <button className="move-up" children={<UpArrow />} {...props} />
);
const MoveDownButton = ({ show, ...props }) => (
  <button className="move-down" children={<DownArrow />} {...props} />
);
const DeleteButton = ({ show, ...props }) =>
  show && <button className="delete" children={<Trash />} {...props} />;
const EditButton = ({ show, ...props }) =>
  show && <button className="edit" children={<Pencil />} {...props} />;
const CancelButton = ({ show, ...props }) =>
  show && <button className="cancel" children={<Cross />} {...props} />;
const SaveButton = ({ show, ...props }) =>
  show && <button className="save" children={<Tick />} {...props} />;

const ShardActions = ({ isEditing, onMoveUp, onMoveDown, onDelete, onEdit, onCancel, onSave }) => {
  const isViewing = !isEditing;
  return (
    <div className="shard-actions">
      <MoveUpButton onClick={onMoveUp} />
      <MoveDownButton onClick={onMoveDown} />
      <DeleteButton show={isViewing} onClick={onDelete} />
      <EditButton show={isViewing} onClick={onEdit} />
      <CancelButton show={isEditing} onClick={onCancel} />
      <SaveButton show={isEditing} onClick={onSave} />
    </div>
  );
};

ShardActions.propTypes = {
  isEditing: PropTypes.bool,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

ShardActions.defaultProps = {
  isEditing: false,
  onMoveUp: () => {},
  onMoveDown: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSave: () => {}
};

export default ShardActions;
