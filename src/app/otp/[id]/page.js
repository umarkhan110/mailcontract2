"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { ShowNotification } from "../../template";
import { otpCall } from "../../service/otp";
import ButtonLoader from "@/app/components/ButtonLoader";

const OTP = () => {
  const router = useRouter();
  const pathname = useParams();
  const userId = pathname.id;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (otp != "") {
      if (otp.length !== 5) {
        setError("OTP must be exactly 5 digits.");
      } else {
        setError("");
      }
    }
  }, [otp]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    if (otp === "") {
      setError("Please enter OTP.");
      return;
    }

    const data = {
      otpCode: otp,
      userId: userId,
    };

    try {
      const response = await otpCall(data);
      if(response.success){
        router.push("/sign-in")
      }else{
        ShowNotification(response.message, "error");
      }
    } catch (error) {
      console.log(error);
      ShowNotification("Something went wrong!", "error");
    }
    setLoader(false)
  };
  return (
    <div className="flex justify-center items-center w-full  pt-16 md:pt-0 md:h-[calc(100vh-70px)]">
      <div className="m-auto w-full max-w-[420px] rounded bg-light p-5 sm:p-8">
        <div className="mb-2">
          <h1 className="text-gray-900 dark:text-white md:text-[#101828] font-inter font-semibold text-[30px] text-2xl leading-10 ">
            Enter OTP Code
          </h1>
        </div>
        <h3 className="mb-6 mt-2 font-inter font-normal text-base leading-6 text-gray-600 md:text-[#475467] dark:text-white">
          Please enter the 5-digit code that we sent to you email or phone
          number
        </h3>
        <div className="space-y-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            renderSeparator={<span className="w-2"></span>}
            renderInput={(props) => <input {...props} />}
            isInputNum={true}
            containerStyle="w-full gap-2 "
            inputStyle="border font-inter text-18 font-700 text-[#333333] dark:text-white leading-18 text-center !w-14 h-12 left-1 rounded-12"
          />

          {error && (
            <p className="my-2 text-xs text-red-500 text-start">
              {error}
            </p>
          )}

          <button className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500" onClick={(e)=>onSubmit(e)}>
          {loader && (
          <ButtonLoader ClassStyle="inline w-4 h-4 mr-2 self-center text-white animate-spin" />
        )}
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
