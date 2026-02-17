import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import FormFilePicker from '../../components/FormFilePicker'
import FormImagePicker from '../../components/FormImagePicker'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/episodes/episodesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditEpisodesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    season: null,
    

    
    
    

    

    

    
    episode_number: '',
    

    

    

    

    

    

    

    

    

    
    
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    air_date: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    
    runtime_minutes: '',
    

    

    

    

    

    

    

    

    

    
    
    

    
    overview: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    sort_order: '',
    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { episodes } = useAppSelector((state) => state.episodes)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof episodes === 'object') {
      setInitialValues(episodes)
    }
  }, [episodes])

  useEffect(() => {
      if (typeof episodes === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (episodes)[el])
          setInitialValues(newInitialVal);
      }
  }, [episodes])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/episodes/episodes-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit episodes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit episodes'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Season' labelFor='season'>
        <Field
            name='season'
            id='season'
            component={SelectField}
            options={initialValues.season}
            itemRef={'seasons'}
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  
    <FormField
        label="EpisodeNumber"
    >
        <Field
            type="number"
            name="episode_number"
            placeholder="EpisodeNumber"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="EpisodeTitle"
    >
        <Field
            name="name"
            placeholder="EpisodeTitle"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="AirDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.air_date ?
                  new Date(
                      dayjs(initialValues.air_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'air_date': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="RuntimeMinutes"
    >
        <Field
            type="number"
            name="runtime_minutes"
            placeholder="RuntimeMinutes"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Overview" hasTextareaHeight>
        <Field name="overview" as="textarea" placeholder="Overview" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="SortOrder"
    >
        <Field
            type="number"
            name="sort_order"
            placeholder="SortOrder"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/episodes/episodes-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditEpisodesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_EPISODES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditEpisodesPage
