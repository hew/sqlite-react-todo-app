import {Machine, assign} from 'xstate';
import {createContext, useContext} from 'react';
import axios from 'axios';

async function fetch(token) {

  const response = await axios({
    method: 'get',
    url: 'http://localhost:1233/private/all',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.todos;
}

const fetchingStates = {
  initial: 'initial',
  states: {
    initial: {},
    display: {},
    fetching: {
      invoke: {
        src: (context, event) => fetch(context.token),
        onDone: {
          actions: assign({
            todos: (_, event) => {
              console.log('event', event);
              return event.data;
            }
          })
        },
        onError: {
          target: 'display',
          actions: assign({
            error: (_) => {
              debugger;
              return true;
            }
          })
        }
      },
    }
  }
};

export default Machine({
  initial: 'loggedOut',
  context: {
    token: '',
    todos: [],
    error: null
  },
  states: {
    loggedOut: {
      on: {TRY_AUTH: {target: 'authCheck', actions: []}},
      on: {
        LOGIN: {
          target: 'loggedIn',
          actions: assign({
            token: (context, event) => {
              return event.data;
            }
          })
        }
      }
    },
    loggedIn: {
      on: {
        LOGOUT: {target: 'loggedOut'}
      },
      ...fetchingStates
    }
  },
  on: {
    FETCH: {target: 'loggedIn.fetching'},
    DISPLAY: {target: 'loggedIn.display'},
    CLEAR: {target: 'loggedIn'}
  }
});

export const MachineContext = createContext();
export const useMachineValue = () => useContext(MachineContext);

