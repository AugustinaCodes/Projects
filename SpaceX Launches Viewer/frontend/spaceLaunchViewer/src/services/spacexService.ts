import axios from "axios";
import {
  ILaunch,
  ILaunchResponse,
  ILaunchFilter,
  IQuery,
} from "../types/launches";

const API_URL = "https://api.spacexdata.com/v5/launches/query";
const LAUNCH_URL = "https://api.spacexdata.com/v5/launches/";

export const fetchLaunches = async (
  filter: ILaunchFilter
): Promise<ILaunchResponse> => {
  const query: IQuery = {};

  if (filter.searchTerm) {
    query.name = {
      $regex: filter.searchTerm,
      $options: "i",
    };
  }

  if (filter.startDate) {
    query.date_utc = { $gte: filter.startDate.toISOString() };
  }

  if (filter.endDate) {
    if (!query.date_utc) {
      query.date_utc = { $lte: filter.endDate.toISOString() };
    } else {
      query.date_utc.$lte = filter.endDate.toISOString();
    }
  }

  try {
    const response = await axios.post<ILaunchResponse>(API_URL, {
      query,
      options: {
        limit: filter.limit,
        offset: filter.skip,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching launches", error);
    throw error;
  }
};

export const fetchLaunch = async (id: string) => {
  try {
    const response = await axios.get<ILaunch>(`${LAUNCH_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching launch", error);
    throw error;
  }
};
