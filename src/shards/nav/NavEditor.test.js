import React from "react";
import { mount } from "enzyme";
import NavEditor from "./NavEditor";
import { Map } from "immutable";

const sourceObject = Map({
  id: 93431892,
  type: "nav",
  items: [
    { type: "link", text: "Introduction", link: "/introduction" },
    { type: "symlink", id: 0 },
    { type: "divider", text: " | " },
    { type: "external", text: "Resources", link: "https://en.wikipedia.org" }
  ],
  renderers: {},
  symlinks: [
    { id: 0, text: "Quick start", link: "/quick-start" },
    { id: 1, text: "examples", link: "/examples" }
  ]
});

global.confirm = () => true;

describe("<NavShardEditor />", () => {
  const mountShardEditor = () => {
    const onChangeMock = jest.fn();

    const wrapper = mount(
      <NavEditor sourceObject={sourceObject.toObject()} onChange={onChangeMock} />
      );

    return { wrapper, onChangeMock };
  };

  it("renders without crashing", () => {
    const { wrapper } = mountShardEditor();

    expect(wrapper.exists()).toEqual(true);
  });

  it("can add a `link` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("button.add-link-button").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(5);
  });

  it("can update a `link` items `text` value", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("input.link-item-text").simulate("change", { target: { value: "Overview" } });

    expect(onChangeMock.mock.calls[0][0].items[0].text).toBe("Overview");
  });

  it("can update a `link` items `link` value", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("input.link-item-link").simulate("change", { target: { value: "abc.com" } });

    expect(onChangeMock.mock.calls[0][0].items[0].link).toBe("abc.com");
  });

  it("can delete a `link` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find(".link-item button.delete").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(3);
  });

  it("can add an `external` link item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("button.add-external-link-button").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(5);
  });

  it("can change an `external` link items `text` value", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find("input.external-item-text")
      .simulate("change", { target: { value: "Dictionary" } });

    expect(onChangeMock.mock.calls[0][0].items[3].text).toBe("Dictionary");
  });

  it("can change an external link items `link` value", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper
      .find("input.external-item-link")
      .simulate("change", { target: { value: "https://dictionary.com" } });

    expect(onChangeMock.mock.calls[0][0].items[3].link).toBe("https://dictionary.com");
  });

  it("can delete an `external` link item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find(".external-item button.delete").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(3);
  });

  it("can add a symlink item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("button.add-symlink-button").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(5);
  });

  it("can change a `symlink` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("select.symlink-item-picker").simulate("change", { target: { value: 1 } });

    expect(onChangeMock.mock.calls[0][0].items[1].id).toBe(1);
  });

  it("can delete a `symlink` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find(".symlink-item button.delete").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(3);
  });

  it("can add a `divider` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("button.add-divider-button").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(5);
  });

  it("can change a `divider` items text value", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("input.divider-item-text").simulate("change", { target: { value: "•" } });

    expect(onChangeMock.mock.calls[0][0].items[2].text).toBe("•");
  });

  it("can delete a `divider` item", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find(".divider-item button.delete").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items.length).toBe(3);
  });

  it("can move item up", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("tr").at(2).find("button.up").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items[1].type).toBe("divider");
  });

  it("can move item down", () => {
    const { wrapper, onChangeMock } = mountShardEditor();

    wrapper.find("tr").at(2).find("button.down").simulate("click");

    expect(onChangeMock.mock.calls[0][0].items[3].type).toBe("divider");
  });
});
