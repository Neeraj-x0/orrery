import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
const Planet = ({ modelPath, meshName, materialName, ...props }) => {
    const { nodes, materials } = useGLTF(modelPath);
    console.log({modelPath}, nodes, materials);
    
    // Temporarily use a basic material for visibility
    const testMaterial = new THREE.MeshBasicMaterial({ color: 'green' });

    return (
        <group {...props} dispose={null} scale={[3, 3, 3]}>
            <mesh
                geometry={nodes[meshName].geometry}
                material={testMaterial} // Use the test material
            />
        </group>
    );
};


export default Planet;