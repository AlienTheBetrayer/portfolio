"use client";

import { TextCamera } from "@/features/text/ui/TextCamera";
import { TextGrid } from "@/features/text/ui/TextGrid";
import { DistortionCursor } from "@/shared/effects/distortioncursor/ui/DistortionCursorEffect";
import { GlassText } from "@/shared/three/ui/GlassText";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useState } from "react";

export const TextCanvas = () => {
	// states
	const [visible, setVisible] = useState<boolean>(false);

	// jsx
	return (
		<Canvas
			dpr={1}
			style={{ width: "100%", height: "100%", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
			onCreated={() => {
				setVisible(true);
			}}
		>
			<TextCamera />

			<directionalLight
				position={[0, 0, 9]}
				intensity={40}
				color="#ffffff"
			/>

			<directionalLight
				position={[-3, 4, -8]}
				intensity={8}
				color="#dfe6f2"
			/>
			<ambientLight
				intensity={0.06}
				color="#8fa3c2"
			/>

			<color
				attach="background"
				args={["#0a0a0a"]}
			/>
			<fog
				attach="fog"
				args={["#0a0a0a", 5, 15]}
			/>
			<TextGrid />
			<GlassText text="FULLSTACK" />

			<EffectComposer>
				<DistortionCursor strength={0.05} />
			</EffectComposer>
		</Canvas>
	);
};
