import React from "react";
import PropTypes from "prop-types";

import Button from "@fa-repo/base-react/dist/button";
import Label from "@fa-repo/base-react/dist/label";
import Input from "@fa-repo/base-react/dist/input";
import Select from "@fa-repo/base-react/dist/select";
import arrayMove from "array-move";

const DeleteButton = props => (
  <Button className="delete" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M5 8v12c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V8c0 0-.447 0-1 0H6C5.447 8 5 8 5 8zM3 6L8 6 16 6 21 6 21 4 16.618 4 15 2 9 2 7.382 4 3 4z" />
    </svg>
  </Button>
);

const UpButton = props => (
  <Button className="up" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M3,19h18c0.372,0,0.713-0.207,0.886-0.536c0.173-0.329,0.148-0.727-0.063-1.033l-9-13c-0.373-0.539-1.271-0.539-1.645,0 l-9,13c-0.212,0.306-0.236,0.704-0.063,1.033C2.287,18.793,2.628,19,3,19z"></path>
    </svg>
  </Button>
);

const DownButton = props => (
  <Button className="down" {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M11.178,19.569C11.364,19.839,11.672,20,12,20s0.636-0.161,0.822-0.431l9-13c0.212-0.306,0.236-0.704,0.063-1.033 C21.713,5.207,21.372,5,21,5H3C2.628,5,2.287,5.207,2.114,5.536C1.941,5.865,1.966,6.263,2.178,6.569L11.178,19.569z"></path>
    </svg>
  </Button>
);

/**
 * NavEditor
 */

const NavEditor = ({ sourceObject, onChange }) => {
  return (
    <>
      <menu>
        <Button
          className="add-link-button"
          onClick={() => {
            const item = { type: "link", text: "ads", link: "" };
            onChange({ ...sourceObject, items: [...sourceObject.items, item] });
          }}
          text="Add link"
          preventDefault
        />
        <Button
          className="add-external-link-button"
          onClick={() => {
            const item = { type: "external", text: "ads", link: "" };
            onChange({ ...sourceObject, items: [...sourceObject.items, item] });
          }}
          text="Add external link"
          preventDefault
        />
        <Button
          className="add-symlink-button"
          onClick={() => {
            const item = { type: "symlink", id: "" };
            onChange({ ...sourceObject, items: [...sourceObject.items, item] });
          }}
          text="Add symlink"
          preventDefault
        />
        <Button
          className="add-divider-button"
          onClick={() => {
            const item = { type: "divider", text: " | " };
            onChange({ ...sourceObject, items: [...sourceObject.items, item] });
          }}
          text="Add divider"
          preventDefault
        />
      </menu>

      <table>
        <tbody>
          {sourceObject.items.map((item, index) => {
            const isLink = item.type === "link";
            const isSymlink = item.type === "symlink";
            const isExternalLink = item.type === "external";
            const isDivider = item.type === "divider";

            return (
              <tr key={index} className={item.type + "-item"}>
                <td className="type">
                  {isLink && "Link"}
                  {isSymlink && "Symbolic link"}
                  {isExternalLink && "External link"}
                  {isDivider && "Divider"}
                </td>
                <td className="values">
                  {isLink && (
                    <>
                      <div>
                        <Label text="Text:" htmlFor="link-item-text" />
                        <Input
                          className="link-item-text"
                          name="link-item-text"
                          value={item.text}
                          onChangeValue={val => {
                            sourceObject.items[index].text = val;
                            onChange(sourceObject);
                          }}
                        />
                      </div>
                      <div>
                        <Label text="Link:" htmlFor="link-item-link" />
                        <Input
                          className="link-item-link"
                          name="link-item-link"
                          value={item.link}
                          onChangeValue={val => {
                            sourceObject.items[index].link = val;
                            onChange(sourceObject);
                          }}
                        />
                      </div>
                    </>
                  )}
                  {isSymlink && (
                    <div>
                      <Label text="Text:" htmlFor="symlink-item-picker" />
                      <Select
                        className="symlink-item-picker"
                        name="symlink-item-picker"
                        options={[
                          { text: "Please select...", value: "" },
                          ...sourceObject.symlinks.map(({ text, id: value }) => ({ text, value }))
                        ]}
                        value={item.id}
                        onChangeValue={val => {
                          sourceObject.items[index].id = val;
                          onChange(sourceObject);
                        }}
                      />
                    </div>
                  )}
                  {isExternalLink && (
                    <>
                      <div>
                        <Label text="Text:" htmlFor="external-item-text" />
                        <Input
                          className="external-item-text"
                          name="external-item-text"
                          value={item.text}
                          onChangeValue={val => {
                            sourceObject.items[index].text = val;
                            onChange(sourceObject);
                          }}
                        />
                      </div>
                      <div>
                        <Label text="Link:" htmlFor="external-item-link" />
                        <Input
                          className="external-item-link"
                          name="external-item-link"
                          value={item.link}
                          onChangeValue={val => {
                            sourceObject.items[index].link = val;
                            onChange(sourceObject);
                          }}
                        />
                      </div>
                    </>
                  )}
                  {isDivider && (
                    <>
                      <Label text="Text:" htmlFor="divider-item-text" />
                      <Input
                        className="divider-item-text"
                        name="divider-item-text"
                        value={item.text}
                        onChangeValue={val => {
                          sourceObject.items[index].text = val;
                          onChange(sourceObject);
                        }}
                      />
                    </>
                  )}
                </td>
                <td className="actions">
                  <UpButton
                    onClick={() => {
                      sourceObject.items = arrayMove(
                        sourceObject.items,
                        index,
                        index - 1 > 0 ? index - 1 : 0
                      );
                      onChange(sourceObject);
                    }}
                  />
                  <DownButton
                    onClick={() => {
                      sourceObject.items = arrayMove(sourceObject.items, index, index + 1);
                      onChange(sourceObject);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      if (confirm("Are you sure?")) {
                        sourceObject.items = sourceObject.items.filter(
                          (_item, _index) => _index !== index
                        );
                        onChange(sourceObject);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

NavEditor.propTypes = {
  onChange: PropTypes.func
};
NavEditor.defaultProps = {
  onChange: () => {}
};

export default NavEditor;
