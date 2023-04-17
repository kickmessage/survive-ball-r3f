import { useThree} from "@react-three/fiber"
import { Text3D, Center } from "@react-three/drei"
import { FONT_URL } from "../static"
import { useState } from "react";
import { useGameStore } from "../state"
import { useEffect } from "react";
import { ringPosition } from "../constants"
import { StateType } from "../types"






type ButtonProps = {
    opacity: {
        backgroundOpacity: number,
        threeOpacity: number,
        twoOpacity: number,
        oneOpacity: number
    };
    onClick: () => void;
    onMove: (e: any) => void;
}


function Button({opacity, onClick, onMove}: ButtonProps) {













    return(
        <group 
            onClick={(e) => onClick()}

        >

            <mesh
                position={[ringPosition.x, ringPosition.y, ringPosition.z]}
                rotation={[0, Math.PI/4, 0]}
                name="ThrowButton-titlecard-background"
                onPointerMove={(e)=> onMove(e)}
            >
                <boxGeometry 
                    args={[70,70,1]}
                />
                <meshStandardMaterial
                    transparent={true}
                    opacity={opacity.backgroundOpacity}
                    color="black"
                />
            </mesh>
            <mesh 
                //needs to be one pixel up to not blend in w the background object
                position={[ringPosition.x + 1, ringPosition.y, ringPosition.z + 1]}
                rotation={[0, Math.PI/4, 0]}
                name="ThrowButton-titlecard-text"
            >
                <Center>

                    <Text3D
                        font={FONT_URL}
                        size={ 5 }
                        height={ 0.15 }
                        curveSegments={ 12 }
                        bevelEnabled
                        bevelThickness={ 0.02 }
                        bevelSize={ 0.02 }
                        bevelOffset={ 0 }
                        bevelSegments={ 5 }
                    >
                        Click when ready.

                        <meshStandardMaterial
                            transparent={true}
                            opacity={opacity.backgroundOpacity}
                            color="white"
                        />

                    </Text3D>

                </Center>

            </mesh>


            <mesh  name="throwbutton-countdown-three" position={[ringPosition.x - 1, ringPosition.y, ringPosition.z  -1]} rotation={[0, Math.PI/4, 0]}>
                <Center>

                    <Text3D
                        font={FONT_URL}
                        size={ 20 }
                        height={ 0.15 }
                        curveSegments={ 12 }
                        bevelEnabled
                        bevelThickness={ 0.02 }
                        bevelSize={ 0.02 }
                        bevelOffset={ 0 }
                        bevelSegments={ 5 }

                    >
                        3
                        <meshStandardMaterial transparent={true} opacity={opacity.threeOpacity} color="black" />
                    </Text3D>

                </Center>
            </mesh>
            <mesh name="throwbutton-countdown-two" position={[ringPosition.x - 1, ringPosition.y, ringPosition.z  -1]} rotation={[0, Math.PI/4, 0]}>
                <Center>



                    <Text3D
                        font={FONT_URL}
                        size={ 20 }
                        height={ 0.15 }
                        curveSegments={ 12 }
                        bevelEnabled
                        bevelThickness={ 0.02 }
                        bevelSize={ 0.02 }
                        bevelOffset={ 0 }
                        bevelSegments={ 5 }
                    >
                        2
                        <meshStandardMaterial color="black" transparent={true} opacity={opacity.twoOpacity} />
                    </Text3D>

                </Center>

            </mesh>
            <mesh name="throwbutton-countdown-one" position={[ringPosition.x - 1, ringPosition.y, ringPosition.z  -1]} rotation={[0, Math.PI/4, 0]}>
                <Center>

                    <Text3D
                        font={FONT_URL}
                        size={ 20 }
                        height={ 0.15 }
                        curveSegments={ 12 }
                        bevelEnabled
                        bevelThickness={ 0.02 }
                        bevelSize={ 0.02 }
                        bevelOffset={ 0 }
                        bevelSegments={ 5 }
                    >
                        1
                        <meshStandardMaterial color="black" transparent={true} opacity={opacity.oneOpacity} />
                    </Text3D>

                </Center>

            </mesh>





        </group>
    )



}
export default function ThrowButton() {
    const [threeOpacity, setThreeTextOpacity] = useState(0);
    const [twoOpacity, setTwoTextOpacity] = useState(0);
    const [oneOpacity, setOneTextOpacity] = useState(0);

    const [backgroundOpacity, setBackgroundOpacity] = useState(0.7);
    const { scene } = useThree();


    const cursor = scene.children.filter((object)=> {
        return object.name === 'cursor';


    })[0]

    const isBallPitched = useGameStore((state: StateType) => state.isBallPitched);
    const updateIsBallPitched = useGameStore((state: StateType) => state.updateIsBallPitched)
    const updateIsPlayStarted = useGameStore((state:StateType) => state.updateIsPlayStarted);
    const isPlayStarted = useGameStore((state:StateType) => state.isPlayStarted);
    const isPaused = useGameStore((state:StateType) => state.isPaused);
    const remainingLives = useGameStore((state:StateType) => state.remainingLives);


    const [ballPitchState, setBallPitchState] = useState(isBallPitched);

    useEffect(() => {
        setBallPitchState(isBallPitched);


    }, [isBallPitched])

    useEffect(()=> {
        if (!isPlayStarted) {
            setBackgroundOpacity(0.7);
            setThreeTextOpacity(0);
            setTwoTextOpacity(0);
            setOneTextOpacity(0);
        }


    }, [isPlayStarted])



    function handleClick() {
        if (!isPaused && remainingLives > 0) {
            updateIsPlayStarted(true);

            if (!ballPitchState) {

                setBackgroundOpacity(0); 
                setThreeTextOpacity(1)
                setTimeout(()=> {
                    setThreeTextOpacity(0);
                    setTwoTextOpacity(1)



                }, 333)
                setTimeout(()=> {

                    setTwoTextOpacity(0)
                    setOneTextOpacity(1)

                }, 666);
                setTimeout(()=> {
                    setOneTextOpacity(0);

                }, 999);
                setTimeout(()=> {
                    updateIsBallPitched(true);



                }, 1000)




            }

        }






    }



    function handleMove(e: any) {

        if (!isBallPitched && cursor) {

            cursor.position.set(e.point.x, e.point.y, e.point.z)

        }
    }




    return(
        <group


        >

            <Button opacity={{backgroundOpacity: backgroundOpacity, threeOpacity: threeOpacity, twoOpacity: twoOpacity, oneOpacity: oneOpacity}} onClick={handleClick} onMove={handleMove}/>





        </group>

    )


}
