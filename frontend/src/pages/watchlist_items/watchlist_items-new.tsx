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

import { create } from '../../stores/watchlist_items/watchlist_itemsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    user: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    title: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    episode: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    priority: 'low',
    
    
    
    
    
    
    
    
    
    
    position: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    added_at: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    planned_for: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_active: false,
    
    
    
    
    
    
    
    
    
    
    note: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
}


const Watchlist_itemsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/watchlist_items/watchlist_items-list')
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
      <Field
          type="datetime-local"
          name="added_at"
          placeholder="AddedAt"
      />
  </FormField>



























  <FormField
      label="PlannedFor"
  >
      <Field
          type="datetime-local"
          name="planned_for"
          placeholder="PlannedFor"
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

Watchlist_itemsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_WATCHLIST_ITEMS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default Watchlist_itemsNew
