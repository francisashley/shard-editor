import React from "react";
import PropTypes from "prop-types";

/**
 * NavRenderer
 */

const LinkRenderer = ({ item }) => {
  const { text, link, active } = item;
  return Boolean(active) ? text : <a href={link}>{text}</a>;
};

const ExternalLinkRenderer = ({ item }) => {
  const { text, link } = item;
  return (
    <a href={link} target="_blank" rel="noopener">
      {text}
    </a>
  );
};

const SymlinkRenderer = ({ item: symlink }) => {
  if (symlink.linked) {
    return symlink.active ? symlink.text : <a href={symlink.link}>{symlink.text}</a>;
  } else {
    return <span className="symlink-error">[not linked]</span>;
  }
};

const DividerRenderer = ({ item }) => {
  return item.text;
};

const getSymlink = (symlinkId, symlinks) => {
  symlinkId = symlinkId === "" ? null : symlinkId;
  let symlink = symlinks.find(({ id }) => id == symlinkId) || {};
  return { ...symlink, linked: typeof symlink.id === "number" };
};

const NavRenderer = props => {
  let sourceObject = props.sourceObject;

  return (
    <nav>
      <ul>
        {sourceObject.items.map((item, i) => {
          const { type } = item;
          const { renderers = [], symlinks = [] } = sourceObject;

          const isLink = type === "link" && typeof renderers.link !== "function";
          const isCustomLink = type === "link" && typeof renderers.link === "function";
          const isExternalLink = type === "external" && typeof renderers.external !== "function";
          const isCustomExternalLink =
            type === "external" && typeof renderers.external === "function";
          const isSymlink = type === "symlink" && typeof renderers.symlink !== "function";
          const isCustomSymlink = type === "symlink" && typeof renderers.symlink === "function";
          const isDivider = type === "divider" && typeof renderers.divider !== "function";
          const isCustomDivider = type === "divider" && typeof renderers.divider === "function";

          if (type === "symlink") {
            item = { ...item, ...getSymlink(item.id, symlinks) };
          }

          return (
            <li key={i}>
              {isLink && <LinkRenderer item={item} />}
              {isCustomLink && <sourceObject.renderers.link item={item} />}
              {isExternalLink && <ExternalLinkRenderer item={item} />}
              {isCustomExternalLink && <sourceObject.renderers.external item={item} />}
              {isSymlink && <SymlinkRenderer item={item} />}
              {isCustomSymlink && <sourceObject.renderers.symlink item={item} />}
              {isDivider && <DividerRenderer item={item} />}
              {isCustomDivider && <sourceObject.renderers.divider item={item} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

NavRenderer.propTypes = {
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
          id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
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
  })
};

NavRenderer.defaultProps = {
  sourceObject: {
    id: null,
    type: "nav",
    items: [],
    renderers: {},
    symlinks: []
  }
};

export default NavRenderer;
