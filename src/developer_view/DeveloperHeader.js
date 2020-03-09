import React from 'react'

import {withRouter} from 'react-router'

import PageHeader from '../components/StaticPageHeader'
import {Typography} from '@material-ui/core'

import Code from '../assets/coding.jpg' 

const HeaderTag = () => <Typography variant="subtitle1">
    Click here to visit our Page on Github
</Typography>

const DeveloperHeader = ({history}) => <PageHeader
    text="Interested in helping develop Succotash to support independent famers and other growers? Find us on Github!"
    image={Code}
    onClick={() => history.push('/github')}
    Tag={HeaderTag}
/>

export default withRouter(DeveloperHeader)