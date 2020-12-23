import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { RootState } from '../store';
import { setMeat, setWeight } from '../store/meatSlice';
import { MeatOptions } from '../rules';

const meats = Object.keys(MeatOptions);

const Meat = () => {

    const { meat, weight } = useSelector((state: RootState) => state.meat)
    const dispatch = useDispatch();

    return (

        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1"  className="selectionHeader">Meat Selection</Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label>Select Meat</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control as="select" value={meat} onChange={e => dispatch(setMeat(e.target.value))}>
                                    {meats.map(meatOption => (<option value={meatOption.toLowerCase()} key={meatOption}>{MeatOptions[meatOption].getName()}</option>))}
                                </Form.Control>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Form.Label>Enter Weight</Form.Label>
                            </Col>
                            <Col xs="auto">
                                <Form.Control placeholder="Weight in kg" style={{width:"80px"}} value={weight} onChange={e => dispatch(setWeight(e.target.value))} />
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Accordion.Collapse >

        </Card>
    )
}

export default Meat;