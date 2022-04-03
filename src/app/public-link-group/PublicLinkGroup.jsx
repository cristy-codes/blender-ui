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
import { v4 } from "uuid";
import ErrorIcon404 from "./error404.png"

const PublicLinkGroup = () => {
  const { slug } = useParams();
  const [linkgroup, setLinkGroup] = useState();
  const [err, setErr] = useState(false);

  const [isHovering, setIsHovering] = useState({});
  console.log(isHovering);
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
          lg.links = [
            ...lg.links
          ];
          lg.links = lg.links.map((link) => {
            return {
              ...link,
              isLoadingIcon: true,
              id: v4(),
            };
          });

          setLinkGroup(lg);
          setIsHovering(
            lg.links.reduce((a, c) => {
              return {
                ...a,
                [c.id]: false,
              };
            }, {})
          );
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
    return <div className="b-home__icon-error">
      <img src={ErrorIcon404} alt="error" className="b-home__icon-error"/>
    </div>;
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
          <div className="b-flex-end">
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
          {linkgroup.links.map((link, idx) => {
            return (
              <a
                className="b-plg__link"
                key={idx}
                href={link.link}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() =>
                  setIsHovering((prev) => {
                    return {
                      ...prev,
                      [link.id]: true,
                    };
                  })
                }
                onMouseLeave={() =>
                  setIsHovering((prev) => {
                    return {
                      ...prev,
                      [link.id]: false,
                    };
                  })
                }
              >
                <div className="b-plg__link-main">
                  {isHovering[link.id] ? link.link : link.name}
                </div>
              </a>
            );
          })}
        </div>
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
