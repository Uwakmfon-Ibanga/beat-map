import React, { useEffect } from 'react'
import LogOutButton from '../components/LogOutButton';

const Questions = ({top10Artists, sortedList}) => {

    if (!top10Artists || top10Artists.length === 0) {
        return <div>Loading...</div>;
    }

    const questionsAndAnswers = [
        {
            question: "Which artist do you think appears most frequently in your saved tracks?",
            answer: top10Artists[0],
            options: [...top10Artists.filter((artist => artist !== top10Artists[0])).slice(0,2), top10Artists[0]]
        },
        {
            question: "Which artist do you think appears 5th most frequently in your saved tracks?",
            answer: top10Artists[4],
            options: [...top10Artists.filter((artist => artist !== top10Artists[4])).slice(0,2), top10Artists[4]]
        },
        {
            question: "Which artist do you think appears 4th most frequently in your saved tracks?",
            answer: top10Artists[3],
            options: [...top10Artists.filter((artist => artist !== top10Artists[3])).slice(0,2), top10Artists[3]]
        },
        {
            question: "Which artist do you think appears 3rd most frequently in your saved tracks?",
            answer: top10Artists[2],
            options: [...top10Artists.filter((artist => artist !== top10Artists[2])).slice(0,2), top10Artists[2]]
        },
        {
            question: "Which artist do you think 2nd appears most frequently in your saved tracks?",
            answer: top10Artists[1],
           options: [...top10Artists.filter((artist => artist !== top10Artists[1])).slice(0,2), top10Artists[1]]
        },
    ]

    useEffect(() => {
        console.log('Top 10 Artists:', top10Artists);
        console.log(questionsAndAnswers);
        
    }, [top10Artists])

    
    
  return (
    
    <div className='w-full h-screen bg-[#191414] flex flex-col'>
        <LogOutButton/>
      <div className="bg-[#1DB954] w-[300px] h-[50px] m-auto"></div>
      <div className="w-[300px] bg-amber-300">
        {/* loops through all questions */}
        {questionsAndAnswers.map((item) => {
            // loops through options and randomizes them
            randomOptions = item.options.map((option) => option.name).sort(() => Math.random() - 0.5)
        }
        )}
      </div>
    </div>
  )
}

export default Questions
