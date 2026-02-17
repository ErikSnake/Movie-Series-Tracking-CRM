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

import { create } from '../../stores/episodes/episodesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    season: '',
    
    
    
    
    
    
    
    episode_number: '',
    
    
    
    
    
    
    
    
    
    
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    air_date: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    runtime_minutes: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    overview: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    sort_order: '',
    
    
    
    
    
    
    
    
    
    
    
}


const EpisodesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/episodes/episodes-list')
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





















  <FormField label="Season" labelFor="season">
      <Field name="season" id="season" component={SelectField} options={[]} itemRef={'seasons'}></Field>
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
      <Field
          type="datetime-local"
          name="air_date"
          placeholder="AirDate"
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

EpisodesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_EPISODES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default EpisodesNew
