import React from "react";
import he from "he";

function QuestionInfo({ timer, questionIndex, quiz, message, tally, number }) {
  return (
    <>
      <div className="bg-amber-50 bg-auto flex flex-row py-3 justify-between">
        <h2 className="pl-8 ml-8 text-xl">Question: {questionIndex + 1}</h2>
        <h2 className="text-xl">Category - {he.decode(quiz.category)}</h2>
        <h2 className="pr-8 mr-8 text-xl">
          Score: {tally} / {number}
        </h2>
      </div>
      <div className="bg-amber-50 flex flex-col p-2 items-center place-content-center">
        <h2 className="p-2 px-3 mb-3 text-2xl border border-black border-solid rounded bg-white">
          Timer: {timer}
        </h2>
        <h2 className="p-2 text-xl">{he.decode(quiz.question)}</h2>
        <h2 className="p-2 my-3 text-xl">{message}</h2>
      </div>
    </>
  );
}

export default QuestionInfo;
