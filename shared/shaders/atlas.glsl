// misc
float getFrame(float time, float fps, float frameCount) {
	float frame = mod(floor(time * fps), frameCount);
  return frame;
}

// sample
vec2 atlasUV(vec2 uv, float frame, float tilesX, float tilesY) {
	float tileX = mod(frame, tilesX);
	float tileY = tilesY - 1.0 - floor(frame / tilesX);
	vec2 tileSize = vec2(1.0 / tilesX, 1.0 / tilesY);

	return vec2(tileX, tileY) * tileSize + uv * tileSize;
}

float sampleDensity(sampler2D atlas, vec2 uv, float tilesX, float tilesY, float frame) {
	vec2 atlasCoords = atlasUV(uv, frame, tilesX, tilesY);

	return texture2D(atlas, atlasCoords).r;
}

float sampleHeight(sampler2D atlas, vec2 uv, float frame) {
	return sampleDensity(atlas, uv, frame, tilesX, tilesY);
}

// rendering
vec4 renderDensity(float density) {
	density = smoothstep(0.08, 0.85, density); // shape
	density = pow(density, 0.4); // contrast

	vec3 smokeColor = vec3(0.82, 0.86, 0.92);

	return vec4(smokeColor * density, density);
}

vec4 debugDensity(float density) {
	vec3 v = normalize(vViewDir);
	return vec4(v * 0.5 + 0.5, 1.0);
}
