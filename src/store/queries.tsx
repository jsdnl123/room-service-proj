import { apiRoute } from "../constant/route";
import api from "../utils/api";

//============================================== api 호출부 ==============================================

export const getRoomInfo = async (param?: string) => {
  const result = await api
    .get(apiRoute.getRoomInfo, param ?? "")
    .then((data) => data);
};
