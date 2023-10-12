//Converting camel case to pascal case
function toPascal(s) {
  s = s.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
  return s;
}

function toPascalCaseWithSpace(s) {
  s = s.replace(/([A-Z])/g, ' $1');

  s = s.replace(/^./, function (str) {
    return str.toUpperCase();
  });
  return s;
}

function toCamelCase(s) {
  s = s.replace(/^([A-Z])|\s(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
  return s;
}

function Header({
  questionsKeysArr,
  type,
  setType,
  setAnswer,
  setIndex,
  onShowNewCategory,
  onShowNewQuestion,
}) {
  return (
    <header className="header">
      <Logo />

      <SelectionBox
        questionsKeysArr={questionsKeysArr}
        type={type}
        setType={setType}
        setAnswer={setAnswer}
        setIndex={setIndex}
      />
      <Buttons
        onShowNewCategory={onShowNewCategory}
        onShowNewQuestion={onShowNewQuestion}
      />
    </header>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img
        className="header-img"
        src="images/Personality Quiz.png"
        alt="Personality-quiz-app"
      />
    </div>
  );
}

function SelectionBox({
  questionsKeysArr,
  type,
  setType,
  setAnswer,
  setIndex,
}) {
  return (
    <div className="category-selection">
      <h2>Choose category of your interest</h2>
      <select
        value={type}
        onChange={e => {
          setAnswer(null);
          setIndex(0);
          return setType(toCamelCase(e.target.value));
        }}
      >
        {questionsKeysArr.map(type => (
          <option value={type} key={type}>
            {toPascalCaseWithSpace(type)}
          </option>
        ))}
      </select>
    </div>
  );
}

function Buttons({ onShowNewCategory, onShowNewQuestion }) {
  return (
    <div className="buttons">
      <button className="btn btn-add-category" onClick={onShowNewCategory}>
        +Add New Category
      </button>
      <button className="btn btn-add-question" onClick={onShowNewQuestion}>
        +Add New Question
      </button>
    </div>
  );
}

export default Header;
