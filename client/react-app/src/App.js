import React, { useState, useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Index from './jsx';
import Aos from 'aos'
import 'aos/dist/aos.css'

import { Ripple } from 'react-preloaders';
import { Provider } from 'react-redux'
import store from './redux/store'
import Loader from './jsx/element/loader';
import ErrorPopup from './jsx/element/error-popup';
import Stripe from './jsx/HOC/Stripe';


function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => setLoading(false))
  }, [])

  useEffect(() => {
    Aos.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100
    })
  }, [])

  return (
    <Provider store={store}>
      <Stripe>
        <div className="App">
          <Index />
          <Loader />
          <ErrorPopup />
          <Ripple time={1000} color={'#4d36a1'} />
          {/* <Ripple customLoading={ loading } time={0} color={'#4d36a1'} /> */}
        </div>
      </Stripe>
    </Provider>
  );
}

export default App;
