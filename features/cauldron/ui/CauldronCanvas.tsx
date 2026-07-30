"use client";

import { CauldronScene } from "@/features/cauldron/ui/CauldronScene";
import SmokeDebug from "@/features/cauldron/ui/SmokeDebug";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CauldronCanvas = () => {
	return (
		<Canvas style={{ width: "100%", height: "100%" }}>
			<OrbitControls
				enableDamping={true}
				enableRotate
			/>

			<directionalLight
				position={[0.5, 0, 0]}
				intensity={3000}
			/>
			<directionalLight
				position={[0, 1, 0]}
				intensity={3000}
			/>
			<directionalLight
				position={[0, 0, 1]}
				intensity={3000}
			/>

			<CauldronScene />
			<SmokeDebug />
		</Canvas>
	);
};
