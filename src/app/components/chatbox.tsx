import React, { useEffect, useRef } from "react";

type Message = {
  role: string;
  content: string;
};

/**
 * chat box component with messages and header and show/hide button
 * will auto scroll to bottom when messages variable changes
 * @returns {JSX.Element}
 */

type ChatboxProps = {
  messages: Message[],
  isChatboxVisible: boolean,
  setIsChatboxVisible: (isVisible: boolean) => void,
  newMessage: string,
  setNewMessage: (newMessage: string) => void,
  sendMessage: (event: React.FormEvent) => void,
  handleKeyPress: (event: React.KeyboardEvent) => void,
  messagesEndRef: React.RefObject<HTMLDivElement>,
};

const Chatbox = (
  {
    messages,
    isChatboxVisible,
    setIsChatboxVisible,
    newMessage,
    setNewMessage,
    sendMessage,
    handleKeyPress,
    messagesEndRef,
  } : ChatboxProps
): JSX.Element => {
  return (
    <div
      className="fixed z-20 bottom-0 right-4 sm:right-8 md:right-12
        lg:right-[calc(8%)] 2xl:right-[calc(15%)]
        sm:mx-4 bg-white text-black rounded-t-md shadow-lg
        max-h-svh w-72
      "
    >
      {/* header */}
      <div
        className="sticky top-0 inset-x-0 p-4 text-lg font-bold bg-gradient-to-b from-teal-400 to-blue-500 
        flex justify-between items-center h-12"
      >
        {/* left */}
        <div className="text-white">Assistant</div>
        {/* right */}
        <div className="space-x-4">
          <button onClick={() => setIsChatboxVisible(!isChatboxVisible)}>
            {isChatboxVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 9l7.5 7.5L19.5 9"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 15l-7.5-7.5L4.5 15"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* body */}
      {isChatboxVisible && (
        <>
        <div className="h-[400px] overflow-y-auto ">
          {/* chat messages */}
          {/* <div className="flex flex-col px-2 pt-2 overflow-y-auto space-y-2 w-full justify-end border-4 border-purple-500"> */}
          <div className="flex flex-col px-2 pt-2 space-y-2 w-full min-h-[400px] justify-end ">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`static p-3 w-fit text-sm rounded-lg
                  ${
                    message.role === "user"
                      ? "self-end ml-8 bg-blue-500 text-white "
                      : "mr-8 bg-gray-200"
                  }

                `}
              >
                {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
          {/* chat input box */}
        <div className="sticky bottom-0 left-0 right-0 p-2 bg-gray-100">
          <input
            type="text"
            className="w-full pl-3 pr-8 pb-[2px] h-8 text-sm border border-gray-300 rounded-full bg-white text-black"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className={`w-6 h-6 pl-1 text-white rounded-full absolute right-3 top-3 
              ${newMessage ? "bg-blue-500" : "bg-gray-300"}
              `}
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default Chatbox;
