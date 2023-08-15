import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export const POST = async req => {
  const ticket = await req.json();

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get the current user session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // insert the data
  const { data, error } = await supabase
    .from('Tickets')
    .insert({ ...ticket, user_email: session.user.email })
    .select()
    .single();

  return NextResponse.json({ data, error });
};

/* export const GET = async () => {
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
}; */
