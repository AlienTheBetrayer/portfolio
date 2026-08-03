"use client";

import { DistortionCursorEffect } from "@/shared/materials/distortioncursor/lib/DistortionCursorEffect";
import { extend } from "@react-three/fiber";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector2 } from "three";

export const DistortionCursor = ({ strength }: { strength?: number }) => {
	// init
	const effect = useMemo(() => new DistortionCursorEffect(strength), [strength]);
	const { pointer } = useThree();

	// event tick
	const smoothMouse = useRef(new Vector2(0.5, 0.5));

	useFrame((state, delta) => {
		const uMouse = effect.uniforms.get("uMouse");
		const uTime = effect.uniforms.get("uTime");
		const uResolution = effect.uniforms.get("uResolution");

		if (!uMouse || !uTime || !uResolution) return;

		const targetX = pointer.x * 0.5 + 0.5;
		const targetY = pointer.y * 0.5 + 0.5;

		// Framerate-independent smoothing
		const t = 1.0 - Math.exp(-4 * delta);

		smoothMouse.current.lerp(new Vector2(targetX, targetY), t);

		uMouse.value.copy(smoothMouse.current);
		uResolution.value.set(window.innerWidth, window.innerHeight);
		uTime.value = state.clock.elapsedTime;
	});

	// jsx
	return (
		<primitive
			object={effect}
			dispose={null}
		/>
	);
};

extend({ DistortionCursorEffect });
