"use client";
import React, { useEffect, useRef } from "react";
import Chatbox from "./chatbox";
import { logClosingChat, logOpeningChat, logSendMessage } from "../../../lib/ga/gtag";

const MOCK_MESSAGES: Message[] = [
  // { role: "assistant", content: "Hello, how can I assist you today?" },
  // { role: "user", content: "What is your name?" },
  // { role: "assistant", content: "My name is Assistant. Nice to meet you!" },
  // { role: "user", content: "How old are you?" },
  // { role: "assistant", content: "I am 25 years old. Nice to meet you too!" },
  // { role: "user", content: "What is your favorite color?" },
  // {
  //   role: "assistant",
  //   content: "My favorite color is blue. Nice to meet you too!",
  // },
  { role: 'assistant', content: 'Hello, how can I assist you today?' },
  { role: 'user', content: 'primary colors' },
  { role: 'assistant', content: 'Primary colors are the foundation from which all other colors are created. They include red, blue, and yellow. These colors cannot be made by mixing other colors together and are essential in various color applications, ranging from digital design to painting and printing.' },
  { role: 'user', content: 'where is germany' },
  { role: 'assistant', content: 'Germany is located in Central Europe. It shares borders with Denmark to the north, Poland and the Czech Republic to the east, Austria to the southeast, Switzerland to the south, France to the southwest, Luxembourg, Belgium, and the Netherlands to the west. The capital and largest city of Germany is Berlin.' },
  { role: 'user', content: 'where is ukraine' },
  { role: 'assistant', content: 'Ukraine is located in Eastern Europe. It is bordered by Russia to the northeast, Belarus to the north, Poland, Slovakia, and Hungary to the west, Romania and Moldova to the southwest, and the Black Sea and Sea of Azov to the south. Kyiv is the capital and largest city. Ukraine is one of the largest countries in Europe by area.' },
  { role: 'user', content: 'how is you' },
  { role: 'assistant', content: "I'm just a computer program, so I don't have feelings, but I'm here and ready to assist you with any information you need! How can I assist you today?" }
];

const CONTEXT_LENGTH = 2;

/**
 * @param {string} role
 * @param {string} content
 */
type Message = {
  role: string;
  content: string;
};

const BedrockAiAssistant = () => {
  const [isChatboxVisible, setIsChatboxVisible] = React.useState(true);
  // const [messages, setMessages] = React.useState<Message[]>(MOCK_MESSAGES);
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "assistant", content: "Hello, how can I assist you today?" },
  ]);
  const [conversationContext, setConversationContext] = React.useState<Message[]>([
    { role: "assistant", content: "Hello, how can I assist you today?" }
  ]);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    console.log("scrollToBottom");
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage) return;

    setNewMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: newMessage }, // Add the user's message to the chat
      { role: "assistant", content: "" }, // Add a placeholder for the assistant's response
    ]);
    setConversationContext((conversationContext) => [
      ...conversationContext.slice(Math.max(conversationContext.length - CONTEXT_LENGTH, 0)), // keep only the last 4 messages
      { role: "user", content: newMessage },
      { role: "assistant", content: "" },
    ]);
    try {
      const response = await fetch("/api/bedrock/claude/converse", {
      // const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ...conversationContext,
          { role: "user", content: newMessage },
        ]),
      });

      if (!response.ok || !response.body) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let lastMessageContent = ""; // append the content of the streamed response chunks to this string

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        let text = decoder.decode(value, { stream: true }); // decode the streamed response chunks
        lastMessageContent += text;
        setMessages((messages) => {
          let otherMessages = messages.slice(0, messages.length - 1);
          let lastMessage = messages[messages.length - 1];
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },  // again append the content of the streamed response chunks to the last message
          ];
        });
      }
      setConversationContext((conversationContext) => {
        let lastMessage = conversationContext[conversationContext.length - 1];
        let otherMessages = conversationContext.slice(0, -1);
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessageContent },
        ];
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }

    logSendMessage('sendMessage');
    // setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  const toggleHandle = () => {
    if (isChatboxVisible) {
      console.log('closing chat AI toggleHandle');
      logClosingChat('closing chat AI toggleHandle');
    }
    else {
      console.log('opening chat AI toggleHandle');
      logOpeningChat('opening chat AI toggleHandle');
    }
    setIsChatboxVisible(!isChatboxVisible);
  };
  
  return (
    <div>
      <Chatbox
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleKeyPress={handleKeyPress}
        toggleHandle={toggleHandle}
        isChatboxVisible={isChatboxVisible}
        messagesEndRef={messagesEndRef}
      />
    </div>
  )
}

export default BedrockAiAssistant