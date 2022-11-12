import { useEffect, useState } from "react";

function Cell({ cell, handlerCliсk, x, y, buttonDisabled }) {
  const [disabledButton, setDisabledButton] = useState(false);
  useEffect(() => setDisabledButton(false), [buttonDisabled]);
  return (
    <>
      <button
        key={cell + "E"}
        className="cell"
        value={cell}
        onClick={(e) => {
          handlerCliсk(e, x, y);
          setDisabledButton(true);
        }}
        disabled={buttonDisabled || disabledButton}
      >
        {cell}
      </button>
    </>
  );
}

export default Cell;
