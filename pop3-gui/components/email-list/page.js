let emails = [
  {
    id: 1,
    from: 'person 2',
    subject: 'Test email',
    body: 'This is a test email',
    date: '2021-10-10T12:00:00Z'
  },
  {
    id: 2,
    from: 'person 4',
    subject: 'Test email 2',
    body: 'This is a test email 2',
    date: '2024-03-20T13:05:10.362Z'
  },
]

function formatDate(dateString) {
  const emailDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = emailDate.toDateString() === today.toDateString();
  const isYesterday = emailDate.toDateString() === yesterday.toDateString();
  const isThisWeek = emailDate > new Date(today.setDate(today.getDate() - today.getDay())) && emailDate < today;

  if (isToday) {
    return emailDate.toLocaleTimeString();
  } else if (isYesterday) {
    return 'yesterday';
  } else if (isThisWeek) {
    return emailDate.toLocaleString('default', { weekday: 'long' });
  } else {
    return emailDate.toLocaleDateString();
  }
}

export default function EmailList() {

  return (
    <ul className="border">
      {
        emails.map(email => (
          <li key={email.id} className="flex items-center border-b-2 justify-between ">
            <div className="ml-1 flex-col">
            <h1 className="text-lg mt-1">{email.subject}</h1>
            <p className="text-sm">{email.body}</p>
            </div>
            <div className="text-xs text-gray-500 mr-1">{formatDate(email.date)}</div>
          </li>
        ))
      }
    </ul>
  );

}
