import "./link-group.css";
import { Button, toaster } from "evergreen-ui";
import React, { useState } from "react";
import { v4 } from "uuid";
import client from "../common/client";
import CreateLink from "./CreateLink";
import { useNavigate } from "react-router-dom";

const defaultLink = () => ({
  id: v4(),
  name: "",
  link: "",
});

const LinkGroup = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([defaultLink(), defaultLink()]);

  const addLinkRow = () => setLinks((prev) => [...prev, defaultLink()]);

  const removeLinkRow = (id) =>
    setLinks((prev) => prev.filter((link) => link.id !== id));

  const updateLinkRow = (id, updates = {}) =>
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

  const createLinkGroup = () =>
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
      .then((r) => navigate(`/b/${r.slug}`))
      .catch(() => toaster.danger("One or more of your links are invalid"));

  return (
    <div className="b-linkgroup">
      <div className="b-linkgroup__container">
        <h3>Add your links</h3>
        <div className="b-linkgroup__links">
          {links.map((link) => (
            <CreateLink
              key={link.id}
              link={link}
              updateLinkRow={updateLinkRow}
              removeLinkRow={removeLinkRow}
              canDelete={links.length > 2}
            />
          ))}
        </div>
        <div className="b-linkgroup__actions">
          <Button onClick={addLinkRow}>Add link</Button>
          <Button
            onClick={createLinkGroup}
            intent="success"
            appearance="primary"
          >
            Blend links
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkGroup;
