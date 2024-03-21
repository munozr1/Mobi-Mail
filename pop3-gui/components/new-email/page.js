
export default function NewEmail() {

  return (
    <div className="border border-green-500 rounded-md mt-8 p-2 flex flex-col">
    <div className="flex justify-center items-center">
      <p className="text-gray-900 justify-center mr-2 text-gray-400">To:</p>
      <input type="text" className="w-full  outline-none  placeholder:text-gray-400 "/>
    </div>
    <div className="flex justify-center items-center mt-1">
      <p className="text-gray-900 justify-center mr-2 text-gray-400">Cc:</p>
      <input type="text" className="w-full  outline-none  placeholder:text-gray-400 "/>
    </div>
    <input type="text" className="w-full  outline-none placeholder:text-gray-400 border-b mt-4 mb-2" placeholder="Add a subject"/>
    <textarea rows="2" name="description" id="description" className="outline-none block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Email content ... "></textarea>

    <div className="">
      <a className="hover:cursor-pointer ">
        <span className="float-right">
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        </span>
      </a>
    </div>
    </div>
  );

}
