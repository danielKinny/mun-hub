"use client";
import React, { useEffect } from "react";
import { CustomNav } from "@/components/ui/customnav";
import { speeches, delegates, countries } from "@/db/index";
import { useSession } from "../context/sessionContext";
import { Speech } from "@/db/types";
import ProtectedRoute from "@/components/protectedroute";
import { toast } from "sonner";

const Page = () => {
  const { user: currentUser } = useSession();
  const [selectedSpeech, setSelectedSpeech] = React.useState<Speech | null>(
    speeches.filter(
      (speech: Speech) => currentUser?.id === speech.speechID.substring(0, 4)
    )[0] || null
  );

  const [localTags, setLocalTags] = React.useState<string[]>([]);
  const [text, setText] = React.useState<string>("");
  const [speechTitle, setSpeechTitle] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  const [addingNewTag, setAddingNewTag] = React.useState<boolean>(false);
  const [filteredSpeeches, setFilteredSpeeches] =
    React.useState<Speech[]>(speeches);

  const filterSpeeches = () => (
    speeches.filter(
        (speech: Speech) =>
          speech.speechID.substring(0, 4) === currentUser?.id &&
          (!search
            ? true
            : speech.title.toLowerCase().includes(search.toLowerCase()))
      )
  )
  useEffect(() => {
    if (selectedSpeech) {
      setSpeechTitle(selectedSpeech.title);
      setText(selectedSpeech.content);
    } else {
      setSpeechTitle("");
      setText("");
    }

    setFilteredSpeeches(filterSpeeches());

  }, [selectedSpeech, search, currentUser]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSpeechChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpeechTitle(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDeleteSpeech = async (speechID: string) => {
    if (!currentUser?.id) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/speeches", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speechID }),
      });
      if (response.ok) {
        await response.json();
      } else {
        await response.json();
      }
      setText("");
      setSpeechTitle("");
      setSelectedSpeech(null);
    } catch {
      alert("Failed to delete speech.");
    }
  };

  const handleAddSpeech = async () => {
    if (!speechTitle || !text) {
      alert("Please fill in all fields.");
      return;
    }
    let id: string;
    if (selectedSpeech) {
      id = selectedSpeech.speechID;
    } else {
      id = `${currentUser?.id}-${
        delegates.filter((delegate) => delegate.id === currentUser?.id)[0]
          .speechCount
      }`;
    }
    try {
      const response = await fetch("/api/speeches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          speechID: id,
          title: speechTitle,
          content: text,
          tags: (selectedSpeech ? selectedSpeech.tags : localTags),
        }),
      });
      if (response.ok) {
        await response.json();
        setSpeechTitle("");
        setText("");
        setFilteredSpeeches(filterSpeeches());
      } else {
        await response.json();
      }
    } catch {
      alert("Failed to add speech.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="bg-black text-white min-h-screen">
        <header>
          <h1 className="text-4xl text-center p-4 border-b border-gray-800">
            Speech Repository {currentUser?.flag}
          </h1>
        </header>
        <main>
          <section>
            <CustomNav />
          </section>
          <section className="flex">
            <section className="p-6 w-1/3">
              <div className="m-4 rounded-lg p-4 bg-gray-900">
                <h2 className="text-2xl font-semibold mb-4 text-center inline-block">
                  Speeches
                </h2>
                <button
                  onClick={() => setSelectedSpeech(null)}
                  className="inline-block hover:bg-black bg-white text-2xl items-center w-10 h-8 text-black rounded-lg mb-4 ml-4 cursor-pointer transition-colors hover:text-white"
                >
                  +
                </button>
                <input
                  className="mb-4 p-2 w-full bg-gray-700 inline-block rounded-lg"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search speeches by country"
                />
                <div className="h-96 overflow-y-auto bg-gray-800 p-4 rounded-lg">
                  <ul>
                    {filteredSpeeches.map((speech) => (
                      <li
                        key={speech.speechID}
                        className="p-2 border-b border-gray-700 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setSelectedSpeech(speech)}
                      >
                        <div className="flex justify-center items-center">
                          <h3 className="text-xl">{speech.title}</h3>
                          <button
                            key={speech.speechID}
                            onClick={() => {
                              setSelectedSpeech(speech);
                              try {
                                handleDeleteSpeech(speech.speechID);
                                toast("Speech has been deleted");
                              } catch {
                                toast.error("Error deleting speech");
                              }
                            }}
                            className="bg-red-500 text-white ml-auto rounded-lg w-8 h-8 flex items-center justify-center hover:bg-black transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                        <p>{speech.content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            <section className="w-full pr-8 items-center justify-center">
              <div>
                <h2 className="text-2xl text-center p-4 border-b border-gray-800">
                  Speech Interface
                </h2>
                <div className="w-full flex items-center justify-center overflow-x-auto">
                  <p className="inline-block text-2xl p-4">Add tags !</p>
                  {addingNewTag && (
                    <div className="flex justify-center items-center">
                      {countries
                        .filter(
                          (country) =>
                            (selectedSpeech ? !selectedSpeech?.tags?.includes(country.flag): !localTags.includes(country.flag))
                        )
                        .map((country) => (
                          <div
                            key={country.name}
                            className="cursor-pointer transition-transform text-center mx-2 inline-block"
                            onClick={() => {
                              if (!selectedSpeech) {
                                setLocalTags([...localTags, country.flag]);
                            }else {
                              selectedSpeech?.tags?.push(country.flag);
                            } setAddingNewTag(false);} }
                          >
                            <p className="w-12 text-2xl h-8 bg-gray-800 text-black rounded-lg">
                              {country.flag}
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
                  <button
                    className="inline-block bg-white text-black rounded-lg cursor-pointer min-w-12 h-8 font-semibold text-2xl"
                    onClick={() => setAddingNewTag(true)}
                  >
                    +
                  </button>
                  <nav className="inline-block h-8 ml-4">
                    {(selectedSpeech ? selectedSpeech.tags : localTags).map((tag, index) => (
                      <div
                        key={index}
                        className="cursor-pointer transition-transform text-center mx-2 inline-block"
                      >
                        <p className="w-12 text-2xl h-8 bg-white rounded-lg">
                          {tag}
                        </p>
                      </div>
                    ))}
                  </nav>
                </div>
                <textarea
                  className="w-full p-4 bg-gray-800 rounded-lg text-white h-12 align-top overflow-"
                  value={speechTitle}
                  onChange={handleSpeechChange}
                  placeholder="Write your speech title here..."
                  style={{ resize: "none" }}
                />
                <textarea
                  className="w-full p-4 bg-gray-800 rounded-lg text-white mt-4"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Write your speech here..."
                />
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  className="min-w-50 bg-white text-black p-4 rounded-lg cursor-pointer"
                  onClick={() => {
                    if (selectedSpeech) {
                      toast("Speech Updated");
                    } else {
                      toast("Speech Created");
                    }
                    handleAddSpeech();
                  }}
                >
                  {selectedSpeech ? "Update Speech" : "Add Speech"}
                </button>
              </div>
            </section>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
