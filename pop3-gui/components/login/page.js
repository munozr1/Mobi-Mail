
export default function Login({setGlobal}) {
  const authenticate = async () => {
    const body = JSON.stringify({
      email: document.getElementById("emailInput").value,
      password: document.getElementById("passwordInput").value,
    });
    // console.log(body);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow"
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, requestOptions)
      .catch((error) => console.error(error));

    if (!response.ok) {
      // Handle error if the fetch request was not successful (e.g., status code outside 200-299 range)
      throw new Error('Fetch request failed');
    }

    const res = await response.text(); // Extract the response body as text

    try {
      const userId = JSON.parse(res).userId;
      if (userId) setGlobal({...JSON.parse(res)});
      console.log(global);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }


  }

  return (
  <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div className="relative px-3 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input id="emailInput" autoComplete="off"  name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                <label  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              </div>
              <div className="relative">
                <input id="passwordInput" autoComplete="off" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                <label  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div className="relative">
                <a className="bg-cyan-500 text-white rounded-md px-4 py-2 hover:cursor-pointer" onClick={authenticate}>Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
};
