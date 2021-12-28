
import { useEffect, useState } from 'react';
import './App.css';
import TODO_LIST from './components/Todo_List/Todo_List';
import moon from './assets/icon-moon.svg';
import sun from './assets/icon-sun.svg';


function App() {
  const [toggleTheme, setToggleTheme] = useState(false);

  useEffect(() => {
    const app = document.querySelector('.App');
    const app_background = document.querySelector('.App__background');
    const tb = document.getElementById('theme-btn');

    if(toggleTheme) {
      app.classList.add('dark-app');
      app_background.classList.add('dark-background');
      tb.src = moon;
    }
    else{
      app.classList.remove('dark-app');
      app_background.classList.remove('dark-background');
      tb.src = sun;
    }
  }, [toggleTheme]);

  function TOGGLE_THEME() {
    setToggleTheme(!toggleTheme);
  }

  return (
    <div className="App">
      <div className='App__background'></div>

      <div className='App__header'>
        <div className='App__header__left'>Todo</div>
        
        <div className='App__header__right'>
          <button className='App__header__right__theme-btn' onClick={TOGGLE_THEME}>
            <img id='theme-btn' src={sun} alt='Theme Toggle' />
          </button>
        </div>
      </div>
      
      <TODO_LIST toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
