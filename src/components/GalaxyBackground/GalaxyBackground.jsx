import React from 'react'

const GalaxyBackground = () => {
  const texture = useLoader(TextureLoader, '/textures/2k_stars_milky_way.jpg');

  return (
    <>
    <mesh>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
    </>
  )
}

export default GalaxyBackground