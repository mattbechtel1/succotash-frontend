import React from 'react'
import { Button, Form, Dropdown, Input, Container } from "semantic-ui-react";

const options = [
    { key: 1, value: 1, text: '1 bed' },
    { key: 2, value: 2, text: '2 beds' },
    { key: 3, value: 3, text: '3 beds' },
    { key: 4, value: 4, text: '4 beds' },
    { key: 5, value: 5, text: '5 beds' },
    { key: 6, value: 6, text: '6 beds' },
    { key: 7, value: 7, text: '7 beds' },
    { key: 8, value: 8, text: '8 beds' },
]


class NewFieldForm extends React.Component {
    constructor() {
        super()
        this.state = {
            fieldName: '',
            xAxis: 1,
            yAxis: 1
        }
    }

    changeHandler = (e, {name, value}) => {
        this.setState({
            [name]: parseInt(value, 10) || value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log("Submitted:", this.state)
        // fetch('http://localhost:3838/fields', {
        //     method: 'POST',
        //     headers:
        // }
        )
    }


    render() {
        return <Container>
            <Form onSubmit={this.submitHandler}>
                <Form.Field>
                <label>Field Name</label>
                <Input name='fieldName' value={this.state.fieldName} onChange={this.changeHandler} placeholder="New District Farm" />
                </Form.Field>
                <label>Field Dimensions: </label> 
                <Dropdown value={this.state.xAxis} name='xAxis' onChange={this.changeHandler} options={options} /> X <Dropdown value={this.state.yAxis} name='yAxis' onChange={this.changeHandler} options={options} />
                <Form.Field>
                </Form.Field>
                <Button color="green" type="submit">
                Let's Plant!
                </Button>
            </Form>
        </Container>
    }
}

// connect to store export
export default NewFieldForm