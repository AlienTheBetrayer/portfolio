#pragma include "atlas.glsl";

// utils
float samplePOM(sampler2D atlas, vec2 uv, float tilesX, float tilesY, float frame) {
	return smoothstep(0.15, 0.85, sampleDensity(atlas, uv, tilesX, tilesY, frame));
}

// shader logic
vec2 POM(
	sampler2D depthMap,
	vec2 uv,
	vec2 displacement,
	float pivot,
	float layers,
	float frame,
	float tilesX,
	float tilesY
) {
	const int MAX_LAYERS = 64;
	float layerDepth = 1.0 / layers;
	vec2 deltaUv = displacement / layers;
	float currentLayerDepth = 0.0;

	vec2 currentUv = uv + pivot * displacement;
	float currentDepth = samplePOM(depthMap, currentUv, tilesX, tilesY, frame);

	for (int i = 0; i < MAX_LAYERS; i++) {
		if (float(i) >= layers) break;
		if (currentLayerDepth > currentDepth) break;

		currentUv -= deltaUv;
		currentDepth = samplePOM(depthMap, currentUv, tilesX, tilesY, frame);
		currentLayerDepth += layerDepth;
	}

	vec2 prevUv = currentUv + deltaUv;
	float endDepth = currentDepth - currentLayerDepth;
	float startDepth = samplePOM(depthMap, prevUv, tilesX, tilesY, frame) - currentLayerDepth + layerDepth;

	float w = endDepth / (endDepth - startDepth);

	return mix(currentUv, prevUv, w);
}

// applying
vec2 applyPOM(
	sampler2D heightMap,
	vec2 uv,
	vec3 viewDir,
	float heightScale,
	float layers,
	float frame,
	float tilesX,
	float tilesY
) {
	vec3 view = transpose(vTBN) * normalize(vViewDir);
	vec2 displacement = view.xy / max(view.z, 0.1) * heightScale;

	return POM(heightMap, uv, displacement, 0.0, layers, frame, tilesX, tilesY);
}
