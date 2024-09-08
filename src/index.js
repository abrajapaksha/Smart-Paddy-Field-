import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>

  
);

// https://api.thingspeak.com/update?api_key=LNTYOYUVB2K9HIMJ&field1=1&field2=25&field3=67&field4=56&field5=81
