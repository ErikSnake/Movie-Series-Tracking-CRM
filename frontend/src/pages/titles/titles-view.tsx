import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/titles/titlesSlice'
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


const TitlesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { titles } = useAppSelector((state) => state.titles)
    

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
              <title>{getPageTitle('View titles')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View titles')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/titles/titles-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>TitleName</p>
                    <p>{titles?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>OriginalName</p>
                    <p>{titles?.original_name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Type</p>
                    <p>{titles?.title_type ?? 'No data'}</p>
                </div>
              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Franchise</p>
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{titles?.franchise?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Phase</p>
                    <p>{titles?.phase}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SeasonCount</p>
                  <p>{titles?.season_count || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>ReleaseYear</p>
                  <p>{titles?.release_year || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='ReleaseDate'>
                    {titles.release_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={titles.release_date ?
                        new Date(
                          dayjs(titles.release_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ReleaseDate</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>RuntimeMinutes</p>
                  <p>{titles?.runtime_minutes || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={titles?.synopsis} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>IMDbURL</p>
                    <p>{titles?.imdb_url}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PosterURL</p>
                    <p>{titles?.poster_url}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>PosterImage</p>
                    {titles?.poster_image?.length
                      ? (
                        <ImageField
                          name={'poster_image'}
                          image={titles?.poster_image}
                          className='w-20 h-20'
                        />
                      ) : <p>No PosterImage</p>
                    }
                </div>
              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>FranchiseOrder</p>
                  <p>{titles?.franchise_order || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='IsActive'>
                    <SwitchField
                      field={{name: 'is_active', value: titles?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Seasons Series</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>SeasonNumber</th>
                                
                                
                                
                                <th>SeasonName</th>
                                
                                
                                
                                <th>ReleaseDate</th>
                                
                                
                                
                                <th>EpisodeCount</th>
                                
                                
                                
                                <th>Overview</th>
                                
                                
                                
                                <th>SortOrder</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {titles.seasons_series && Array.isArray(titles.seasons_series) &&
                              titles.seasons_series.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/seasons/seasons-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="season_number">
                                        { item.season_number }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="release_date">
                                        { dataFormatter.dateTimeFormatter(item.release_date) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="episode_count">
                                        { item.episode_count }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="overview">
                                        { item.overview }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="sort_order">
                                        { item.sort_order }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!titles?.seasons_series?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Watch_entries Title</p>
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
                            {titles.watch_entries_title && Array.isArray(titles.watch_entries_title) &&
                              titles.watch_entries_title.map((item: any) => (
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
                        {!titles?.watch_entries_title?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Watchlist_items Title</p>
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
                            {titles.watchlist_items_title && Array.isArray(titles.watchlist_items_title) &&
                              titles.watchlist_items_title.map((item: any) => (
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
                        {!titles?.watchlist_items_title?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Title_tags Title</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {titles.title_tags_title && Array.isArray(titles.title_tags_title) &&
                              titles.title_tags_title.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/title_tags/title_tags-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!titles?.title_tags_title?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                <>
                    <p className={'block font-bold mb-2'}>Attachments Title</p>
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
                            {titles.attachments_title && Array.isArray(titles.attachments_title) &&
                              titles.attachments_title.map((item: any) => (
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
                        {!titles?.attachments_title?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/titles/titles-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

TitlesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_TITLES'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default TitlesView;