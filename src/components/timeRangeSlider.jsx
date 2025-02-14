import { Slider } from "@mui/material";

const TimeRangeSlider = ({ newHour, setNewHour }) => {
    const handleStartChange = (event, newValue) => {
        if (newValue < newHour.end) {
            setNewHour({ ...newHour, start: newValue });
        }
    };

    const handleEndChange = (event, newValue) => {
        if (newValue > newHour.start) {
            setNewHour({ ...newHour, end: newValue });
        }
    };

    return (
        <div>
            <h2 className="body-large">Hora de inicio</h2>
            <Slider
                value={newHour.start || 7}
                step={1}
                marks
                min={7}
                max={24}
                valueLabelDisplay="auto"
                color="secondary"
                onChange={handleStartChange}
            />

            <Slider
                value={newHour.end || 24}
                step={1}
                marks
                min={7}
                max={24}
                valueLabelDisplay="auto"
                color="secondary"
                onChange={handleEndChange}
            />
        </div>
    );
};

export default TimeRangeSlider;
