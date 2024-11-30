import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const EllipsisTooltip = ({ className: styles, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef();

  function handleShowTooltip() {
    const { current } = textRef;

    if (current) {
      const show =
        current.scrollHeight > current.clientHeight ||
        current.scrollWidth > current.clientWidth;

      show && setShowTooltip(true);
    }
  }

  return (
    <Tippy content={text} visible={showTooltip}>
      <span
        ref={textRef}
        className={styles}
        onMouseEnter={() => handleShowTooltip()}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {text}
      </span>
    </Tippy>
  );
};

EllipsisTooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EllipsisTooltip;
