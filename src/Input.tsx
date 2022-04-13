import React, { useEffect, useRef } from "react";

type CodeProps = {
  length: number;
  onChange: (e) => void;
  value: string;
  autofocus: boolean;
};

const CodeInput = ({ length, value, onChange, autofocus }: CodeProps) => {
  const refInputs = useRef<HTMLInputElement[]>(Array.from({ length }));
  const arrValue = useRef(Array.from({ length }));

  useEffect(() => {
    const valuesArr = value.split("");
    arrValue.current = arrValue.current.map((val, index) => {
      return valuesArr[index] || "";
    });
  }, [value]);

  const onKeydownHandler = (e, index: number) => {
    const { key } = e;
    let inputToFocus = undefined;
    if (key === "Backspace" || key === "Delete") {
      const nextValue = arrValue.current[index + 1];
      if (key === "Backspace" && !nextValue) {
        inputToFocus = refInputs.current[index - 1];
      }
      arrValue.current[index] = "";
    } else {
      // e.g. not shift
      if (String.fromCharCode(e.keyCode).match(/(\w|\d|\s)/g)) {
        arrValue.current[index] = key;
        inputToFocus = refInputs.current[index + 1];
      }
    }
    if (inputToFocus) {
      inputToFocus.focus();
    }
    onChange(arrValue.current.join(""));
  };

  const InputsJSX = Array.from({ length }, (num, index) => {
    return (
      <input
        className="ns-code__input"
        ref={r => (refInputs.current[index] = r)}
        value={value[index] || ""}
        maxLength="1"
        onKeyDown={e => onKeydownHandler(e, index)}
        autofocus={autofocus}
      />
    );
  });
  return <div className="ns-code__container">{InputsJSX}</div>;
};

CodeInput.defaultProps = {
  length: 4,
};

export default CodeInput;
