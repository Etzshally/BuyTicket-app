import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TicketList from './components/TicketList';
import TicketCreate from './components/TicketCreate';
import TicketPayment from './components/TicketPayment';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/tickets" component={TicketList} />
          <Route exact path="/tickets/create" component={TicketCreate} />
          <Route exact path="/tickets/:id/payment" component={TicketPayment} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
