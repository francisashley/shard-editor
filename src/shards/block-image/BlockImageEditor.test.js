import React from "react";
import { mount } from "enzyme";
import BlockImageEditor from "./BlockImageEditor";
import { Map } from "immutable";

const sourceObject = Map({
  type: "block-image",
  image: "/images/fruit-veg.jpg",
  placeholder: "/images/fruit-veg-placeholder.jpg",
  aspectRatio: { width: 1824, height: 746 }
});

describe("<BlockImageShardEditor />", () => {
  const mountShardEditor = () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <BlockImageEditor sourceObject={sourceObject.toObject()} onChange={onChangeMock}/>
    );

    return { wrapper, onChangeMock };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardEditor();

    expect(wrapper.exists()).toEqual(true);
  });

  it("can change image", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find('input[name="image"]')
      .first()
      .simulate("change", { target: { value: "/some-photo" } });

    expect(onChangeMock).toBeCalledWith(sourceObject.set("image", "/some-photo").toObject());
  });

  it("can change placeholder", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find('input[name="sml-image"]')
      .first()
      .simulate("change", { target: { value: "/placeholder-photo" } });

    expect(onChangeMock.mock.calls[0][0]).toEqual(
      sourceObject.set("placeholder", "/placeholder-photo").toObject()
    );
  });

  it("can change aspect ratios height", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find('input[name="aspect-ratio-height"]')
      .first()
      .simulate("change", { target: { value: 10 } });

    expect(onChangeMock.mock.calls[0][0]).toEqual(
      sourceObject.setIn(["aspectRatio", "height"], 10).toObject()
    );
  });

  it("can change aspect ratios width", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find('input[name="aspect-ratio-width"]')
      .first()
      .simulate("change", { target: { value: 25 } });

    expect(onChangeMock.mock.calls[0][0]).toEqual(
      sourceObject.setIn(["aspectRatio", "width"], 25).toObject()
    );
  });
});
