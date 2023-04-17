import { useScene } from "../../hooks";
import {useGameStore } from "../../state"
import { StateType } from "../../types"


type Props = {
    color: string
}
function LeftWallBuntDetection({color}: Props){
    return(
        <group>
        <mesh position={[500,0,2100]} rotation={[-Math.PI/2,0,0]} visible={false}>
            <planeGeometry args={[2000,1000]} />
            <meshPhongMaterial color='green'/>

        </mesh>

        <mesh position={[-1000,0,2100]} rotation={[-Math.PI/2,0,0]} visible={false}>
            <planeGeometry args={[1000,2000]} />
            <meshPhongMaterial color='yellow'/>

        </mesh>

        </group>
    )


}




function RightWallBuntDetection({color}: Props){
    return(
        <group>
        <mesh position={[2100,0,1000]} rotation={[-Math.PI/2,0,0]} visible={false}>
            <planeGeometry args={[1000,3000]} />
            <meshPhongMaterial color='green'/>

        </mesh>
        <mesh position={[2100,0,-1000]} rotation={[-Math.PI/2,0,0]} visible={false}>
            <planeGeometry args={[2000,1000]} />
            <meshPhongMaterial color='white'/>

        </mesh>

        </group>


    )




}


export default function BuntDetectionWalls() {
    const { getSceneColor } = useScene();
    const colorSettings = useGameStore((state:StateType) => state.colorSettings);

    return(
        <group
            name='bunt-detection-walls'
        >

            <LeftWallBuntDetection color={getSceneColor({range: colorSettings.range, limit: colorSettings.limit})}/>
            <RightWallBuntDetection color={getSceneColor({range: colorSettings.range, limit: colorSettings.limit})}/>

        </group>

    )


}
