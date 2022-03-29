import "./public-link-group.css";
import { Spinner } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../common/client";

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
      .then((r) => setLinkGroup(r[0]))
      .catch(() => setErr(true));
  }, []);

  if (err) {
    return <div>error</div>;
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
      {linkgroup.links.map((link) => {
        return (
          <div key={link._id}>
            {link.name} {link.link}
          </div>
        );
      })}
    </div>
  );
};

export default PublicLinkGroup;

/**
 * three cases:
 * - loading: waiting to see if the backend returned data
 * - data is returned successfully: linkgroup will be returned
 * - error: .catch executed only. linkgroup does not exist etc
 */
