import React, { useState } from "react";
import MessegersUI from "./widgets/messegers/MessegersUI";
import { ContactUI } from "./widgets/contacts";
import { Messegers, MyFriend } from "./widgets/constanta/DataChat";
import moment from "moment";

export default function ChapterTwo() {
  const myProfile = { id: "0419029203", name: "Febry" };

  const [selectedUser, setSelectedUser] = useState(null);
  const [allMessages, setAllMessages] = useState(Messegers);
  const [selectedChat, setSelectedChat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const HandlerSelectedChat = (data) => {
    setSelectedUser(data);
    const findChatByUserID = allMessages.find(
      (item) => item.user_id === data.user_id
    );
    setSelectedChat(findChatByUserID ? findChatByUserID.messages : []);
    setSearchQuery("");
  };

  const handleSendChat = (chatText) => {
    if (!chatText.trim()) return;

    const newChat = {
      id: Date.now(),
      messages: chatText, // FIX 1: Gunakan 'messages'
      sender_id: myProfile.id,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    
    setSelectedChat(prevChats => [...prevChats, newChat]);
  };

  const filteredChat = selectedChat.filter(message =>
    (message.messages || '').toLowerCase().includes(searchQuery.toLowerCase()) // FIX 2: Gunakan 'messages'
  );

  return (
    <div id="chapter-two">
      <h1 className="text-center my-4">Chapter Two: The Messengers</h1>
      <div className="px-3">
        <div className="row">
          <div className="col-2 col-lg-3 col-xxl-4 px-0">
            <ContactUI
              my_account={myProfile}
              friends={MyFriend}
              selectedUser={selectedUser}
              HandlerSelectedChat={HandlerSelectedChat}
            />
          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            <MessegersUI
              profile={myProfile}
              selectedUser={selectedUser}
              selectedChat={filteredChat}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSendChat={handleSendChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}