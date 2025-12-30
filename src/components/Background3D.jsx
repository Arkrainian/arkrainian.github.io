import React, { useMemo, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sparkles, MeshDistortMaterial, useTexture, useGLTF, useFBX } from '@react-three/drei';
import * as THREE from 'three';

// ErrorBoundary to catch 3D rendering errors preventing full crash
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("3D Context Error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return null; // Render nothing instead of crashing
        }
        return this.props.children;
    }
}

const BlackHole = () => {
    const diskRef = useRef();
    const rimRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (diskRef.current) {
            diskRef.current.rotation.z = t * 0.2;
        }
        // Make the purple rim always face the camera position to act as a perfect, centered outline
        if (rimRef.current) {
            rimRef.current.lookAt(state.camera.position);
            const pulse = 1 + Math.sin(t * 2) * 0.02;
            rimRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group position={[14, 10, -25]}>
            {/* Event Horizon (Pitch Black Core) */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Purple Event Horizon Outline (Camera-facing Ring) */}
            <mesh ref={rimRef}>
                <ringGeometry args={[1.22, 1.35, 64]} />
                <meshBasicMaterial color="#a020f0" side={THREE.DoubleSide} />
            </mesh>

            {/* Accretion Disk (Purple Energy) */}
            <mesh ref={diskRef} rotation={[Math.PI / 1.5, 0, 0]}>
                <ringGeometry args={[1.5, 4.5, 64]} />
                <MeshDistortMaterial
                    color="#8800ff"
                    emissive="#4b0082"
                    emissiveIntensity={5}
                    speed={3}
                    distort={0.4}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Synced Energy Particles (Synced with Saturn's style) */}
            <Sparkles
                count={300}
                scale={[4, 4, 0.1]}
                size={2}
                speed={0.2}
                opacity={0.4}
                color="#a020f0"
                rotation={[Math.PI / 1.5, 0, 0]}
            />

            <pointLight intensity={20} distance={30} color="#8800ff" />
        </group>
    );
};


const Sun = () => {
    // Sun Texture (using lava as a realistic stellar surface)
    const [lavaMap] = useTexture(['https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/lava/lavatile.jpg']);

    useEffect(() => {
        if (lavaMap) {
            lavaMap.wrapS = lavaMap.wrapT = THREE.RepeatWrapping;
            lavaMap.needsUpdate = true; // Ensure wrapping mode is applied
        }
    }, [lavaMap]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (lavaMap) {
            lavaMap.offset.x = (t * 0.01) % 1; // Modulo to prevent precision loss
            lavaMap.offset.y = (t * 0.015) % 1;
        }
    });

    return (
        <group position={[8, -8, -18]}>
            {/* Core Sun Surface */}
            <mesh>
                <sphereGeometry args={[1.6, 64, 64]} />
                <meshStandardMaterial
                    map={lavaMap}
                    emissiveMap={lavaMap}
                    emissive="#ff4400" // Rich orange-red
                    emissiveIntensity={8}  // Boosted for fiery effect
                    roughness={1}
                    metalness={0}
                />
            </mesh>

            {/* Atmosphere / Corona Layer 1 (Inner Glow) */}
            <mesh scale={1.05}> {/* Increased scale (was 1.02) to prevent Z-fighting */}
                <sphereGeometry args={[1.6, 64, 64]} />
                <MeshDistortMaterial
                    color="#ff4400"
                    emissive="#ff4400"
                    emissiveIntensity={2}  // Lowered (was 4)
                    speed={2}
                    distort={0.4}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Atmosphere / Corona Layer 2 (Outer Flares) */}
            <mesh scale={1.1}>
                <sphereGeometry args={[1.6, 64, 64]} />
                <MeshDistortMaterial
                    color="#ff6600"
                    emissive="#cc3300"
                    emissiveIntensity={1.5}  // Lowered (was 3)
                    speed={1.5}
                    distort={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Solar Flare Particles */}
            <Sparkles
                count={200}
                scale={8}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#e65100" // Darker orange sparkles
            />

            {/* Main Light (Orangey Sun Light) */}
            <pointLight
                intensity={3000}
                distance={300}
                decay={1.5}
                color="#ff4400" // Deeper orange light
                castShadow={false}
            />

            {/* Ambient Boost around Sun */}
            <pointLight
                intensity={200}
                distance={50}
                color="#992200" // Very dark orange-red ambient
            />
        </group>
    );
};


const Saturn = () => {
    const orbitRef = useRef();
    const sunPos = [8, -8, -18];
    const orbitRadius = 18;
    const orbitSpeed = 0.1;

    // Saturn Texture (using moon as a realistic rocky surface)
    const [texture] = useTexture(['https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg']);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (orbitRef.current) {
            orbitRef.current.position.x = sunPos[0] + Math.cos(t * orbitSpeed + 2) * orbitRadius;
            orbitRef.current.position.z = sunPos[2] + Math.sin(t * orbitSpeed + 2) * orbitRadius;
            orbitRef.current.position.y = sunPos[1];
            orbitRef.current.rotation.y = t * 0.1;
        }
    });

    return (
        <group ref={orbitRef} rotation={[0.4, 0.3, 0.1]}>
            <mesh>
                <sphereGeometry args={[1.2, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    color="#e1c699"
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Inner Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.5, 2.0, 64]} />
                <meshStandardMaterial
                    color="#d4af37"
                    transparent
                    opacity={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.1, 2.6, 64]} />
                <meshStandardMaterial
                    color="#c2b280"
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Ring Detail Sparkles */}
            <Sparkles
                count={300}
                scale={[8, 8, 0.1]}
                size={2}
                speed={0.2}
                opacity={0.4}
                color="#ffd700"
                rotation={[Math.PI / 2, 0, 0]}
            />

            <pointLight intensity={10} distance={20} color="#ffd700" />
        </group>
    )
}



const Earth = () => {
    const meshRef = useRef();
    const cloudsRef = useRef();
    const orbitRef = useRef();
    const moonRef = useRef();

    // Corrected Texture URLs (Using confirmed Three.js paths)
    const [colorMap, moonMap, cloudsMap] = useTexture([
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    ]);

    const sunPos = [8, -8, -18];
    const orbitRadius = 8;
    const orbitSpeed = 0.15;
    const moonOrbitRadius = 2.5;
    const moonOrbitSpeed = 0.6;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Self Rotation (Earth)
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.07;
            cloudsRef.current.rotation.z = t * 0.01;
        }

        // Orbital Motion (Earth around Sun)
        if (orbitRef.current) {
            orbitRef.current.position.x = sunPos[0] + Math.cos(t * orbitSpeed) * orbitRadius;
            orbitRef.current.position.z = sunPos[2] + Math.sin(t * orbitSpeed) * orbitRadius;
            orbitRef.current.position.y = sunPos[1];
        }

        // Moon Orbit around Earth
        if (moonRef.current) {
            moonRef.current.position.x = Math.cos(t * moonOrbitSpeed) * moonOrbitRadius;
            moonRef.current.position.z = Math.sin(t * moonOrbitSpeed) * moonOrbitRadius;
            moonRef.current.position.y = Math.sin(t * moonOrbitSpeed * 0.5) * 1;
            moonRef.current.rotation.y = t * 0.1;
        }
    });

    return (
        <group ref={orbitRef} rotation={[0.4, 0, 0.4]}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial map={colorMap} roughness={0.7} metalness={0.1} />
            </mesh>

            {/* Clouds Layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[0.82, 32, 32]} />
                <meshStandardMaterial
                    alphaMap={cloudsMap}
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                />
            </mesh>

            {/* The Moon */}
            <mesh ref={moonRef}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial map={moonMap} roughness={0.8} metalness={0.1} />
            </mesh>

            <pointLight intensity={25} distance={20} color="#ffcc33" />
        </group>
    );
};


const InstancedAsteroidField = ({ count = 10 }) => {
    const object = useFBX('/asteroid.fbx'); // Load FBX
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Physics state
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const scale = 0.5 + Math.random() * 0.8;
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 20 - 10
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                rotation: new THREE.Euler(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ),
                rotationSpeed: Math.random() * 0.02,
                scale: new THREE.Vector3(scale, scale, scale)
            });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!meshRef.current) return;

        asteroids.forEach((ast, i) => {
            // Update physics
            ast.position.add(ast.velocity);
            ast.rotation.x += ast.rotationSpeed;
            ast.rotation.y += ast.rotationSpeed;

            // Soft boundary check
            const dist = ast.position.length();
            if (dist > 35) {
                const centerDir = new THREE.Vector3().copy(ast.position).normalize().multiplyScalar(-0.002);
                ast.velocity.add(centerDir);
            }

            // Update dummy object
            dummy.position.copy(ast.position);
            dummy.rotation.copy(ast.rotation);
            dummy.scale.copy(ast.scale);
            dummy.updateMatrix();

            // Apply matrix to instance
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    // Extract geometry and material from the loaded model
    // Assumes the model has at least one mesh child
    const rockMesh = useMemo(() => {
        let geom;
        object.traverse((child) => {
            if (child.isMesh && !geom) {
                geom = child.geometry;
            }
        });
        const mat = new THREE.MeshStandardMaterial({
            color: "#808080",
            roughness: 0.8,
            metalness: 0.2
        });
        return { geom, mat };
    }, [object]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[rockMesh.geom, rockMesh.mat, count]}
        />
    );
};


const ResponsiveCamera = () => {
    const { camera, size } = useThree();
    useEffect(() => {
        if (size.width < 768) {
            camera.fov = 75;
        } else {
            camera.fov = 45;
        }
        camera.updateProjectionMatrix();
    }, [size.width, camera]);
    return null;
};

const Background3D = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, background: '#030308' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <ResponsiveCamera />
                <ambientLight intensity={0.3} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={<mesh><sphereGeometry args={[0.8, 32, 32]} /><meshStandardMaterial color="#222" /></mesh>}>
                    <Sun />
                    <Saturn />
                    <Earth />
                    <BlackHole />
                    {/* Subtle fog for depth */}
                    <fog attach="fog" args={['#030308', 5, 45]} />
                </Suspense>

                {/* Isolated Asteroid Field Error Boundary */}
                <ErrorBoundary>
                    <Suspense fallback={null}>
                        <InstancedAsteroidField count={3} />
                    </Suspense>
                </ErrorBoundary>
            </Canvas>
        </div>
    );
};

export default Background3D;
