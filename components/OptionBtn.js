import React from "react";
import he from "he";

function OptionBtn({ correct, showColor, question, onClick }) {
  return (
    <button className="bg-white border-solid border-black border rounded hover:bg-stone-50 hover:text-sky-500"
      // style={{
      //   marginBottom: 10,
      //   border: showColor
      //     ? correct
      //       ? "emerald 4px solid"
      //       : "red 4px solid"
      //     : "",
      //   backgroundColor: "white",
      //   color: "black",
      //   padding: 20,
      //   fontSize: 24,
      //   width: 400,
      // }}
      onClick={onClick}
    >
      {he.decode(question)}
    </button>
  );
}

export default OptionBtn;
