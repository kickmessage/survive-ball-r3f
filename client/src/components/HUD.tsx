import { Billboard, Center, ScreenSpace, Text3D } from "@react-three/drei";
import * as THREE from "three";
import {FONT_URL} from "../static/"
import { useGameStore } from "../state";
import { StateType } from "../types"
import { useRef, useEffect, useState, ReactNode } from "react";

function LivesText() {


    const remainingLives = useGameStore((state:StateType) => state.remainingLives);
    const isPlayStarted = useGameStore((state:StateType) => state.isPlayStarted);
    const livesRef = useRef<THREE.Mesh>(null!);
    useEffect(()=> {

        livesRef.current.position.y -= 0.85;
        livesRef.current.position.x -= 0.5;




    })



    useEffect(()=> {
        if (isPlayStarted) livesRef.current.visible = false;
        setTimeout(()=> {
            livesRef.current.visible = true;
        }, 500)


    }, [remainingLives])


    return(
        <Center bottom >
            <mesh name="HUD-lives-text" ref={livesRef} >
                <Text3D
                    font={FONT_URL}
                    size={0.08}
                    height={0.01}
                    curveSegments={12}
                    bevelEnabled={false}
                    bevelThickness={0.005}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={1}
                >
                    lives :  {remainingLives}
                    <meshStandardMaterial color="hotpink"/>

                </Text3D>
            </mesh>
        </Center>


    )


}

function LevelText() {

    const currentLevel = useGameStore((state:StateType) => state.currentLevel);
    const levelRef = useRef<THREE.Mesh>(null!);

    useEffect(()=> {
        levelRef.current.position.y -= 0.85;
        levelRef.current.position.x += 0.5;



    })

    return(
        <Center bottom>

            <mesh name="HUD-level-text" ref={levelRef} >
                <Text3D
                    font={FONT_URL}
                    size={0.08}
                    height={0.01}
                    curveSegments={12}
                    bevelEnabled={false}
                    bevelThickness={0.005}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={1}
                >
                    level : {currentLevel}
                </Text3D>
            </mesh>

        </Center>


    )


}

function LevelProgressionText({children}: {children: ReactNode}) {

    const levelProgressionCount = useGameStore((state:StateType) => state.levelProgressionCount);
    const levelProgressionRef = useRef<THREE.Mesh>(null!);


    const [levelProgressionDisplayString, setLevelProgressionDisplayString] = useState<string>('O O O ');

    useEffect(()=> {
        
        levelProgressionRef.current.visible = false;
        if (levelProgressionCount === 0) {

            setLevelProgressionDisplayString('O O O ');
            levelProgressionRef.current.visible = true;


        }
        else {
            let newString: string[] = levelProgressionDisplayString.split(' ');
            for (let i = 0; i < levelProgressionCount; i++) {
                newString[i] = 'X';
            }
            setLevelProgressionDisplayString(newString.join(' '));


        }
        setTimeout(()=> {

            levelProgressionRef.current.visible = true;
        },500)


    }, [levelProgressionCount])




    useEffect(()=> {

    
        if (levelProgressionRef) levelProgressionRef.current.position.y -= 0.83;


    }, )

    return(

        <Center bottom>

            <mesh name="HUD-level-progression" ref={levelProgressionRef} >
                <Text3D
                    font={FONT_URL}
                    size={0.10}
                    height={0.01}
                    curveSegments={12}
                    bevelEnabled={false}
                    bevelThickness={0.005}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={1}
                >
                    {levelProgressionDisplayString}
                    {children}

                </Text3D>
            </mesh>

        </Center>

    )
}

function HudBackground() {

    const backgroundRef = useRef<THREE.Mesh>(null!);
    const backgroundMaterial = <meshStandardMaterial color="black" />
    const [ isVisible, setIsVisible] = useState(false);
    useEffect(()=> {


    }, [isVisible])

    useEffect(()=> {
        if (backgroundRef.current) {




            backgroundRef.current.position.z -= 1.01;
            backgroundRef.current.position.y -= 1.55;

            setTimeout(()=> {

                setIsVisible(true)
            }, 1)



        }



    });

    return(

        <Center bottom>
            <mesh name="HUD-background" ref={backgroundRef} visible={isVisible}>
                <boxGeometry args={[3,0.5,0.01]}/>
                {backgroundMaterial}

            </mesh>

        </Center>

    )


}



export default function HUD({children}: {children: ReactNode}) {

    const isLevelTransition = useGameStore((state: StateType) => state.isLevelTransition);

























    if (!isLevelTransition) {
        return(
            <ScreenSpace depth={1}>
                <Billboard
                    follow={true}
                    lockX={true}
                    lockY={true}
                    lockZ={true}
                >
                    <LivesText/>
                    <LevelText/>
                    <LevelProgressionText>
                        {children}
                    </LevelProgressionText>
                    <HudBackground/>

                </Billboard>
            </ScreenSpace>




        )
    }
    else return(null)



}
