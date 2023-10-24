import React, { useState } from "react";
import { Range } from "react-range";
import "./DualRangeSlider.css";

const DualRangeSlider = ({ onChangeRange, isNightMode }) => {
	const min = 1600;
	const max = 2050;
	const step = 150;

	const labels = ["Pre-colonial", "Pre-civil war", "Post civil war", "Present"];

	const [values, setValues] = useState([min, max]);

	const handleChange = (newValues) => {
		setValues(newValues);
		onChangeRange(newValues);
	};

	const getLabelForValue = (value) => {
		// work out index of current label based on value and step count to be used in title
		const index = Math.floor((value - min) / step);
		return labels[index];
	};

	return (
		<div className="dual-range-container">
			<h3 className="range-title">
				Range: {getLabelForValue(values[0])} - {getLabelForValue(values[1])}
			</h3>
			<div className="range-wrapper">
				<Range
					step={step}
					min={min}
					max={max}
					values={values}
					onChange={handleChange}
					renderTrack={({ props, children }) => (
						<div {...props} className="range-track">
							{children}
							<div
								className="range-highlight"
								style={{
									width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
									left: `${((values[0] - min) / (max - min)) * 100}%`,
									background: isNightMode ? "#B99E01" : "#000",
								}}
							></div>
						</div>
					)}
					renderThumb={({ props }) => (
						<div
							{...props}
							className={`range-thumb ${
								isNightMode ? "night-mode" : "day-mode"
							}`}
						/>
					)}
					renderMark={({ props, index }) => (
						<div className="range-label-container">
							<div className="range-label" {...props}>
								{labels[index]}
							</div>
						</div>
					)}
				/>
			</div>
			<div className="range-values">
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);
};

export default DualRangeSlider;
