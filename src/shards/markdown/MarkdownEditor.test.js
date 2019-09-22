import React from "react";
import { shallow, mount } from "enzyme";
import MarkdownEditor from "./MarkdownEditor";
import { Map } from "immutable";

const sourceObject = Map({
  type: "markdown",
  markdown: `##### 🍫 CONFECTIONARY:\nInfantemque valido non quique mora Lemnos? Non *pulsa greges* bella mihi forma, et passa carpsere, Iunonigenaeque. Hylactor semina suae omnibus census carinae, ex cervos crimine cadit. Cecidisse *retractant*, flammaeque alite: fuga artus haeret positi si tendebam. Solis poenam hinc vincat deceant antiqua alter regia habitus fratrisque nomine moenia nunc mihi.`
});
describe("MarkdownShardEditor", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<MarkdownEditor sourceObject={sourceObject.toObject()} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should be able to change markdown", () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <MarkdownEditor onChange={onChangeMock} sourceObject={sourceObject.toObject()} />
    );
    wrapper
      .find(".markdown-editor-input")
      .first()
      .simulate("change", { target: { value: "a load of text" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("markdown", "a load of text").toObject());
  });
});
