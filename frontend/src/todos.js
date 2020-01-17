/** @jsx jsx */
import axios from 'axios';
import React, {useEffect, useState} from 'react'; // required for fragments
import {jsx, Styled as s, Container} from 'theme-ui';
import {useMachineValue} from './states';
import {useFilterList} from './hooks';
import {formatDate} from './utils';
import Card from './card';

export default () => {
  const [{context, value}, send] = useMachineValue();
  const {token} = context;
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('today');
  const [list, setList, {filterByEnum, filterByToday, resetList}] = useFilterList([]);

  useEffect(() => {
    send('FETCH');
  }, []);

  useEffect(() => {
    setList(context.todos);
  }, [context]);

  // CREATE
  const handleSubmit = async (event) => {
    if (event.key !== 'Enter') return;

    console.log('dataValue', dateValue);

    const dateIndex = formatDate(dateValue);

    debugger

    await axios({
      method: 'post',
      url: 'http://localhost:1233/private/create',
      data: {
        description: inputValue,
        state: 'TODO',
        dueDate: new Date(dateIndex[0], dateIndex[1], dateIndex[2])
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => console.log(err));

    send('FETCH');
  };

  // UPDATE 
  const updateItem = async (item) => {
    await axios({
      method: 'post',
      url: 'http://localhost:1233/private/update',
      data: {
        ...item
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    send('FETCH');
  };

  // DELETE
  const deleteItem = async (id) => {
    await axios({
      method: 'post',
      url: 'http://localhost:1233/private/delete',
      data: {
        id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => {
      console.log(err);
    });

    send('FETCH');
  };

  return (
    <section sx={{variant: 'section'}}>
      <s.h1>What needs to be done?</s.h1>
      <div sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
        <input
          sx={{variant: 'input'}}
          value={inputValue}
          placeholder=""
          onChange={(evt) => setInputValue(evt.target.value)}
          onKeyPress={handleSubmit}
        />
        <select value={dateValue} onChange={evt => setDateValue(evt.target.value)} sx={{variant: 'select'}}>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="next-week">Next Week</option>
        </select>
      </div>
      {list.length ? (
        list.map((todo) => (
          <Card
            id={todo.id}
            key={todo.id}
            description={todo.description}
            state={todo.state}
            dueDate={todo.dueDate}
            edit={updateItem}
            del={deleteItem}
          />
        ))
      ) : (
        <s.h2 sx={{textAlign: 'center'}}>No todos to display.</s.h2>
      )}
      <div sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <s.p
          sx={{variant: 'underline'}}
          onClick={(_evt) => {
            filterByToday(context.todos);
          }}>
          today
        </s.p>
        <s.p
          sx={{variant: 'underline'}}
          onClick={(_evt) => {
            filterByEnum('DONE', context.todos);
          }}>

          completed
        </s.p>
        <s.p sx={{variant: 'underline'}} onClick={(_evt) => resetList(context.todos)}>
          show all
        </s.p>
      </div>
    </section>
  );
};
