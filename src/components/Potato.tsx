import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { potatoTypes } from '../rules/potato';
import { RootState } from '../store';
import { addPotato, removePotato } from '../store/potatoSlice';


const potatoes = Object.keys(potatoTypes);

interface props { }

const Potato = (props: props) => {

    const { type } = useSelector((state: RootState) => state.potato)
    const dispatch = useDispatch();

    const handleSelection = (event: any) => {
        const { target: { value: potato } } = event;

        if (event.target.checked) {
            dispatch(addPotato(potato));
        } else {
            dispatch(removePotato(potato));
        }
    }

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2" className="selectionHeader"> 
                <div>Potato Selection</div>
                <div className="indicator">{type.length} of {potatoes.length}</div> 
    </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">

                <Card.Body>
                    <Form>
                        <h2>Select Potato</h2>
                        {potatoes.map(potato => <Form.Row key={potato}>
                            <Col>
                                <Form.Check checked={type.includes(potato)}
                                    type="checkbox"
                                    label={potatoTypes[potato].getName()}
                                    value={potato}
                                    onChange={handleSelection} />
                            </Col>
                        </Form.Row>
                        )}
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>)
}

export default Potato;