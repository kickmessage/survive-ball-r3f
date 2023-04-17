function LeftWallHomeRunDetection() {
    return(
        <mesh position={[-1000,0,300]} rotation={[-Math.PI/2, 0,0]} visible={false}>

            <planeGeometry args={[1000,1500]}/>
            <meshStandardMaterial   color="blue"/>

        </mesh>
    )
}

function RightWallHomeRunDetection() {
    return(
        <mesh position={[300,0,-1000]} rotation={[-Math.PI/2, 0,0]} visible={false}>

            <planeGeometry args={[1500,1000]}/>
            <meshStandardMaterial   color="purple"/>

        </mesh>
    )
}


function CenterWallHomeRunDetection() {
    return(
        <mesh position={[-1000,0,-1000]} rotation={[-Math.PI/2, 0,0]} visible={false}> 
            <planeGeometry args={[1100,1100]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )

}





export default function HomeRunDetectionWalls() {
    return(
        <group
            name = 'home-run-detection-walls'
        >
            <LeftWallHomeRunDetection />
            <RightWallHomeRunDetection />
            <CenterWallHomeRunDetection/> 
        </group>
    )


}
