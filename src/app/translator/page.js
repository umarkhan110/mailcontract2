"use client";
import { useEffect, useState } from "react";
import { translate } from "../service/translate";
import { useRouter } from "next/navigation";
//
export default function Tranlator() {
  const router = useRouter();
  const isSubscribed = sessionStorage.getItem("isSubscribed");
  console.log(isSubscribed);
  if (isSubscribed === "false") {
    router.push("/subscription-plans");
  }

  const [input, setInput] = useState("");
  const [transltedText, setTransltedText] = useState("");
  const [loader, setLoader] = useState(false);
  const [imageBase64, setImageBase64] = useState("");

  const translateText = async () => {
    setLoader(true);
    const userId = sessionStorage.getItem("userId");
    const data = {
      text: input,
      image: imageBase64,
      userId: userId,
    };
    const response = await translate(data);
    if (response.success) {
      setTransltedText(response?.translatedText?.content[0]?.text);
    } else {
      alert(response.message);
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
    <div className="m-10">
      <h4 className="text-center">
        Translate Classical Armenian language to Modern Armenian language
      </h4>

      <div className="flex justify-center mt-5 mx-10">
        <div className="md:w-1/2 mb-4">
          <h6>Enter Classical Armenian language</h6>
          <textarea
            className="form-control mb-3 p-2 border"
            rows="5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Classical Armenian language"
          ></textarea>
          <input type="file" accept="image/jpeg" onChange={handleImageUpload} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={translateText}
          >
            Translate
          </button>
        </div>

        <div className="md:w-1/2">
          <h6>Modern Armenian language</h6>
          <div className="border p-3" style={{ minHeight: "200px" }}>
            {loader ? <p>Loading...</p> : transltedText}
          </div>
        </div>
      </div>
    </div>
  );
}
