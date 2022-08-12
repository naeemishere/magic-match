import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
const cardImages = [
 {"src": "/img/helmet-1.png", matched: false},
 {"src": "/img/potion-1.png", matched: false},
 {"src": "/img/ring-1.png", matched: false},
 {"src": "/img/scroll-1.png", matched: false},
 {"src": "/img/shield-1.png", matched: false},
 {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // Handle a choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // Compare two selected cards
    useEffect(() => {
      if (choiceOne && choiceTwo) {
      setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
           return prevCards.map(card => {
             if (card.src === choiceOne.src) {
              return { ...card, matched: true}
             } else {
               return card 
             }
            })
          })
          console.log("Both cards matched")
           
          resetChoices()
        } else {
          console.log("Cards don't match")
          setTimeout(() => resetChoices(), 1000 )
      }
     } 
    }, [choiceOne, choiceTwo]) 

    console.log(cards)


    // Reset Choices & Increase turn
    const resetChoices = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(preTurns => preTurns + 1)
      setDisabled(false)
    }


    //Start a new game automatically
    useEffect(() =>  {
     shuffleCards()
    }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card  === choiceOne || card  === choiceTwo || card.matched}
        disabled={disabled}
      />
      ))}
      </div>

      <h3>Turns:{turns}</h3>
    </div>
  );
}

export default App;
