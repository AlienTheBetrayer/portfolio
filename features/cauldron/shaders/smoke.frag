varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewDir;

uniform sampler2D densityMap;
uniform float time;
uniform float tilesX;
uniform float tilesY;
uniform float frameCount;
uniform float frame;
uniform float fps;

float sampleDensity(vec2 uv) {
	float frame = mod(floor(time * fps), frameCount);
	float tileX = mod(frame, tilesX);
	float tileY = tilesY - 1.0 - floor(frame / tilesX);

	vec2 atlasUV = vec2((vUv.x + tileX) / tilesX, (vUv.y + tileY) / tilesY);
	float density = texture2D(densityMap, atlasUV).r;

	return density;
}

vec4 renderDensity(float density) {
	density = smoothstep(0.08, 0.85, density); // shape
	density = pow(density, 1.4); // contrast

	vec3 smokeColor = vec3(0.82, 0.86, 0.92);

	return vec4(smokeColor * density, density);
}

vec4 debugDensity(float density) {
	vec3 v = normalize(vViewDir);
	return vec4(v * 0.5 + 0.5, 1.0);
}

void main() {
	float density = sampleDensity(vUv);
	gl_FragColor = renderDensity(density);
	gl_FragColor = debugDensity(density);
}
