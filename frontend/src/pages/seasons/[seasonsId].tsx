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

import { update, fetch } from '../../stores/seasons/seasonsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditSeasons = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    series: null,
    

    
    
    

    

    

    
    season_number: '',
    

    

    

    

    

    

    

    

    

    
    
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    release_date: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    
    episode_count: '',
    

    

    

    

    

    

    

    

    

    
    
    

    
    overview: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    sort_order: '',
    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { seasons } = useAppSelector((state) => state.seasons)
  

  const { seasonsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: seasonsId }))
  }, [seasonsId])

  useEffect(() => {
    if (typeof seasons === 'object') {
      setInitialValues(seasons)
    }
  }, [seasons])

  useEffect(() => {
      if (typeof seasons === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (seasons)[el])

          setInitialValues(newInitialVal);
      }
  }, [seasons])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: seasonsId, data }))
    await router.push('/seasons/seasons-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit seasons')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit seasons'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Series' labelFor='series'>
        <Field
            name='series'
            id='series'
            component={SelectField}
            options={initialValues.series}
            itemRef={'titles'}
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  
    <FormField
        label="SeasonNumber"
    >
        <Field
            type="number"
            name="season_number"
            placeholder="SeasonNumber"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="SeasonName"
    >
        <Field
            name="name"
            placeholder="SeasonName"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="ReleaseDate"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.release_date ?
                  new Date(
                      dayjs(initialValues.release_date).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'release_date': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="EpisodeCount"
    >
        <Field
            type="number"
            name="episode_count"
            placeholder="EpisodeCount"
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
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/seasons/seasons-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditSeasons.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_SEASONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditSeasons
