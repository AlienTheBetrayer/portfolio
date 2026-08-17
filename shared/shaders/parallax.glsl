uniform float uParallaxStrength;
uniform float uPomMinLayers;
uniform float uPomMaxLayers;
uniform float uHeightScale;

float sampleHeight(vec2 uv) {
	return texture2D(uDensityMap, uv).r;
}

vec2 parallaxOcclusionMapping(vec2 uv, vec3 viewDirTS, out float intersectionHeight, out float occlusion) {
	float viewAngle = clamp(abs(viewDirTS.z), 0.05, 1.0);
	float numLayers = mix(uPomMaxLayers, uPomMinLayers, viewAngle);
	float layerDepth = 1.0 / numLayers;

	vec2 deltaUV = viewDirTS.xy * uParallaxStrength / numLayers;

	vec2 currentUV = uv;
	float currentLayerDepth = 0.0;
	float currentHeight = sampleHeight(currentUV);

	vec2 previousUV = currentUV;
	float previousLayerDepth = currentLayerDepth;
	float previousHeight = currentHeight;

	float stepsTaken = 0.0;

	for (int i = 0; i < 256; i++) {
		if (float(i) >= numLayers) break;

		previousUV = currentUV;
		previousLayerDepth = currentLayerDepth;
		previousHeight = currentHeight;

		currentUV -= deltaUV;
		currentUV = clamp(currentUV, vec2(0.0), vec2(1.0));
		currentLayerDepth += layerDepth;
		currentHeight = sampleHeight(currentUV);

		stepsTaken += 1.0;

		if (currentLayerDepth >= currentHeight) break;
	}

	float beforeDifference = previousLayerDepth - previousHeight;
	float afterDifference = currentLayerDepth - currentHeight;
	float weight = beforeDifference / max(beforeDifference - afterDifference, 1e-5);
	weight = clamp(weight, 0.0, 1.0);

	vec2 finalUV = mix(previousUV, currentUV, weight);
	intersectionHeight = mix(previousHeight, currentHeight, weight);

	occlusion = 1.0 - clamp(intersectionHeight * 2.0, 0.0, 1.0);

	return finalUV;
}
