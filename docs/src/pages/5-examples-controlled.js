import React, { Component } from "react";
import Example from "../examples/controlled";

/**
 * ControlledExample
 */

const ControlledExample = props => {
  return (
    <>
      <a
        href="https://github.com/fa-repo/shard-editor/tree/master/docs/src/examples/controlled"
        target="_blank"
        rel="noopener"
      >
        Source code
      </a>
      <Example />
    </>
  );
};

ControlledExample.propTypes = {};
ControlledExample.defaultProps = {};

export default ControlledExample;
