'use client';

import { useState } from 'react';

const AuthForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form onSubmit={e => handleSubmit(e, email, password)}>
        <label htmlFor="email">
          <span>Email:</span>
          <input type="text" name="email" id="email" required onChange={e => setEmail(e.target.value)} value={email} />
        </label>

        <label htmlFor="password">
          <span>Password:</span>
          <input type="password" name="password" id="password" required onChange={e => setPassword(e.target.value)} value={password} />
        </label>

        <button className="btn-primary">Submit</button>
      </form>
    </>
  );
};
export default AuthForm;
