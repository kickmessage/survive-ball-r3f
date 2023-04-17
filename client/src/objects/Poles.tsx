import { useCylinder } from "@react-three/cannon";


function LeftPole() {
    
    const [ref] = useCylinder<THREE.Mesh>(() => ({
        args:[50,50,2000],
        position: [1075,1000,-400],
    }));


    
    return(

        <mesh ref={ref}>
            <cylinderGeometry args={[50,50,2000,3200]}/>
            <meshPhongMaterial color="yellow"/>
        </mesh>
    )


}


function RightPole() {

    const [ref] = useCylinder<THREE.Mesh>(()=> ({
        args: [50,50,2000],
        position: [-400,1000,1075]
    }));

    return(
        <mesh ref={ref}>
            <cylinderGeometry args={[50,50,2000,3200]} />
            <meshPhongMaterial color="yellow"/>
        </mesh>
    )


}


export default function Poles() {
    return(
        <group name='poles'>
            <LeftPole />
            <RightPole />

        </group>
    )


}

