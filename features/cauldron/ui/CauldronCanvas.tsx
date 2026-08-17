"use client";

import { CauldronScene } from "@/features/cauldron/ui/CauldronScene";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const CauldronCanvas = () => {
	return (
		<Canvas camera={{ position: [0, 2.5, 3.5], fov: 45 }}>
			<OrbitControls />
      <CauldronScene />
      
      {/* <EffectComposer>
        <Bloom luminanceThreshold={0.0} luminanceSmoothing={1} intensity={100} />
      </EffectComposer> */}
		</Canvas>
	);
};
