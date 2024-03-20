"use client";
import { useEffect, useState } from "react";
import { translate } from "../service/translate";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ShowNotification } from "../template";
export default function Tranlator() {
  const router = useRouter();

  const isPreimumUser = Cookies.get("premium");
  const [input, setInput] = useState("");
  const [transltedText, setTransltedText] = useState("");
  const [loader, setLoader] = useState(false);
  const [textOrImage, setTextOrImage] = useState("text");
  const [imageBase64, setImageBase64] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("modern");
  const [selectedLanguageI, setSelectedLanguageI] = useState("classical");

  const translateText = async () => {
    setLoader(true);
    const userId = Cookies.get("userId");
    const data = {
      text: input,
      image: imageBase64,
      userId: userId,
      selectedLanguage: selectedLanguage,
    };
    const response = await translate(data);
    if (response.success) {
      setTransltedText(response?.translatedText?.content[0]?.text);
    } else {
      ShowNotification(response.message, "error");
      if (response.message === "No free hits remaining") {
        router.push("/subscription-plans");
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

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    if (value === "modern" || value === "classical") {
      setSelectedLanguageI(value === "modern" ? "classical" : "modern");
    }
  };

  const handleLanguageChangeI = (e) => {
    const value = e.target.value;
    setSelectedLanguageI(value);
    if (value === "modern" || value === "classical") {
      setSelectedLanguage(value === "modern" ? "classical" : "modern");
    }
  };

  return (
    <div className="mt-28 md:mx-20 mx-5">
      <h4 className="text-center text-xl">
        Translate Classical Armenian language to Modern Armenian language
      </h4>

      <div className="md:flex flex-row justify-center mt-5 gap-10 h-80">
        <div className="md:w-1/2 mb-4">
          <div className="flex gap-4 mb-2">
            {isPreimumUser === "true" && (
              <select
                className="border rounded-lg px-4 py-2"
                onChange={handleLanguageChangeI}
                value={selectedLanguageI}
              >
                <option value="classical">Armenian Classical</option>
                <option value="modern">Modern Armenian</option>
              </select>
            )}
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
          {isPreimumUser === "true" && (
            <select
              className="border rounded-lg px-4 py-2"
              onChange={handleLanguageChange}
              value={selectedLanguage}
            >
              <option value="modern">Modern Armenian</option>
              <option value="classical">Armenian Classical</option>
              <option value="english">English</option>
            </select>
          )}
          <h6 className="my-2">{isPreimumUser === "false" && "Modren Armenian Language"}</h6>
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
