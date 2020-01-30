import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Header, Dimmer, Loader } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import BedTile from './BedTile'


const FieldGrid = ({field, loading, beds, activeBed, match: {params: {slug}}}) => {
    if (loading || !field) {
        const fieldName = slug.split('-').join(' ')
        
        return <Container>
            <Header>{fieldName}</Header>
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
        </Container>
        
    } else {


        const {x_axis_count, y_axis_count, name: fieldName} = field
        let rows = []
        let rowCounter = 0

        while (rowCounter < y_axis_count) {
            let columns = []
            let colCounter = 0
            while (colCounter < x_axis_count) {
                let bedCounter = (rowCounter * x_axis_count) + colCounter
                // debugger
                columns.push(
                    <Grid.Column key={`${rowCounter}-${colCounter}`}>
                        <BedTile bed={beds[bedCounter]} />
                    </Grid.Column>)
                colCounter++
            }

            rows.push(<Grid.Row key={`row-${rowCounter}`} columns={x_axis_count}>{columns}</Grid.Row>)
            rowCounter++
        }

    return <Container>
        <Header>{fieldName}</Header>
        <Grid>{rows}</Grid>
    </Container>
    }
}

const mapStateToProps = ({fields}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : []
    }
}

export default withRouter(connect(mapStateToProps)(FieldGrid))