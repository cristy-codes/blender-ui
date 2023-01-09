import "./public-link-group.css";
import {
  Button,
  DuplicateIcon,
  IconButton,
  Spinner,
  TextInput,
  toaster,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../common/client";
import { v4 } from "uuid";
import ErrorIcon404 from "./error404.png";
import Link from "./Link";

const PublicLinkGroup = () => {
  const { slug } = useParams();
  const [linkgroup, setLinkGroup] = useState();
  const [err, setErr] = useState(false);

  useEffect(() => {
    client
      .service("linkgroup")
      .find({
        query: {
          slug: slug,
        },
      })
      .then((r) => {
        if (!r.length) {
          setErr(true);
        } else {
          const lg = r[0];
          lg.links = lg.links.map((link) => {
            return {
              ...link,
              isLoadingIcon: true,
              id: v4(),
            };
          });

          setLinkGroup(lg);
          return lg;
        }
      })

      .catch(() => setErr(true));
  }, []);

  if (err) {
    return (
      <div className="b-home__icon-error">
        <img src={ErrorIcon404} alt="error" className="b-home__icon-error" />
      </div>
    );
  }

  if (!linkgroup) {
    return (
      <div className="b-plg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="b-plg">
      <div className="b-plg__container">
        <h3>Blended links</h3>
        <div className="b-plg__links">
          <div className="b-flex-btw b-flex-vc">
            <div className="b-flex-vc">
              <TextInput
                className="b-mr-tiny b-text"
                disabled
                value={window.location.href}
              />
              <IconButton
                icon={DuplicateIcon}
                onClick={() =>
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => toaster.success("Copied!"))
                }
              />
            </div>
            <Button
              onClick={() => {
                linkgroup.links.forEach((link) => {
                  window.open(link.link);
                });
              }}
            >
              Open all
            </Button>
          </div>
          {linkgroup.links.map((link) => {
            return <Link key={link.id} link={link} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicLinkGroup;
