import { useState } from "react";

const Link = (props) => {
  const { link } = props;
  const [isHovering, setIsHovering] = useState(false);
  return (
    <a
      className="b-plg__link"
      href={link.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="b-plg__link-main">
        {isHovering ? link.link : link.name}
      </div>
    </a>
  );
};

export default Link;
