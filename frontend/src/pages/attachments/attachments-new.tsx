import { mdiAccount, mdiChartTimelineVariant, mdiMail, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
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
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import { SelectFieldMany } from "../../components/SelectFieldMany";
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/attachments/attachmentsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    user: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    title: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    episode: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    file: [],
    
    
    
    
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    description: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    category: 'poster',
    
    
    
    
    
    
    
    
    
    
    
    
    attached_at: '',
    
    
    
    
    
    
    
    
    
}


const AttachmentsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/attachments/attachments-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                
                initialValues
                
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>





















  <FormField label="User" labelFor="user">
      <Field name="user" id="user" component={SelectField} options={[]} itemRef={'users'}></Field>
  </FormField>



























  <FormField label="Title" labelFor="title">
      <Field name="title" id="title" component={SelectField} options={[]} itemRef={'titles'}></Field>
  </FormField>



























  <FormField label="Episode" labelFor="episode">
      <Field name="episode" id="episode" component={SelectField} options={[]} itemRef={'episodes'}></Field>
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
      <Field
          type="datetime-local"
          name="attached_at"
          placeholder="AttachedAt"
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

AttachmentsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_ATTACHMENTS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default AttachmentsNew
