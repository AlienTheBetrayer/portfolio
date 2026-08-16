import { advectionVertexShader, advectionFragmentShader } from "@/features/cauldron/shaders";
import { DataTexture, ShaderMaterial, Vector2 } from "three";

export const FluidAdvectionShader = (densityMap: DataTexture, velocityMap: DataTexture) =>
	new ShaderMaterial({
		uniforms: {
			uDensityMap: { value: densityMap },
			uVelocityMap: { value: velocityMap },
			uVelocityTexelSize: { value: new Vector2(1 / 1024, 1 / 512) },
			uDensityTexelSize: { value: new Vector2(1 / 2048, 1 / 1024) },
			uProgress: { value: 0.0 },
			uFrameA: { value: 0.0 },
			uFrameB: { value: 1.0 },
			uGridSize: { value: new Vector2(8.0, 4.0) },
			uAdvectionStrength: { value: 0.05 },
		},
		vertexShader: advectionVertexShader,
		fragmentShader: advectionFragmentShader,
	});
