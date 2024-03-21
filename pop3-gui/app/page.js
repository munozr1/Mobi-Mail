import EmailList from "@/components/email-list/page";
import EmailView from "@/components/email-view/page";
import NavBar from "@/components/navbar/page";
import NewEmail from "@/components/new-email/page";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
    <NavBar/>
    <div className="flex">
      <div className="min-w-80">
        <EmailList/>
      </div>
      <div className="m-2">
        <EmailView/>
        <NewEmail/>
      </div>
    </div>
    </main>
  );
}
