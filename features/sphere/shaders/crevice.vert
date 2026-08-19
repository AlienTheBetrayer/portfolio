uniform int uHoveredInstance;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

flat varying int vInstanceId;

void main() {
	vUv = uv;
	vNormal = normalize(normalMatrix * normal);

	vPosition = position;

	vInstanceId = gl_InstanceID;

	float hovered = gl_InstanceID == uHoveredInstance ? 1.0 : 0.0;

	float scale = 1.0 + hovered * 0.12;

	vec3 scaledPosition = position * scale;

	vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(scaledPosition, 1.0);

	gl_Position = projectionMatrix * mvPosition;
}
