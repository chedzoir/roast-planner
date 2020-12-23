import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import { EventType } from '../rules';
import { DateTime } from 'luxon';
import { SwimlineData } from '../swimline';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import { updateMarker } from '../store/swimlineSlice';

type Props = {
}

const colours: Record<EventType, string> = {
    [EventType.prep]: '#66ccff',
    [EventType.cooking]: '#ff6600',
    [EventType.resting]: '#ffcc00',
    [EventType.serving]: '#99ff99'
}

let timer: any;

const SwimLine = (props: Props) => {

    const swimline = useRef(null);
    const dispatch = useDispatch();

    const { data: chartData } = useSelector((state: RootState) => state.swimline);

    const [timerRunnng, setTimerRunning] = useState(false);

    const startTimer = () => {
        timer = setInterval(() => {
            dispatch(updateMarker(DateTime.local().toMillis()))
        }, 60000)
        setTimerRunning(true);
    }

    const stopTimer = () => {
        clearInterval(timer)
        setTimerRunning(false)
    }

    useEffect(() => {
        createChart(swimline.current, chartData)
    }, [chartData])

    return (
        <Card className="timing-plan">
            <Card.Header>
                <div>
                    Your Roast Timing Plan
                </div>
                {timerRunnng && <Button className="indicator" variant="outline-danger" onClick={stopTimer} size="sm">Stop</Button>}
                {!timerRunnng && <Button className="indicator" variant="outline-success" onClick={startTimer} size="sm">Start</Button>}

            </Card.Header>
            <Card.Body>
                <div ref={swimline} />
            </Card.Body>
        </Card>
    )
}

const formatDate: (val: d3.NumberValue) => string =
    (val: d3.NumberValue) =>
        DateTime.fromMillis(val.valueOf()).toLocaleString(DateTime.TIME_24_SIMPLE)

const uniqueNames: (data: any[]) => any[] = (data: any[]) => {
    const res: Record<string, any> = {};

    data.forEach(d => res[d.name] = { name: d.name, y: d.y })

    return Object.values(res);
}

const createChart = (element: any, chartData: SwimlineData) => {

    const { data, minVal, maxVal, marker } = chartData

    const names = uniqueNames(data);
    const labelWidth = 100;
    const chartWidth = element.offsetWidth - labelWidth;
    const lineHeight = 35
    const chartHeight = (names.length + 1) * lineHeight;

    const scaleX = (x: number) =>
        x * chartWidth + labelWidth

    const d3Container = d3.select(element)

    if (d3Container.selectChild("svg")) {
        d3Container.selectChild("svg").remove()
    }
    const svgCanvas = d3Container
        .append("svg")
        .attr("width", chartWidth + labelWidth)
        .attr("height", chartHeight);

    svgCanvas.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", 30)
        .attr("width", (dp, i) => dp.width * chartWidth)
        .attr("x", dp => scaleX(dp.x))
        .attr("y", dp => dp.y)
        .attr("fill", dp => colours[dp.type as EventType])
        .attr("stroke", "gray")
        .attr("stroke-width", 1)


    svgCanvas.selectAll("text")
        .data(uniqueNames(data))
        .enter()
        .append("text")
        .text(dp => dp.name)
        .attr("x", 0)
        .attr("y", dp => dp.y + 20)
        .attr("font-size", 12)
        .attr("font-family", "sans-serif")
        .attr("font-anchor", "middle")


    // d3.axisTop()

    // Create scale
    var scale = d3.scaleLinear()
        .domain([minVal, maxVal])
        .range([0, chartWidth]);

    // Add scales to axis
    var x_axis = d3.axisTop(scale)
        .ticks(10)
        .tickFormat(formatDate);

    //Append group and insert axis
    svgCanvas.append("g")
        .attr("transform", "translate(100, 20)")
        .call(x_axis);

    const makerValue = (marker - minVal) / (maxVal - minVal);

    if (!isNaN(makerValue)) {
        svgCanvas.append("line")
            .attr("x1", scaleX(makerValue) - 1)
            .attr("y1", 20)
            .attr("x2", scaleX(makerValue) - 1)
            .attr("y2", chartHeight)
            .attr("stroke", "red")

        svgCanvas.append("line")
            .attr("x1", scaleX(makerValue) + 1)
            .attr("y1", 20)
            .attr("x2", scaleX(makerValue) + 1)
            .attr("y2", 400)
            .attr("stroke", "red")
    }

}

export default SwimLine;