import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

interface RoomInfo {
  roomNumber: string;
  occupants: number;
  checkInDate: string;
  checkOutDate: string;
}

const StyledButton = styled(Button)({
  backgroundColor: "#1976d2",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

const StyledPaper = styled(Paper)({
  backgroundColor: "#f8dfff",
  color: "#0d47a1",
  borderRadius: "12px",
});

const StickyHeader = styled(Box)({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "#fff",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
});

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

  const handleClickOpen = () => {
    setOpen(true);
  };

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
    <Box
      height="100vh"
      width="100vh"
      display="flex"
      textAlign="center"
      flexDirection="column"
    >
      <StickyHeader>
        <Typography variant="h4" gutterBottom fontFamily="sans-serif">
          Room Management System
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <StyledButton variant="contained" onClick={handleClickOpen}>
            입실 정보 추가
          </StyledButton>
        </Box>
      </StickyHeader>
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
            value={tempRoomInfo.roomNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="occupants"
            label="입실 인원"
            type="number"
            fullWidth
            value={tempRoomInfo.occupants}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="checkInDate"
            label="입실 날짜"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={tempRoomInfo.checkInDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="checkOutDate"
            label="퇴실 날짜"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={tempRoomInfo.checkOutDate}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
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
      <Box height="calc(100vh - 200px)" overflow="auto">
        <Grid container spacing={2}>
          {roomInfos.map((roomInfo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box mt={4}>
                <StyledPaper elevation={3}>
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
                </StyledPaper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
