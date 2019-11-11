import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
  componentDidMount = () => {
    store.dispatch(loadUser());
  };

  render = () => (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
