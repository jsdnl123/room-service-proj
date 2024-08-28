import React, { useState } from "react";
import "./App.scss";

interface RoomInfo {
  roomNumber: string;
  occupants: number;
  checkInDate: string;
  checkOutDate: string;
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [roomInfos, setRoomInfos] = useState<RoomInfo[]>([]);
  const [tempRoomInfo, setTempRoomInfo] = useState<RoomInfo>({
    roomNumber: "",
    occupants: 0,
    checkInDate: "",
    checkOutDate: "",
  });
  const [error, setError] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempRoomInfo({
      ...tempRoomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (roomInfos.some((room) => room.roomNumber === tempRoomInfo.roomNumber)) {
      setError("방 번호가 이미 존재합니다.");
      return;
    }
    setRoomInfos([...roomInfos, tempRoomInfo]);
    setOpen(false);
    setTempRoomInfo({
      roomNumber: "",
      occupants: 0,
      checkInDate: "",
      checkOutDate: "",
    });
    setError("");
  };

  return (
    <div className="app">
      <header className="sticky-header">
        {/* <h1>Room Management System</h1> */}
        <h1>고시원 관리 시스템</h1>
        <div className="add-button-container">
          <button className="styled-button" onClick={handleClickOpen}>
            입실 정보 추가
          </button>
        </div>
      </header>

      {open && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>입실 정보 입력</h2>
            <input
              name="roomNumber"
              placeholder="방 번호"
              value={tempRoomInfo.roomNumber}
              onChange={handleChange}
            />
            <input
              name="occupants"
              type="number"
              placeholder="입실 인원"
              value={tempRoomInfo.occupants}
              onChange={handleChange}
            />
            <input
              name="checkInDate"
              type="date"
              value={tempRoomInfo.checkInDate}
              onChange={handleChange}
            />
            <input
              name="checkOutDate"
              type="date"
              value={tempRoomInfo.checkOutDate}
              onChange={handleChange}
            />
            {error && <p className="error-text">{error}</p>}
            <div className="dialog-actions">
              <button onClick={handleClose}>취소</button>
              <button onClick={handleSubmit}>추가</button>
            </div>
          </div>
        </div>
      )}

      <div className="room-list">
        {roomInfos.map((roomInfo, index) => (
          <div className="room-card" key={index}>
            <p>방 번호: {roomInfo.roomNumber}</p>
            <p>입실 인원: {roomInfo.occupants}</p>
            <p>입실 날짜: {roomInfo.checkInDate}</p>
            <p>퇴실 날짜: {roomInfo.checkOutDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
