import React, { useState } from "react";
import MessegersUI from "./widgets/messegers/MessegersUI";
import { ContactUI } from "./widgets/contacts";
import { Messegers, MyFriend } from "./widgets/constanta/DataChat";
import moment from "moment";

export default function ChapterThree() {
  const myProfile = { id: "0419029203", name: "Febry" };

  // State untuk data dan UI
  const [friends] = useState(MyFriend);
  const [allMessages, setAllMessages] = useState(Messegers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);

  // State untuk fitur edit dan hapus
  const [editingMessage, setEditingMessage] = useState(null); // Menyimpan objek pesan yang diedit
  const [deletingMessage, setDeletingMessage] = useState(null); // Menyimpan objek pesan yang akan dihapus

  const HandlerSelectedChat = (data) => {
    setSelectedUser(data);
    const findChatByUserID = allMessages.find((item) => item.user_id === data.user_id);
    setSelectedChat(findChatByUserID ? findChatByUserID.messages : []);
  };

  // --- HANDLER UNTUK FITUR BARU ---

  const handleUpdateMessage = (messageId, newMessage) => {
    if (!newMessage.trim()) return; // Jangan simpan jika kosong

    // SIMULASI: HTTP PUT Request ke Middleware/API
    console.log(`[PUT] Mengupdate pesan ID: ${messageId} dengan teks: "${newMessage}"`);

    const updatedChat = selectedChat.map((msg) => {
      if (msg.id === messageId) {
        return { ...msg, messages: newMessage };
      }
      return msg;
    });

    setSelectedChat(updatedChat);
    setEditingMessage(null); // Keluar dari mode edit
  };

  const handleDeleteMessage = () => {
    if (!deletingMessage) return;

    // SIMULASI: HTTP DELETE Request ke Middleware/API
    console.log(`[DELETE] Menghapus pesan ID: ${deletingMessage.id}`);

    const filteredChat = selectedChat.filter((msg) => msg.id !== deletingMessage.id);

    setSelectedChat(filteredChat);
    setDeletingMessage(null); // Tutup modal konfirmasi
  };

  const handleSendChat = (chatText) => {
    if (!chatText.trim()) return;

    const newMessage = {
      id: Date.now(), // ID unik sementara
      from_id: myProfile.id,
      to_user_id: selectedUser.user_id,
      messages: chatText,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    
    // Tambahkan pesan baru ke daftar chat yang sedang aktif
    setSelectedChat(prevChats => [...prevChats, newMessage]);

    // (Opsional tapi direkomendasikan) Anda juga bisa memperbarui state utama
    // agar data tetap konsisten jika pengguna berpindah chat.
};

  return (
    <div id="chapter-three">
      <h2 className="text-center my-4">Chapter Three: The Messengers with Edit & Delete</h2>
      <div className="px-3">
        <div className="row">
          <div className="col-2 col-lg-3 col-xxl-4 px-0">
            <ContactUI
              my_account={myProfile}
              friends={friends}
              selectedUser={selectedUser}
              HandlerSelectedChat={HandlerSelectedChat}
            />
          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            <MessegersUI
              profile={myProfile}
              selectedUser={selectedUser}
              selectedChat={selectedChat}
              // Props untuk fitur edit & delete
              editingMessage={editingMessage}
              deletingMessage={deletingMessage}
              onSetEditingMessage={setEditingMessage}
              onSetDeletingMessage={setDeletingMessage}
              onUpdateMessage={handleUpdateMessage}
              onConfirmDelete={handleDeleteMessage}
              onSendChat={handleSendChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}