import React from 'react';
import { useGLTF } from '@react-three/drei';

const Planet = (props) => {
    const { nodes, materials } = useGLTF('/planets/sun.glb'); // Adjust the path to your model

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Cube001.geometry} // Replace with your mesh name
                material={materials.None} // Replace with your material name
            />
        </group>
    );
};

export default Planet;
