import React from 'react'
import Countryside from '../assets/countryside-harvest.jpg'
import PageHeader from '../components/StaticPageHeader'


const AboutHeader = () => <PageHeader
    text='Succotash was built with the farmer and planter in mind. Use succotash to plan and track crop cycles, prepare for harvests, and keep a list of upcoming deadlines.'
    image={Countryside}
    />

export default AboutHeader