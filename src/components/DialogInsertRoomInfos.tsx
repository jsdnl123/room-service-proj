import classNames from "classnames/bind";
import { RoomInfo } from "../App";
import styles from "./../App.module.scss";
import { useState } from "react";
import { hasEmptyValue } from "../utils";
import useDialogStore from "../store/stores/dialogStore";
import { useRoomInfoStore } from "../store/stores/roomInfoStore";

interface DialogInsertProps {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleClose: () => void;
  handleSubmit: () => void;
  roomInfo: RoomInfo;
  error: string;
}

const DialogInsertRoomInfos = (props: DialogInsertProps) => {
  const cn = classNames.bind(styles);
  const { roomInfos, setRoomInfos } = useRoomInfoStore();
  const { openDialog, closeDialog } = useDialogStore();
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    roomNumber: "",
    occupants: 0,
    checkInDate: "",
    checkOutDate: "",
    paymentDate: "1",
  });
  const [error, setError] = useState("");

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
  const handleClose = () => {
    closeDialog("dialogInsertRoomInfos");
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
    closeDialog("dialogInsertRoomInfos");
    setRoomInfo({
      roomNumber: "",
      occupants: 0,
      checkInDate: "",
      checkOutDate: "",
    });
    setError("");
  };

  return (
    <div className={cn("dialog-insert-roominfos")}>
      <div className={cn("dialog-content")}>
        <h2>입실 정보 입력</h2>
        <div className={cn("dialog-sub-content")}>
          <span className={cn("fixed-span")} style={{ marginRight: "1rem" }}>
            방 번호
          </span>
          <input
            name="roomNumber"
            placeholder="방 번호"
            value={roomInfo.roomNumber}
            onChange={handleChange}
          />
        </div>
        <div className={cn("dialog-sub-content")}>
          <span className={cn("fixed-span")} style={{ marginRight: "1rem" }}>
            입실 인원
          </span>
          <input
            name="occupants"
            type="number"
            placeholder="입실 인원"
            value={roomInfo.occupants}
            onChange={handleChange}
          />
        </div>
        <div className={cn("dialog-sub-content")}>
          <span className={cn("fixed-span")} style={{ marginRight: "1rem" }}>
            입실 날짜
          </span>
          <input
            name="checkInDate"
            type="date"
            value={roomInfo.checkInDate}
            onChange={handleChange}
          />
        </div>
        <div className={cn("dialog-sub-content")}>
          <span className={cn("fixed-span")} style={{ marginRight: "1rem" }}>
            퇴실 날짜
          </span>
          <input
            name="checkOutDate"
            type="date"
            value={roomInfo.checkOutDate}
            onChange={handleChange}
          />
        </div>
        <div className={cn("dialog-sub-content")}>
          <span className={cn("fixed-span")} style={{ marginRight: "1rem" }}>
            입금 날짜
          </span>
          <div className={cn("select-day")}>
            <span style={{ marginRight: "1rem" }}>{"매달"}</span>
            <select
              name="paymentDate"
              value={roomInfo.paymentDate}
              onChange={handleChange}
            >
              {[...Array(31)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <span style={{ marginLeft: "0.1rem" }}>{` 일`}</span>
          </div>
        </div>

        {error && <p className={cn("error-text")}>{error}</p>}
        <div className={cn("dialog-actions")}>
          <button onClick={handleClose}>취소</button>
          <button onClick={handleSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
};
export default DialogInsertRoomInfos;
