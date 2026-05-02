import { Form, Link } from "react-router-dom";
import { Heading } from "../../components/Heading";


export const Home = () => {
  return (
    <>
      <Heading />
      <div className="flex justify-evenly items-center  bg-gradient-to-tr from-indigo-400 from-20% to-indigo-800 to-80%  rounded-sm w-[60%] h-96 mt-6 m-auto">
        <div className=" bg-gradient-to-bl from-indigo-400 from-20% to-indigo-800 to-80% p-3 rounded-sm w-[35%] text-center leading-8 flex flex-col justify-evenly h-[50%]">
          <p className="text-[20px]">
            New User!
            <br />
            Please Signup
          </p>
          <Link
            to={"/Signup"}
            className="bg-indigo-700 p-2 rounded-sm w-17 m-auto hover:bg-indigo-800"
          >
            Signup
          </Link>
        </div>
        <div className="bg-gradient-to-bl from-indigo-400 from-20% to-indigo-800 to-80% p-3 rounded-sm text-center flex flex-col w-[35%] justify-evenly leading-8 h-[50%]">
          <p className="text-[20px]">
            Already Have An Account! <br /> Please Login
          </p>
          <Link
            to={"/Login"}
            className="bg-indigo-700 p-2 w-17 m-auto rounded-sm hover:bg-indigo-800"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
