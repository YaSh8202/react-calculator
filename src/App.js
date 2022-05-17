import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["+", "-", "*", "/", "."];

  const updateCalc = (value) => {
    if (value === "0" && (calc === "" || calc === "0")) return;
    if (value === "." && calc.includes(".")) return;

    if (ops.includes(value) && calc === "") {
      return;
    }

    if (
      ops.includes(value) &&
      (value !== "-" || calc.slice(-1) === "-") &&
      ops.includes(calc.slice(-1))
    ) {
      const v = calc.slice(0, -1) + value;
      setCalc(v);
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };
  const createDigits = () => {
    const digits = [];
    const nums = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          id={nums[i - 1]}
          onClick={() => {
            updateCalc(i.toString());
          }}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  const showResultHandler = () => {
    setCalc(result);
  };

  const deleteLast = () => {
    if (calc === "") return;

    const value = calc.slice(0, -1);
    setCalc(value);
    if (value === "") setResult(0);
    else setResult(eval(value).toString());
  };

  const clearCalc = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display">{calc || "0"}</div>

        <div className="operators">
          <button
            id="clear"
            onClick={() => {
              clearCalc();
            }}
          >
            AC
          </button>
          <button
            id="divide"
            onClick={() => {
              updateCalc("/");
            }}
          >
            /
          </button>
          <button
            id="multiply"
            onClick={() => {
              updateCalc("*");
            }}
          >
            *
          </button>
          <button
            id="add"
            onClick={() => {
              updateCalc("+");
            }}
          >
            +
          </button>
          <button
            id="subtract"
            onClick={() => {
              updateCalc("-");
            }}
          >
            -
          </button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button
            id="zero"
            key="0"
            onClick={() => {
              updateCalc("0");
            }}
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => {
              updateCalc(".");
            }}
            key="."
          >
            .
          </button>
          <button id="equals" onClick={showResultHandler} key="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
