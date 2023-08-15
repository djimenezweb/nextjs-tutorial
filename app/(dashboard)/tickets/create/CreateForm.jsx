'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority
    };

    const response = await fetch('http://localhost:3000/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket)
    });

    const json = await response.json();

    if (json.error) {
      setIsLoading(false);
      console.log(error.message);
    }

    if (json.data) {
      setIsLoading(false);
      router.refresh();
      router.push('/tickets');
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <label htmlFor="title">
        <span>Title:</span>
      </label>
      <input required type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} value={title} />

      <label htmlFor="body">
        <span>Body:</span>
      </label>
      <textarea required name="body" id="body" onChange={e => setBody(e.target.value)} value={body} />

      <label htmlFor="priority">
        <span>Priority:</span>
      </label>
      <select name="priority" id="priority" onChange={e => setPriority(e.target.value)} value={priority}>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button className="btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? <span>Adding...</span> : <span>Add Ticket</span>}
      </button>
    </form>
  );
};
export default CreateForm;
