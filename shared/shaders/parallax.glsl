#pragma include "atlas.glsl";

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
	float currentDepth = sampleDensity(depthMap, currentUv, tilesX, tilesY, frame);

	for (int i = 0; i < MAX_LAYERS; i++) {
		if (float(i) >= layers) break;
		if (currentLayerDepth > currentDepth) break;

		currentUv -= deltaUv;
		currentDepth = sampleDensity(depthMap, currentUv, tilesX, tilesY, frame);
		currentLayerDepth += layerDepth;
	}

	vec2 prevUv = currentUv + deltaUv;
	float endDepth = currentDepth - currentLayerDepth;
	float startDepth = sampleDensity(depthMap, prevUv, tilesX, tilesY, frame) - currentLayerDepth + layerDepth;

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
	vec3 view = normalize(viewDir);
	vec2 displacement = view.xy / max(view.z, 0.1) * heightScale;

	return POM(heightMap, uv, displacement, 0.0, layers, frame, tilesX, tilesY);
}
