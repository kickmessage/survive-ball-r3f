import * as THREE from "three";
import { useRef } from "react";
import { Text3D, Billboard, Center, ScreenSpace } from "@react-three/drei"
import { FONT_URL } from "../static/";
import { useGameStore } from "../state"
import { useFrame } from "@react-three/fiber";
import { StateType } from "../types"


export function HomeRunText() {
    const isPlayComplete = useGameStore((state: StateType) => state.isPlayComplete);
    const scoreResult = useGameStore((state: StateType) => state.scoreResult);
    const isBallPitched = useGameStore((state: StateType) => state.isBallPitched);

    const ref = useRef<THREE.Mesh>(null!);



    
    useFrame(() => {
        if (isPlayComplete) {
            ref.current.rotation.x += 0.001
            ref.current.rotation.y += 0.001
            ref.current.rotation.z += 0.001


        }
        else {
            ref.current.rotation.x = 0;
            ref.current.rotation.y = 0;
            ref.current.rotation.z = 0;

        }




    })




    return(
        <ScreenSpace depth={200}>
            <Billboard 
                follow={true}
                lockX={true}
                lockY={true}
                lockZ={true}

            >

                <Center>


                    <mesh ref={ref} name='home-run-text' visible={isPlayComplete && scoreResult === 'run' && isBallPitched} >

                                        <Text3D
                            font={FONT_URL}
                            size={50}
                            height={20}
                            curveSegments={12}
                            bevelEnabled={true}
                            bevelThickness={0.5}
                            bevelSize={0.02}
                            bevelOffset={2}
                            bevelSegments={5}
                        >
                            HOME RUN
                            <meshPhongMaterial

                                transparent={true}
                                opacity={1}
                                color='lime'
                                side={THREE.DoubleSide}
                            />

                        </Text3D>
                    </mesh>

                </Center>
            </Billboard>
        </ScreenSpace>
    )

}


export function OutText() {
    const isPlayComplete = useGameStore((state: StateType) => state.isPlayComplete);
    const scoreResult = useGameStore((state: StateType) => state.scoreResult);
    const isBallPitched = useGameStore((state: StateType) => state.isBallPitched);


    const ref = useRef<THREE.Mesh>(null!);


    useFrame(() => {
        if (isPlayComplete) {
            ref.current.rotation.x += 0.001
            ref.current.rotation.y += 0.001
            ref.current.rotation.z += 0.001


        }
        else { 
            ref.current.rotation.x = 0;
            ref.current.rotation.y = 0;
            ref.current.rotation.z = 0;
        }



    })

    return(
        <ScreenSpace depth={200}>
            <Billboard 
                follow={true}
                lockX={true}
                lockY={true}
                lockZ={true}
            >

                <Center>


                    <mesh ref={ref} name='out-text' visible={isPlayComplete && scoreResult === 'out' && isBallPitched}  >

                        <Text3D
                            font={FONT_URL}
                            size={50}
                            height={20}
                            curveSegments={12}
                            bevelEnabled={true}
                            bevelThickness={5}
                            bevelSize={0.02}
                            bevelOffset={2}
                            bevelSegments={5}
                        >
                            OUT 
                            <meshPhongMaterial

                                transparent={true}
                                opacity={1}
                                color='crimson'
                                side={THREE.DoubleSide}
                            />
                        </Text3D>
                    </mesh>

                </Center>
            </Billboard>
        </ScreenSpace>

    )



}
