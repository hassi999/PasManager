import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let paswords = localStorage.getItem("passwords");
    if (paswords) {
      setPasswordArray(JSON.parse(paswords));
    }
  }, []);

  const copytext = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, 
      });
    navigator.clipboard.writeText(text);
  };

  const ref = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/eyecross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePasword = () => {
    if (form.site.length >3 && form.username.length >3 && form.password.length >3) {
       
      setForm({ site: "", username: "", password: "" })
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
      console.log(...passwordArray, form);
      toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce, 
    });
  }
  else{
    toast(' Error : Password not saved!');
  }
}
  
  const deletePassword = (id) => {
    let c = confirm("Do u really want to delete the password")
    if (c) {
      setPasswordArray(passwordArray.filter((item)=> item.id!== id))
      localStorage.setItem("passwords", JSON.stringify((passwordArray.filter((item)=> item.id!== id))));
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce, 
        });
    }
    // console.log(...passwordArray, form);
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter((item)=> item.id!== id))
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
{/* Same as */}
<ToastContainer />


      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>
      </div>

      <div className=" px-2 md:p-0 md:mycontainer min-h-[89.3vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>

          <span>Pass</span>
          <span className="text-green-700">OP&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center ">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website url"
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex md:flex-row flex-col w-full justify-between gap-8  ">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full px-4 py-1 "
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[1px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={36}
                  src="/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePasword}
            className="flex justify-center items-center bg-green-600 rounded-full px-8 py-2 w-fit hover:bg-green-500 text-white border"
          >
          <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    colors="primary:#121331,secondary:#121331"
    style={{ width: "23px", height: "23px", }}  // No semicolon in styles
  >
  </lord-icon>

            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-3">Site</th>
                  <th className="py-3">Username</th>
                  <th className="py-3">Password</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>  
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" border-white text-center">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copytext(item.site)}
                          >
                            <img
                              className="w-10 cursor-pointer pt-2 pl-4 "
                              src="/copy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <td className="  border-white py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copytext(item.username)}
                          >
                            <img
                              className="w-10 cursor-pointer pt-2 pl-4 "
                              src="/copy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" border-white py-2 text-center w-32">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copytext(item.password)}
                          >
                            <img
                              className="w-10 cursor-pointer pt-2 pl-4 "
                              src="/copy.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" border-white py-2 text-center w-32">
            
                      <span className="cursor-pointer mx-2" onClick={()=> editPassword(item.id)}> 
  <lord-icon 
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    colors="primary:#121331,secondary:#121331"
    style={{ width: "25px", height: "25px" }}  // No semicolon in styles
  >
  </lord-icon>
</span>
                      <span className="cursor-pointer" onClick={()=> deletePassword(item.id)}>
  <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    colors="primary:#121331,secondary:#121331"
    style={{ width: "25px", height: "25px"  }}  // No semicolon in styles
  >
  </lord-icon>
</span>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
