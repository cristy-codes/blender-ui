import React from "react";
import { IconButton, TextInputField, CrossIcon } from "evergreen-ui";

const CreateLink = (props) => {
  const { link, updateLinkRow, removeLinkRow, canDelete } = props;
  return (
    <div className="b-lg-create">
      <div className="b-lg-create__action-close">
         <IconButton
          icon={CrossIcon}
          appearance="minimal"
          size="small"
          disabled={!canDelete}
          onClick={() => removeLinkRow(link.id)}
        />
      </div>
      <TextInputField
        label="Title (optional)"
        placeholder="Title"
        value={link.name}
        onChange={(e) => {
          updateLinkRow(link.id, { name: e.target.value });
        }}
      />
      <TextInputField
        label="URL"
        placeholder="https://"
        value={link.link}
        onChange={(e) => {
          updateLinkRow(link.id, { link: e.target.value });
        }}
      />
    </div>
  );
};

export default CreateLink;
