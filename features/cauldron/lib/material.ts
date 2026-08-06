import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, ThreeElement } from "@react-three/fiber";
import { cauldronVertexShader } from "@/features/cauldron/shaders/cauldron.vertex";
import { cauldronFragmentShader } from "@/features/cauldron/shaders/cauldron.fragment";

export const CauldronShaderMaterial = shaderMaterial(
	// 1. Uniforms — THIS is what actually creates them on the material
	{
		uTime: 0,
		uLightPos1: new THREE.Vector3(-1.2, 0.8, 0.8),
		uLightColor1: new THREE.Color(0x0088ff),
		uLightPos2: new THREE.Vector3(1.2, 1.2, -0.5),
		uLightColor2: new THREE.Color(0x11ff55),
		uDensityMap: null,
		uFlowMap: null,
		uParallaxHeight: 0.18,
		uFlowSpeed: 0.04,
		// Flipbook atlas uniforms — these were missing entirely
		uTilesX: 8,
		uTilesY: 8,
		uFrameCount: 64,
    uFPS: 24,
    
    
	},
	// 2. Vertex Shader
	/* glsl */ cauldronVertexShader,
	// 3. Fragment Shader
	cauldronFragmentShader,
);

// Register with R3F
extend({ CauldronShaderMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		cauldronShaderMaterial: ThreeElement<typeof THREE.ShaderMaterial> & {
			uDensityMap?: THREE.Texture | null;
			uFlowMap?: THREE.Texture | null;
			uTime?: number;
			uLightPos1?: THREE.Vector3;
			uLightColor1?: THREE.Color;
			uLightPos2?: THREE.Vector3;
			uLightColor2?: THREE.Color;
			uTilesX?: number;
			uTilesY?: number;
			uFrameCount?: number;
			uFPS?: number;
			uParallaxHeight?: number;
			uFlowSpeed?: number;
		};
	}
}