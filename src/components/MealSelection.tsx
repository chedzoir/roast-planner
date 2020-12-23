import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

import Meat from './Meat';
import MiscItems from './MiscItems';
import Potato from './Potato';
import Timing from './Timing';
import Veg from './Veg';

const MealSelection = () => {

    return (<Accordion defaultActiveKey="0">
        <Timing />
        <Meat />
        <Potato />
        <Veg />
        <MiscItems />
    </Accordion>)
}

export default MealSelection