"use client";
import { useEffect, useState } from "react";
import { translate } from "../service/translate";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShowNotification } from "../template";
export default function Tranlator() {
  const router = useRouter();
  // // const isSubscribed = Cookies.get("isSubscribed");
  // // console.log(isSubscribed);
  // // if (isSubscribed === "false") {
  // //   router.push("/subscription-plans");
  // // }

  const [input, setInput] = useState("");
  const [transltedText, setTransltedText] = useState("");
  const [loader, setLoader] = useState(false);
  const [textOrImage, setTextOrImage] = useState("text");
  const [imageBase64, setImageBase64] = useState("");

  const translateText = async () => {
    setLoader(true);
    const userId = Cookies.get("userId");
    const data = {
      text: input,
      image: imageBase64,
      userId: userId,
    };
    const response = await translate(data);
    if (response.success) {
      setTransltedText(response?.translatedText?.content[0]?.text);
    } else {
      ShowNotification(response.message, "error");
      if(response.message === "No free hits remaining"){
        router.push("/subscription-plans")
      }
    }
    setLoader(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-16 md:mx-20 mx-5">
      <h4 className="text-center">
        Translate Classical Armenian language to Modern Armenian language
      </h4>

      <div className="md:flex flex-row justify-center mt-5 gap-10 h-80">
        <div className="md:w-1/2 mb-4">
          <div className="flex gap-4 mb-2">
            <button
              className="border rounded-lg px-4 py-2"
              onClick={() => setTextOrImage("text")}
            >
              Text
            </button>

            <button
              className="border rounded-lg px-4 py-2"
              onClick={() => setTextOrImage("video")}
            >
              Image
            </button>
          </div>
          {textOrImage === "text" ? (
            <textarea
              className="mb-3 p-2 border rounded-lg w-full h-full"
              rows="5"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Classical Armenian language"
            ></textarea>
          ) : (
            <input
              type="file"
              accept="image/jpeg"
              onChange={handleImageUpload}
            />
          )}
            <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-3 md:mt-10 block md:hidden"
        onClick={translateText}
        disabled={input === " " ? true : false}
      >
        Translate
      </button>
        </div>

        <div className="md:w-1/2 h-80">
          <h6 className="my-2">Modern Armenian language</h6>
          <div className="border p-3 h-full">
            {loader ? <p>Loading...</p> : transltedText}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-10 hidden md:block"
        onClick={translateText}
      >
        Translate
      </button>
    </div>
  );
}
