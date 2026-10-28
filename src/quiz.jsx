import { useState } from "react";

export default function Quiz({ quiz }) {
  const [qi, setQi] = useState(0); // current question number
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null); // option the user clicked

  // Finished: show the score
  if (qi >= quiz.length) {
    return (
      <>
        <h3>Score: {score} / {quiz.length}</h3>
        <div className="row">
          <button
            className="go"
            onClick={() => { setQi(0); setScore(0); setPicked(null); }}
          >
            Try again
          </button>
        </div>
      </>
    );
  }

  const [question, options, correct, why] = quiz[qi];
  const answered = picked !== null;

  function choose(i) {
    if (answered) return;
    setPicked(i);
    if (i === correct) setScore(score + 1);
  }

  function next() {
    setQi(qi + 1);
    setPicked(null);
  }

  return (
    <>
      <h2>Question {qi + 1} of {quiz.length}. Score: {score}</h2>
      <h3>{question}</h3>

      {options.map((o, i) => {
        let cls = "opt";
        if (answered && i === correct) cls += " right";
        if (answered && i === picked && i !== correct) cls += " wrong";
        return (
          <button key={i} className={cls} onClick={() => choose(i)}>
            <b>{"ABCD"[i]}</b>
            <span>{o}</span>
          </button>
        );
      })}

      {answered && (
        <>
          <p className="why">{(picked === correct ? "Correct. " : "Not quite. ") + why}</p>
          <button className="go" style={{ marginTop: 12 }} onClick={next}>
            {qi === quiz.length - 1 ? "See score" : "Next question"}
          </button>
        </>
      )}
    </>
  );
}
