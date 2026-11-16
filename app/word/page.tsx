'use client';

// import Image from "next/image";
import React, { useState, useEffect } from 'react'

export default function Home() {
  return (
    <div className="wordHome">
      <Board />
    </div>
  );
}


function Board() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]); 
  const [correctArr, setCorrectArr] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    function getNewWord() {
      const possibleWords = [
        "APPLE", "ALIEN", "BADGE", "CHARM", "ETHER", "PLUCK", "PAINT",
        "THROW", "THEAD", "HIPPO", "PLANE", "PHONE", "DAWGS", "GROWN"
      ]; 
      const wordIndex = Math.floor(Math.random() * possibleWords.length);
      setWord(possibleWords[wordIndex]);
      setGuesses([]);
      setCurrentGuess("");
      setCompleted(false);
      setCorrectArr([])
    }

    getNewWord();
  }, [tries]);

  const testCorrect = (guessStr: string) => {
    const guess = guessStr.split("");
    const correctWord = word.split("");
    const result: string[] = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === correctWord[i]) {
        result.push("green");
      } else if (correctWord.includes(guess[i])) {
        result.push("yellow");
      } else {
        result.push("gray");
      }
    }

    setCorrectArr((prev) => [...prev, ...result]);
  };

    if(guesses.length >= 6 && completed == false) {
      window.alert("WRONG! The correct word is: " + word)
      setCompleted(true);
    }

  const handleKeyPress = (letter: string) => {
    if(completed) {
      setTries(tries + 1);
    }
    else
    {
      if (letter === "del") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (letter === "enter") {
        if (currentGuess.length < 5) {
          window.alert("Word is not long enough to be submitted");
        } else if (currentGuess.length === 5) {
          // Evaluate colors before clearing currentGuess!
          testCorrect(currentGuess);

          setGuesses((prev) => [...prev, currentGuess]);
          setCurrentGuess("");

          if (currentGuess === word) {
            setCompleted(true);
            window.alert("CONGRATS! The word is: " + word)
          }
        }
      } else if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + letter);
      }
    }
  };

  const getKeyStatuses = () => {
    const keyStatuses: Record<string, string> = {};
    const allSubmittedLetters = guesses.join("");

    for (let i = 0; i < allSubmittedLetters.length; i++) {
      const letter = allSubmittedLetters[i];
      const color = correctArr[i]; 
      const currentStatus = keyStatuses[letter];

      if (color === "green") {
        keyStatuses[letter] = "green";
      } else if (color === "yellow" && currentStatus !== "green") {
        keyStatuses[letter] = "yellow";
      } else if (color === "gray" && !currentStatus) {
        keyStatuses[letter] = "gray";
      }
    }

    return keyStatuses;
  };

  return (
    <div>
      <Guess currentGuess={currentGuess} guesses={guesses} word={word} correct={correctArr} />
      <Keyboard onKeyPress={handleKeyPress} keyStatuses={getKeyStatuses()} />
    </div>
  );
}

interface GuessProps {
  currentGuess: string;
  guesses: string[];
  word: string;
  correct: string[];
}

interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  keyStatuses: Record<string, string>;
}

function Guess({ currentGuess, guesses, correct }: GuessProps) {
  const typedLetters = guesses.join("") + currentGuess;

  return (
    <div className="game-board">
      <div id="board" className="selections">
        {Array.from({ length: 30 }).map((_, index) => {
          const status = correct[index]; // "green" | "yellow" | "gray" | undefined
          const isSubmitted = Boolean(status);

          // Only flip if the square has been evaluated
          const animationClass = isSubmitted ? "animate__flipInX" : "";
          const colorClass = isSubmitted ? `square-${status}` : "";

          const columnIndex = index % 5;

          return (
            <div
              key={index}
              className={`square animate__animated ${animationClass} ${colorClass}`}
              style={{
                animationDelay: isSubmitted ? `${columnIndex * 0.15}s` : "0s"
              }}
            >
              {typedLetters[index] || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Keyboard({ onKeyPress, keyStatuses }: KeyboardProps) {
  const getKeyClass = (letter: string) => {
    const status = keyStatuses[letter];
    return status ? `key-${status}` : "";
  };

  return (
    <div className="keyboard-container">
      <div className="keyboard-row">
        <button onClick={() => onKeyPress("Q")} className={getKeyClass("Q")}>Q</button>
        <button onClick={() => onKeyPress("W")} className={getKeyClass("W")}>W</button>
        <button onClick={() => onKeyPress("E")} className={getKeyClass("E")}>E</button>
        <button onClick={() => onKeyPress("R")} className={getKeyClass("R")}>R</button>
        <button onClick={() => onKeyPress("T")} className={getKeyClass("T")}>T</button>
        <button onClick={() => onKeyPress("Y")} className={getKeyClass("Y")}>Y</button>
        <button onClick={() => onKeyPress("U")} className={getKeyClass("U")}>U</button>
        <button onClick={() => onKeyPress("I")} className={getKeyClass("I")}>I</button>
        <button onClick={() => onKeyPress("O")} className={getKeyClass("O")}>O</button>
        <button onClick={() => onKeyPress("P")} className={getKeyClass("P")}>P</button>
      </div>
      <div className="keyboard-row">
        <button onClick={() => onKeyPress("A")} className={getKeyClass("A")}>A</button>
        <button onClick={() => onKeyPress("S")} className={getKeyClass("S")}>S</button>
        <button onClick={() => onKeyPress("D")} className={getKeyClass("D")}>D</button>
        <button onClick={() => onKeyPress("F")} className={getKeyClass("D")}>F</button>
        <button onClick={() => onKeyPress("G")} className={getKeyClass("G")}>G</button>
        <button onClick={() => onKeyPress("H")} className={getKeyClass("H")}>H</button>
        <button onClick={() => onKeyPress("J")} className={getKeyClass("J")}>J</button>
        <button onClick={() => onKeyPress("K")} className={getKeyClass("K")}>K</button>
        <button onClick={() => onKeyPress("L")} className={getKeyClass("L")}>L</button>
        <div className="spacer-half"></div>
      </div>
      <div className="keyboard-row">
        <button onClick={() => onKeyPress("enter")} className="wide-button">Enter</button>
        <button onClick={() => onKeyPress("Z")} className={getKeyClass("Z")}>Z</button>
        <button onClick={() => onKeyPress("X")} className={getKeyClass("X")}>X</button>
        <button onClick={() => onKeyPress("C")} className={getKeyClass("C")}>C</button>
        <button onClick={() => onKeyPress("V")} className={getKeyClass("V")}>V</button>
        <button onClick={() => onKeyPress("B")} className={getKeyClass("B")}>B</button>
        <button onClick={() => onKeyPress("N")} className={getKeyClass("N")}>N</button>
        <button onClick={() => onKeyPress("M")} className={getKeyClass("M")}>M</button>
        <button onClick={() => onKeyPress("del")} className="wide-button">Delete</button>
      </div>
    </div>
  )
}
