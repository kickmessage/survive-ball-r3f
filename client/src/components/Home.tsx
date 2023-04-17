import { useState, useEffect, ReactNode} from 'react';
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon";
import { Stats } from "@react-three/drei";
import { Ball, BattingZone, Diamond, Clouds, Cursor, CursorDetectionPlane, Ground, Poles, HomeRunText, OutText, Ring, Streak, Walls, BuntDetectionWalls, HomeRunDetectionWalls, Mound, ThrowButton } from "../objects"
import { camera, AmbientLight, Spotlight } from "../constants"
import { StateType } from "../types"
import { useGameStore } from "../state"
import { useScene } from "../hooks";
import HUD  from "./HUD";
import GameOverScreen from "./GameOver";
import PauseMenu from "./PauseMenu";
import "./Home.css"




function PhysicsObjects({children}:{children: ReactNode}) {
    const isPaused = useGameStore((state:StateType) => state.isPaused);
    const isBallClicked = useGameStore((state:StateType) => state.isBallClicked);
    const difficulty = useGameStore((state:StateType) => state.difficulty);

    return(
        <Physics
            isPaused={isPaused}
            gravity={[0,-600, 0]}
            defaultContactMaterial={{friction: 0.02, restitution: 0}}
            stepSize={isBallClicked ? 1/100 : difficulty/1500}
            iterations={3}
            broadphase="SAP"
        >



            <Ball />

            <Walls >
                {children}
            </Walls>
            <Poles />


            <Ground>
                {children}
            </Ground>




        </Physics>


    )
}




function Scene({children}: {children: ReactNode}) {

    const baseMaterial = <meshLambertMaterial color="white"/>



    return(
        <>
            <AmbientLight/>
            <Spotlight />
            <PhysicsObjects>
                {children}
            </PhysicsObjects>
            <Streak/>

            <Diamond>
                {baseMaterial}

            </Diamond>
            <Mound>
                {baseMaterial}

            </Mound>


            <Clouds>
                {children}
            </Clouds>


            <CursorDetectionPlane />
            <Cursor />



            <HomeRunText />
            <OutText />

            <Ring />


            <BuntDetectionWalls/>
            <HomeRunDetectionWalls />
            <BattingZone/>

            <ThrowButton/>

            <Stats />

            {/*

              */}
        </>

    )



}

type Props = {
    color: string
}
function SceneMaterial(props:Props) {
    return(<meshLambertMaterial color={props.color}/>)

}

export default function Home() {
    const [loading, setLoading] = useState(true);

    const colorSettings = useGameStore((state:StateType)=> state.colorSettings);
    const currentLevel = useGameStore((state: StateType) => state.currentLevel);
    const { getSceneColor } = useScene();



    const [sceneColor, setSceneColor] = useState(getSceneColor({range: colorSettings.range, limit: colorSettings.limit}));

    useEffect(()=> {
        setSceneColor(getSceneColor({range: colorSettings.range, limit: colorSettings.limit}));



    }, [currentLevel])






    return(
        <>

            <div className="home-wrapper">

                {(loading) ? (<div className="loading-screen">Loading...</div>) : <></>}
                <Canvas
                    style={{width: '100vw', height: '100vh', }}
                    camera={camera}
                    shadows={true}
                    onCreated={(e)=> (setLoading(false))}

                >

                    <Scene >
                        <SceneMaterial color={sceneColor}/>
                    </Scene>
                    <HUD>
                        
                        <SceneMaterial color={sceneColor}/>
                    </HUD>
                    <GameOverScreen/>
                    <PauseMenu/>



                </Canvas>

            </div>


        </>
    )
}
