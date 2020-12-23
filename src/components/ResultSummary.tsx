import { DateTime } from 'luxon';
import React from 'react';
import Card from 'react-bootstrap/Card'
import { RoastDinner } from '../model';


type ResultSummaryProps = {
    roastdinner: RoastDinner
}

const ResultSummary = (props: ResultSummaryProps) => {

    const { roastdinner } = props

    const startTime = roastdinner.getStartTime()?.toLocaleString(DateTime.TIME_24_SIMPLE)
    const endTime = roastdinner.getEndTime()?.toLocaleString(DateTime.TIME_24_SIMPLE);

    return (
        <Card>
            <Card.Header>Summary</Card.Header>
            <Card.Body>
                <div className="summary">
                    <div className="header">Meat Weight:</div><div>{roastdinner.getWeight()} kg</div>
                    <div className="header">Cooking Time:</div><div>{formatTime(roastdinner.getMeatCookingTime())}</div>
                    <div className="header">Start Time:</div><div>{startTime}</div>
                    <div className="header">End Time:</div><div>{endTime}</div>
                </div>
            </Card.Body>
        </Card>
    )

}

export default ResultSummary


const formatTime = (minutes: number | undefined) => {

    if (minutes === undefined) {
        return ''
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes - hours * 60;

    return hours > 0 ? `${hours} hrs ${mins} mins` : `${mins} mins`
}