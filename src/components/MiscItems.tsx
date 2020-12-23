import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

import { MiscItems } from '../rules/other';
import { RootState } from '../store';
import { addItem, removeItem } from '../store/otheritemsSlice';

const items = Object.keys(MiscItems);

interface props { }

const OtherItems = (props: props) => {

    const { otherItems } = useSelector((state: RootState) => state.otherItems)
    const dispatch = useDispatch();

    const handleSelection = (event: any) => {
        const { target: { value: item, checked } } = event;

        if (checked) {
            dispatch(addItem(item))
        } else {
            dispatch(removeItem(item));
        }
    }
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4"  className="selectionHeader">
                <div>Other Selection</div>
                <div className="indicator">{otherItems.length} of {items.length}</div> 
    </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
                <Card.Body>
                    <Form>
                        <h2>Select Other Items</h2>
                        {items.map(item => <Form.Row key={item}>
                            <Col>
                                <Form.Check checked={otherItems.includes(item)}
                                    type="checkbox"
                                    label={MiscItems[item].getDisplayName()}
                                    value={item}
                                    onChange={handleSelection} />
                            </Col>
                        </Form.Row>)}
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>

    )
}

export default OtherItems