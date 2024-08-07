'use client'
import React, { useEffect, useRef } from 'react'

const MOCK_MESSAGES = [
  { role: "assistant", content: "Hello, how can I assist you today?" },
  { role: "user", content: "What is your name?" },
  { role: "assistant", content: "My name is Assistant. Nice to meet you!" },
  { role: "user", content: "How old are you?" },
  { role: "assistant", content: "I am 25 years old. Nice to meet you too!" },
  { role: "user", content: "What is your favorite color?" },
  { role: "assistant", content: "My favorite color is blue. Nice to meet you too!" },
]

const Chatbox = () => {
  const [open, setOpen] = React.useState(false)
  const [isChatboxVisible, setIsChatboxVisible]= React.useState(true)
  const [messages, setMessages] = React.useState(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = React.useState('')
  const messagesEndRef = useRef<null | HTMLDivElement>(null); 
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    console.log('scrollToBottom')
    scrollToBottom();
  }, [messages]);
  
  return (
    <div
      className='fixed z-20 bottom-0  sm:right-0 sm:mx-4 bg-white text-black rounded-t-md shadow-lg
        w-full max-h-96 overflow-y-auto sm:w-72 
      '
    >
      {/* header */}
      <div
        className='sticky top-0 left-0 right-0 p-4 text-lg font-bold bg-gradient-to-b from-teal-400 to-blue-500 
        flex justify-between items-center'
      >
        {/* left */}
        <div

        >
          Assistant
        </div>
        {/* right */}
        <div

          className='space-x-4'
        >
          <button

            onClick={() => setIsChatboxVisible(!isChatboxVisible)}
          >
            {isChatboxVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
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
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 15l-7.5-7.5L4.5 15"
                />
              </svg>
            )}

          </button>
          {/* <button

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </div>
      </div>

      {/* body */}
      {isChatboxVisible && (
        <div

        >
          {/* chat messages */}
          <div
            className='flex flex-col px-2 pt-2 space-y-2 overflow-y-auto w-full '
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`static p-3 w-fit text-sm rounded-lg
                  ${message.role === 'user' 
                  ? 'self-end ml-8 bg-blue-500 text-white ' 
                  : 'mr-8 bg-gray-300'}

                `}
              >
                  {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* chat input box */}
          <div
            className='sticky bottom-0 left-0 right-0 p-2 bg-gray-100'
          >
            <input
              type="text"
              className="w-full pl-3 pr-8 pb-[2px] h-8 text-sm border border-gray-300 rounded-full bg-white text-black"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMessages([...messages, { role: 'user', content: newMessage }])
                  setNewMessage('')
                }
              }}
            />
            <button
              className="w-6 h-6 pl-1 bg-blue-500 text-white rounded-full absolute right-3 top-3"
              onClick={() => {
                setMessages([...messages, { role: 'user', content: newMessage }])
                setNewMessage('')
              }}
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
        </div>
      )}
    </div>
  )
}

export default Chatbox