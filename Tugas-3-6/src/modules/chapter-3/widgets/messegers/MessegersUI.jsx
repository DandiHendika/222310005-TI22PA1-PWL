import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

// --- KOMPONEN-KOMPONEN KECIL UNTUK UI ---

// 1. Komponen untuk setiap gelembung chat (Bubble)
const ChatBubble = ({ msg, profile, onSetEditingMessage, onSetDeletingMessage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isMyMessage = msg.from_id === profile.id;

  return (
    <div className={`d-flex mb-2 ${isMyMessage ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`p-2 rounded position-relative ${isMyMessage ? "bg-primary text-white" : "bg-light text-dark"}`}
        style={{ maxWidth: "70%", cursor: isMyMessage ? "pointer" : "default" }}
        onClick={() => isMyMessage && setShowDropdown(!showDropdown)}
      >
        <div>{msg.messages}</div>
        <div className="text-end" style={{ fontSize: "0.7rem", opacity: 0.8 }}>
          {moment(msg.date).format("HH:mm")}
        </div>

        {/* Dropdown Menu untuk Edit & Hapus */}
        {isMyMessage && showDropdown && (
          <div className="card position-absolute shadow-sm" style={{ top: '100%', right: 0, zIndex: 10, width: '100px' }}>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action p-2" onClick={() => onSetEditingMessage(msg)}>Edit</button>
                <button className="list-group-item list-group-item-action p-2 text-danger" onClick={() => onSetDeletingMessage(msg)}>Remove</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Komponen untuk form saat mengedit pesan
const EditForm = ({ msg, onUpdateMessage, onCancel }) => {
  const [editText, setEditText] = useState(msg.messages);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSave = () => {
    onUpdateMessage(msg.id, editText);
  };

  return (
    <div className="d-flex align-items-center bg-warning-subtle p-2 rounded mb-2">
      <input
        ref={inputRef}
        type="text"
        className="form-control form-control-sm me-2"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
      />
      <button className="btn btn-sm btn-success me-1" onClick={handleSave}>Save</button>
      <button className="btn btn-sm btn-secondary" onClick={onCancel}>Cancel</button>
    </div>
  );
};

// 3. Komponen untuk modal konfirmasi hapus
const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>Delete message?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- KOMPONEN UTAMA MessegersUI ---
export default function MessegersUI({
  profile,
  selectedUser,
  selectedChat,
  editingMessage,
  deletingMessage,
  onSetEditingMessage,
  onSetDeletingMessage,
  onUpdateMessage,
  onConfirmDelete,
  onSendChat, // Prop untuk mengirim pesan
}) {
  const [writeChat, setWriteChat] = useState("");
  const endOfMessagesRef = useRef(null);

  // Fungsi untuk auto-scroll ke pesan terakhir
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);
  
  // Handler untuk form pengiriman pesan
  const handlerSendChat = (e) => {
    e.preventDefault();
    onSendChat(writeChat); // Memanggil fungsi dari parent (ChapterThree)
    setWriteChat(""); // Mengosongkan input setelah pesan dikirim
  };

  // Tampilan jika belum ada kontak yang dipilih
  if (!selectedUser) {
    return <div className="d-flex h-100 justify-content-center align-items-center"><p>Pilih kontak untuk memulai percakapan.</p></div>;
  }

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="mb-0">Chats with {selectedUser.name}</h5>
      </div>
      <div className="card-body d-flex flex-column p-0">
        {/* Area untuk menampilkan semua pesan */}
        <div className="flex-grow-1 p-3" style={{ overflowY: "auto", height: "calc(100vh - 250px)" }}>
          {selectedChat.map((msg) =>
            // Render form edit atau bubble chat biasa secara kondisional
            editingMessage && editingMessage.id === msg.id ? (
              <EditForm key={msg.id} msg={msg} onUpdateMessage={onUpdateMessage} onCancel={() => onSetEditingMessage(null)} />
            ) : (
              <ChatBubble key={msg.id} msg={msg} profile={profile} onSetEditingMessage={onSetEditingMessage} onSetDeletingMessage={onSetDeletingMessage} />
            )
          )}
          <div ref={endOfMessagesRef} />
        </div>
        
        {/* Area untuk mengetik dan mengirim pesan */}
        <div className="chat-send bg-light p-3 border-top">
          <form method="post" autoComplete="off" onSubmit={handlerSendChat}>
            <div className="input-group">
                <input type="text" className="form-control" value={writeChat} onChange={(e) => setWriteChat(e.target.value)} placeholder="Ketik pesan..." />
                <button className="btn btn-primary" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Tampilkan modal konfirmasi jika ada pesan yang akan dihapus */}
      {deletingMessage && <DeleteModal onConfirm={onConfirmDelete} onCancel={() => onSetDeletingMessage(null)} />}
    </div>
  );
}