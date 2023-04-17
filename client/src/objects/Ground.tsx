import * as THREE from "three";
import { usePlane} from "@react-three/cannon";
import { useScoreDetection } from "../hooks";
import { useGameStore } from "../state";
import { useEffect, useRef, ReactNode } from "react";
import { StateType } from "../types"

export default function Ground({children}: {children: ReactNode}) {

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






    const [ref ] = usePlane<THREE.Mesh>(()=> (
        {
            mass: 0,
            rotation: [-Math.PI/2, 0,0], 
            position: [500,0,500],
            type: "Static", 
            onCollide: (e) => {     

                if (!isPlayComplete.current && scoreResult.current === null) {
                    updateIsPlayComplete(true);
                    updateScoreResult('out')
                    updateRemainingLives(remainingLives.current-1);
                    startPlayReset(2000);


                }

            }
        }
    ));
    return(
        <mesh ref={ref} name='ground'>
            <planeGeometry args={[1890,1890]}  />
            {children}

        </mesh>
    )


}
