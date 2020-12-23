import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { RootState } from '../store';
import { setEndTimeHours, setEndTimeMinutes, setDiners } from '../store/detailsSlice';

const getTimeOptions = (limit: number) => {
    const res = [];
    for (let i = 0; i <= limit; i++) {
        res.push((<option key={i} value={i}>{i}</option>))
    }
    return res;
}

const Timing = () => {

    const { endTimeHours, endTimeMinutes, diners } = useSelector((state: RootState) => state.timing)

    const dispatch = useDispatch();

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0"  className="selectionHeader">
                Meal Details
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">

                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label>Dishing Up Time</Form.Label>
                            </Col>
                            <Col xs="auto">
                                <Form.Control as="select" onChange={({ target: { value } }) => dispatch(setEndTimeHours(value))} value={endTimeHours}>
                                    {getTimeOptions(23)}
                                </Form.Control>
                            </Col>
                            <Col xs="auto">
                                <Form.Control as="select" onChange={({ target: { value } }) => dispatch(setEndTimeMinutes(value))} value={endTimeMinutes}>
                                    {getTimeOptions(59)}
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Number of Diners</Form.Label>
                            </Col>
                            <Col xs="auto">
                                <Form.Control onChange={({ target: { value } }) => dispatch(setDiners(value))} style={{width: '70px'}} value={diners} />
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}



export default Timing