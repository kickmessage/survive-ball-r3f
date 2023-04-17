import * as THREE from "three";
import {useThree } from "@react-three/fiber"
import { useRef, useEffect } from "react";
import { ringPosition } from "../constants"
import { useGameStore } from "../state";
import { StateType } from "../types"

const rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/4)
export default function Ring() {

    const isBallClicked = useGameStore((state:StateType) => state.isBallClicked);
    // create a square shape
    const squareShape = new THREE.Shape();
    squareShape.moveTo(-0.5, -0.5);
    squareShape.lineTo(-0.5, 0.5);
    squareShape.lineTo(0.5, 0.5);
    squareShape.lineTo(0.5, -0.5);
    squareShape.lineTo(-0.5, -0.5);

    // create a square hole in the center of the ring
    const hole = new THREE.Path();
    hole.moveTo(-0.375, -0.375);
    hole.lineTo(-0.375, 0.375);
    hole.lineTo(0.375, 0.375);
    hole.lineTo(0.375, -0.375);
    hole.lineTo(-0.375, -0.375);
    squareShape.holes.push(hole);

    // create an extrusion geometry using the square shape
    var extrudeSettings = {
        depth: 0.2,
        bevelEnabled: false
    };

    const ringRef = useRef<THREE.Mesh>(null!);
    useEffect(()=> {

        ringRef.current.quaternion.multiply(rotation)


    }, [])

    return(
        <mesh position={[ringPosition.x, ringPosition.y, ringPosition.z]} scale={[100,100,0]} ref={ringRef} name='ring' visible={!isBallClicked}>
            <extrudeGeometry args={[squareShape, extrudeSettings]} />
            <meshPhongMaterial color="white" transparent={true} opacity={0.5} />
        </mesh>
    )
}

