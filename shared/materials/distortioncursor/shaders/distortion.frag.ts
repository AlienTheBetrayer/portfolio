export const distortionFrag = /* glsl */ `
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uStrength;

void mainUv(inout vec2 uv) {}

void mainImage(
    const in vec4 inputColor,
    const in vec2 uv,
    out vec4 outputColor
) {
    float aspect = uResolution.x / uResolution.y;

    vec2 sampleUv = uv;

    vec2 delta = sampleUv - uMouse;

    vec2 aspectDelta = delta;
    aspectDelta.x *= aspect;

    float dist = length(aspectDelta);

    vec2 dir = normalize(aspectDelta + 1e-6);

    vec2 uvDir = vec2(
        dir.x / aspect,
        dir.y
    );

    uvDir = normalize(uvDir);

    vec2 tangent = vec2(-uvDir.y, uvDir.x);

    float radius = 0.25;
    float horizon = 0.035;

    float influence = smoothstep(radius, horizon, dist);
    influence = pow(influence, 2.7);

    // --- layered oscillators for an organic, chaotic swirl ---
    float wave1 = sin(uTime * 6.0 + dist * 70.0);
    float wave2 = cos(uTime * 9.0 - dist * 45.0);
    float wave3 = sin(uTime * 13.0 + dist * 120.0);

    float wobble = (wave1 + wave2 + wave3) * 0.33;

    // slow, big swings in overall swirl strength and direction
    float slowSurge = sin(uTime * 0.7) * 0.5 + sin(uTime * 0.31 + 1.7) * 0.5;

    // medium, faster churn layered on top
    float churn = sin(uTime * 2.3 + dist * 20.0) * cos(uTime * 1.6 - dist * 14.0);

    // occasional sharper flicks
    float flicker = sin(uTime * 17.0 + dist * 200.0) * 0.15;

    float radial =
        (0.045 / (dist * dist + 0.02))
        * influence
        * uStrength;

    float swirl =
        (0.16
            + wobble * 0.02
            + slowSurge * 0.06
            + churn * 0.05
            + flicker * 0.02
        )
        * influence
        * uStrength;

    float ripple =
        sin(dist * 100.0 - uTime * 8.0)
        * 0.0018
        * influence;

    sampleUv -= uvDir * radial;
    sampleUv += tangent * swirl;
    sampleUv += uvDir * ripple;

    vec4 color = texture2D(inputBuffer, sampleUv);

    if (dist < horizon) {
        outputColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    float shadow = smoothstep(0.18, horizon, dist);

    color.rgb *= mix(1.0, 0.45, shadow);

    outputColor = color;
}
`;