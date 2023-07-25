// App.tsx
import React from 'react';
import Routes from './src/routes';

// import './App.css';
// import Video from './components/Video';
import ShoppingWindow from './src/components/ShoppingWindow';  

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__videos">
        
        <ShoppingWindow />  
      </div>
    </div>
  );
}

export default App;

