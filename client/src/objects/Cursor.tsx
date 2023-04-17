import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { Billboard } from "@react-three/drei";
import { useGameStore } from "../state";
import { StateType } from "../types"


export default function Cursor() {


    const isBallClicked = useGameStore((state:StateType) => state.isBallClicked);
    const isPaused = useGameStore((state:StateType) => state.isPaused);
    const remainingLives = useGameStore((state:StateType) => state.remainingLives);

    const groupRef = useRef<THREE.Mesh>(null!);
    const centerRef = useRef<THREE.Mesh>(null!);
    const leftDashRef = useRef<THREE.Mesh>(null!);
    const  rightDashRef = useRef<THREE.Mesh>(null!);
    const topDashRef = useRef<THREE.Mesh>(null!);
    const bottomDashRef = useRef<THREE.Mesh>(null!);

    const cursorMaterial = <meshBasicMaterial color="grey"/>

    const [ isInitialPositioning, setIsInitialPositioning] = useState(false);


    useEffect(()=> {
        if (!isInitialPositioning) {
            if (centerRef.current && leftDashRef.current && rightDashRef.current && topDashRef.current && bottomDashRef.current) {
                leftDashRef.current.position.x -= 4;
                rightDashRef.current.position.x += 4;
                topDashRef.current.position.y += 4;
                bottomDashRef.current.position.y -= 4;
                setIsInitialPositioning(true);


            }


        }


    })

    return(
        //type error saying group ref isn't a group... 
        //@ts-ignore 
        <group name="cursor" ref={groupRef} visible={!isBallClicked && !isPaused && remainingLives > 0}>
            <Billboard>
                <mesh ref={centerRef} visible={false}>
                    <sphereGeometry args={[1]}/>
                    {cursorMaterial}
                </mesh>
                <mesh ref={leftDashRef}>
                    <boxGeometry args={[5,1,1]}/>
                    {cursorMaterial}

                </mesh>
                <mesh ref={rightDashRef}>
                    <boxGeometry args={[5,1,1]}/>
                    {cursorMaterial}

                </mesh>
                <mesh ref={bottomDashRef}>
                    <boxGeometry args={[1,5,1]}/>
                    {cursorMaterial}
                </mesh>
                <mesh ref={topDashRef}>
                    <boxGeometry args={[1,5,1]}/>
                    {cursorMaterial}

                </mesh>


            </Billboard>



        </group>
    )
}
