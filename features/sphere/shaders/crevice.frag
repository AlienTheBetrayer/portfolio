uniform vec3 uGlowColor;
uniform vec3 uBaseColor;
uniform int uHoveredInstance;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

flat varying int vInstanceId;

void main() {
	float heightGradient = smoothstep(-0.2, 0.25, vPosition.y);

	float glowIntensity = pow(1.0 - heightGradient, 2.5) * 4.0;

	float hovered = vInstanceId == uHoveredInstance ? 1.0 : 0.0;

	glowIntensity *= 1.0 + hovered * 10.0;

	float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

	vec3 color = mix(uGlowColor * glowIntensity, uBaseColor, heightGradient);

	color += uBaseColor * fresnel * 0.2;

	gl_FragColor = vec4(color, 1.0);
}
