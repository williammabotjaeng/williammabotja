import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@react-three/fiber'; 
import { useTexture } from '@react-three/drei'; 
import { Sphere } from '@react-three/drei'; 
import { Canvas } from '@react-three/fiber'; 
import * as THREE from "three";

export const EarthHomeButton = () => {
    const router = useRouter();
    const earthRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);

    // Load earth texture
    const earthTexture = useTexture("/earth-texture.jpeg");

    // Rotate the earth
    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.003;
        }
    });

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => router.push("/")}
            style={{ cursor: 'pointer' }} // Adding cursor style for better UX
        >
            {/* Earth Model */}
            <Sphere ref={earthRef} args={[1, 32, 32]}>
                <meshStandardMaterial attach="material" map={earthTexture} />
            </Sphere>

            {/* Atmosphere glow effect */}
            {hovered && (
                <mesh>
                    <sphereGeometry args={[1.05, 32, 32]} />
                    <meshStandardMaterial 
                        color={"rgba(255, 255, 255, 0.5)"} 
                        transparent 
                        opacity={0.5} 
                        side={THREE.DoubleSide} 
                    />
                </mesh>
            )}

            <div style={{ position: 'absolute', color: '##fff', fontSize: '20px' }}>Home</div>
        </div>
    );
};