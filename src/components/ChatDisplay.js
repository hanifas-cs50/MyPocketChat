import { useEffect, useState } from "react";
import pb from "../lib/pocketbase"

export default function ChatDisplay({ userData }) {
  const [messages, setMessages] = useState([]);

  // fetch 50 latest messages
  useEffect(() => {
    let ignore = false;
    pb.autoCancellation(false);

    async function fetchMessages() {
      const result = await pb.collection("messages").getList(1, 50, {
        sort: "created",
        expand: "user_id",
      });
      setMessages(result.items);
    };
    if (!ignore) {
      fetchMessages();
    };

    return () => {
      ignore = true;
    };
  }, []);

  // subscribe to changes
  useEffect(() => {
    pb.collection("messages").subscribe("*", async function ({ action, record }) {
      if (action === "create") {
        const user_id = await pb.collection("users").getOne(record.user_id);
        record.expand = { user_id };
        setMessages(prevMessages => [...prevMessages, record]);
      }
      if (action === "delete") {
        setMessages(prevMessages => prevMessages.filter((m) => m.id !== record.id))
      }
    });
    
    return () => {
      pb.collection("messages").unsubscribe();
      document.getElementById("anchor").scrollIntoView({behavior: "instant", block:"end"});
    }
  }, [messages])
  console.log(messages);
  
  return (
    <div className="p-4 grow overflow-y-auto" id="chat_container">
      {
        messages ?
          messages.map((item) => (
          <div key={ item.id } className={`w-full grid ${item.user_id === userData ? "justify-end" : ""} mb-3`}>
            { item.user_id !== userData ? <div className="w-max px-2 pt-2 pb-0.5 font-bold text-sm rounded-t-md bg-blue-600/50">@{item.expand?.user_id?.username}</div> : null }
            <div className={`w-max min-w-36 py-2 px-4 break-all font-medium text-wrap rounded-md ${ item.user_id === userData ? "bg-green-800" : "rounded-tl-none bg-blue-600/50"}`}>
              { item.message }
              <span className={`block mt-1 text-zinc-300 text-xs${ item.user_id === userData ? "" : " text-right"}`}> { new Date(item.created).toLocaleTimeString() }</span>
            </div>
          </div>
          ))
        : null
      }
      <span id="anchor"></span>
    </div>
  )
};

// {item.expand?.user_id?.username}