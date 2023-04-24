import { useState, useEffect, useCallback, ChangeEvent } from "react";

const DefaultPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

export function PromptInput() {
  const [prompt, setPrompt] = useState(DefaultPrompt);
  const onChangePrompt = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
      chrome.storage.local.set({ prompt: e.target.value });
    },
    [setPrompt]
  );

  const onResetClick = useCallback(() => {
    setPrompt(DefaultPrompt);
    chrome.storage.local.set({ prompt: DefaultPrompt });
  }, [setPrompt]);

  useEffect(() => {
    chrome.storage.local.get(
      {
        prompt: DefaultPrompt,
      },
      ({ prompt }) => {
        setPrompt(prompt);
      }
    );
  }, [setPrompt]);
  return (
    <div>
      <textarea
        id="prompt"
        className="w-80 block text-sm p-2 rounded-md border border-gray-300 h-40"
        onInput={onChangePrompt}
        value={prompt}
      />
      <p className="font-sans text-teal-800">
        {"{{text}} will be replaced with selected text"}
      </p>
      <button
        id="reset"
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
}
