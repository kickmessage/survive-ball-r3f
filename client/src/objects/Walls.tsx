import { useBox } from "@react-three/cannon";
import { useGameStore } from "../state"
import { useRef, useEffect, ReactNode } from "react";
import { useScoreDetection } from "../hooks"
import { StateType } from "../types"
import * as THREE from "three";

function LeftWall({children}: {children: ReactNode}) {
    const args: [x: number, y: number, z: number] = [2000,500,100]


    const [ref ] = useBox<THREE.Mesh>(() => ({
        args: args,
        mass: 0,
        position: [500, 250, -500],
        type: "Static",


    }));
    return(
        <mesh ref={ref}>
            <boxGeometry args={args} />
            {children}
        </mesh>)




}

function RightWall({children}: {children: ReactNode}) {
    const args: [x: number, y: number, z: number] = [2000,500,100]

    const [ref] = useBox<THREE.Mesh>(()=> ({
        args: args,
        mass: 0,
        position: [-500,250,500],
        rotation: [0, Math.PI/2, 0],
        type: "Static"
    }))

    return(
        <mesh ref={ref} >
            <boxGeometry args={args} />
            {children}
        </mesh>)
}

function BackLeftWall({children}: {children: ReactNode}) {

    const { startPlayReset } = useScoreDetection();
    const isPlayComplete = useRef(useGameStore((state:StateType) => state.isPlayComplete));
    const scoreResult = useRef(useGameStore((state:StateType) => state.scoreResult));
    const remainingLives = useRef(useGameStore((state:StateType) => state.remainingLives));
    const updateIsPlayComplete = useGameStore((state:StateType) => state.updateIsPlayComplete);
    const updateScoreResult = useGameStore((state:StateType) => state.updateScoreResult);
    const updateRemainingLives = useGameStore((state:StateType) => state.updateRemainingLives)

    useEffect(()=> useGameStore.subscribe(
        (state:StateType) => {
            scoreResult.current = state.scoreResult; 
            remainingLives.current = state.remainingLives;
            isPlayComplete.current = state.isPlayComplete;
        }
    ), [])


    const args: [x: number, y: number, z: number] = [2000,500,100]

    const [ref] = useBox<THREE.Mesh>(()=> ({
        args: args,
        mass: 0,
        position: [1500,250, 500],
        rotation: [0, Math.PI/2, 0],
        type: "Static",
            onCollide: (e) => {     

                if (!isPlayComplete.current && scoreResult.current === null) {
                    updateIsPlayComplete(true);
                    updateScoreResult('out')
                    updateRemainingLives(remainingLives.current-1);
                    startPlayReset(2000);


                }

            }

    }))

    return(
        <mesh ref={ref} >
            <boxGeometry args={args} />
            {children}
        </mesh>)


}

function BackRightWall({children}: {children: ReactNode}) {

    const { startPlayReset } = useScoreDetection();
    const isPlayComplete = useRef(useGameStore((state:StateType) => state.isPlayComplete));
    const scoreResult = useRef(useGameStore((state:StateType) => state.scoreResult));
    const remainingLives = useRef(useGameStore((state:StateType) => state.remainingLives));
    const updateIsPlayComplete = useGameStore((state:StateType) => state.updateIsPlayComplete);
    const updateScoreResult = useGameStore((state:StateType) => state.updateScoreResult);
    const updateRemainingLives = useGameStore((state:StateType) => state.updateRemainingLives)

    useEffect(()=> useGameStore.subscribe(
        (state:StateType) => {
            scoreResult.current = state.scoreResult; 
            remainingLives.current = state.remainingLives;
            isPlayComplete.current = state.isPlayComplete;
        }
    ), [])


    const args: [x: number, y: number, z: number] = [2000,500,100]

    const [ref] = useBox<THREE.Mesh>(()=> ({
        args: args,
        mass: 0,
        position: [500,250, 1500],
        type: "Static",
            onCollide: (e) => {     

                if (!isPlayComplete.current && scoreResult.current === null) {
                    updateIsPlayComplete(true);
                    updateScoreResult('out')
                    updateRemainingLives(remainingLives.current-1);
                    startPlayReset(2000);


                }

            }

    }))

    return(
        <mesh ref={ref}>
            <boxGeometry args={args} />
            {children}
        </mesh>)


}


export default function Walls({children}: {children: ReactNode}) {

    return(
        <group name='walls'>
            <LeftWall >
                {children}
            </LeftWall>
            <RightWall>
                {children}
            </RightWall>
            <BackLeftWall>
                {children}
                </BackLeftWall>
            <BackRightWall>
                {children}
            </BackRightWall>
        </group>
    )
}
