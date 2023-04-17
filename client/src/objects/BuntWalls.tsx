import * as THREE from "three";
import { useBox } from "@react-three/cannon";

function LeftBuntWall() {
    const [ref] = useBox<THREE.Mesh>(()=> ({
        position: [0,25,500],
        rotation: [0, -Math.PI, 0],
        args:[1000,50,0.01]

    }))
    return(
        <mesh ref={ref} >
            <planeGeometry args={[1000,50]}/>
            <meshPhongMaterial color="white" />
        </mesh>
    )




}

function RightBuntWall() {
    const [ref] = useBox<THREE.Mesh>(()=> ({
        position: [500,25,0],
        rotation: [0, -Math.PI/2, 0],
        args:[1000,50,0.01]
    }))

    return(
        <mesh ref={ref}>

            <planeGeometry args={[1000, 50]}/>
            <meshPhongMaterial color="white" />

        </mesh>
    )
}


export default function BuntWalls() {
    return(
        <group name='bunt-walls'>
            <LeftBuntWall/>
            <RightBuntWall/>

        </group>
    )
}
