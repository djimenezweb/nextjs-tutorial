import { notFound } from 'next/navigation';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const response = await fetch('http://localhost:4000/tickets');
  const tickets = await response.json();
  return tickets.map(ticket => ({
    id: ticket.id
  }));
};

const getTicketById = async id => {
  const response = await fetch(`http://localhost:4000/tickets/${id}`, { next: { revalidate: 60 } });
  if (!response.ok) {
    notFound();
  }
  return response.json();
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
