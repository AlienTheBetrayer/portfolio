uniform sampler2D uDensityMap;
uniform vec3 uFluidColor;
varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
uniform mat4 projectionMatrix;

#pragma include "parallax.glsl";

vec3 computeNormalFromHeight(vec2 uv, float texelSize) {
	float hL = sampleHeight(uv - vec2(texelSize, 0.0));
	float hR = sampleHeight(uv + vec2(texelSize, 0.0));
	float hD = sampleHeight(uv - vec2(0.0, texelSize));
	float hU = sampleHeight(uv + vec2(0.0, texelSize));

	// Slope-derived tangent-space normal. uHeightScale controls how
	// pronounced the bump is — this is a completely separate knob
	// from the POM UV-offset scale, even though it reads the same map.
	vec3 tangentNormal = normalize(vec3((hL - hR) * uHeightScale * 4.0, (hD - hU) * uHeightScale * 4.0, 1.0));
	return tangentNormal;
}

void main() {
	vec3 N = normalize(vWorldNormal);
	vec3 worldViewDir = normalize(cameraPosition - vWorldPosition);
	vec3 T = normalize(vWorldTangent);
	vec3 B = normalize(cross(N, T));

	vec3 viewDirTS = normalize(vec3(dot(worldViewDir, T), dot(worldViewDir, B), dot(worldViewDir, N)));

	float intersectionHeight;
	float occlusion;
	vec2 displacedUV = parallaxOcclusionMapping(vUv, viewDirTS, intersectionHeight, occlusion);

	float density = sampleHeight(displacedUV);
	if (density < 0.01) {
		discard;
	}

	// Slope-derived bump normal, transformed out of tangent space.
	vec3 tangentNormal = computeNormalFromHeight(displacedUV, 1.0 / 2048.0);
	vec3 bumpedNormal = normalize(tangentNormal.x * T + tangentNormal.y * B + tangentNormal.z * N);

	// Placeholder single light until the raymarch self-shadow pass exists.
	vec3 fakeLightDir = normalize(vec3(0.4, 0.6, 0.7));
	float diffuse = max(dot(bumpedNormal, fakeLightDir), 0.0);
	float rim = pow(1.0 - max(dot(bumpedNormal, worldViewDir), 0.0), 2.0);

	vec3 finalColor = uFluidColor * (0.2 + diffuse * 0.6) + rim * 0.15;

	// Contact darkening from POM step count — deeper crevices go darker.
	finalColor *= mix(0.4, 1.0, occlusion);

	// World-space depth extrusion, independent of the UV-bounded POM ceiling.
	vec3 offsetWorldPos = vWorldPosition - N * intersectionHeight * uHeightScale;
	vec4 offsetClip = projectionMatrix * viewMatrix * vec4(offsetWorldPos, 1.0);
	gl_FragDepth = (offsetClip.z / offsetClip.w) * 0.5 + 0.5;

	gl_FragColor = vec4(finalColor, density);
}
