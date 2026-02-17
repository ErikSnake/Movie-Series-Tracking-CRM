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

import { create } from '../../stores/seasons/seasonsSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    
    
    
    
    
    
    
    
    
    
    
    series: '',
    
    
    
    
    
    
    
    season_number: '',
    
    
    
    
    
    
    
    
    
    
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    release_date: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    episode_count: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    overview: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    sort_order: '',
    
    
    
    
    
    
    
    
    
    
    
}


const SeasonsNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/seasons/seasons-list')
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





















  <FormField label="Series" labelFor="series">
      <Field name="series" id="series" component={SelectField} options={[]} itemRef={'titles'}></Field>
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
      <Field
          type="datetime-local"
          name="release_date"
          placeholder="ReleaseDate"
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

SeasonsNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_SEASONS'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default SeasonsNew
