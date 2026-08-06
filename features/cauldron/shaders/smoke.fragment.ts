export const smokeFragmentShader = `
uniform sampler2D densityMap;

uniform float time;

uniform float tilesX;
uniform float tilesY;
uniform float frameCount;
uniform float frame;
uniform float fps;

varying vec2 vUv;

void main()
{
    // Current animation frame
    float frame = mod(floor(time * fps), frameCount);

    // Atlas coordinates
    float tileX = mod(frame, tilesX);
    float tileY = (tilesY - 1.0) - floor(frame / tilesX);

    vec2 atlasUV = vec2(
        (vUv.x + tileX) / tilesX,
        (vUv.y + tileY) / tilesY
    );

    float density = texture2D(densityMap, atlasUV).r;
    density = smoothstep(0.08, 0.85, density); // shape
    density = pow(density, 1.4); // contrast

    vec3 smokeColor = vec3(
      0.82,
      0.86,
      0.92
    );

    gl_FragColor = vec4(smokeColor * density, density);
    
}
    `;
