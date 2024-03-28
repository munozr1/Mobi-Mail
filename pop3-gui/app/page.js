"use client";
import EmailList from "@/components/email-list/page";
import EmailView from "@/components/email-view/page";
import Login from "@/components/login/page";
import NavBar from "@/components/navbar/page";
import NewEmail from "@/components/new-email/page";
import Tooltip from "@/components/tooltip/page";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [global, setGlobal] = useState({});
  const [newEmail, ToggleNewEmailUi] = useState(false);
  const [side_email_view, update_side_email_view] = useState(null);
  const [tab, setTab] = useState("inbox");

  const openNewEmailUi = () => {
    ToggleNewEmailUi(true);
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && newEmail) {
        ToggleNewEmailUi(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [newEmail]);

if(global.userId)
  return (
    <main className=" overflow-hidden">
      <NavBar>
        <Tooltip message="Inbox" action={() => setTab("inbox")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
            />
          </svg>
        </Tooltip>
        <Tooltip message="New" action={openNewEmailUi}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Tooltip>
        <Tooltip message="Sent" action={() => setTab("sent")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </Tooltip>

        <Tooltip message="Delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Tooltip>
      </NavBar>
      <div className="flex">
        <div className="min-w-80">
          <EmailList action={update_side_email_view} tab={tab}/>
        </div>
        <div className="m-2">
          <EmailView email={side_email_view} />
        </div>
        {newEmail ? (
          <div className="mt- backdrop-blur-xs fixed flex h-full w-full justify-center rounded-md bg-gray-800 bg-opacity-20 ">
            <div className="mt-16 h-2/6 w-1/2">
              <NewEmail />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );

  return (
  <main className=" overflow-hidden">
    <Login />
  </main>
  );
}
