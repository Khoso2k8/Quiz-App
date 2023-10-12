import { useState } from 'react';

function toCamelCase(s) {
  s = s.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
  return s;
}

function AddNewCategory({
  onCloseNewCategory,
  onNewCategory,
  setQuestions,
  scores,
  setScores,
}) {
  const [categoryName, setCategoryName] = useState('');
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');

  function handleAddNewCategory() {
    if (
      !categoryName ||
      !question ||
      !image ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctOption
    ) {
      return;
    }

    const newCategoryObject = {
      name: [
        {
          id: '1',
          question,
          options: [optionA, optionB, optionC, optionD],
          image,
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
        },
      ],
    };
    const { name } = newCategoryObject;

    const categoryObj = {
      [toCamelCase(categoryName)]: name,
    };

    setQuestions(questions => ({ ...questions, ...categoryObj }));
    const newScoreObj = {
      name: categoryName,
      score: 0,
    };
    setScores(scores => [...scores, newScoreObj]);

    onCloseNewCategory();
  }

  return (
    <div className="category-container">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddNewCategory();
        }}
      >
        <input
          type="text"
          placeholder="Name of Category"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        ></input>
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
          placeholder="Correct Option (A, B, C, D)"
          value={correctOption}
          onChange={e => setCorrectOption(e.target.value.toLowerCase())}
        ></input>
        <div className="btns">
          <button className="btn btn-close" onClick={onCloseNewCategory}>
            Cancel
          </button>
          <button className="btn">Add Category</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewCategory;
