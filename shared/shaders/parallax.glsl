float sampleHeight(vec2 uv) {
	return texture2D(uDensityMap, uv).r;
}

vec2 POM(vec2 uv, vec3 viewDirTS, out float intersectionHeight, float heightScale, float minLayers, float maxLayers) {
	float viewAngle = clamp(abs(viewDirTS.z), 0.05, 1.0);
	float numLayers = mix(uPomMaxLayers, uPomMinLayers, viewAngle);
	float layerDepth = 1.0 / numLayers;

	vec2 deltaUV = viewDirTS.xy * uHeightScale / numLayers;

	vec2 currentUV = uv;
	float currentLayerDepth = 0.0;
	float currentHeight = sampleHeight(currentUV);

	vec2 previousUV = currentUV;
	float previousLayerDepth = currentLayerDepth;
	float previousHeight = currentHeight;

	for (int i = 0; i < 64; i++) {
		if (float(i) >= numLayers) {
			break;
		}

		previousUV = currentUV;
		previousLayerDepth = currentLayerDepth;
		previousHeight = currentHeight;
		currentUV -= deltaUV;
		currentLayerDepth += layerDepth;

		if (currentUV.x < 0.0 || currentUV.x > 1.0 || currentUV.y < 0.0 || currentUV.y > 1.0) {
			break;
		}

		currentHeight = sampleHeight(currentUV);

		if (currentLayerDepth >= currentHeight) {
			break;
		}
	}

	float beforeDifference = previousLayerDepth - previousHeight;
	float afterDifference = currentLayerDepth - currentHeight;
	float weight = beforeDifference / (beforeDifference - afterDifference);

	weight = clamp(weight, 0.0, 1.0);
	vec2 finalUV = mix(previousUV, currentUV, weight);
	intersectionHeight = mix(previousHeight, currentHeight, weight);

	return finalUV;
}