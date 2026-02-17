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

import { create } from '../../stores/watch_entries/watch_entriesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    user: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    title: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    episode: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    status: 'planned',
    
    
    
    
    
    
    
    
    
    
    
    
    started_at: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    finished_at: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    watched_at: '',
    
    
    
    
    
    
    
    
    
    
    rating: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    revisit: false,
    
    
    
    
    
    
    
    
    
    
    
    
    rewatch_count: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    notes: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    contains_spoilers: false,
    
    
    
    
    
    
    
    
}


const Watch_entriesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/watch_entries/watch_entries-list')
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
      <Field
          type="datetime-local"
          name="started_at"
          placeholder="StartedAt"
      />
  </FormField>



























  <FormField
      label="FinishedAt"
  >
      <Field
          type="datetime-local"
          name="finished_at"
          placeholder="FinishedAt"
      />
  </FormField>



























  <FormField
      label="WatchedAt"
  >
      <Field
          type="datetime-local"
          name="watched_at"
          placeholder="WatchedAt"
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

Watch_entriesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_WATCH_ENTRIES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Watch_entriesNew
