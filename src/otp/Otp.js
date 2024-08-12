import { useRef, useState } from "react";

function Otp({ length = 5 }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const optRefs = useRef([]);

  const onInputChnage = (event, id) => {
    const value = event.target.value;
    if (!/^\d+$/.test(value)) {
      return;
    }
    let lastDigit = value % 10;
    const newOtp = [...otp];
    newOtp[id] = lastDigit;
    setOtp(newOtp);
    if (id + 1 < otp.length) {
      // next focus
      optRefs.current[id + 1].focus();
    }
  };

  const onKeyDown = (event, id) => {
    const key = event.key;
    if (key == "Backspace") {
      const newOtp = otp.filter((_, idx) => idx != id);
      for (let i = newOtp.length; i < length; i++) {
        newOtp[i] = "";
      }
      setOtp(newOtp);
      if (id - 1 >= 0) {
        // prev focus
        optRefs.current[id - 1].focus();
      }
    }
  };

  const onPaste = (e, id) => {
    const pasteData = e.clipboardData?.getData("text");
    const regex = new RegExp(`\\d{${length}}`);
    console.log("inside paster ", pasteData, regex.test(pasteData));
    if (!pasteData || !regex.test(pasteData)) {
      return;
    }
    setOtp(pasteData.split("").map(Number));
    optRefs.current[length - 1].focus();
    // !!IMPORTANT : if we dont do this then it will call onInputChnage function
    e.preventDefault();
  };

  return (
    <div className="otp-container">
      {otp.map((value, idx) => {
        return (
          <input
            key={idx}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "18px",
            }}
            ref={(inputRef) => {
              optRefs.current[idx] = inputRef;
            }}
            value={value}
            onChange={(event) => {
              onInputChnage(event, idx);
            }}
            onKeyDown={(event) => {
              onKeyDown(event, idx);
            }}
            onPaste={(event) => {
              onPaste(event, idx);
            }}
          />
        );
      })}
      <p>{otp.join("")}</p>
    </div>
  );
}

export default Otp;
