import { useState, useEffect } from "react";

import "./MyMap.css";
import ModalVideo from "../components/ModalVideo";
import RhythmCodeIcon from "../components/RhythmCodeIcon";
import DotMap from "../components/DotMap";

function MyMap() {
	const [rhythmCodes, setRhythmCodes] = useState([]);
	const [rhythms, setRhythms] = useState([]);

	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedRhythm, setSelectedRhythm] = useState({});

	const API_Rhythms_URL = "/api/rhythms";

	useEffect(() => {
		fetch(API_Rhythms_URL)
			.then((response) => response.json())
			.then((rhythms) => {
				setRhythms(rhythms);
				let rhythmsCodes = rhythms.reduce((acc, rhythm) => {
					const existingRhythm = acc.find(
						(item) => item.rhythm_code === rhythm.rhythm_code
					);
					if (!existingRhythm) {
						acc.push({
							rhythm_code: rhythm.rhythm_code,
							leftpx: rhythm.leftpx,
							toppx: rhythm.toppx,
						});
					}
					return acc;
				}, []);
				setRhythmCodes(rhythmsCodes);
			})
			.catch((error) => {
				console.error("NOPE! Rhythms:", error);
			});
	}, []);

	return (
		<div>
			<DotMap className="map" />
			{rhythmCodes.map((rhythmCodeObject) => (
				<RhythmCodeIcon
					key={rhythmCodeObject.rhythm_code}
					rhythmCodeName={rhythmCodeObject.rhythm_code}
					rhythmsList={rhythms}
					toppx={rhythmCodeObject.toppx}
					leftpx={rhythmCodeObject.leftpx}
					setModalOpen={setModalOpen}
					setSelectedRhythm={setSelectedRhythm}
				/>
			))}
			{isModalOpen && (
				<ModalVideo setModalOpen={setModalOpen} rhythm={selectedRhythm} />
			)}
		</div>
	);
}

export default MyMap;