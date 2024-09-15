import { useQuery } from "@tanstack/react-query";
import { apiRoute } from "../constant/route";
import api from "../utils/api";
import { ApiResponse } from "../interface/common";

export const useGetRoomInfo = () => {
  return useQuery({ queryKey: ["getRoomInfo"], queryFn: () => getRoomInfo });
};

//============================================== api 호출부 ==============================================

const getRoomInfo = async (param?: string): Promise<ApiResponse<string>> => {
  const result = await api
    .get(apiRoute.getRoomInfo, param ?? "")
    .then((data: any) => data.data);
  return result;
};
