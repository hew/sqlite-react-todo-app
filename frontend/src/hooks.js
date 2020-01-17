import {useState, useEffect} from 'react';
import axios from 'axios';

export const useLogin = () => {
  const [query] = useState({email: 'user01', password: 'superdupersecure01'});
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetch() {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:1233/public/login',
        data: {
          email: query.email,
          password: query.password
        }
      }).catch((err) => console.log(err));

      if (result && result.data) {
        const {token} = result.data;

        setToken(token);
      }
    }

    fetch();
  }, []);

  return token;
};

export const useFilterList = (todoList) => {
  const [list, setList] = useState(todoList);

  const filterByEnum = (enum_, l) => {
    setList(l.filter((item) => item.state === enum_));
  };

  const filterByToday = (l) =>
    setList(
      l.filter((item) => {
        const itemDate = new Date(item.dueDate);
        const currentDate = new Date();

        console.log(item.dueDate);
        const comparison = itemDate.getDay() - currentDate.getDay() === 0;

        return comparison;
      })
    );

  const resetList = (l) => setList(l);

  return [list, setList, {filterByToday, filterByEnum, resetList}];
};
