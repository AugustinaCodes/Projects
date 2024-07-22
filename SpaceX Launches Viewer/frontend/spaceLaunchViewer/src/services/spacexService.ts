import axios from "axios";

const API_URL = "https://api.spacexdata.com/v5/launches/query";
const LAUNCH_URL = "https://api.spacexdata.com/v5/launches/";

export const fetchLaunches = async (limit: number, skip: number) => {
  const response = await axios.post(API_URL, {
    query: {},
    options: {
      limit: limit,
      offset: skip,
    },
  });
  return response.data;
};

export const fetchLaunch = async (id: string) => {
  const response = await axios.get(`${LAUNCH_URL}${id}`);
  return response.data;
};
