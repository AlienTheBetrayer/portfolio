uniform sampler2D uDensityMap;
uniform vec3 uFluidColor;
varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
uniform mat4 projectionMatrix;

#pragma include "parallax.glsl";
#pragma include "raymarch.glsl";
#pragma include "utils.glsl";

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

	vec3 tangentNormal = computeNormalFromHeight(displacedUV, 1.0 / 2048.0, uHeightScale);
	vec3 bumpedNormal = normalize(tangentNormal.x * T + tangentNormal.y * B + tangentNormal.z * N);

	// Point light direction: LightPos - MeshPos, per FluidNinja's approach,
	// projected into the same tangent space as the POM/light march.
	vec3 offsetWorldPos = vWorldPosition - N * intersectionHeight * uHeightScale;
	vec3 worldLightDir = normalize(uLightPos - offsetWorldPos);
	vec3 lightDirTS = normalize(vec3(dot(worldLightDir, T), dot(worldLightDir, B), dot(worldLightDir, N)));

	float diffuse = max(dot(bumpedNormal, worldLightDir), 0.0);
	float rim = pow(1.0 - max(dot(bumpedNormal, worldViewDir), 0.0), 2.0);

	// Beer-Lambert self-shadow/transmittance pass.
	float lightTransmittance = raymarchLightTransmittance(displacedUV, lightDirTS, intersectionHeight);

	vec3 finalColor = uFluidColor * (0.2 + diffuse * 0.6 * lightTransmittance) + rim * 0.15;
	finalColor += uLightColor * lightTransmittance * 0.3; // internal illumination bleed-through on thin regions
	finalColor *= mix(0.4, 1.0, occlusion);

	vec4 offsetClip = projectionMatrix * viewMatrix * vec4(offsetWorldPos, 1.0);
	gl_FragDepth = offsetClip.z / offsetClip.w * 0.5 + 0.5;

	gl_FragColor = vec4(finalColor, density);
}
