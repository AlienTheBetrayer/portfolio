vec3 computeNormalFromHeight(vec2 uv, float texelSize, float heightScale) {
	float hL = sampleHeight(uv - vec2(texelSize, 0.0));
	float hR = sampleHeight(uv + vec2(texelSize, 0.0));
	float hD = sampleHeight(uv - vec2(0.0, texelSize));
	float hU = sampleHeight(uv + vec2(0.0, texelSize));

	vec3 tangentNormal = normalize(vec3((hL - hR) * heightScale * 4.0, (hD - hU) * heightScale * 4.0, 1.0));
	return tangentNormal;
}
