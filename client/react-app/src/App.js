import React, { useState, useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Index from './jsx';

import { Ripple } from 'react-preloaders';
import { Provider } from 'react-redux'
import store from './redux/store'
import Loader from './jsx/element/loader';
import ErrorPopup from './jsx/element/error-popup';


function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.addEventListener('load', () => setLoading(false))
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <Index />
        <Loader />
        <ErrorPopup />
        <Ripple customLoading={ loading } time={0} color={'#4d36a1'} />
      </div>
    </Provider>
  );
}

export default App;
