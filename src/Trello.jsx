import React, { useState } from 'react';

const cards = [
  {
    'description' : 'Thing to do',
    'category' : 'todo'
  },
  {
    'description' : 'take a huge dump',
    'category' : 'todo'
  },
  {
    'description' : 'Find remorse',
    'category' : 'todo'
  },
  {
    'description' : 'take a huge dump',
    'category' : 'in progress'
  },
  {
    'description' : 'take a huge dump',
    'category' : 'completed'
  },
]

const Card = ({description, handleMoving, ind}) => {
  
  return (<>
    <div className='card container'>
      <li className='card-body d-flex'>
        <div className="flex-grow-1">{description}</div>
        <div className="">
        <button className="btn btn-outline-secondary" onClick={e => handleMoving(true, ind)}><i class="bi bi-arrow-up-circle-fill"></i></button>
        <button className="btn btn-outline-secondary" onClick={e => handleMoving(false, ind)}><i class="bi bi-arrow-down-circle-fill"></i></button>
    </div>
      </li>
    </div>
  </>);
}

const NewCard = ({handleOnSubmit}) => {
  const [text, setText] = useState('');

  return (
    <div className='card'>
      <form className='card-body'
        onSubmit={e => {
          e.preventDefault();
          handleOnSubmit(text);
          setText('');
        }
      }>
    <div className="input-group">
        <input className="form-control" onChange={e => setText(e.target.value)} value={text} />
        <button className="btn btn-primary" type="submit">Add</button>
    </div>
      </form>
    </div>
  );
}

const Column = ({name, cards, category}) => {
  const [colCards, setColCards] = useState(cards);
  const handleMoving = (up, cardIndex) => {
    if (colCards === 1) {
      return;
    }

    if (up) {
      if (cardIndex === 0) {
        return;
      }
      const beginning = colCards.slice(0, cardIndex-1);
      beginning.push(colCards[cardIndex]);
      beginning.push(colCards[cardIndex-1]);
      setColCards(beginning.concat(colCards.slice(cardIndex+1, colCards.length)));
    } else {
      if (cardIndex === colCards.length-1) {
        return;
      }
      const beginning = colCards.slice(0, cardIndex);
      beginning.push(colCards[cardIndex+1]);
      beginning.push(colCards[cardIndex]);
      setColCards(beginning.concat(colCards.slice(cardIndex+2, colCards.length)));
    }
  }

  const handleOnSubmit = (description) => {
    setColCards([...colCards, { 'description' : description, 'category' : category }]);
  }

  return (<div className='col m-2'>
    <span className='fw-bold fs-3 m-4'>{name}</span>
    <ul className="ps-0" style={{listStyle: "none"}}>
      {colCards.map((card, ind) => <Card key={ind} handleMoving={handleMoving} ind={ind} description={card.description} />)}
    </ul>
    <NewCard handleOnSubmit={handleOnSubmit} />
  </div>);
}

const Trello = () => {
  const tempTodo = cards.filter(item => item.category === 'todo')
  const tempProgress = cards.filter(item => item.category === 'in progress')
  const tempCompleted = cards.filter(item => item.category === 'completed')

  const [todoCards, setTodoCards] = useState(tempTodo);
  const [progressCards, setProgressCards] = useState(tempProgress);
  const [completedCards, setCompletedCards] = useState(tempCompleted);

  return (<>
    <div className='row'>
      <Column name='Todo' cards={todoCards} category='todo' />
      <Column name='In Progress' cards={progressCards} category='in progress' />
      <Column name='Completed' cards={completedCards} category='completed' />
    </div>
    </>
  );
}

export default Trello;

