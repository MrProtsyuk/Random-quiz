import { useEffect, useState } from "react";
import { shuffle } from "../../utils/shuffleArray";
import he from "he";
import { encodeGetParams } from "../../utils/queryString";
import { useRouter } from "next/router";
import OptionBtn from "../../components/OptionBtn";
import QuestionInfo from "../../components/QuestionInfo";

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query);
  const number = ctx?.query?.number || 10;
  const res = await fetch(
    `https://opentdb.com/api.php?${encodeGetParams(ctx.query)}`
  );
  const data = await res.json();

  return {
    props: { results: data?.results || [], number },
  };
};

function Quizpageid({ results, number }) {
  const [questionIndex, setQuestion] = useState(0);
  const [message, setMessage] = useState("");
  const [showColor, setShowColor] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [tally, setTally] = useState(0);
  const [timer, setTimer] = useState(10);

  const quiz = results[questionIndex];

  const tick = () => {
    setTimer((t) => {
      const newTime = t - 1;
      if (newTime <= 0) {
        setShowColor(true);
        setMessage("You ran out of time");
        return 0;
      }
      return newTime;
    });
  };

  const checkAnswer = (question) => {
    if (showColor) return;

    setShowColor(true);
    if (question === quiz.correct_answer) {
      setMessage("Correct");
      setTally((tally) => tally + 1);
      return true;
    }
    if (tally > 10) {
      setMessage("Congrats, you won!");
    }
    setMessage("Incorrect");
    return false;
  };

  const nextQuestion = () => {
    setShowColor(false);
    setMessage("");
    setQuestion((questionIndex) => questionIndex + 1);
    setTimer(10);
  };

  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  useEffect(() => {
    setQuestions(shuffle([...quiz.incorrect_answers, quiz.correct_answer]));
  }, [questionIndex]);

  return (
    <div className="bg-lime-100 min-h-screen">
      <div>
        <QuestionInfo
          timer={timer}
          questionIndex={questionIndex}
          quiz={quiz}
          message={message}
          tally={tally}
          number={number}
        />
        <hr />
        <div className="flex flex-col mt-4 p-3 items-center min-h-full">
          {questions.map((question) => (
            <OptionBtn
              onClick={() => checkAnswer(question)}
              correct={question === quiz.correct_answer}
              showColor={showColor}
              question={question}
            />
          ))}
          {questionIndex === results.length - 1 ? (
            showColor && (
              <button
                className="btn btn-lg btn-primary btn-block p-2 px-4 mx-4 bg-white border-solid border-black border rounded hover:bg-stone-50 hover:text-sky-500"
                onClick={(e) => submit(e)}
              >
                Return home
              </button>
            )
          ) : (
            <button
              className="btn btn-lg btn-primary btn-block p-2 px-4 mx-4 bg-white border-solid border-black border rounded hover:bg-stone-50 hover:text-sky-500"
              onClick={() => nextQuestion()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Quizpageid;
