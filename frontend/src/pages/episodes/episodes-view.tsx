import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/episodes/episodesSlice'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";


const EpisodesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { episodes } = useAppSelector((state) => state.episodes)
    

    const { id } = router.query;
    
    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);


    return (
      <>
          <Head>
              <title>{getPageTitle('View episodes')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View episodes')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/episodes/episodes-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Season</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{episodes?.season?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>EpisodeNumber</p>
                  <p>{episodes?.episode_number || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>EpisodeTitle</p>
                    <p>{episodes?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='AirDate'>
                    {episodes.air_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={episodes.air_date ?
                        new Date(
                          dayjs(episodes.air_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No AirDate</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>RuntimeMinutes</p>
                  <p>{episodes?.runtime_minutes || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={episodes?.overview} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SortOrder</p>
                  <p>{episodes?.sort_order || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Watch_entries Episode</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Status</th>
                                
                                
                                
                                <th>StartedAt</th>
                                
                                
                                
                                <th>FinishedAt</th>
                                
                                
                                
                                <th>WatchedAt</th>
                                
                                
                                
                                <th>Rating</th>
                                
                                
                                
                                <th>Rewatch</th>
                                
                                
                                
                                <th>RewatchCount</th>
                                
                                
                                
                                <th>Notes</th>
                                
                                
                                
                                <th>ContainsSpoilers</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {episodes.watch_entries_episode && Array.isArray(episodes.watch_entries_episode) &&
                              episodes.watch_entries_episode.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/watch_entries/watch_entries-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="status">
                                        { item.status }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="started_at">
                                        { dataFormatter.dateTimeFormatter(item.started_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="finished_at">
                                        { dataFormatter.dateTimeFormatter(item.finished_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="watched_at">
                                        { dataFormatter.dateTimeFormatter(item.watched_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="rating">
                                        { item.rating }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="revisit">
                                        { dataFormatter.booleanFormatter(item.revisit) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="rewatch_count">
                                        { item.rewatch_count }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="notes">
                                        { item.notes }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="contains_spoilers">
                                        { dataFormatter.booleanFormatter(item.contains_spoilers) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!episodes?.watch_entries_episode?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Watchlist_items Episode</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Priority</th>
                                
                                
                                
                                <th>QueuePosition</th>
                                
                                
                                
                                <th>AddedAt</th>
                                
                                
                                
                                <th>PlannedFor</th>
                                
                                
                                
                                <th>IsActive</th>
                                
                                
                                
                                <th>QueueNote</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {episodes.watchlist_items_episode && Array.isArray(episodes.watchlist_items_episode) &&
                              episodes.watchlist_items_episode.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/watchlist_items/watchlist_items-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="priority">
                                        { item.priority }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="position">
                                        { item.position }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="added_at">
                                        { dataFormatter.dateTimeFormatter(item.added_at) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="planned_for">
                                        { dataFormatter.dateTimeFormatter(item.planned_for) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="note">
                                        { item.note }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!episodes?.watchlist_items_episode?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Attachments Episode</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                <th>Name</th>
                                
                                
                                
                                <th>Description</th>
                                
                                
                                
                                <th>Category</th>
                                
                                
                                
                                <th>AttachedAt</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {episodes.attachments_episode && Array.isArray(episodes.attachments_episode) &&
                              episodes.attachments_episode.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/attachments/attachments-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="description">
                                        { item.description }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="category">
                                        { item.category }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="attached_at">
                                        { dataFormatter.dateTimeFormatter(item.attached_at) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!episodes?.attachments_episode?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/episodes/episodes-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

EpisodesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_EPISODES'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default EpisodesView;