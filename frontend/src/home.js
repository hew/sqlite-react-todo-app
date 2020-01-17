/** @jsx jsx */
import React, {useEffect, useState} from 'react'; // required for fragments
import {jsx, Styled as s} from 'theme-ui';
import {useHistory} from 'react-router';
import {useMachineValue} from './states.js';
import {useLogin} from './hooks';

export default ({navigate}) => {
  const history = useHistory();
  const [, send] = useMachineValue();
  const token = useLogin();

  const handleClick = (_evt) => {

    if(!token.length) { return }

    // Transition to 'loggedIn' global state
    send("LOGIN", {data: token})

    history.push('/todos');
  }

  return (
    <>
      <s.h1>SQLITE TODO APP</s.h1>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '30em'
        }}>
        <input sx={{variant: 'input'}} onChange={() => null} value="user01" />
        <input
          sx={{variant: 'input'}}
          onChange={() => null}
          type="password"
          value="superdupersecure01"
        />
        <button sx={{variant: 'button'}}>
          <s.h2 sx={{variant: 'text.button'}} type="button" onClick={handleClick}>
            Login
          </s.h2>
        </button>
      </div>
    </>
  );
};
