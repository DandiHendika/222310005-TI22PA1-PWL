import React, { useEffect, useMemo, useRef, useState } from "react";
import ChatBody from "./components/ChatBody";
import { ButtonPrimary, ButtonSecondary } from "./components/ButtonUI";
import moment from "moment";

export default function MessegersUI({ profile, selectedChat, selectedUser }) {
  // const chatArr = [
  //   { id: 1, message: "Hi", from: "Febry", date: "2024-02-22 10:30:00" },
  //   { id: 2, message: "Iya", from: "Isnan", date: "2024-02-22 10:35:00" },
  //   {
  //     id: 3,
  //     message: "Apakah itu Micro-Frontend ?",
  //     from: "Febry",
  //     date: "2024-02-22 10:50:00",
  //   },
  //   { id: 4, message: "Kaga tau", from: "Isnan", date: "2024-02-22 10:52:00" },
  //   { id: 5, message: "Apaan dah", from: "Isnan", date: "2024-02-22 10:52:00" },
  //   {
  //     id: 6,
  //     message:
  //       "Arsitektur pada bagian FrontEnd aplikasi yang berpusat pada independensi suatu fitur dengan fitur lainnya.",
  //     from: "Febry",
  //     date: "2024-02-22 11:00:00",
  //   },
  //   { id: 7, message: "Bijiiii", from: "Isnan", date: "2024-02-22 12:12:00" },
  // ];

  const [myChat, setMyChat] = useState([]);
  const [writeChat, setWriteChat] = useState("");

  const endOfMessegesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessegesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const ResultMessageData = useMemo(() => {
    let computedData = myChat.map((msg) => ({
      ...msg,
      date_fmt: moment(msg.date).format("YYYY-MM-DD"),
      isOutgoing: msg.from_id === profile.id,
    }));

    // if (search) {
    //   computedData = computedData.filter((listData) => {
    //     return Object.keys(listData).some((key) =>
    //       listData[key].toString().toLowerCase().includes(search)
    //     );
    //   });
    // }

    return computedData;
  }, [myChat, profile.id]);

  const handlerSendChat = (e) => {
    e.preventDefault();

    const objChat = {
      id: 99,
      message: writeChat,
      from: "Febry",
      date: moment().format("YYYY-MMM-DD HH:mm"),
    };
    setMyChat([...myChat, objChat]);
    setWriteChat("");
  };

  useEffect(() => {
    setMyChat(selectedChat);
    scrollToBottom();
  }, [selectedChat]);

  return (
    <div className="card">
      <div className="card-header d-flex flex-row justify-content-between">
        <h3 className="card-title align-items-start flex-column">
          <span className="fw-bold fs-5 text-secondary mb-2">Chats</span>
        </h3>
        <div className="card-toolbar">
          <ButtonSecondary
            items={{
              title: "Create new chat",
              btn_class: "btn-icon btn-clear",
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </ButtonSecondary>
        </div>
      </div>
      <div className="card-body">
        {ResultMessageData.length > 0 ? (
          <>
            <div
              className="chat-message px-2 bg-light-primary"
              style={StylesMesseger.chatBox}
            >
              <ChatBody data={myChat} />
              <div ref={endOfMessegesRef} />
            </div>
            <div className="chat-send bg-light p-3">
              <form
                method="post"
                autoComplete="off"
                onSubmit={(e) => handlerSendChat(e)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    className="form-control me2"
                    autoFocus={true}
                    value={writeChat}
                    onChange={(e) => setWriteChat(e.target.value)}
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
          </>
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}

const EmptyChat = () => {
  return (
    <div>
      <div className="info text-center">
        <h1>No Conversations</h1>
        <p>You didn't made any conversation yet, please select username</p>
        <span className="badge badge-primary">Start a chat</span>
      </div>
    </div>
  );
};

const StylesMesseger = {
  chatBox: {
    minHeight: "200px",
    maxHeight: "45vh",
    overflowY: "auto",
  },
};
