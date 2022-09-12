import { useEffect, useState } from "react";
import { shuffle } from "../../utils/shuffleArray";
import he from "he";
import { encodeGetParams } from "../../utils/queryString";
import { useRouter } from "next/router";

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

  const quiz = results[questionIndex];

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
  };

  const router = useRouter();
  const submit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/"
    })
  }

  useEffect(() => {
    setQuestions(shuffle([...quiz.incorrect_answers, quiz.correct_answer]));
  }, [questionIndex]);

  return (
    <div>
      <div style={{ marginBottom: 50 }}>
        <div style={{ display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between', 
                      padding: 20}}>
          <h2>Question: {questionIndex + 1}</h2>
          <h2>Category - {he.decode(quiz.category)}</h2>
          <h2>
            Score: {tally} / {number}
          </h2>
        </div>
          <h2 style={{ textAlign: 'center'}}>{he.decode(quiz.question)}</h2>
        <h2 style={{ textAlign: 'center'}}>{message}</h2>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {questions.map((question) => (
            <button
              style={{
                marginBottom: 10,
                border: showColor
                  ? question === quiz.correct_answer
                    ? "green 4px solid"
                    : "red 4px solid"
                  : "",
                backgroundColor: "white",
                color: "black",
                padding: 20,
                fontSize: 24,
                width: 400,
              }}
              onClick={() => checkAnswer(question)}
            >
              {he.decode(question)}
            </button>
          ))}
          {questionIndex === results.length - 1 ? (
            showColor && <button onClick={(e) => submit(e)}>Return home</button>
          ) : (
            <button onClick={() => nextQuestion()}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Quizpageid;
