import React from "react";
import { shallow, mount } from "enzyme";
import BlockImageRenderer from "./BlockImageRenderer";
import { Map } from "immutable";

const sourceObject = Map({
  type: "block-image",
  image: "/images/fruit-veg.jpg",
  placeholder: "/images/fruit-veg-placeholder.jpg",
  aspectRatio: { width: 1824, height: 746 }
});

describe("BlockImageShardRenderer", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<BlockImageRenderer sourceObject={sourceObject.toObject()} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders a placeholder icon if no image or placeholder image provided", () => {
    const wrapper = mount(
      <BlockImageRenderer
        sourceObject={sourceObject.merge({ image: "", placeholder: "" }).toObject()}
      />
    );

    expect(wrapper.find(".placeholder-icon").exists()).toEqual(true);
  });

  it("renders a placeholder image", () => {
    const wrapper = mount(
      <BlockImageRenderer sourceObject={sourceObject.merge({ image: "" }).toObject()} />
    );

    expect(wrapper.find('img[src="/images/fruit-veg-placeholder.jpg"]').exists()).toEqual(true);
  });
});
