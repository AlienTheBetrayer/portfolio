"use client";

import { useDistortionCursor } from "@/shared/materials/distortioncursor/hooks/useDistortionCursor";
import { DistortionCursorEffect } from "@/shared/materials/distortioncursor/lib/DistortionCursorEffect";
import { extend } from "@react-three/fiber";

export const DistortionCursor = ({ strength }: { strength?: number }) => {
	// logic
	const { effect } = useDistortionCursor(strength);

	// jsx
	return (
		<primitive
			object={effect}
			dispose={null}
		/>
	);
};

extend({ DistortionCursorEffect });
