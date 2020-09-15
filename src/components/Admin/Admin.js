import React, { useState } from 'react';
import './Admin.css';
import { useHistory } from 'react-router-dom';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

function Admin() {
  const history = useHistory();
  const [id, setId] = useState('kimhwan');
  const [password, setPassword] = useState('1234');

  const onSubmit = e => {
    e.preventDefault();
    if (id === 'kimhwan' && password === '1234') {
      history.push('/admin/upload');
    } else {
      history.push('/');
    }
  };

  return (
    <div className='admin'>
      <h1 className='admin__title'>Admin Page</h1>
      <form onSubmit={onSubmit} className='admin__conainer'>
        <Input
          type='text'
          placeholder='id'
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type='submit'>Log in </Button>
      </form>
    </div>
  );
}

export default Admin;
