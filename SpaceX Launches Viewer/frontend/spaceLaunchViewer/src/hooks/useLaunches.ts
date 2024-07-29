import { useState, useEffect } from 'react';
import { fetchLaunches } from '../services/spacexService';
import { ILaunch, ILaunchFilter, ILaunchResponse } from '../types/launches';

export const useLaunches = (filter: ILaunchFilter) => {
  const [launches, setLaunches] = useState<ILaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getLaunches = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: ILaunchResponse = await fetchLaunches(filter);
        setLaunches(data.docs);
        setTotalPages(Math.ceil(data.totalDocs / filter.limit));
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch launch data');
      } 
    };
    getLaunches();
  }, [filter]);

  return { launches, loading, error, totalPages };
};