"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function TypeWriter() {
  const [text, setText] = useState("");
  const [blinker, setBlinker] = useState("|");
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const words = useMemo<string[]>(() => [
    "innovating",
    "collaborating",
    "communicating",
    "negotiating",
    "debating",
    "resolving",
    "advocating",
    "networking",
    "connecting",
    "engaging",
  ], []);

  const returnIndex = useCallback((index: number) => index % words.length, [words.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!isTyping) {
      interval = setInterval(() => {
        setBlinker((prev) => (prev === "|" ? "" : "|"));
      }, 300);
    } else {
      setBlinker("|");
    }

    return () => (interval ? clearInterval(interval) : undefined);
  }, [isTyping]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

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

    setIsTyping(true);

    for (let i = shared; i < words[count].length; i++) {
      timeouts.push(
        setTimeout(
          () => setText(words[count].slice(0, i + 1)),
          100 * (i - shared)
        )
      );
    }

    const typingDuration = 100 * words[count].length + 500;

    timeouts.push(setTimeout(() => setIsTyping(false), typingDuration + 2000));
    for (let i = currWord.length - 1; i >= shared; i--) {
      timeouts.push(
        setTimeout(
          () => setText(words[count].slice(0, i)),
          typingDuration + 100 * (currWord.length - i)
        )
      );
      if (
        i !== 0 &&
        words[returnIndex(count + 1)].startsWith(words[count].slice(0, i))
      ) {
        break;
      }
    }

    const deletingDuration = 100 * (currWord.length - shared) + 500;

    timeouts.push(
      setTimeout(
        () => setIsTyping(false),
        typingDuration + deletingDuration + 1000
      )
    );

    timeouts.push(
      setTimeout(() => {
        setCount(count === words.length - 1 ? 0 : count + 1);
      }, typingDuration + deletingDuration + 1000)
    );

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [count, returnIndex, words]);

  return (
    <>
      <h1 className="text-4xl text-center font-bold text-white">
        example MUN is all about {text}
        <span>{blinker}</span>
      </h1>
    </>
  );
}
