import { smokeFragmentShader } from "@/features/cauldron/shaders/smoke.fragment";
import { smokeVertexShader } from "@/features/cauldron/shaders/smoke.vertex";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const SmokeMaterial = shaderMaterial({}, smokeVertexShader, smokeFragmentShader);

extend({ SmokeMaterial });
