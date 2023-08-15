import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export const dynamicParams = true;

const getTicketById = async id => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from('Tickets').select().eq('id', id).single();
  if (!data) {
    notFound();
  }
  return data;
};

export const generateMetadata = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase.from('Tickets').select().eq('id', params.id).single();
  return {
    title: `Helpdesk | ${ticket?.title || 'Ticket not found'}`
  };
};

const TicketDetails = async ({ params }) => {
  const ticket = await getTicketById(params.id);

  return (
    <>
      <main>
        <nav>
          <h2>Ticket Details</h2>
        </nav>
        <div className="card">
          <h3>{ticket.title}</h3>
          <small>Created by {ticket.user_email}</small>
          <p>{ticket.body}</p>
          <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
        </div>
      </main>
    </>
  );
};

export default TicketDetails;
