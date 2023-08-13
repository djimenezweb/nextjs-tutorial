import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const response = await fetch('http://localhost:4000/tickets');
  const tickets = await response.json();

  return NextResponse.json(tickets, { status: 200 });
};

export const POST = async req => {
  const ticket = await req.json();
  const response = await fetch('http://localhost:4000/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });
  const newTicket = await response.json();
  return NextResponse.json(newTicket, { status: 201 });
};
