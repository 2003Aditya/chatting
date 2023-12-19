"use client";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSocket } from '../context/SocketProvider';
import { useState } from 'react';

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('')

  return (
    <div>
      <div>
        <h1>All messages will be here...</h1>


      </div>
      <div>
        <TextField onChange = {(e) => setMessage(e.target.value)} id="outlined-basic" label="Message..." variant="outlined" />
        <Button onClick = {(e) => sendMessage(message)}variant="contained">Send</Button>
      </div>
      <div>
        {messages?.map((e) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  )
}