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

export const fetchLaunches = async (
  limit: number,
  skip: number,
  searchTerm: string,
  startDate: Date | null,
  endDate: Date | null
) => {
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

  const query: any = {};

  if (searchTerm) {
    query.name = { $regex: searchTerm, $options: "i" };
  }

  if (startDate) {
    query.date_utc = { $gte: startDate.toISOString() };
  }

  if (endDate) {
    if (!query.date_utc) {
      query.date_utc = { $lte: endDate.toISOString() };
    } else {
      query.date_utc.$lte = endDate.toISOString();
    }
  }

  // const query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};

  try {
    const response = await axios.post<LaunchResponse>(API_URL, {
      query,
      options: {
        limit: limit,
        offset: skip,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching launches", error);
    throw error;
  }
};

export const fetchLaunch = async (id: string) => {
  const response = await axios.get<Launch>(`${LAUNCH_URL}${id}`);
  return response.data;
};
