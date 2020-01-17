/** @jsx jsx */
import 'babel-polyfill';
import {config} from 'dotenv';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {jsx, Layout, Header, Main, Footer, Styled as s} from 'theme-ui';
import {Box, Text} from '@theme-ui/components';
import {useMachine} from '@xstate/react';
import {BrowserRouter as Router, Link, Switch, Redirect, Route} from 'react-router-dom';
import ThemeProvider from './theme';
import Home from './home';
import Todos from './todos';
import AppMachine, {MachineContext, useMachineValue} from './states.js';

// Configure environment vars
config();

const Navigation = () => (
  <nav sx={{variant: 'layout.nav'}}>
    <s.ol>
      <s.li>
        <Box px={2}>
          <Text variant="link">
            <Link to="/">Home</Link>
          </Text>
        </Box>
      </s.li>
      <s.li>
        <Box px={2}>
          <Text variant="link">
            <Link to="/todos">Todos</Link>
          </Text>
        </Box>
      </s.li>
    </s.ol>
  </nav>
);

const PrivateRoute = ({children, path, authState}) => (
  <Route path={path}>{authState ? children : <Redirect to="/" />}</Route>
);

const Routes = ({isAuthenticated = false}) => {
  const [current, send] = useMachineValue();
  
  return (
    <Switch>
      <PrivateRoute authState={current.value.loggedIn} path="/todos">
        <Todos navigate={(route) => history.push(route)} />
      </PrivateRoute>
      <Route path="/">
        <Home navigate={(route) => history.push(route)} />
      </Route>
    </Switch>
  );
};

function App() {
  const [current, send] = useMachine(AppMachine);

  return (
    <MachineContext.Provider value={[current, send]}>
      <ThemeProvider>
        <Layout>
          <Router>
            <Header>
              <Navigation />
            </Header>
            <Main>
              <Routes />
            </Main>
            <Footer>
              <s.a sx={{px: 4}} href="https://github.com/hew/sqlite-react-todo-app">
                Source
              </s.a>
            </Footer>
          </Router>
        </Layout>
      </ThemeProvider>
    </MachineContext.Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
