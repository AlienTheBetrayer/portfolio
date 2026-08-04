"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { type PerspectiveCamera as PerspectiveCameraType } from "three";

gsap.registerPlugin(useGSAP);

export const HeroCamera = () => {
	// refs
	const cameraRef = useRef<PerspectiveCameraType>(null);

	// animating
	useGSAP(
		() => {
			const camera = cameraRef.current;

			if (!camera) {
				return;
			}

			// animate position
			gsap.to(camera.position, {
				x: -20,
				y: 29,
				z: 28,
				delay: 1,
				duration: 2,
				ease: "circ.inOut",
			});

			// animate rotation
			gsap.to(camera.rotation, {
				x: -0.7,
				y: -0.42,
				z: -0.35,
				delay: 1,
				duration: 2,
				ease: "circ.inOut",
			});
		},
		{ scope: cameraRef },
	);

	// jsx
	return (
		<>
			<PerspectiveCamera
				position={[0, 20, 5]}
				rotation={[0, 0, 0]}
				ref={cameraRef}
				makeDefault
				fov={30}
			/>
			<OrbitControls
				enablePan={false}
				enableZoom={false}
			/>
		</>
	);
};
