varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vViewDirection;

void main() {
	vUv = uv;

	vec4 worldPosition = modelMatrix * vec4(position, 1.0);

	vWorldPosition = worldPosition.xyz;

	vViewDirection = cameraPosition - worldPosition.xyz;
	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
