import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/franchises/franchisesSlice'
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


const FranchisesView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { franchises } = useAppSelector((state) => state.franchises)
    

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
              <title>{getPageTitle('View franchises')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View franchises')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/franchises/franchises-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>
            

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{franchises?.name}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Slug</p>
                    <p>{franchises?.slug}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              
                <FormField label='Multi Text' hasTextareaHeight>
                  <textarea className={'w-full'} disabled value={franchises?.description} />
                </FormField>
              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              

              

              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>CoverImage</p>
                    {franchises?.cover_image?.length
                      ? (
                        <ImageField
                          name={'cover_image'}
                          image={franchises?.cover_image}
                          className='w-20 h-20'
                        />
                      ) : <p>No CoverImage</p>
                    }
                </div>
              

              
              

              
                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Universe</p>
                    <p>{franchises?.universe}</p>
                </div>
              

              

              

              

              

              

              

              

              

              

              

              

              
              

              

              

              

              
                <div className={'mb-4'}>
                  <p className={'block font-bold mb-2'}>SortOrder</p>
                  <p>{franchises?.sort_order || 'No data'}</p>
                </div>
              

              

              

              

              

              

              

              

              

              
              

              

              

              

              

              

              

              

              

              
                <FormField label='IsActive'>
                    <SwitchField
                      field={{name: 'is_active', value: franchises?.is_active}}
                      form={{setFieldValue: () => null}}
                      disabled
                    />
                </FormField>
              

              

              

              

              
              

                
                
                
                
                
                <>
                    <p className={'block font-bold mb-2'}>Titles Franchise</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>
                                
                                
                                <th>TitleName</th>
                                
                                
                                
                                <th>OriginalName</th>
                                
                                
                                
                                <th>Type</th>
                                
                                
                                
                                
                                
                                <th>Phase</th>
                                
                                
                                
                                <th>SeasonCount</th>
                                
                                
                                
                                <th>ReleaseYear</th>
                                
                                
                                
                                <th>ReleaseDate</th>
                                
                                
                                
                                <th>RuntimeMinutes</th>
                                
                                
                                
                                <th>Synopsis</th>
                                
                                
                                
                                <th>IMDbURL</th>
                                
                                
                                
                                <th>PosterURL</th>
                                
                                
                                
                                
                                
                                <th>FranchiseOrder</th>
                                
                                
                                
                                <th>IsActive</th>
                                
                                
                            </tr>
                            </thead>
                            <tbody>
                            {franchises.titles_franchise && Array.isArray(franchises.titles_franchise) &&
                              franchises.titles_franchise.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/titles/titles-view/?id=${item.id}`)}>
                                    
                                    
                                    <td data-label="name">
                                        { item.name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="original_name">
                                        { item.original_name }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="title_type">
                                        { item.title_type }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="phase">
                                        { item.phase }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="season_count">
                                        { item.season_count }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="release_year">
                                        { item.release_year }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="release_date">
                                        { dataFormatter.dateTimeFormatter(item.release_date) }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="runtime_minutes">
                                        { item.runtime_minutes }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="synopsis">
                                        { item.synopsis }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="imdb_url">
                                        { item.imdb_url }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="poster_url">
                                        { item.poster_url }
                                    </td>
                                    
                                    
                                    
                                    
                                    
                                    <td data-label="franchise_order">
                                        { item.franchise_order }
                                    </td>
                                    
                                    
                                    
                                    <td data-label="is_active">
                                        { dataFormatter.booleanFormatter(item.is_active) }
                                    </td>
                                    
                                    
                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!franchises?.titles_franchise?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>
                
                
                
                
                
                
                
                
                

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/franchises/franchises-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

FranchisesView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated
        
        permission={'READ_FRANCHISES'}
        
      >
          {page}
      </LayoutAuthenticated>
    )
}

export default FranchisesView;