import React, { useState } from "react";
import "./App.scss";
import DialogInsertRoomInfos from "./components/DialogInsertRoomInfos";
import { hasEmptyValue } from "./utils";
import { useRoomInfoStore } from "./store/stores/roomInfoStore";

export interface RoomInfo {
  roomNumber: string;
  occupants: number;
  checkInDate: string;
  checkOutDate: string;
  paymentDate?: string;
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { roomInfos, setRoomInfos } = useRoomInfoStore();
  // const [roomInfos, setRoomInfos] = useState<RoomInfo[]>([]);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    roomNumber: "",
    occupants: 0,
    checkInDate: "",
    checkOutDate: "",
    paymentDate: "",
  });
  const [error, setError] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomInfo({
      ...roomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (roomInfos.some((room) => room.roomNumber === roomInfo.roomNumber)) {
      setError("방 번호가 이미 존재합니다.");
      return;
    }
    if (hasEmptyValue(roomInfo)) {
      setError("빈 값이 존재합니다!");
      return;
    }

    setRoomInfos([...roomInfos, roomInfo]);
    setOpen(false);
    setRoomInfo({
      roomNumber: "",
      occupants: 0,
      checkInDate: "",
      checkOutDate: "",
    });
    setError("");
  };

  return (
    <div className="app">
      <div className="header">
        <div className="header-title">
          <h1>고시원 관리 시스템</h1>
        </div>
        <div className="button-container">
          <button className="styled-button" onClick={handleClickOpen}>
            입실 정보 추가
          </button>
        </div>
      </div>

      {open && (
        <DialogInsertRoomInfos
          error={error}
          handleChange={handleChange}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          roomInfo={roomInfo}
        />
      )}

      <div className="room-list">
        {roomInfos.map((roomInfo, index) => (
          <div className="room-card" key={index}>
            <p>방 번호: {roomInfo.roomNumber}</p>
            <p>입실 인원: {roomInfo.occupants}</p>
            <p>입실 날짜: {roomInfo.checkInDate}</p>
            <p>퇴실 날짜: {roomInfo.checkOutDate}</p>
            <p>입금 날짜: {roomInfo.paymentDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
