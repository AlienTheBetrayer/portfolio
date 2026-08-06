vec3 getViewDir(vec3 worldPos, vec3 cameraPos) {
	return safeNormalize(cameraPos - worldPos);
}
