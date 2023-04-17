import * as THREE from "three"
import { useRef, useEffect, ReactNode } from "react";

function getRandomNumber(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

function createClouds(radius: number, amount: number, position: {x: number, y: number, z: number}, children: any) {
    let clouds = [];

    for (let i = 0; i < amount; i++) {
        const cloud = 
            <mesh scale={[50,50,50]} position={[(Math.random() - 0.5) * radius, 100, (Math.random() - 0.5) * radius ]} rotation={[Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI]} >
                <boxGeometry args={[8,8,8]} />
                {children}
            </mesh>

            clouds.push(cloud);
    }
    return(
        <group position={[position.x + getRandomNumber(-position.x/10, position.x/10), position.y + getRandomNumber(-position.y/10, position.y/10), position.z + getRandomNumber(-position.z/10, position.z/10)]}>
            {clouds}
        </group>)

}


export default function Clouds({children}:{children: ReactNode}) {


    let cloudArray = [];
    cloudArray.push(
                     createClouds(1000, 10, {x: -1000, y: 2000, z: -1000}, children ),
                     createClouds(1000, 10, {x: 0, y: 2000, z: -3000}, children),
                     createClouds(1000, 10, {x: -3000, y: 2000, z: 0}, children ),
                     createClouds(1000, 10, {x: -3000, y: 2000, z: -3000}, children ),
                     createClouds(1000, 10, {x: 3000, y: 2000, z: -3000}, children ),
                     createClouds(1000, 10, {x: -3000, y: 2000, z: 3000}, children ),
                     createClouds(1000, 10, {x: 1500, y: 2000, z: -5000}, children ),
                     createClouds(1000, 10, {x: -5000, y: 2000, z: 1500}, children ),
    )
    const clouds = (
        <group >
            {cloudArray}
        </group>
    )


    const leftRef = useRef<THREE.Group>(null!);
    const rightRef = useRef<THREE.Group>(null!);
    const leftBackRef = useRef<THREE.Group>(null!);
    const rightBackRef = useRef<THREE.Group>(null!);

    useEffect(()=> {

        //weird fractions are to maintain moving along the the same 'vector' while 
        //messing with setting the distance between the cloud groups,
        //as the clouds are sitting at a weird point in the middle of the cartesian plane, 
        //keeping similar distance between different cloud groups when messing with numbers is not 
        //as straightforward
        leftRef.current.position.x += 3000 * 8/5;
        leftRef.current.position.z += 3000 * 5/8;
        rightRef.current.position.x += 3000 * 5/8;
        rightRef.current.position.z += 3000 * 8/5;
        leftBackRef.current.position.x = 4000;
        leftBackRef.current.position.z = -5000;
        rightBackRef.current.position.x = -4000;
        rightBackRef.current.position.z = 3000;

    }, [])





    return(
        <group name='clouds'>
            <group ref={leftRef}>
                {clouds}
            </group>
            <group ref={rightRef}>
                {clouds}
            </group>
            <group ref={leftBackRef}>
                {clouds}
            </group>
            <group ref={rightBackRef}>
                {clouds}
            </group>
            {/* center*/}
            <group>
                {clouds}
            </group>

        </group>

    )
}

