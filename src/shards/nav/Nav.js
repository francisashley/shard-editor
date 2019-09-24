import React from "react";
import PropTypes from "prop-types";
import BaseShard from "../../BaseShard";
import Renderer from "./NavRenderer";
import Editor from "./NavEditor";
import "./Nav.scss";

/**
 * NavShard
 */

const NavShard = props => {
  return (
    <BaseShard
      // Shard type
      type="nav"
      // Shard renderer
      renderer={({ sourceObject }) => <Renderer sourceObject={sourceObject} />}
      // Shard editor
      editor={({ sourceObject, wantsToFocus, change }) => (
        <Editor
          sourceObject={sourceObject}
          wantsToFocus={wantsToFocus}
          onChange={sourceObject => change(sourceObject)}
        />
      )}
      {...props}
    />
  );
};

NavShard.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["nav"]).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.oneOf(["link"]),
          text: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          active: PropTypes.bool
        }),
        PropTypes.shape({
          type: PropTypes.oneOf(["external"]),
          text: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired
        }),
        PropTypes.shape({
          type: PropTypes.oneOf(["symlink"]),
          id: PropTypes.number.isRequired
        }),
        PropTypes.shape({
          type: PropTypes.oneOf(["divider"]),
          text: PropTypes.any
        })
      ])
    ),
    renderers: PropTypes.shape({
      link: PropTypes.func,
      external: PropTypes.func,
      symlink: PropTypes.func,
      divider: PropTypes.func
    }),
    symlinks: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          id: PropTypes.number.isRequired
        })
      ])
    )
  }),
  wantsToFocus: PropTypes.bool,
  onChange: PropTypes.func
};
NavShard.defaultProps = {
  sourceObject: {
    type: "nav",
    items: [],
    renderers: {},
    symlinks: []
  },
  wantsToFocus: false,
  onChange: () => {}
};

export default NavShard;
