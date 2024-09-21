import React from 'react';
import { useGLTF } from '@react-three/drei';

const Planet = ({ modelPath, meshName, materialName, ...props }) => {
    const { nodes, materials } = useGLTF(modelPath); // Adjust the path to your model
    console.log({modelPath}, nodes, materials);
    
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes[meshName].geometry} // Replace with your mesh name
                material={materials[materialName]} // Replace with your material name
            />
        </group>
    );
};

export default Planet;
