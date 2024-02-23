import React from 'react'


const EngeeniersSubCard = () => {
  const [cards, setCards] = useState([]);

  
  const addCard = () => {
    const newCard = { id: cards.length + 1, content: `Card ${cards.length + 1}` };
    setCards([...cards, newCard]);
  };
 
  return (
  <>
  <div className='EngeeniersSubCard'>
    <div className='cards'></div>
    <div className='cards'></div>
    <div className='cards'></div>
    <div className='cards'></div>
  </div>
  </>
  )
}

export default EngeeniersSubCard