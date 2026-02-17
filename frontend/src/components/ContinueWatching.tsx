import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { mdiPlay, mdiCheckCircle, mdiLoading } from '@mdi/js';
import BaseIcon from './BaseIcon';
import BaseButton from './BaseButton';
import CardBox from './CardBox';
import SectionTitleLineWithButton from './SectionTitleLineWithButton';
import { useAppSelector } from '../stores/hooks';

export default function ContinueWatching() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAppSelector((state) => state.auth);

  const fetchContinueWatching = async () => {
    try {
      setLoading(true);
      // Fetch recent watch entries where status is 'watching'
      const response = await axios.get('/watch_entries', {
        params: {
          limit: 3,
          page: 0,
          status: 'watching'
        }
      });
      setEntries(response.data.rows || []);
    } catch (error) {
      console.error('Failed to fetch continue watching:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchContinueWatching();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <CardBox className="mb-6">
        <div className="flex items-center justify-center p-6 text-gray-500">
          <BaseIcon path={mdiLoading} size={32} className="animate-spin text-blue-500" />
          <span className="ml-2 italic">Looking for your last watched...</span>
        </div>
      </CardBox>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mb-8">
        <SectionTitleLineWithButton icon={mdiPlay} title="Continue Watching" main={false}>
          {''}
        </SectionTitleLineWithButton>
        <CardBox className="border-dashed border-2 border-slate-200 dark:border-slate-700">
          <div className="p-8 text-center text-slate-400">
            <p>No active series found. Start your journey by adding a title to your watchlist!</p>
            <BaseButton
              href="/titles/titles-list"
              label="Browse Titles"
              color="info"
              className="mt-4"
              small
            />
          </div>
        </CardBox>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <SectionTitleLineWithButton icon={mdiPlay} title="Continue Watching" main={false}>
        {''}
      </SectionTitleLineWithButton>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry: any) => (
          <CardBox key={entry.id} className="hover:shadow-lg transition-all border-l-4 border-blue-500">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold truncate text-slate-800 dark:text-white" title={entry.title?.name}>
                    {entry.title?.name}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {entry.title?.title_type || 'Movie'}
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded p-3 mb-4">
                 <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {entry.episode ? `S${entry.episode.season?.season_number || '?'} E${entry.episode.episode_number}: ${entry.episode.name}` : 'Main Movie'}
                 </p>
                 <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2">
                    <div className="bg-blue-500 h-full rounded-full w-2/3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                 </div>
              </div>
              
              <div className="mt-auto flex justify-between gap-2">
                <BaseButton
                  label="Details"
                  color="lightDark"
                  small
                  href={`/titles/${entry.title?.id}`}
                  className="flex-1"
                />
                <BaseButton
                  label="Log"
                  color="info"
                  small
                  icon={mdiCheckCircle}
                  href={`/watch_entries/watch_entries-new?titleId=${entry.title?.id}`}
                  className="flex-1"
                />
              </div>
            </div>
          </CardBox>
        ))}
      </div>
    </div>
  );
}
