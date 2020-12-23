import React from 'react';
// import './App.css';
import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import store from './store'
import Result from './components/Result';


// import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/custom.scss'
import MealSelection from './components/MealSelection';
import SwimLine from './components/SwimLine';

function App() {
  return (
    <Provider store={store}>
      <Container fluid="md">
        <Row>
          <Col lg>
            <h1>Roast Dinner Planner</h1>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <MealSelection />
          </Col>
          <Col sm>
            <Result />
          </Col>
        </Row>
        <Row>
          <Col lg>
            <SwimLine />
          </Col>
        </Row>
      </Container>

    </Provider>
  );
}

export default App;
