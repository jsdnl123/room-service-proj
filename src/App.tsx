import React, { useState } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface RoomInfo {
  roomNumber: string;
  occupants: number;
  checkInDate: string;
  checkOutDate: string;
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
  const [tempRoomInfo, setTempRoomInfo] = useState<RoomInfo>({
    roomNumber: "",
    occupants: 0,
    checkInDate: "",
    checkOutDate: "",
  });
  const [RoomInfoList, setRoomInfoList] = useState<RoomInfo[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempRoomInfo({
      ...tempRoomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setRoomInfo(tempRoomInfo);
    setRoomInfo(tempRoomInfo);
    setRoomInfoList((prev) => {
      return [...prev, tempRoomInfo];
    });
    setOpen(false);
  };

  return (
    <>
      <Container style={{ marginTop: "0" }} maxWidth={"xl"} fixed>
        <Typography variant="h2" bgcolor={"#6599"} fontFamily={"sans-serif"}>
          Room Management System
        </Typography>
      </Container>
      <Container>
        <Grid container justifyContent={"flex-end"}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            입실 정보 추가
          </Button>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>입실 정보 입력</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="roomNumber"
              label="방 번호"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="occupants"
              label="입실 인원"
              type="number"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="checkInDate"
              label="입실 날짜"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="checkOutDate"
              label="퇴실 날짜"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
            <Button onClick={handleSubmit} color="primary">
              추가
            </Button>
          </DialogActions>
        </Dialog>
        {roomInfo && (
          <Box mt={4}>
            <Paper elevation={3}>
              <Box p={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      방 번호: {roomInfo.roomNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      입실 인원: {roomInfo.occupants}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      입실 날짜: {roomInfo.checkInDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      퇴실 날짜: {roomInfo.checkOutDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}
      </Container>
    </>
  );
};

export default App;
