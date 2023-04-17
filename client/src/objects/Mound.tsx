import { ReactNode } from "react";
export default function Mound({children}:{children: ReactNode}) {
    return(
        <mesh position={[650,-80,650]} name='mound'>
            <sphereGeometry args={[100,20,20]}/>
            {children}
        </mesh>
    )
}

