/**
 * Interfacse representing a single launch.
 */

export interface ILaunch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  details: string;
  links: {
    webcast: string;
  };
}

/**
 * Interface representing the response from the SpaceX launches API
 */

export interface ILaunchResponse {
  docs: ILaunch[];
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

/**
 * Query interface for filtering launches.
 */
export interface IQuery {
  name?: { $regex: string; $options: string };
  date_utc?: { $gte?: string; $lte?: string };
}

/**
 * Filter interface to filter launches
 *
 * @param limit - number of items to fetch
 * @param skip - number of items to skip
 * @param searchTerm - search term to filter launches by name
 * @param startDate - start date to filter launches
 * @param endDate - end date to filter launches
 */

export interface ILaunchFilter {
  limit: number;
  skip: number;
  searchTerm: string;
  startDate: Date | null;
  endDate: Date | null;
}
