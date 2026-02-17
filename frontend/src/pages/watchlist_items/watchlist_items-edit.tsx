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

import { update, fetch } from '../../stores/watchlist_items/watchlist_itemsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditWatchlist_itemsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    user: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    title: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    episode: null,
    

    
    
    

    

    

    

    

    

    

    

    
    priority: '',
    

    

    

    

    
    
    

    

    

    
    position: '',
    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    added_at: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    
    planned_for: new Date(),
    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    
    is_active: false,
    

    

    

    

    

    

    
    
    

    
    note: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { watchlist_items } = useAppSelector((state) => state.watchlist_items)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof watchlist_items === 'object') {
      setInitialValues(watchlist_items)
    }
  }, [watchlist_items])

  useEffect(() => {
      if (typeof watchlist_items === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (watchlist_items)[el])
          setInitialValues(newInitialVal);
      }
  }, [watchlist_items])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/watchlist_items/watchlist_items-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit watchlist_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit watchlist_items'} main>
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
    

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Priority" labelFor="priority">
        <Field name="priority" id="priority" component="select">
          
            <option value="low">low</option>
          
            <option value="medium">medium</option>
          
            <option value="high">high</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  
    <FormField
        label="QueuePosition"
    >
        <Field
            type="number"
            name="position"
            placeholder="QueuePosition"
        />
    </FormField>
  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="AddedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.added_at ?
                  new Date(
                      dayjs(initialValues.added_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'added_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="PlannedFor"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.planned_for ?
                  new Date(
                      dayjs(initialValues.planned_for).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'planned_for': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  

  
    <FormField label='IsActive' labelFor='is_active'>
        <Field
            name='is_active'
            id='is_active'
            component={SwitchField}
        ></Field>
    </FormField>
  

  

  

    

  



  

  
    <FormField label="QueueNote" hasTextareaHeight>
        <Field name="note" as="textarea" placeholder="QueueNote" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/watchlist_items/watchlist_items-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditWatchlist_itemsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_WATCHLIST_ITEMS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditWatchlist_itemsPage
