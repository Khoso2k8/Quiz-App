import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import AddNewCategory from './AddNewCategory';
import AddNewQuestion from './AddNewQuestion';

const intialQuestions = {
  cricket: [
    {
      id: 1,

      question: 'Name the cricket bestman in the picture',
      options: [
        'Brian Lara',
        'Ramnaresh Sarwan',
        'Shivenirine Chanderpaul',
        'carl Hooper',
      ],
      image: './images/brian-lara.jpg',
      correct: 0,
    },
    {
      id: 2,

      question: 'Name the cricket bolwer in the picture',
      options: [
        'Shane Warne',
        'Andrew Flintoff',
        'Glenn McGrath',
        'Jason Gillespie',
      ],
      image: './images/Glenn-McGrath-1.jpg',
      correct: 2,
    },
    {
      id: 3,
      question: 'Identify the Pakistani cricketer in the image',
      options: ['Saleem Khan', 'Ijaz Ahmed', 'Basit Ali', 'Azhar Mahammod'],
      image:
        'https://st3.cricketcountry.com/wp-content/uploads/cricket/image_20130920125532.jpg',
      correct: 1,
    },
    {
      id: 4,
      question: 'This is a South African Bowler. Identify him.',
      options: [
        'Aiden Markram',
        'Dale Steyn',
        'Makhaya Ntini',
        'Shaun Pollock',
      ],
      image:
        'https://e2.365dm.com/07/10/800x600/Shaun_Pollock_589208.jpg?20071026055458',
      correct: 3,
    },
    {
      id: 5,
      question: 'Identify the English bowler in the image',
      options: [
        'Stuart Broad',
        'James Anderson',
        'Matthew Hoggard',
        'Ben Stokes',
      ],
      image:
        'https://static.independent.co.uk/2022/06/29/15/c6c7fb77a2a56864eb5d1394f6c63366Y29udGVudHNlYXJjaGFwaSwxNjU2NTk5Nzgw-2.67628743.jpg?quality=75&width=990&crop=3%3A2%2Csmart&auto=webp',
      correct: 1,
    },
  ],
  international: [
    {
      id: 1,

      question: 'He served as a Secretary-General of UN. Guess his name',
      options: [
        'Boutros Boutros-Ghali',
        'Kofi Annan',
        'Ban Ki-moon',
        'António Guterres',
      ],
      image:
        'https://www.un.org/sg/sites/www.un.org.sg/files/img/portraits/annanofficial2002_big2.jpg',
      correct: 1,
    },
    {
      id: 2,
      question: 'He is a former US president?',
      options: [
        'John F. Kennedy',
        'Bill Clinton',
        'George W. Bush',
        'Donald J. Trump',
      ],
      image:
        'https://mrnussbaum.com/uploads/activities/worldimages/clinton.jpg',
      correct: 1,
    },
    {
      id: 3,
      question: 'This is an image of well-known scientist.',
      options: [
        'Isaac Newton',
        'Albert Einstein',
        'Galileo Galilei',
        'Stephen Hawking',
      ],
      image:
        'https://i.guim.co.uk/img/media/b36ce1d3e4122c3d9ea61aae97435427a2be6db7/0_314_3356_2014/master/3356.jpg?width=620&dpr=2&s=none',
      correct: 3,
    },
    {
      id: 4,
      question: 'He is one of the top businessman of the world',
      options: ['Bill Gates', 'Jeff Bezos', 'Elon Musk', 'Bill Gates'],
      image:
        'https://e3.365dm.com/21/07/1600x900/skynews-jeff-bezos-amazon_5437859.jpg?20210705134847',
      correct: 1,
    },
    {
      id: 5,
      question: 'This man won 8 Olympic gold medals?',
      options: [
        'Usain Bolt',
        'Michael Phelps',
        'Nikolai Andrianov',
        'Mark Spitz',
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Usain_Bolt_after_4_%C3%97_100_m_Rio_2016.jpg/330px-Usain_Bolt_after_4_%C3%97_100_m_Rio_2016.jpg',
      correct: 0,
    },
  ],
  pakistaniPolitician: [
    {
      id: 1,

      question: 'The person you see in this image is a former CM of KPK',
      options: [
        'Mahmood Khan',
        'Pervez Khattak',
        'Akram Durrani',
        'Haider Khan Hoti',
      ],
      image:
        'https://i.tribune.com.pk/media/images/2192954-AkramKhanDurrani-1586281214/2192954-AkramKhanDurrani-1586281214.jpg',
      correct: 2,
    },
    {
      id: 2,

      question: 'This picture is of a former CM of Sindh',
      options: [
        'Murad Ali Shah',
        'Qaim Ali Shah',
        'Liaquat Jatoi',
        'Jam Sadiq Ali',
      ],
      image: 'https://i.dawn.com/primary/2021/05/60af12dbe45db.jpg',
      correct: 1,
    },
    {
      id: 3,

      question: 'He is a former speaker of National Assembly',
      options: [
        'Asad Qaisar',
        'Raja Pervez Ashraf',
        'Yousaf Raza Gillani',
        'Illahi Bux Soomro',
      ],
      image: 'https://na.gov.pk/uploads/membershistory/1535615957_821.jpg',
      correct: 0,
    },
  ],
};

const initialScores = [
  { name: 'Cricket', score: 0 },
  { name: 'International', score: 0 },
  { name: 'Pakistani Politician', score: 0 },
];

function App() {
  const [questions, setQuestions] = useState(intialQuestions);
  const [type, setType] = useState('cricket');
  const [answer, setAnswer] = useState(null);
  const [index, setIndex] = useState(0);
  const [showAddNewCategory, setShowNewCategory] = useState(false);
  const [timer, setTimer] = useState(300000);
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [scores, setScores] = useState(initialScores);

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

      {showAddNewCategory || showNewQuestion || (
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
        />
      )}
    </div>
  );
}

export default App;
