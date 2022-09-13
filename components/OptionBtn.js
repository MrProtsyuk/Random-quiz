import React from "react";
import he from "he";

function OptionBtn({ correct, showColor, question, onClick }) {
  return (
    <button className="shadow-md bg-white border-solid border-black border rounded w-96 mb-5 p-7 hover:bg-stone-50 hover:text-sky-500"
      style={{
        marginBottom: 10,
        border: showColor
          ? correct
            ? "#50C878 4px solid"
            : "red 4px solid"
          : "",
      }}
      onClick={onClick}
    >
      {he.decode(question)}
    </button>
  );
}

export default OptionBtn;
