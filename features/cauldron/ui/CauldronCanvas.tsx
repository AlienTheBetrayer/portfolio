"use client";

import { CauldronModel } from "@/features/cauldron/ui/CauldronModel";
import "../lib/material";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CauldronCanvas = () => {
	return (
		<Canvas camera={{ position: [0, 2.5, 3.5], fov: 45 }}>
			<OrbitControls />

			<directionalLight
				intensity={128}
				position={[0, 2.5, 3.5]}
			/>
			<directionalLight
				intensity={128}
				position={[0, -2, -3.5]}
			/>
      <CauldronModel />
      
			{/* <EffectComposer>
				<Bloom
					intensity={1.2}
					luminanceThreshold={0.15}
					luminanceSmoothing={0.5}
					radius={0.5}
				/>
			</EffectComposer> */}
		</Canvas>
	);
};
