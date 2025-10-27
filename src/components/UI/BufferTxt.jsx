import React, { useState } from "react";

const BufferTxt = ({ extract }) => {
  const [content, setContent] = useState("");

  return (
    <div>
      <span>{content}</span>
    </div>
  );
};

export default BufferTxt;
