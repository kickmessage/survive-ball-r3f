import { ringPosition } from "../../constants";

export default function BattingZone() {


    return(
        <mesh
            name="batting-zone"
            position={[ringPosition.x - 50, 0, ringPosition.z - 50]}
            rotation={[-Math.PI/2,0,0]}
            visible={false}

        >
            <planeGeometry args={[500,500]} />
            <meshStandardMaterial color="blue"/>

        </mesh>
    )


}
