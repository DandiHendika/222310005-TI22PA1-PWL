import moment from "moment";
import React from "react";

export default function ChatBody({ data }) {
  const itsme = "Febry";

  // Fungsi untuk mengelompokkan chat berdasarkan tanggal
  const groupChatByDate = (chatList) => {
    const grouped = {};
    chatList.forEach((chat) => {
      const dateKey = moment(chat.date).format("YYYY-MM-DD");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(chat);
    });
    return grouped;
  };

  const groupedChats = groupChatByDate(data);

  return (
    <div className="chat-items">
      {Object.entries(groupedChats).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="text-center text-muted my-2">
            {moment(dateKey).isSame(moment(), "day")
              ? "Today"
              : moment(dateKey).format("DD MMM YYYY")}
          </div>

          {messages.map((value, index) => (
            <div
              className="chat-item"
              style={styleChatItems.chatBubleItems}
              key={index}
            >
              <div
                className="chat text-white rounded my-2 p-2"
                style={
                  value.from === itsme
                    ? styleChatItems.chatBubleSender
                    : styleChatItems.chatBubleReceiver
                }
              >
                <span className="me-3">{value.message}</span>
                <span className="chat-date" style={{ fontSize: "11px" }}>
                  {moment(value.date).format("HH:mm")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const styleChatItems = {
  chatBubleItems: {
    display: "flex",
    flexDirection: "column",
  },
  chatBubleSender: {
    textAlign: "right",
    backgroundColor: "#a198a7",
    alignSelf: "flex-end",
  },
  chatBubleReceiver: {
    backgroundColor: "#a83aef",
    alignSelf: "flex-start",
  },
};
