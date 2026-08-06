import { Grid } from "@react-three/drei";

export const TextGrid = () => {
	return (
		<Grid
			position={[0, -0.01, 0]}
			args={[64, 64]}
			cellSize={1}
			cellThickness={0.8}
			cellColor="#333333"
			sectionSize={4}
			sectionThickness={1.2}
			sectionColor="#444444"
			fadeDistance={60} 
			fadeStrength={1.5}
		/>
	);
};
