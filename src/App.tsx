import React, { useLayoutEffect, useState } from "react";
import styles from "./App.module.scss";
import DialogInsertRoomInfos from "./components/DialogInsertRoomInfos";
import { hasEmptyValue } from "./utils";
import { useRoomInfoStore } from "./store/stores/roomInfoStore";
import classNames from "classnames/bind";

export interface RoomInfo {
  roomNumber: string;
  occupants: number;
  checkInDate: string;
  checkOutDate: string;
  paymentDate?: string;
}

const App: React.FC = () => {
  const cn = classNames.bind(styles);
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
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

  useLayoutEffect(() => {
    const roomInfo = localStorage.getItem("roomInfo-storage");
    console.log(roomInfo);
  }, []);
  return (
    <div className={cn("app")}>
      <div className={cn("header")}>
        <div className={cn("header-title")}>
          <h1>고시 POS </h1>
        </div>
        <div className={cn("button-container")}>
          <button className={cn("styled-button")} onClick={handleClickOpen}>
            입실 정보 추가
          </button>
          {/* <button className={cn("styled-button")} onClick={handleClickOpen}>
            고객 정보 추가
          </button> */}
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
      <div className={cn("layer-navigation")}>
        {/* TODO: floor component 만들어서 넣기  */}
        <div>1층</div>
      </div>

      {/* TODO: RoomCard Componenet로 바꾸기 */}
      <div className={cn("room-list")}>
        {roomInfos.map((roomInfo, index) => (
          <div className={cn("room-card")} key={index}>
            <p>방 번호: {roomInfo.roomNumber}</p>
            <p>입실 인원: {roomInfo.occupants}</p>
            <p>입실 날짜: {roomInfo.checkInDate}</p>
            <p>퇴실 날짜: {roomInfo.checkOutDate}</p>
            <p>입금 날짜: {roomInfo.paymentDate}</p>
            <button>수정</button>
            <button>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
