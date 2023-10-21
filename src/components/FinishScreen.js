function FinishScreen({ questions, scores, onRestart }) {
  const categories = Object.keys(questions);
  console.log(categories);
  return (
    <section className="finish-section">
      <h1>Your Score in different categories</h1>
      <ul className="finish-score-container">
        {scores.map(score => (
          <Score score={score} keys={score.id} />
        ))}
      </ul>
      <button className="btn" onClick={onRestart}>
        Restart
      </button>
      <p>&copy; copyright by Waqar Ahmed Khoso</p>
    </section>
  );
}

function Score({ score }) {
  return (
    <li className="finish-score">
      <p>{score.name}</p>
      <p>{score.score}</p>
    </li>
  );
}

export default FinishScreen;
