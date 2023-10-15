import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import AddNewCategory from './AddNewCategory';
import AddNewQuestion from './AddNewQuestion';
import FinishScreen from './FinishScreen';
import intialQuestions from '../data/intialQuestions.json';
import initialScores from '../data/intialScores.json';

function App() {
  const [questions, setQuestions] = useState(intialQuestions);
  const [type, setType] = useState('cricket');
  const [answer, setAnswer] = useState(null);
  const [index, setIndex] = useState(0);
  const [showAddNewCategory, setShowNewCategory] = useState(false);
  const [timer, setTimer] = useState(300000);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [scores, setScores] = useState(initialScores);
  const [finished, setFinished] = useState(false);

  function handleShowNewCategory() {
    setShowNewCategory(show => !show);
    setShowNewQuestion(false);
  }

  function handleCloseNewCategory() {
    setShowNewCategory(false);
  }

  function handleNewCategory(obj) {
    setQuestions(questions => ({ ...questions, ...obj }));
  }

  function handleCloseNewQuestion() {
    setShowNewQuestion(false);
  }

  function handleNewQuestion() {
    setShowNewQuestion(showQuestion => !showQuestion);
    setShowNewCategory(false);
  }

  function handleRestart() {
    setType('cricket');
    setAnswer(null);
    setIndex(0);
    setTimer(300000);
    setFinished(false);
    setScores(initialScores);
  }

  return (
    <div className="container">
      <Header
        questionsKeysArr={Object.keys(questions)}
        type={type}
        setType={setType}
        setAnswer={setAnswer}
        setIndex={setIndex}
        onShowNewCategory={handleShowNewCategory}
        onShowNewQuestion={handleNewQuestion}
      />
      {showAddNewCategory && (
        <AddNewCategory
          onCloseNewCategory={handleCloseNewCategory}
          onNewCategory={handleNewCategory}
          setQuestions={setQuestions}
          scores={scores}
          setScores={setScores}
        />
      )}
      {showNewQuestion && (
        <AddNewQuestion
          onCloseNewQuestion={handleCloseNewQuestion}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}

      {finished && (
        <FinishScreen
          questions={questions}
          scores={scores}
          onRestart={handleRestart}
        />
      )}

      {showAddNewCategory || showNewQuestion || finished || (
        <Main
          type={type}
          questions={questions}
          answer={answer}
          setAnswer={setAnswer}
          index={index}
          setIndex={setIndex}
          timer={timer}
          setTimer={setTimer}
          scores={scores}
          setScores={setScores}
          setFinished={setFinished}
        />
      )}
    </div>
  );
}

export default App;
