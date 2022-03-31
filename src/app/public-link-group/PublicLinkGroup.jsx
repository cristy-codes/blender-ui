import "./public-link-group.css";
import {
  Button,
  DuplicateIcon,
  IconButton,
  Spinner,
  toaster,
} from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../common/client";
import axios from "axios";

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
          setLinkGroup({
            ...lg,
            links: lg.links.map((link) => {
              return {
                ...link,
                isLoadingIcon: true,
              };
            }),
          });
          return lg;
        }
      })
      // .then((r) => {
      //   if (r) {
      //     Promise.all(
      //       r.links.map((l) =>
      //         axios.get(
      //           `https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.youtube.com`
      //         )
      //       )
      //     ).then(console.log).catch(console.log);
      //   }
      // })
      .catch(() => setErr(true));
  }, []);

  console.log(linkgroup);
  const getIconFromUrl = (url) => {
    return axios.get(
      `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
    );
  };

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
      <div className="b-plg__links">
        <h3>Blended links</h3>
        {linkgroup.links.map((link, idx) => {
          return (
            <div className="b-plg__link" key={idx}>
              <div className="b-plg__link-header">
                {link.name}
                <IconButton
                  icon={DuplicateIcon}
                  size="small"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(link.link)
                      .then(() =>
                        toaster.success("Copied!",{id:'', duration: 2})
                      ) 
                  }
                />
              </div>
              <div className="b-plg__link-body">
                {/* {link.isLoadingIcon && <Spinner />} */}
                {link.link}
              </div>
            </div>
          );
        })}
      </div>
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
