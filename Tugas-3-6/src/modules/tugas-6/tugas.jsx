import React, { useState } from "react";
import MessegersUI from "./messegers/MessegersUI";
import { ContactUI } from "./contacts";
import { Messegers, MyFriend } from "./constanta/DataChat";
import { getSentiment } from "./constanta/sentiment";
import { censorText } from "./constanta/censor";
import moment from "moment";

export default function Tugas() {
  // --- STATE MANAGEMENT ---
  const myProfile = { id: "0419029203", name: "Febry" };
  const [friends] = useState(MyFriend);
  const [allMessages, setAllMessages] = useState(Messegers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [isReading, setIsReading] = useState(false); // State untuk TTS

  // --- HANDLERS ---

  const HandlerSelectedChat = (data) => {
    handleStopReading(); // Hentikan pembacaan saat ganti user
    setSelectedUser(data);
    const findChatByUserID = allMessages.find((item) => item.user_id === data.user_id);
    setSelectedChat(findChatByUserID ? findChatByUserID.messages : []);
    setEditingMessage(null);
    setDeletingMessage(null);
  };

  const handleSendChat = (chatText) => {
    if (!chatText.trim()) return;
    const initialSentiment = getSentiment(chatText);
    let finalText = chatText;
    let finalSentiment = initialSentiment;

    if (initialSentiment === 'Negative') {
      finalText = censorText(chatText);
      finalSentiment = 'Neutral';
    }

    const newMessage = {
      id: Date.now(),
      from_id: myProfile.id,
      to_user_id: selectedUser.user_id,
      messages: finalText,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      sentiment: finalSentiment,
    };
    
    setSelectedChat(prevChats => [...prevChats, newMessage]);
  };

  const handleUpdateMessage = (messageId, newMessage) => {
    if (!newMessage.trim()) return;
    const sentiment = getSentiment(newMessage);
    const updatedChat = selectedChat.map((msg) =>
      msg.id === messageId ? { ...msg, messages: newMessage, sentiment: sentiment } : msg
    );
    setSelectedChat(updatedChat);
    setEditingMessage(null);
  };

  const handleDeleteMessage = () => {
    if (!deletingMessage) return;
    const filteredChat = selectedChat.filter((msg) => msg.id !== deletingMessage.id);
    setSelectedChat(filteredChat);
    setDeletingMessage(null);
  };

  // --- HANDLER UNTUK TEXT-TO-SPEECH ---
  const handleStopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const handleReadAloud = () => {
    if (!selectedChat || selectedChat.length === 0) return alert("Tidak ada chat untuk dibacakan.");
    
    handleStopReading();

    const groupedMessages = [];
    if (selectedChat.length > 0) {
      groupedMessages.push({ senderId: selectedChat[0].from_id, texts: [selectedChat[0].messages] });
      for (let i = 1; i < selectedChat.length; i++) {
        const currentMsg = selectedChat[i];
        const lastGroup = groupedMessages[groupedMessages.length - 1];
        if (currentMsg.from_id === lastGroup.senderId) {
          lastGroup.texts.push(currentMsg.messages);
        } else {
          groupedMessages.push({ senderId: currentMsg.from_id, texts: [currentMsg.messages] });
        }
      }
    }

    const script = groupedMessages.map(group => {
      const senderName = group.senderId === myProfile.id ? "Anda" : selectedUser.name;
      const fullText = group.texts.join('. ');
      return `${senderName} berkata: ${fullText}`;
    }).join('. \n');

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, browser Anda tidak mendukung fitur Text-to-Speech.");
    }
  };

  // --- RENDER ---
  return (
    <div id="chapter-three">
      <h2 className="text-center my-4">Chapter Three: Final Version</h2>
      <div className="px-3">
        <div className="row">
          <div className="col-2 col-lg-3 col-xxl-4 px-0">
            <ContactUI my_account={myProfile} friends={friends} selectedUser={selectedUser} HandlerSelectedChat={HandlerSelectedChat} />
          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            <MessegersUI
              profile={myProfile} selectedUser={selectedUser} selectedChat={selectedChat}
              editingMessage={editingMessage} deletingMessage={deletingMessage}
              onSetEditingMessage={setEditingMessage} onSetDeletingMessage={setDeletingMessage}
              onUpdateMessage={handleUpdateMessage} onConfirmDelete={handleDeleteMessage}
              onSendChat={handleSendChat}
              isReading={isReading}
              onReadAloud={handleReadAloud}
              onStopReading={handleStopReading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}