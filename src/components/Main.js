import { useState } from 'react';

function toCamelCase(s) {
  s = s.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
  return s;
}

function Main({
  type,
  questions,
  answer,
  setAnswer,
  index,
  setIndex,
  timer,
  setTimer,
  scores,
  setScores,
}) {
  function handleAnswer(index) {
    setAnswer(index);
  }

  return (
    <section>
      <ScoreCard scores={scores} questions={questions} />
      <MainContent
        question={questions[type].at(index)}
        answer={answer}
        index={index}
        onAnswer={handleAnswer}
        setScores={setScores}
        type={type}
        questions={questions}
      />

      <div className="buttons-outside">
        <button className="btn-timer">
          0{Math.floor(timer / (60 * 1000))}:
          {Math.floor(timer % 60) < 10
            ? `0${Math.floor(timer % 60)}`
            : Math.floor(timer % 60)}
        </button>
        <button
          className="btn"
          onClick={() => {
            if (index >= questions[type].length - 1) return;

            setAnswer(null);

            console.log(questions[type]);

            return setIndex(index => index + 1);
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
}

function ScoreCard({ questions, scores, totalScore }) {
  return (
    <div className="score-card">
      <h2>Your Performance</h2>
      {scores.map((score, i) => (
        <ScoreItem
          score={score}
          key={i}
          totalScore={questions[toCamelCase(score.name)].length}
        />
      ))}
    </div>
  );
}

function ScoreItem({ score, totalScore }) {
  // console.log(totalScore);
  return (
    <div className="score-item">
      <progress max={totalScore} value={score.score}></progress>
      <div className="score-text-wrapper">
        <h3>{score.name}</h3>
        <p>
          score{' '}
          <span>
            {score.score} / {totalScore}
          </span>
        </p>
      </div>
    </div>
  );
}

function MainContent({
  question,
  index,
  answer,
  onAnswer,
  setScores,
  type,
  questions,
}) {
  return (
    <>
      <div className="main-content">
        <div className="main-content-inner">
          <Question
            question={question}
            onAnswer={onAnswer}
            index={index}
            setScores={setScores}
            type={type}
            answer={answer}
            questions={questions}
          />
        </div>
        {answer !== null ? (
          answer === question.correct ? (
            <p className="result correct">
              <span>✔</span>Correct
            </p>
          ) : (
            <p className="result wrong">
              <span>❌</span>Wrong
            </p>
          )
        ) : (
          ''
        )}
      </div>
    </>
  );
}

function Question({
  question,
  onAnswer,
  index,
  setScores,
  type,
  answer,
  questions,
}) {
  return (
    <>
      <div className="main-content-image-box">
        <img src={question.image} alt="" />
      </div>
      <h2>
        {question.id}. {question.question}
      </h2>
      <Options
        question={question}
        onAnswer={onAnswer}
        index={index}
        setScores={setScores}
        type={type}
        answer={answer}
        questions={questions}
      />
    </>
  );
}

function Options({ question, onAnswer, setScores, type, answer, questions }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <Option
          key={i}
          option={option}
          onAnswer={onAnswer}
          indexOption={i}
          setScores={setScores}
          question={question}
          type={type}
          answer={answer}
          questions={questions}
        />
      ))}
    </div>
  );
}

function Option({
  option,
  indexOption,
  onAnswer,
  setScores,
  question,
  type,
  answer,
  questions,
}) {
  return (
    <button
      className={`btn-option ${
        answer !== null
          ? indexOption === question.correct
            ? 'correct-option'
            : 'wrong-option'
          : ''
      }`}
      onClick={() => {
        onAnswer(indexOption);
        setScores(scores =>
          scores.map(val =>
            toCamelCase(val.name) === type
              ? question.correct === indexOption
                ? {
                    ...val,
                    score:
                      val.score === questions[type].length
                        ? val.score
                        : val.score + 1,
                  }
                : { ...val }
              : { ...val }
          )
        );
      }}
      disabled={answer !== null}
    >
      {option}
    </button>
  );
}

export default Main;
