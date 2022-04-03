import "./link-group.css";
import { Button, TextInputField } from "evergreen-ui";
import React, { useState } from "react";
import { v4 } from "uuid";
import client from "../common/client";

const LinkGroup = () => {
  const [links, setLinks] = useState([]);
  const [isBlended, setIsBlended] = useState(false);

  console.log(links);

  const addLinkRow = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: v4(),
        name: "",
        link: "",
      },
    ]);
  };


  const removeLinkRow = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLinkRow = (id, updates = {}) => {
    setLinks((prev) => {
      return prev.map((link) => {
        if (link.id === id) {
          return {
            ...link,
            ...updates,
          };
        }
        return link;
      });
    });
  };

  const createLinkGroup = () => {
    if (isBlended) {
      // client.patch if data has changed
    } else {
      client
        .service("linkgroup")
        .create({
          links: links.map((link) => {
            return {
              name: link.name,
              link: link.link,
            };
          }),
        })
        .then((r) => setIsBlended(true))
        .catch(console.log);
    }
  };

  return (
    <div className="b-linkgroup">
      <div className="b-linkgroup__links">
        {links.map((link) => {
          return (
            <div key={link.id} className="b-linkgroup__link">
              <TextInputField
                label=""
                value={link.name}
                onChange={(e) => {
                  updateLinkRow(link.id, { name: e.target.value });
                }}
              />
              <TextInputField
                label=""
                value={link.link}
                onChange={(e) => {
                  updateLinkRow(link.id, { link: e.target.value });
                }}
              />
              <Button onClick={() => removeLinkRow(link.id)}>remove</Button>
            </div>
          );
        })}
        <Button onClick={createLinkGroup}>Create</Button>
      </div>

      <Button onClick={addLinkRow}>add link</Button>
    </div>
  );
};

export default LinkGroup;
