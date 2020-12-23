import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { RoastDinner, RoastDinnerParameters } from '../model'
import { MeatOptions } from '../rules'
import { RootState } from '../store'
import ResultSummary from './ResultSummary'
import swimlineDetail from '../swimline'
import { updateSwimline } from '../store/swimlineSlice'

const Result = () => {

    const { timing, meat, potato, veg, otherItems } = useSelector((state: RootState) => state)
    const [roastDinner, setRoastDinner] = useState<RoastDinner>();
    const [showResult, setShowResult] = useState(true);

    const toggleResult = () => {
        setShowResult(!showResult);
    }

    const dispatch = useDispatch();

    useEffect(() => {

        if (timing.diners && !isNaN(timing.diners)) {
            const endTime = DateTime.local().set({ minute: timing.endTimeMinutes, hour: timing.endTimeHours });

            const parameters: RoastDinnerParameters = {
                meat: MeatOptions[meat.meat],
                weight: meat.weight,
                endTime,
                diners: timing.diners,
                potato: potato.type,
                veg: veg.selectedVeg,
                otherItems: otherItems.otherItems
            }

            const roastDinner = new RoastDinner(parameters);
            roastDinner.calculate();

            setRoastDinner(roastDinner)
            dispatch(updateSwimline(swimlineDetail(roastDinner.getSwimlines())))
        }
    }, [timing, meat, potato, veg, otherItems, dispatch])

    const events = roastDinner?.getEventList() || {};

    if (!roastDinner || !timing.diners || isNaN(+timing.diners)) {
        return null;
    }

    return (
        <>
            <ResultSummary roastdinner={roastDinner} />

            <Card className="roast-plan">
                <Card.Header>
                    <div>Roast Plan</div>
                    {showResult && <Button className="indicator" variant="outline-danger" onClick={toggleResult} size="sm">Hide</Button>}
                    {!showResult && <Button className="indicator" variant="outline-success" onClick={toggleResult} size="sm">Show</Button>}


                </Card.Header>
                {showResult && <Card.Body>

                    <div className="resultList">
                        <div className="header">Time</div>
                        <div className="header">Event</div>
                        {Object.keys(events).sort().map(time => (
                            <React.Fragment key={time}>
                                <div className="time">{time}</div>
                                <div className="event">{events[time].map(evt => <div key={evt}>{evt}</div>)}</div>
                            </React.Fragment>))}
                    </div>
                </Card.Body>}
            </Card>

        </>
    )
}

export default Result;

