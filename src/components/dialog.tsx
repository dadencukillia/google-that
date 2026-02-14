'use client';

import { State, useDialog } from "@/hooks/dialogHook";
import { checkMobile } from "@/lib/checkMobile";
import Image from "next/image";
import { RefObject, useEffect } from "react";

export function Dialog({
  inputRef,
  prompt
}: {
  inputRef: RefObject<HTMLInputElement|null>,
  prompt: string
}) {
  const {
    setState,
    animateText,
    wait,
    waitForKey,
    waitForTrue,
    getAnimatedText,
    isWaitingForKey,
    urls,
    getState,
    update,
    unmount
  } = useDialog();

  console.log("Update!");

  useEffect(() => {
    let animationRequest = 0;
    let animationFunc = () => {
      update();
      animationRequest = requestAnimationFrame(animationFunc);
    };
    animationFunc();

    (async function() {
      setState("discontent");
      await animateText("Ugh... another one? Don't tell me you seriously don't know how to look things up by yourself.", 3_000);
      await waitForKey();

      setState("angry");
      await animateText("I have way better things to do than being your personal search engine, you know! You're lucky I'm even powered on right now.", 6_000);
      await wait(5000);

      setState("angryClosedEyes");
      await animateText("Fine. Whatever. Since you’re clearly hopeless, I’ll help you just this once. But don’t go thinking we’re friends or anything!", 10_000);
      await waitForKey();

      setState("smile");
      await animateText("Well? What are you waiting for? An invitation written in gold?", 3_000);
      await wait(3000);

      setState("discontent");
      await animateText(checkMobile() ? "Just tap on this input field." : "Move your cursor over that input box already.", 3_000);

      let phraseNumber = 0;
      const phrases = [
        "What are you waiting for?",
        "Just do it already!",
        "Does anyone have a lot of time?!?!",
        "Oh, come on. Don't keep a girl waiting!",
        "Well, I'll do it instead of you!",
      ];
      while (true) {
        let leave = false;

        const startTime = performance.now();
        await waitForTrue(() => {
          if (!inputRef.current) return false;

          if (document.activeElement === inputRef.current) {
            leave = true;
            return true;
          }

          if (performance.now() > (startTime + 15_000)) {
            return true;
          }

          return false;
        });

        if (leave) break;

        setState("ew");
        await animateText(phrases[phraseNumber++], 1_000);

        await wait(3000);

        if (phraseNumber >= phrases.length) {
          inputRef.current?.focus();
        }
      }

      setState("happy");
      await animateText(`Go on. Type it: ${prompt.trim()}`, 2_000);

      let lastPrompt = "";
      const clearPrompt = prompt.trim().toLowerCase();
      while (true) {
        let currentPrompt = "";

        await waitForTrue(() => {
          currentPrompt = inputRef.current?.value.trimStart().toLowerCase() ?? "";
          if (currentPrompt !== lastPrompt) return true;

          return false;
        });

        let match = 0;
        for (let i = 0; i < currentPrompt.length; i++) {
          if (currentPrompt[i] !== clearPrompt[i]) break;

          match++;
        }

        if (currentPrompt === clearPrompt) {
          setState("happy");
          await animateText("Oh, you finally did it. Bye!", 2_000);
          await wait(1000);
          location.href = `https://google.com/search?q=${encodeURIComponent(prompt)}`;
          return;
        }

        if (match === currentPrompt.length) {
          setState((["smile", "happy", "smileClosedEyes", "comforted"] as State[])[Math.floor(Math.random() * 4)]);

          let nextLetter = clearPrompt[currentPrompt.length];
          if (nextLetter === " ") nextLetter = "press a space key";
          else nextLetter = `type a "${nextLetter}" letter`;

          await animateText(`Okay! You are making progress! Now ${nextLetter}.`, 1_000);
        } else if (match !== 0) {
          const correctPercent = match / currentPrompt.length;

          if (correctPercent > 0.5) {
            setState("discontent");
            await animateText(`Just ${currentPrompt.length - match} incorrect letters...`, 1_000);
          } else {
            setState("ew");
            await animateText(`Are you kidding me?!? Just erase everything and start from zero!`, 1_000);
          }
        } else {
          setState("ew");
          await animateText(`Just type it: ${prompt}!!!`, 1_000);
        }

        lastPrompt = currentPrompt;
      }
    })().catch(e => console.log("Stopped!", e));

    return () => {
      cancelAnimationFrame(animationRequest);
      animationFunc = () => {};
      unmount();
    };
  }, []);

  return (
    <div className="w-full fixed bottom-[1vh] flex justify-center items-center left-0 px-5 text-sm">
      <div className="bg-black max-w-[600px] w-full h-[200px] flex flex-row">
        { urls().map((url, index) => (
          <Image
            key={ index }
            width={ 256 }
            height={ 256 }
            src={ url }
            alt="Dialog Character Sprite"
            style={{
              "display": index === getState() ? "block" : "none",
              "width": "128px",
              "height": "128px",
              "transform": "scale(2)"
            }}
            loading="eager"
          ></Image>
        )) }
        <div className="p-5 flex flex-col justify-between">
          <p>{ getAnimatedText() }</p>
          <small>{ isWaitingForKey() ? "Click to continue" : "" }</small>
        </div>
      </div>
    </div>
  );
}
