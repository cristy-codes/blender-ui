import "./link-group.css";
import { Button, TextInputField } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import client from "../common/client";
import CreateLink from "./CreateLink";

const LinkGroup = () => {
  const [links, setLinks] = useState([
    {
      id: v4(),
      name: "",
      link: "",
    },
    {
      id: v4(),
      name: "",
      link: "",
    },
  ]);
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
      <div className="b-linkgroup__container">
        <h3>Add your links</h3>
        <div className="b-linkgroup__links">
          {links.map((link) => {
            return (
              <CreateLink
                key={link.id}
                link={link}
                updateLinkRow={updateLinkRow}
                removeLinkRow={removeLinkRow}
                canDelete={links.length > 2}
              />
            );
          })}
        </div>
        <div className="b-linkgroup__actions">
          <Button onClick={addLinkRow}>Add link</Button>
          <Button onClick={createLinkGroup} intent="success" appearance="primary">Blend links</Button>
        </div>
      </div>
    </div>
  );
};

export default LinkGroup;
