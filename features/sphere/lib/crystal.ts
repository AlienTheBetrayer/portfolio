import { Vector3 } from "three";
import { ConvexGeometry } from "three-stdlib";

export function createCrystalGeometry(facetCount = 12, heightRatio = 2.5) {
	const points = [];

	// Top tip
	points.push(new Vector3(0, heightRatio, 0));
	// Bottom tip
	points.push(new Vector3(0, -heightRatio, 0));

	// Random circumferential points around the body
	for (let i = 0; i < facetCount; i++) {
		const angle = (i / facetCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
		const radius = 0.5 + Math.random() * 0.5;
		const y = (Math.random() - 0.5) * (heightRatio * 0.8);

		points.push(new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
	}

	const geometry = new ConvexGeometry(points);
	geometry.computeVertexNormals();
	return geometry;
}
