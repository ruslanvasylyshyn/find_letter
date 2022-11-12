import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./Cell/Cell";
import WinMessage from "./Modal/Win.jsx";

function App() {
  const [startGame, setStartGame] = useState(0);

  const [matrix, setMatrix] = useState([
    ["A", "B", "C"],
    ["C", "B", "A"],
    ["B", "A", "A"],
  ]);

  const [emptyMatrix, setEmptyMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [findLetter, setFindLetter] = useState();
  const [howMuchLetterToFind, sethowMuchLetterToFind] = useState();
  const [[win, lose], setStatistic] = useState([0, 0]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showWinMessage, setShowWinMessage] = useState(false);

  useEffect(() => {
    // Генерую випадкову літеру
    const letters = ["A", "B", "C"];
    let newLetter = letters[Math.floor(Math.random() * letters.length)];
    setFindLetter(newLetter);

    // Створюю матрицю
    let newMatrix = [...matrix];
    for (let i = 0; i < newMatrix.length; i++) {
      for (let k = 0; k < newMatrix.length; k++) {
        let newLetter = letters[Math.floor(Math.random() * letters.length)];
        newMatrix[i][k] = newLetter;
      }
    }
    if (newMatrix.length === 4) {
      newMatrix.pop();
    }
    setMatrix(newMatrix);

    // Рахую скільки літер потрібно знайти
    const letterCount = matrix.flat().filter((letter) => letter === newLetter).length;
    sethowMuchLetterToFind(letterCount);
  }, [startGame]);

  // Очистка матриці
  function cleanMatrix() {
    let tempMatrix = emptyMatrix.map((row) => row.map((cell) => (cell = "")));
    setEmptyMatrix(tempMatrix);
    setButtonDisabled(false);
  }

  // Показую значення клітинок в матриці
  function showMatrix() {
    let tempMatrix = [...matrix];
    setEmptyMatrix(tempMatrix);
    setButtonDisabled(true);
  }

  // Вгадали одну букву
  function smallWin() {
    sethowMuchLetterToFind(howMuchLetterToFind - 1);
    alert("ви вгадали");
  }

  // Вгадали всі букви
  function Win() {
    sethowMuchLetterToFind(howMuchLetterToFind - 1);
    setShowWinMessage(true);
    setStatistic([win + 1, lose]);
    setButtonDisabled(true);
  }

  // Не вгадали букву
  function Lose() {
    showMatrix();
    alert("сбробуй ще раз");
    setStatistic([win, lose + 1]);
  }

  // Обробка кліків по матриці
  function handlerCliсk(e, x, y) {
    let tempMatrix = [...emptyMatrix, (emptyMatrix[y][x] = matrix[y][x])];
    if (tempMatrix.length === 4) {
      tempMatrix.pop();
    }

    setEmptyMatrix(tempMatrix);

    if (findLetter === matrix[y][x]) {
      howMuchLetterToFind === 1 ? Win() : smallWin();
    } else {
      Lose();
    }
  }

  // Показує сховані значення матриці
  console.log("matrix", matrix);
  return (
    <div className="App">
      <div className="game">
        <h1>Знайди букву: {startGame === 0 ? "ABC" : findLetter}</h1>
        {startGame === 0 ? "" : <h2>Залишилось знайти букв: {howMuchLetterToFind}</h2>}

        {emptyMatrix.map((row, y) => {
          return (
            <div key={y + "D"} className="row">
              {row.map((cell, x) => (
                <Cell
                  cell={cell}
                  key={x + y}
                  handlerCliсk={handlerCliсk}
                  x={x}
                  y={y}
                  buttonDisabled={buttonDisabled}
                  setButtonDisabled={setButtonDisabled}
                />
              ))}
            </div>
          );
        })}
        <button
          onClick={() => {
            setStartGame(startGame + 1);
            if (startGame > 0) {
              cleanMatrix();
            }
            showMatrix();
            setTimeout(cleanMatrix(), 5000);
            setShowWinMessage(false);
          }}
          className="start_game"
        >
          {startGame === 0 ? "Start game" : "Restart game"}
        </button>
        <div className="statistic">
          <div>Ігор зіграно: {startGame}</div>
          <div>Виграно: {win}</div>
          <div>Програно: {lose}</div>
        </div>
      </div>
      {showWinMessage ? <WinMessage /> : ""}
      <details>
        <summary>Правила гри:</summary>
        <p>Потрібно вгадати одну з букв A B C</p>
        <p>
          Щоб почати гру натисніть кнопку "Start game", після чого у вас буде 5 секунд, щоб
          запам'ятати розташування букв на полі
        </p>
        <p>Через 5 секунд букви зникнуть</p>
        <p>По зеленим квадратикам можна нажимати</p>
        <p>Червоні квадратики неактивні або по ним вже нажимали</p>
      </details>
    </div>
  );
}

export default App;
