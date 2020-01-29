import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


const FieldGrid = ({field}) => {
    if (!field) {
        return null
    } else {
        const {x_axis_count, y_axis_count, name} = field
        let rows = []
        let rowCounter = 0

        while (rowCounter < y_axis_count) {
            let columns = []
            let colCounter = 0
            while (colCounter < x_axis_count) {
                columns.push(<Grid.Column key={`${rowCounter}-${colCounter}`}><div>IMG</div></Grid.Column>)
                colCounter++
            }

            rows.push(<Grid.Row key={`row-${rowCounter}`} columns={x_axis_count}>{columns}</Grid.Row>)
            rowCounter++
        }

    return <Container>
        <Header>{name}</Header>
        <Grid>{rows}</Grid>
    </Container>
    }
}

const mapStateToProps = ({fields}, {match}) => {
    // debugger
    return {field: fields.fields.find(field => field.slug === match.params.slug)}
}

export default withRouter(connect(mapStateToProps)(FieldGrid))