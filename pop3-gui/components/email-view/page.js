
export default function EmailView({email}) {

  if(email != null){
  return (
    <div className="shadow-md w-[80vw] h-[100vh] flex-col">
      <div id="title" className="w-full  mb-2 border-b p-3">
        <h1 className="text-lg mt-1" >{email.subject}</h1>
        <p className="text-sm"><span className="text-gray-500">From:</span> {email.from}</p>
      </div>
      <div className="text-sm p-3" dangerouslySetInnerHTML={email.body}></div>
    </div>
  );
  }
  else {
    return (
      <div className="justify-center w-[80vw] h-[100vh] flex items-center">
          <h1 className="text-lg mt-1 text-gray-500 " >No email selected</h1>
      </div>
    );
  }
}
