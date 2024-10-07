import React from 'react';
import Home from './src/components/home';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
