import React from "react";
import { mount } from "enzyme";
import MarkdownEditor from "./MarkdownEditor";
import { Map } from "immutable";

const sourceObject = Map({
  type: "markdown",
  markdown: `##### 🍫 CONFECTIONARY:\nInfantemque valido non quique mora Lemnos? Non *pulsa greges* bella mihi forma, et passa carpsere, Iunonigenaeque. Hylactor semina suae omnibus census carinae, ex cervos crimine cadit. Cecidisse *retractant*, flammaeque alite: fuga artus haeret positi si tendebam. Solis poenam hinc vincat deceant antiqua alter regia habitus fratrisque nomine moenia nunc mihi.`
});

describe("<MarkdownShardEditor />", () => {
  const mountShardEditor = () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <MarkdownEditor sourceObject={sourceObject.toObject()} onChange={onChangeMock} />
    );

    return { wrapper, onChangeMock };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardEditor();

    expect(wrapper.exists()).toEqual(true);
  });

  it("can change markdown", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find(".markdown-editor-input")
      .first()
      .simulate("change", { target: { value: "a load of text" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("markdown", "a load of text").toObject());
  });
});
