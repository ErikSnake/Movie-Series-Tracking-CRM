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

import { update, fetch } from '../../stores/titles/titlesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditTitlesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'original_name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    title_type: '',
    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    franchise: null,
    

    
    
    
    'phase': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    season_count: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    
    release_year: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    release_date: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    
    runtime_minutes: '',
    

    

    

    

    

    

    

    

    

    
    
    

    
    synopsis: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'imdb_url': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    
    'poster_url': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    

    

    
    poster_image: [],
    

    

    
    
    

    

    

    
    franchise_order: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_active: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { titles } = useAppSelector((state) => state.titles)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof titles === 'object') {
      setInitialValues(titles)
    }
  }, [titles])

  useEffect(() => {
      if (typeof titles === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (titles)[el])
          setInitialValues(newInitialVal);
      }
  }, [titles])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/titles/titles-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit titles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit titles'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  
    <FormField
        label="TitleName"
    >
        <Field
            name="name"
            placeholder="TitleName"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="OriginalName"
    >
        <Field
            name="original_name"
            placeholder="OriginalName"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Type" labelFor="title_type">
        <Field name="title_type" id="title_type" component="select">
          
            <option value="movie">movie</option>
          
            <option value="series">series</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Franchise' labelFor='franchise'>
        <Field
            name='franchise'
            id='franchise'
            component={SelectField}
            options={initialValues.franchise}
            itemRef={'franchises'}
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  
    <FormField
        label="Phase"
    >
        <Field
            name="phase"
            placeholder="Phase"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="SeasonCount"
    >
        <Field
            type="number"
            name="season_count"
            placeholder="SeasonCount"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="ReleaseYear"
    >
        <Field
            type="number"
            name="release_year"
            placeholder="ReleaseYear"
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
        label="RuntimeMinutes"
    >
        <Field
            type="number"
            name="runtime_minutes"
            placeholder="RuntimeMinutes"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Synopsis" hasTextareaHeight>
        <Field name="synopsis" as="textarea" placeholder="Synopsis" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="IMDbURL"
    >
        <Field
            name="imdb_url"
            placeholder="IMDbURL"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  
    <FormField
        label="PosterURL"
    >
        <Field
            name="poster_url"
            placeholder="PosterURL"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    
        <FormField>
            <Field
                label='PosterImage'
                color='info'
                icon={mdiUpload}
                path={'titles/poster_image'}
                name='poster_image'
                id='poster_image'
                schema={{
                    size: undefined,
                    formats: undefined,
                }}
                component={FormImagePicker}
            ></Field>
        </FormField>
    

  



  

  

  

  
    <FormField
        label="FranchiseOrder"
    >
        <Field
            type="number"
            name="franchise_order"
            placeholder="FranchiseOrder"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='IsActive' labelFor='is_active'>
        <Field
            name='is_active'
            id='is_active'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/titles/titles-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditTitlesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_TITLES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditTitlesPage
