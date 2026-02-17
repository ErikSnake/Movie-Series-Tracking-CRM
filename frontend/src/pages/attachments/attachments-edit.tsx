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

import { update, fetch } from '../../stores/attachments/attachmentsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import {saveFile} from "../../helpers/fileSaver";
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from "../../components/ImageField";



const EditAttachmentsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {
      
    

    

    

    

    

    

    

    

    

    

    

    
    user: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    title: null,
    

    
    
    

    

    

    

    

    

    

    

    

    

    

    
    episode: null,
    

    
    
    

    

    

    

    

    

    

    

    

    
    file: [],
    

    

    

    
    
    
    'name': '',
    

    

    

    

    

    

    

    

    

    

    

    

    
    
    

    
    description: '',
    

    

    

    

    

    

    

    

    

    

    

    
    
    

    

    

    

    

    

    

    

    
    category: '',
    

    

    

    

    
    
    

    

    

    

    

    
    attached_at: new Date(),
    

    

    

    

    

    

    

    
    
    
  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { attachments } = useAppSelector((state) => state.attachments)
  

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof attachments === 'object') {
      setInitialValues(attachments)
    }
  }, [attachments])

  useEffect(() => {
      if (typeof attachments === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (attachments)[el])
          setInitialValues(newInitialVal);
      }
  }, [attachments])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/attachments/attachments-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit attachments')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit attachments'} main>
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
    

  

  

    

  



  

  

  

  

  

  

  

  

  

  

  

    

  
        <FormField>
          <Field
            label='File'
            color='info'
            icon={mdiUpload}
            path={'attachments/file'}
            name='file'
            id='file'
            schema={{
                size: undefined,
                formats: undefined,
            }}
            component={FormFilePicker}
          ></Field>
        </FormField>
  



  
    <FormField
        label="Name"
    >
        <Field
            name="name"
            placeholder="Name"
        />
    </FormField>
  

  

  

  

  

  

  

  

  

  

  

    

  



  

  
    <FormField label="Description" hasTextareaHeight>
        <Field name="description" as="textarea" placeholder="Description" />
    </FormField>
  

  

  

  

  

  

  

  

  

  

    

  



  

  

  

  

  

  

  

  
    <FormField label="Category" labelFor="category">
        <Field name="category" id="category" component="select">
          
            <option value="poster">poster</option>
          
            <option value="subtitle">subtitle</option>
          
            <option value="reference">reference</option>
          
            <option value="other">other</option>
          
        </Field>
    </FormField>
  

  

  

  

    

  



  

  

  

  

  

  
      <FormField
          label="AttachedAt"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.attached_at ?
                  new Date(
                      dayjs(initialValues.attached_at).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'attached_at': date})}
          />
      </FormField>
  

  

  

  

  

  

    

  


  

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/attachments/attachments-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditAttachmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'UPDATE_ATTACHMENTS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EditAttachmentsPage
