import React from 'react';
import '../assets/styles/App.scss';
import mug from '../assets/static/mug.png';

const App = () => {
  const message = 'HELLO World EDIT';
  const user = 'ss';
  return (
    <>
      <h1>
        {message} I m Benturi App {user}
      </h1>
      <img src={mug} alt="" />
      <h2>sadasdsdsadsad asd asd d d</h2>
      <p>jajajja</p>
    </>
  );
};

export default App;
