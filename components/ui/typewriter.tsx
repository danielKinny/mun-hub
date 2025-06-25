"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function TypeWriter() {
  const [text, setText] = useState("");
  const [blinker, setBlinker] = useState("|");
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'typing'|'pausingAfterTyping'|'deleting'|'pausingAfterDeleting'>("typing");
  const [charIndex, setCharIndex] = useState(0);

  const words = useMemo<string[]>(() => [
    "Welcome to MUN-Hub",
    "Your one stop hub for collaboration",
    "Your one stop hub for innovation",
    "Your one stop hub for inspiration",
    "Your one stop hub for all information",
    "Your one stop hub for ideas",
    "Your one stop hub for interaction",
    "Your one stop hub for news",
    "Are you still reading this?",
  ], []);

  const returnIndex = useCallback((index: number) => index % words.length, [words.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    setBlinker("|"); 
    if (phase === "typing") {
      setBlinker("|");
    } else {
      interval = setInterval(() => {
        setBlinker((prev) => (prev === "|" ? "\u00A0" : "|")); //use unicode no-break space
      }, 400);
    }
    return () => interval && clearInterval(interval);
  }, [phase]);
  
  useEffect(() => {
    const currWord = words[count];
    const nextWord = words[returnIndex(count + 1)];
    let shared = 0;
    while (
      shared < currWord.length &&
      shared < nextWord.length &&
      currWord[shared] === nextWord[shared]
    ) {
      shared++;
    }

    let timeout: NodeJS.Timeout;
    if (phase === "typing") {
      if (charIndex < currWord.length) {
        timeout = setTimeout(() => {
          setText(currWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setPhase("pausingAfterTyping");
        }, 800);
      }
    } else if (phase === "pausingAfterTyping") {
      timeout = setTimeout(() => {
        setPhase("deleting");
        setCharIndex(currWord.length);
      }, 100);
    } else if (phase === "deleting") {
      if (charIndex > shared) {
        timeout = setTimeout(() => {
          setText(currWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 60);
      } else {
        timeout = setTimeout(() => {
          setPhase("pausingAfterDeleting");
        }, 600);
      }
    } else if (phase === "pausingAfterDeleting") {
      timeout = setTimeout(() => {
        setCount(returnIndex(count + 1));
        setPhase("typing");
        setCharIndex(shared);
        setText(nextWord.slice(0, shared));
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [phase, charIndex, count, words, returnIndex]);

  return (
    <h1 className="text-4xl text-center font-bold text-white">
      {text}
      <span>{blinker}</span>
    </h1>
  );
}
