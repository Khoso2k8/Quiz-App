import { useState } from 'react';
function AddNewQuestion({ onCloseNewQuestion, questions, setQuestions }) {
  const [category, setCategory] = useState('cricket');
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  function handleNewQuestion() {
    if (
      !category ||
      !question ||
      !image ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    )
      return;
    const newObj = {
      id: questions[category].length + 1,
      question,
      image,
      options: [optionA, optionB, optionC, optionD],
      correct:
        correctOption === 'a'
          ? 0
          : correctOption === 'b'
          ? 1
          : correctOption === 'c'
          ? 2
          : correctOption === 'd'
          ? 3
          : '',
    };

    setQuestions(questions => ({
      ...questions,
      [category]: [...questions[category], newObj],
    }));

    onCloseNewQuestion();
  }

  return (
    <div className="category-container">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleNewQuestion();
        }}
      >
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {Object.keys(questions).map(keyVal => (
            <option value={keyVal} key={keyVal}>
              {keyVal}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Option A"
          value={optionA}
          onChange={e => setOptionA(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Option B"
          value={optionB}
          onChange={e => setOptionB(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Option C"
          value={optionC}
          onChange={e => setOptionC(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Option D"
          value={optionD}
          onChange={e => setOptionD(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Correct Option (a, b, c ,d)"
          value={correctOption}
          onChange={e => setCorrectOption(e.target.value.toLowerCase())}
        ></input>
        <div className="btns">
          <button className="btn btn-close" onClick={onCloseNewQuestion}>
            Cancel
          </button>
          <button className="btn">Add Question</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewQuestion;
