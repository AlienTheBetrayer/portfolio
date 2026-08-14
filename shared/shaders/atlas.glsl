vec2 getAtlasUV(
	vec2 uv,
	float frame,
	vec2 gridSize,
	vec2 texelSize
) {
	float frameX = mod(frame, gridSize.x);
	float frameY = floor(frame / gridSize.x);

	// Flip Y because the atlas rows are stored top -> bottom.
	frameY = gridSize.y - 1.0 - frameY;

	vec2 tileSize = 1.0 / gridSize;

	// Half a physical texel.
	vec2 padding = texelSize * 0.5;

	// Keep sampling strictly inside this frame.
	vec2 localUv = clamp(uv, 0.0, 1.0);

	localUv = padding +
		localUv * (tileSize - padding * 2.0);

	return vec2(frameX, frameY) * tileSize + localUv;
}


// ------------------------------------------------------------
// Density atlas
// ------------------------------------------------------------

vec2 getDensityUV(vec2 uv, float frame) {
	return getAtlasUV(
		uv,
		frame,
		uGridSize,
		uDensityTexelSize
	);
}


// ------------------------------------------------------------
// Velocity atlas
// ------------------------------------------------------------

vec2 getVelocityUV(vec2 uv, float frame) {
	return getAtlasUV(
		uv,
		frame,
		uGridSize,
		uVelocityTexelSize
	);
}