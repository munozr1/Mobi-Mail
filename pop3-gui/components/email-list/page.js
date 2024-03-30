
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

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default function EmailList({action, emails, search}) {

  const debouncedHandlePause = debounce(() => {
    search();
  }, 2500); // Example: 500ms delay

  const handleInputChange = (e) => {
    debouncedHandlePause();
  };;


  return (
    <div className="mt-5 ml-1">
    <div className="relative mb-2">
      <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <input
        id="search"
        name="search"
        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search"
        type="search"
        onChange={handleInputChange}
      />
    </div>
    { emails ? <ul className="border">
      {
        emails.map(email => (
          <li key={email.email_id} onClick={() => action(email)} className="flex items-center border-b-2 justify-between scale-100 hover:scale-105 ml-2 mr-2 hover:cursor-pointer">
            <div className="ml-1 flex-col">
            <h1 className="text-md mt-1">{email.subject ? email.subject: <p className="text-gray-500">No subject</p>}</h1>
            <p className="text-sm">{truncate(email.body.__html)}</p>
            </div>
            <div className="text-xs text-gray-500 mr-1">{formatDate(email.timestamp)}</div>
          </li>
        ))
      }
    </ul>
    : <p className="text-center">No emails found</p> }
    </div>
  );
  }
