
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TODO_LIST from './components/Todo_List/Todo_List';


function App() {
  const [toggleTheme, setToggleTheme] = useState(false);

  useEffect(() => {
    const app = document.querySelector('.App');
    const app_background = document.querySelector('.App__background');

    if(toggleTheme) {
      app.classList.add('dark-app');
      app_background.classList.add('dark-background');
    }
    else{
      app.classList.remove('dark-app');
      app_background.classList.remove('dark-background');
    }
  }, [toggleTheme]);

  

  return (
    <div className="App">
      <div className='App__background'></div>
      <div className='App__header'>
        <div className='App__header__left'>Todo</div>
        <div className='App__header__right'><button onClick={() => setToggleTheme(!toggleTheme)}>Click</button></div>
      </div>
      <TODO_LIST />
    </div>
  );
}

export default App;
