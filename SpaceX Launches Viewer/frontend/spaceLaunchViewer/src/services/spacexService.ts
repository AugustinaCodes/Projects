import axios from "axios";

const API_URL = "https://api.spacexdata.com/v5/launches/query";
const LAUNCH_URL = "https://api.spacexdata.com/v5/launches/";

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  details: string;
  links: {
    webcast: string;
  };
}

export const fetchLaunches = async (limit: number, skip: number) => {

  interface LaunchResponse {
    docs: Launch[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }


  const response = await axios.post<LaunchResponse>(API_URL, {
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
