import React from "react";
import PropTypes from "prop-types";
import TagPickerInput from "./TagPickerInput";
import format from "date-fns/format";
import Label from "@fa-repo/base-react/dist/label";
import Input from "@fa-repo/base-react/dist/input";
import Checkbox from "@fa-repo/base-react/dist/checkbox";

/**
 * BlogHeaderEditor
 */

const BlogHeaderEditor = ({ sourceObject, onChange, wantsToFocus, ...props }) => {
  return (
    <>
      <div className="shard-form-row">
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="title" text="Title:" />
          <Input
            name="title"
            className="blog-header-shard-title-input option-input--text"
            defaultValue={sourceObject.title}
            onChangeValue={title => onChange({ ...sourceObject, title })}
            autoFocus={wantsToFocus}
          />
        </div>
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="show-author">
            Author (
            <Checkbox
              name="show-author"
              className="blog-header-shard-author-checkbox option-input--check"
              defaultChecked={sourceObject.showAuthor}
              onChangeValue={showAuthor => onChange({ ...sourceObject, showAuthor })}
            />
            ):
          </Label>
          <Input
            name="author"
            className="blog-header-shard-author-input option-input--text"
            defaultValue={sourceObject.author}
            onChangeValue={author => onChange({ ...sourceObject, author })}
          />
        </div>
      </div>
      <div className="shard-form-row">
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="author-email" text="Author email:" />
          <Input
            name="author-email"
            className="blog-header-shard-email-input option-input--text"
            defaultValue={sourceObject.email}
            onChangeValue={email => onChange({ ...sourceObject, email })}
          />
        </div>
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="show-date">
            Date (
            <Checkbox
              name="show-date"
              className="blog-header-shard-date-checkbox option-input--check"
              defaultChecked={sourceObject.showDate}
              onChangeValue={showDate => onChange({ ...sourceObject, showDate })}
            />
            ):
          </Label>
          <input
            type="date"
            name="date"
            className="blog-header-shard-date-input option-input--date"
            defaultValue={format(new Date(sourceObject.date), "YYYY-MM-DD")}
            onChange={e => {
              onChange({ ...sourceObject, date: new Date(e.target.value).getTime() });
            }}
          />
        </div>
      </div>
      <div className="shard-form-row">
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="date-format" text="Date format:" />
          <Input
            name="date-format"
            className="blog-header-shard-date-format-input option-input--text"
            defaultValue={sourceObject.dateFormat}
            onChangeValue={dateFormat => onChange({ ...sourceObject, dateFormat })}
          />
        </div>
        <div className="shard-form-group">
          <Label className="option-label" htmlFor="tags">
            Tags (
            <Checkbox
              name="show-tags"
              className="blog-header-shard-tags-checkbox option-input--check"
              defaultChecked={sourceObject.showTags}
              onChangeValue={showTags => onChange({ ...sourceObject, showTags })}
            />
            ):
          </Label>
          <TagPickerInput
            tags={sourceObject.tags}
            name="tags"
            onChange={(tags = []) => onChange({ ...sourceObject, tags })}
          />
        </div>
      </div>
    </>
  );
};

BlogHeaderEditor.propTypes = {
  sourceObject: PropTypes.shape({
    type: PropTypes.oneOf(["blog-header"]).isRequired,
    author: PropTypes.string,
    authorEmail: PropTypes.string,
    tags: PropTypes.array,
    date: PropTypes.number,
    dateFormat: PropTypes.string.isRequired,
    showAuthor: PropTypes.bool.isRequired,
    showDate: PropTypes.bool.isRequired,
    showTags: PropTypes.bool.isRequired
  }),
  wantsToFocus: PropTypes.bool,
  onChange: PropTypes.func
};

BlogHeaderEditor.defaultProps = {
  sourceObject: {},
  wantsToFocus: false,
  onChange: () => {}
};

export default BlogHeaderEditor;
