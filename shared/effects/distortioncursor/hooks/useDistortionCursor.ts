import { DistortionCursorEffect } from "@/shared/effects/distortioncursor/lib/DistortionCursorEffect";
import { useThree, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { Vector2 } from "three";

export const useDistortionCursor = (strength?: number) => {
	// variables
	const effect = useMemo(() => new DistortionCursorEffect(strength), [strength]);
	const { pointer, size } = useThree();

	const target = useRef(new Vector2());
	const smoothMouse = useRef(new Vector2(0.5, 0.5));

	useEffect(() => {
		effect.uniforms.get("uResolution")?.value.set(size.width, size.height);
	}, [effect.uniforms, size]);

	// event tick
	useFrame((state, delta) => {
		// pointer
		target.current.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
		smoothMouse.current.lerp(target.current, 1 - Math.exp(-8 * delta));

		// uniforms
		const uMouse = effect.uniforms.get("uMouse")!;
		const uTime = effect.uniforms.get("uTime")!;

		if (uMouse.value == null || uTime.value == null) {
			return;
		}

		uMouse.value.copy(smoothMouse.current);
		uTime.value = state.clock.elapsedTime;
	});

	// return
	return useMemo(
		() => ({
			effect,
		}),
		[effect],
	);
};
