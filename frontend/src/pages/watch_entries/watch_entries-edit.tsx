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

import { update, fetch } from '../../stores/watch_entries/watch_entriesSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditWatch_entriesPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    user: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    title: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    episode: null,
    

    
    
    

    

    

    

    

    

    

    

    
    status: '',
    

    

    

    

    
    
    

    

    

    

    

    
    started_at: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    finished_at: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    watched_at: new Date(),
    

    

    

    

    

    

    

    
    
    
    'rating': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    revisit: false,
    

    

    

    

    

    

    
    
    

    

    

    
    rewatch_count: '',
    

    

    

    

    

    

    

    

    

    
    
    

    
    notes: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    contains_spoilers: false,
    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { watch_entries } = useAppSelector((state) => state.watch_entries)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof watch_entries === 'object') {
      setInitialValues(watch_entries)
    }
  }, [watch_entries])

  useEffect(() => {
      if (typeof watch_entries === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (watch_entries)[el])
          setInitialValues(newInitialVal);
      }
  }, [watch_entries])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/watch_entries/watch_entries-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit watch_entries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit watch_entries'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>


  

  

  

  

  

  

  

  

  

  
  
    <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}
      
        
            showField={'firstName'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Title' labelFor='title'>
        <Field
            name='title'
            id='title'
            component={SelectField}
            options={initialValues.title}
            itemRef={'titles'}
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  
  
    <FormField label='Episode' labelFor='episode'>
        <Field
            name='episode'
            id='episode'
            component={SelectField}
            options={initialValues.episode}
            itemRef={'episodes'}
      
        
      
        
      
        
      
        
      
        
      
        
      
        
            showField={'name'}
        
      
        
      
        
      
        
      
        
      
        
      
        ></Field>
    </FormField>
    

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Status" labelFor="status">
        <Field name="status" id="status" component="select">
          
            <option value="planned">planned</option>
          
            <option value="watching">watching</option>
          
            <option value="watched">watched</option>
          
            <option value="on_hold">on_hold</option>
          
            <option value="dropped">dropped</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="StartedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.started_at ?
                  new Date(
                      dayjs(initialValues.started_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'started_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="FinishedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.finished_at ?
                  new Date(
                      dayjs(initialValues.finished_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'finished_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="WatchedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.watched_at ?
                  new Date(
                      dayjs(initialValues.watched_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'watched_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  
    <FormField
        label="Rating"
    >
        <Field
            type="number"
            name="rating"
            placeholder="Rating"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='Rewatch' labelFor='revisit'>
        <Field
            name='revisit'
            id='revisit'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  



  

  

  

  
    <FormField
        label="RewatchCount"
    >
        <Field
            type="number"
            name="rewatch_count"
            placeholder="RewatchCount"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Notes" hasTextareaHeight>
        <Field name="notes" as="textarea" placeholder="Notes" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='ContainsSpoilers' labelFor='contains_spoilers'>
        <Field
            name='contains_spoilers'
            id='contains_spoilers'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/watch_entries/watch_entries-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditWatch_entriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_WATCH_ENTRIES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditWatch_entriesPage
