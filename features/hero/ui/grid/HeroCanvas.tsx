"use client";

import { HeroCamera } from "@/features/hero/ui/grid/HeroCamera";
import { HeroGrid } from "@/features/hero/ui/grid/HeroGrid";
import { GlassText } from "@/shared/three/ui/GlassText";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, TiltShift2 } from "@react-three/postprocessing";
import { useState } from "react";

export const HeroCanvas = () => {
	// states
	const [visible, setVisible] = useState<boolean>(false);

	// jsx
	return (
    <Canvas
      dpr={[1, 2]}
			style={{ width: "100%", height: "100%", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
			onCreated={() => {
				setVisible(true);
			}}
		>
			<HeroCamera />
			<directionalLight
				position={[0, 0, 9]}
				intensity={40}
				color="#ffffff"
			/>

			<directionalLight
				position={[-3, 4, -8]}
				intensity={6}
				color="#dfe6f2"
			/>

			<ambientLight
				intensity={0.06}
				color="#8fa3c2"
			/>

			<OrbitControls
				enablePan={false}
			/>

			<color
				attach="background"
				args={["#0a0a0a"]}
			/>
			<fog
				attach="fog"
				args={["#0a0a0a", 5, 15]}
			/>
			<HeroGrid />
			<GlassText text="0 TO SHIPPED" />

			<EffectComposer>
				<TiltShift2 blur={0.125} />
			</EffectComposer>
		</Canvas>
	);
};
