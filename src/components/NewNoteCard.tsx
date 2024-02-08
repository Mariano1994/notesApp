import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  // Function to recoding the note
  function handleStartRecording() {
    const isSpeecthRecognitionAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!isSpeecthRecognitionAvailable) {
      alert(
        "Unfortunately speech recognition is not available on your browser."
      );
      return;
    }
    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "en"; // The language we what to use on recording
    speechRecognition.continuous = true; // Keep recording until I stop it manually
    speechRecognition.maxAlternatives = 1; // alternative words for words that are no clear

    speechRecognition.interimResults = true; // Converto to text as Im talking
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    speechRecognition?.stop();
  }

  const handleStartEditor = () => {
    setShouldShowOnboarding(false);
  };

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!event.target.value) {
      setShouldShowOnboarding(true);
    }
    setContent(event.target.value);
  };

  const handleSaveNote = (event: FormEvent) => {
    event.preventDefault();
    if (content === "") return;
    onNoteCreated(content);
    setContent("");
    setShouldShowOnboarding(true);
    toast.success("Note saved successfully");
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">add notes</span>
        <p className="text-sm leading-6 text-slate-400">
          Record an audio note that will be converted to text automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2  md:max-w-[640px] ms:w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5 ">
                <span className="text-sm font-medium text-slate-300">
                  Create a new note
                </span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Start by{" "}
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="font=medium text-lime-400 hover:underline"
                    >
                      recording an audio note
                    </button>{" "}
                    or, if you prefer, just{" "}
                    <button
                      type="button"
                      onClick={handleStartEditor}
                      className="font=medium text-lime-400 hover:underline"
                    >
                      {" "}
                      write a text
                    </button>
                  </p>
                ) : (
                  <div>
                    <textarea
                      value={content}
                      onChange={handleContentChanged}
                      autoFocus
                      className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex flex-1 w-full outline-none"
                    />
                  </div>
                )}
              </div>

              {isRecording ? (
                <button
                  onClick={handleStopRecording}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
                >
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  Recording (Click to stop)
                </button>
              ) : (
                <button
                  onClick={handleSaveNote}
                  type="button"
                  className="w-full bg-lime-400 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
                >
                  <span className="text-lime-950 outline-none font-medium hover:bg-lime-500">
                    {" "}
                    Add note
                  </span>{" "}
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNoteCard;
