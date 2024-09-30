import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Protected() {
  // State variable to store the user's account information
  const [account, setAccount] = useState(null);

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Use the useEffect hook to check if the user is logged in when the component mounts
  useEffect(() => {
    // Check if the user is logged in by checking the presence of the "faceAuth" item in local storage
    if (!localStorage.getItem("faceAuth")) {
      // If not logged in, redirect to the login page
      navigate("/login");
    } else {
      // If logged in, parse the "faceAuth" item from local storage and update the account state variable
      const { account } = JSON.parse(localStorage.getItem("faceAuth"));
      setAccount(account);
    }
  }, []);

  // Use another useEffect to handle the automatic redirection
  useEffect(() => {
    if (!account) return;

    // Define the URLs based on the account fullName
    let url = "https://edenpixel.in/asok/qr_scanner.php?user_id=1&stage_no=1"; // Default URL

    switch (account.fullName) {
      case "User1":
        url = `https://edenpixel.in/asok/qr_scanner.php?user_id=1&stage_no=1`;
        break;
      case "User2":
        url = `https://edenpixel.in/asok/qr_scanner.php?user_id=2&stage_no=2`;
        break;
      case "User3":
        url = "https://edenpixel.in/asok/Dashboard/admin/?user_id=100";
        break;
      default:
        // Use default URL or handle other cases
    }

    // Open the URL in a new tab
    window.open(url, "_blank");
  }, [account]); // This useEffect runs whenever `account` changes

  // If the account state variable is null or undefined, return null
  if (!account) {
    return null;
  }

  // Return the JSX element that displays the user's profile information
  return (
    <div className="bg-white pt-40 md:pt-60">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
          You have successfully logged in!
        </h2>
        <div className="text-center mb-24">
          <img
            className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
            src={
              account?.type === "CUSTOM"
                ? account.picture
                : `/temp-accounts/${account.picture}`
            }
            alt={account.fullName}
          />
          <h1
            className="block text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800"
            style={{
              lineHeight: "1.5",
            }}
          >
            {account?.fullName}
          </h1>
          <div
            onClick={() => {
              localStorage.removeItem("faceAuth");
              navigate("/");
            }}
            className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600"
          >
            <span className="text-white">Log Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Protected;
