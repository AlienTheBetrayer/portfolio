"use client";

import { Spheres } from "@/features/sphere/ui/Spheres";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const SphereCanvas = () => {
	return (
		<Canvas camera={{ position: [0, 0.8, 4.5], fov: 45 }}>
			<color
				attach="background"
				args={["#020204"]}
			/>

			<Spheres />

			<EffectComposer>
				<Bloom
					luminanceThreshold={0.15}
					luminanceSmoothing={0.7}
					intensity={1.8}
					mipmapBlur
				/>
			</EffectComposer>

			<OrbitControls />
		</Canvas>
	);
};
