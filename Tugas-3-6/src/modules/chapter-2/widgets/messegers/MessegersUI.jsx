import React, { useEffect, useRef } from "react";
import { ButtonPrimary } from "./components/ButtonUI";
import moment from "moment";

export default function MessegersUI({ profile, selectedChat, selectedUser, searchQuery, onSearchChange, onSendChat }) {
  const [writeChat, setWriteChat] = React.useState("");
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlerSendChat = (e) => {
    e.preventDefault();
    onSendChat(writeChat);
    setWriteChat("");
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);
  
  if (!selectedUser) {
    return <EmptyChat isStart={true} />;
  }

  return (
    <div className="card h-100">
      <div className="card-header d-flex flex-row justify-content-between align-items-center">
        <h3 className="card-title mb-0">{selectedUser.name}</h3>
        <div className="card-toolbar" style={{ minWidth: '250px' }}>
          <div className="input-group">
            <span className="input-group-text bg-light border-0">🔍</span>
            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Cari di percakapan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card-body d-flex flex-column p-0">
        <div className="flex-grow-1 p-3" style={StylesMesseger.chatBox}>
          {selectedChat.length > 0 ? (
            <ChatBody data={selectedChat} profile={profile} />
          ) : (
            <EmptyChat isStart={false} />
          )}
          <div ref={endOfMessagesRef} />
        </div>
        
        <div className="chat-send bg-light p-3 border-top">
          <form
            method="post"
            autoComplete="off"
            onSubmit={handlerSendChat}
          >
            <div className="d-flex justify-content-between align-items-center">
              <input
                type="text"
                className="form-control me-2"
                autoFocus={true}
                value={writeChat}
                onChange={(e) => setWriteChat(e.target.value)}
                placeholder="Ketik pesan..."
              />
              <ButtonPrimary
                items={{
                  title: "Send",
                  btn_class: "btn-icon btn-primary",
                  type: "submit",
                }}
              >
                <i className="bi bi-send"></i>
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const ChatBody = ({ data, profile }) => {
  return data.map((chat) => (
    <div
      key={chat.id}
      className={`d-flex mb-2 ${chat.from_id === profile.id ? 'justify-content-end' : 'justify-content-start'}`}
    >
      <div
        className={`p-2 rounded ${chat.from_id === profile.id ? 'bg-primary text-white' : 'bg-light text-dark'}`}
        style={{ maxWidth: '70%' }}
      >
        <div>{chat.messages}</div> {/* FIX 3: Gunakan 'messages' */}
        <div className="text-end" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
          {moment(chat.date).format('HH:mm')}
        </div>
      </div>
    </div>
  ));
};


const EmptyChat = ({ isStart }) => {
  return (
    <div className="d-flex h-100 justify-content-center align-items-center text-center">
      {isStart ? (
        <div>
          <h1>Pilih Kontak</h1>
          <p>Pilih kontak dari sisi kiri untuk melihat percakapan.</p>
        </div>
      ) : (
        <div>
          <h1>Tidak ada pesan</h1>
          <p>Tidak ada pesan yang cocok dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
};

const StylesMesseger = {
  chatBox: {
    height: "calc(100vh - 250px)",
    overflowY: "auto",
  },
};