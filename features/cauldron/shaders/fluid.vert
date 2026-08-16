attribute vec4 tangent;

varying vec2 vUv;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;

void main() {
	vUv = uv;

	vec4 worldPosition = modelMatrix * vec4(position, 1.0);

	vWorldPosition = worldPosition.xyz;

	vWorldNormal = normalize(normalMatrix * normal);

	// --------------------------------------------------
	// Derive tangent from the UV direction.
	//
	// For a regular fluid plane this is sufficient.
	// --------------------------------------------------

	vec3 objectTangent;

	if (abs(normal.x) < 0.9) {
		objectTangent = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
	} else {
		objectTangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
	}

	vWorldTangent = normalize(mat3(modelMatrix) * objectTangent);

	gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
