import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { RootState } from '../store';
import { addVeg, removeVeg } from '../store/vegSlice';
import { vegTypes } from '../rules';

const veg = Object.keys(vegTypes).sort((a, b) => vegTypes[a].getName().localeCompare(vegTypes[b].getName()))

interface props { };

const Veg = (props: props) => {

    const { selectedVeg } = useSelector((state: RootState) => state.veg)
    const dispatch = useDispatch();

    const handleChange = (event: any) => {
        const { target: { value: veg } } = event;
        if (event.target.checked) {
            dispatch(addVeg(veg));
        } else {
            dispatch(removeVeg(veg));
        }
    }

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3" className="selectionHeader">
                <div>Vegetable Selection</div>
                <div className="indicator">{selectedVeg.length} of {veg.length}</div> 
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">

                <Card.Body>
                    <Form>
                        <h2>Select Vegetables</h2>
                        {veg
                            .map(key => (<Form.Row key={key}>
                                <Col>
                                    <Form.Check checked={selectedVeg.includes(key)} type="checkbox" label={vegTypes[key].getName()} value={key} onChange={handleChange} />
                                </Col>
                            </Form.Row>))}
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>)
}

export default Veg;