import React, { Component } from "react";
import Example from "../examples/uncontrolled";

/**
 * UncontrolledExample
 */

const UncontrolledExample = props => {
  return (
    <>
      <a
        href="https://github.com/fa-repo/shard-editor/tree/master/docs/src/examples/uncontrolled"
        target="_blank"
        rel="noopener"
      >
        Source code
      </a>
      <Example />
    </>
  );
};

UncontrolledExample.propTypes = {};
UncontrolledExample.defaultProps = {};

export default UncontrolledExample;
