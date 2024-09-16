import { RoomInfo } from "../App";
import "../App.module.scss";

interface DialogInsertProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSubmit: () => void;
  roomInfo: RoomInfo;
  error: string;
}

const DialogInsertRoomInfos = (props: DialogInsertProps) => {
  const { handleChange, roomInfo, error, handleClose, handleSubmit } = props;

  return (
    <div className="dialog-insert-roominfos">
      <div className="dialog-content">
        <h2>입실 정보 입력</h2>
        <div className="dialog-sub-content">
          <span style={{ marginRight: "1rem" }}>방 번호</span>
          <input
            name="roomNumber"
            placeholder="방 번호"
            value={roomInfo.roomNumber}
            onChange={handleChange}
          />
        </div>
        <div className="dialog-sub-content">
          <span style={{ marginRight: "1rem" }}>입실 인원</span>
          <input
            name="occupants"
            type="number"
            placeholder="입실 인원"
            value={roomInfo.occupants}
            onChange={handleChange}
          />
        </div>
        <div className="dialog-sub-content">
          <span style={{ marginRight: "1rem" }}>입실 날짜</span>
          <input
            name="checkInDate"
            type="date"
            value={roomInfo.checkInDate}
            onChange={handleChange}
          />
        </div>
        <div className="dialog-sub-content">
          <span style={{ marginRight: "1rem" }}>퇴실 날짜</span>
          <input
            name="checkOutDate"
            type="date"
            value={roomInfo.checkOutDate}
            onChange={handleChange}
          />
        </div>
        <div className="dialog-sub-content">
          <span style={{ marginRight: "1rem" }}>입금 날짜</span>
          <input
            name="paymentDate"
            type="date"
            value={roomInfo.paymentDate ?? ""}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-text">{error}</p>}
        <div className="dialog-actions">
          <button onClick={handleClose}>취소</button>
          <button onClick={handleSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
};
export default DialogInsertRoomInfos;
