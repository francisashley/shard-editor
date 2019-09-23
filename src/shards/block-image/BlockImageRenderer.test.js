import React from "react";
import { mount } from "enzyme";
import BlockImageRenderer from "./BlockImageRenderer";
import { Map } from "immutable";

const sourceObject = Map({
  type: "block-image",
  image: "/images/fruit-veg.jpg",
  placeholder: "/images/fruit-veg-placeholder.jpg",
  aspectRatio: { width: 1824, height: 746 }
});

describe("<BlockImageShardRenderer />", () => {
  const mountShardEditor = ({ sourceObject = {} } = {}) => {
    return mount(
      <BlockImageRenderer sourceObject={sourceObject} />
    );
  };

  it("renders without crashing", () => {
    const wrapper = mountShardEditor({ sourceObject: sourceObject.toObject() });

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders a placeholder icon if image or placeholder values are empty", () => {
    const sourceObject2 = sourceObject.merge({ image: "", placeholder: "" }).toObject();
    const wrapper = mountShardEditor({ sourceObject: sourceObject2 });

    expect(wrapper.find(".placeholder-icon").exists()).toEqual(true);
  });

  it("renders a placeholder image", () => {
    const sourceObject2 = sourceObject.merge({ image: "" }).toObject();
    const wrapper = mountShardEditor({ sourceObject: sourceObject2 });

    expect(wrapper.find('img[src="/images/fruit-veg-placeholder.jpg"]').exists()).toEqual(true);
  });
});
