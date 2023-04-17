import { Line } from "@react-three/drei";
import { ReactNode } from "react";


type BasePosition = [number, number, number];

type BaseProps = {
    position: BasePosition;
    children: ReactNode;
}

function Base({position, children}: BaseProps) {


    return(
        <mesh position={position}>
            <boxGeometry  args={[50,50,50]}/>
            {children}
        </mesh>
    )




}

export default function Diamond({children}:{children: ReactNode}) {

    const firstBase: BasePosition = [-100,0,-100];
    const secondBase: BasePosition = [-100,0,1100];
    const thirdBase: BasePosition = [1100,0,1100];
    const homeBase: BasePosition = [1100,0,-100];

    return(
        <group>

            <Line
                points={[firstBase, secondBase, thirdBase, homeBase, firstBase]}
                lineWidth={10}
                color="white"

            />
            <Base position={firstBase}>
                {children}
            </Base>
            <Base position={secondBase}>
                {children}
            </Base>
            <Base position={thirdBase}>
                {children}
            </Base>
            <Base position={homeBase}>
                {children}
            </Base>

        </group>


    )

}


