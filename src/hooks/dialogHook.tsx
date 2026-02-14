import { checkMobile } from "@/lib/checkMobile";
import { useRef, useState } from "react";

const StatesNumbered = {
  "smile": 0, 
  "discontent": 1, 
  "happy": 2,
  "smileClosedEyes": 3,
  "angryClosedEyes": 4,
  "ew": 5,
  "angry": 6,
  "comforted": 7,
  "no": 8
} as const;

export type State = keyof typeof StatesNumbered;

export function useDialog() {
  const states: number = Object.keys(StatesNumbered).length;

  const [currentState, setState] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [animationProgress, setAnimationProgress] = useState<number>(0.0);
  const [isWaitingForKey, setWaitingForKey] = useState<boolean>(false);
  const updateFunc = useRef(() => {});
  const abortController = useRef<AbortController|null>(null);

  const getSignal = (): AbortSignal => {
    if (!abortController.current || abortController.current.signal.aborted) {
      abortController.current = new AbortController();
    }
    return abortController.current.signal;
  };

  return {
    urls(): string[] {
      return new Array(states - 1).fill(0).map((_, index) => `/sprite${index + 1}.png`);
    },

    getState(): number {
      return currentState;
    },

    setState(newState: State) {
      setState(StatesNumbered[newState]);
    },

    animateText(newText: string, timeMilis: number): Promise<void> {
      setText(newText);
      setAnimationProgress(0.0);

      return new Promise((resolve, reject) => {
        const signal = getSignal();

        const handler = () => {
          reject(new Error("Aborted"));
        };
        signal.addEventListener("abort", handler);

        let startTime = performance.now();
        let letters = 0;

        updateFunc.current = () => {
          const thisTime = performance.now();
          const lastLetters = letters;
          letters = Math.floor((thisTime - startTime) / timeMilis * newText.length);

          if (letters !== lastLetters) {
            let animationValue = letters / newText.length;

            setAnimationProgress(animationValue);

            if (letters >= newText.length) {
              updateFunc.current = () => {};
              signal.removeEventListener("abort", handler);
              resolve();
            }
          }
        };
      });
    },

    waitForKey(): Promise<void> {
      return new Promise((resolve, reject) => {
        setWaitingForKey(true);

        const signal = getSignal();
        const abortHandler = () => {
          reject(new Error("Aborted"));
        };
        signal.addEventListener("abort", abortHandler);

        const eventType = checkMobile() ? 'touchstart' : "click";
        const keyHandler = () => {
          setWaitingForKey(false);
          abortController.current!.signal.removeEventListener("abort", abortHandler);
          resolve();
        };
        document.addEventListener(eventType, keyHandler, {
          once: true,
          signal: signal,
        });
      });
    },

    wait(timeMilis: number): Promise<void> {
      return new Promise((resolve, reject) => {
        const signal = getSignal();
        const abortHandler = () => {
          reject(new Error("Aborted"));
        };
        signal.addEventListener("abort", abortHandler);

        const endTime = performance.now() + timeMilis;

        updateFunc.current = () => {
          const now = performance.now();

          if (now > endTime) {
            updateFunc.current = () => {};
            signal.removeEventListener("abort", abortHandler);
            resolve();
          }
        };
      });
    },

    waitForTrue(func: () => boolean): Promise<void> {
      return new Promise((resolve, reject) => {
        const signal = getSignal();
        const abortHandler = () => {
          reject(new Error("Aborted"));
        }
        signal.addEventListener("abort", abortHandler);

        updateFunc.current = () => {
          if (func()) {
            updateFunc.current = () => {};
            signal.removeEventListener("abort", abortHandler);
            resolve();
          }
        };
      });
    },

    getAnimatedText(): string {
      return text.slice(0, animationProgress * text.length);
    },

    isWaitingForKey(): boolean {
      return isWaitingForKey;
    },

    update(): void {
      updateFunc.current();
    },

    unmount(): void {
      updateFunc.current = () => {};
      abortController.current!.abort("Unmounted");
      abortController.current = null;
    }
  }
}
