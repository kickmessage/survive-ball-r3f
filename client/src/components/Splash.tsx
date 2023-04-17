import React, { useRef, useEffect, useState } from "react";
import { Canvas }from "@react-three/fiber";
import { Text3D, Center, Html, ScreenSpace } from "@react-three/drei";
import { useHistory} from "react-router-dom";
import * as THREE from "three";
import Leaderboard from "./Leaderboard";
import About from "./About"

import { FONT_URL } from "../static"
import "./Splash.css"


function TitleText() {

    const meshRef = useRef<THREE.Mesh>(null!);
    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            const xRotation = (event.clientY / window.innerHeight) * Math.PI * 2;
            const yRotation = (event.clientX / window.innerWidth) * Math.PI * 2;

            if (meshRef.current) {
                const center = new THREE.Vector3();
                meshRef.current.geometry.computeBoundingBox();
                if (meshRef.current.geometry.boundingBox) meshRef.current.geometry.boundingBox.getCenter(center);
                meshRef.current.rotation.x = xRotation/25;
                meshRef.current.rotation.y = yRotation/500;

            }
        }

        document.addEventListener('mousemove', handleMouseMove);

        //move text up
        meshRef.current.position.y += 1;

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);




    return(
        <Center>
            <mesh ref={meshRef} >
                <Text3D
                    font={FONT_URL}
                    size={ 0.15 }
                    height={ 0.15 }
                    curveSegments={ 19 }
                    bevelEnabled
                    bevelThickness={ 0.01 }
                    bevelSize={ 0.02 }
                    bevelOffset={ 0 }
                    bevelSegments={ 5 }
                >
                    S U R V I V E - B A L L
                    <meshNormalMaterial />
                </Text3D>

            </mesh>
        </Center>
    )
}
function Menu() {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    useEffect(()=> {


    }, [isLeaderboardOpen])
    const history = useHistory();
    function handleClick(buttonAction: 'play' | 'about' | 'leaderboard') {
        switch(buttonAction) {
            case "play":
                history.push('/home');
            window.location.reload();
            break;
            case "about":
                setIsAboutOpen(true);
            break;
            case "leaderboard":
                setIsLeaderboardOpen(true);
            break;


        }


    }
    return(
        <Html
            center
        >

            <div className="splash-menu-wrapper">
                <div className="splash-menu-buttons-wrapper">
                    <button
                        onClick={(e) => {handleClick('play')}}                               
                    >
                        Play
                    </button>
                    <button

                        onClick={(e) => {handleClick('about')}}                               
                    >
                        About
                    </button>
                    <button
                        onClick={(e) => {handleClick('leaderboard')}}                               
                    >
                        Leaderboard 
                    </button>

                </div>

                { isLeaderboardOpen ? <Leaderboard setOpen={setIsLeaderboardOpen}/> : null}
                { isAboutOpen ? <About setOpen={setIsAboutOpen}/> : null}
            </div>
        </Html>

    )
}

export default function Splash() {
    return(
        <>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.01,
                    far: 200,
                    position: [0,2,5]
                }}

                style={{width: '100vw', height: '100vh', }}
            >
                <ScreenSpace
                    depth={3}
                >
                    <Center>
                        <TitleText/>

                        <Menu/>

                    </Center>
                </ScreenSpace>
            </Canvas>

        </>
    )
}
