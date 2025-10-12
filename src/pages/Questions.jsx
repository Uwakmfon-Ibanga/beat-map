import React, { use, useEffect, useState } from "react";
import LogOutButton from "../components/LogOutButton";

const Questions = ({ top10Artists, sortedList }) => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] =useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [randomizedQuestions, setRandomizedQuestions] = useState([])


  const questionsAndAnswers = [
    {
      question:
        "Which artist do you think appears most frequently in your saved tracks?",
      answer: top10Artists[0],
      options: [
        ...top10Artists
          .filter((artist) => artist !== top10Artists[0])
          .slice(0, 3),
        top10Artists[0],
      ],
    },
    {
      question:
        "Which artist do you think appears 5th most frequently in your saved tracks?",
      answer: top10Artists[4],
      options: [
        ...top10Artists
          .filter((artist) => artist !== top10Artists[4])
          .slice(0, 3),
        top10Artists[4],
      ],
    },
    {
      question:
        "Which artist do you think appears 4th most frequently in your saved tracks?",
      answer: top10Artists[3],
      options: [
        ...top10Artists
          .filter((artist) => artist !== top10Artists[3])
          .slice(0, 3),
        top10Artists[3],
      ],
    },
    {
      question:
        "Which artist do you think appears 3rd most frequently in your saved tracks?",
      answer: top10Artists[2],
      options: [
        ...top10Artists
          .filter((artist) => artist !== top10Artists[2])
          .slice(0, 3),
        top10Artists[2],
      ],
    },
    {
      question:
        "Which artist do you think 2nd appears most frequently in your saved tracks?",
      answer: top10Artists[1],
      options: [
        ...top10Artists
          .filter((artist) => artist !== top10Artists[1])
          .slice(0, 3),
        top10Artists[1],
      ],
    },
  ];

  useEffect(() => {}, [top10Artists]);

 // Create a new array with shuffled options
 
useEffect(()=>{
    let randomizedQuestions = questionsAndAnswers.map((item) => {
  const randomOptions = item.options
    .map((option) => option.name)
    .sort(() => Math.random() - 0.5);

  return {
    question: item.question,
    answer: item.answer.name,
    options: randomOptions,
  };
});
    setRandomizedQuestions(randomizedQuestions);
}, [top10Artists])



let question = randomizedQuestions[currentQuestion];


  function handleOptionClick(e) {
    const option = e.target.textContent;
    setSelectedOption(option);
    
    if (option === question.answer) {
        setIsCorrect(true);
        setScore(score + 1);
        console.log('correct');
        
        
    } else {
        setIsCorrect(false);
        console.log('wrong');
        
    }
  }

  function handleNextQuestion() {
    if(currentQuestion < questionsAndAnswers.length - 1){
      question = randomizedQuestions[currentQuestion + 1];
    setCurrentQuestion(prev => prev + 1)
    setIsCorrect(null);
  setSelectedOption(null);
    } else {
      alert(`Game over! Your final score is ${score} out of ${questionsAndAnswers.length}`);
      // reset the game
      setCurrentQuestion(0);
      setScore(0);
      setIsCorrect(null);
      setSelectedOption(null);
    }
  }



  return (
    <div className="w-full h-screen bg-[#191414] flex flex-col text-white">
      <LogOutButton />
      <div className="flex items-center justify-center text-2xl">{score}</div>
      
    { !selectedOption && question ? (
        // container for question and options
        <div className="w-[300px] m-auto flex flex-col gap-5">
            <div className="bg-[#1DB954] text-center rounded p-1">{question.question}</div>
            {/* container for the options */}
            <div className="grid grid-cols-1 justify-items-center gap-3">
                {question.options.map((option, index) => (
                    <div className="bg-[#1DB954] w-[150px] p-1 text-center rounded" key={index} onClick={handleOptionClick}>{option}</div>
                ))}
            </div>
        </div>
    ) : null }

    {selectedOption ? (
  <div className="w-[300px] m-auto flex flex-col items-center gap-5 text-center">
    <p className="text-center mt-2">
    {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
  </p>
  <button className="bg-[#1DB954] w-[120px] p-1 rounded" onClick={handleNextQuestion}>Next Question</button>
  </div>
) : null}
       
      </div>
  );
};

export default Questions;
