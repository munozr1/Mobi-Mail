
import { useState, useEffect} from "react";

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


function truncate(string) {
  const words = string.split(' ');
  if (words.length > 6) {
    return words.slice(0, 6).join(' ') + '...';
  }
  return string;
}

export default function EmailList({action, userId, emails}) {

  return (
    <ul className="border">
      {
        emails.map(email => (
          <li key={email.id} onClick={() => action(email)} className="flex items-center border-b-2 justify-between scale-100 hover:scale-105 ml-2 mr-2 hover:cursor-pointer">
            <div className="ml-1 flex-col">
            <h1 className="text-md mt-1">{email.subject ? email.subject: <p className="text-gray-500">No subject</p>}</h1>
            <p className="text-sm">{truncate(email.body.__html)}</p>
            </div>
            <div className="text-xs text-gray-500 mr-1">{formatDate(email.timestamp)}</div>
          </li>
        ))
      }
    </ul>
  );
  }
