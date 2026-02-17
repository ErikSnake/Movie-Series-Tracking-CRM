import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/seasons/seasonsSlice'
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


const SeasonsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { seasons } = useAppSelector((state) => state.seasons)
    

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
              <title>{getPageTitle('View seasons')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View seasons')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/seasons/seasons-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              

              

              

              

              

              

              

              

              

              
              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Series</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                        <p>{seasons?.series?.name ?? 'No data'}</p>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                </div>
                 
              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SeasonNumber</p>
                  <p>{seasons?.season_number || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>SeasonName</p>
                    <p>{seasons?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              
                <FormField label='ReleaseDate'>
                    {seasons.release_date ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={seasons.release_date ?
                        new Date(
                          dayjs(seasons.release_date).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No ReleaseDate</p>}
                </FormField>
              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>EpisodeCount</p>
                  <p>{seasons?.episode_count || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={seasons?.overview} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SortOrder</p>
                  <p>{seasons?.sort_order || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

                
                
                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Episodes Season</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                
                                
                                <th>EpisodeNumber</th>
                                
                                
                                
                                <th>EpisodeTitle</th>
                                
                                
                                
                                <th>AirDate</th>
                                
                                
                                
                                <th>RuntimeMinutes</th>
                                
                                
                                
                                <th>Overview</th>
                                
                                
                                
                                <th>SortOrder</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {seasons.episodes_season && Array.isArray(seasons.episodes_season) &&
                              seasons.episodes_season.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/episodes/episodes-view/?id=${item.id}`)}>
                                    
                                    
                                    
                                    
                                    <td data-label="episode_number">
                                        { item.episode_number }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="air_date">
                                        { dataFormatter.dateTimeFormatter(item.air_date) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="runtime_minutes">
                                        { item.runtime_minutes }
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
                        {!seasons?.episodes_season?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/seasons/seasons-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

SeasonsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_SEASONS'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default SeasonsView;