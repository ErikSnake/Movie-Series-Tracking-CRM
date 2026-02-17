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

import { create } from '../../stores/titles/titlesSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'
import moment from 'moment';

const initialValues = {
    
    
    name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    original_name: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    title_type: 'movie',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    franchise: '',
    
    
    
    
    phase: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    season_count: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    release_year: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    release_date: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    runtime_minutes: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    synopsis: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    imdb_url: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    poster_url: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    poster_image: [],
    
    
    
    
    
    
    
    
    franchise_order: '',
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    is_active: false,
    
    
    
    
    
    
    
    
}


const TitlesNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

    
    

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/titles/titles-list')
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































  <FormField label="Franchise" labelFor="franchise">
      <Field name="franchise" id="franchise" component={SelectField} options={[]} itemRef={'franchises'}></Field>
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
      <Field
          type="datetime-local"
          name="release_date"
          placeholder="ReleaseDate"
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

TitlesNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated
        
          permission={'CREATE_TITLES'}
        
      >
          {page}
      </LayoutAuthenticated>
  )
}

export default TitlesNew
