import { advectionVertexShader, advectionFragmentShader } from "@/features/cauldron/shaders";
import * as THREE from "three";

export const FluidAdvectionShader = {
	uniforms: {
		uDensityMap: { value: null },
		uVelocityMap: { value: null },
		uProgress: { value: 0.0 },
		uFrameA: { value: 0.0 },
		uFrameB: { value: 1.0 },
		uGridSize: { value: new THREE.Vector2(8.0, 4.0) },
		uAdvectionStrength: { value: 0.05 },
	},
	vertexShader: advectionVertexShader,
	fragmentShader: advectionFragmentShader,
};
