"use client";

import { useDistortionCursor } from "@/shared/effects/distortioncursor/hooks/useDistortionCursor";
import { DistortionCursorEffect } from "@/shared/effects/distortioncursor/lib/DistortionCursorEffect";
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
