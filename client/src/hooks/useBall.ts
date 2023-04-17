import { useThree } from "@react-three/fiber";
import * as CANNON from "cannon-es"
import * as THREE from "three";
import useScoreDetection from "./useScoreDetection"

type Props = {
    isBallClicked: boolean;
    isBallPitched: boolean;
    isBatEnabled: boolean;
    updateIsBallClicked: (status:boolean) => void;
    updateIsBallPitched: (status:boolean) => void;
    state: any;
}

export default function useBall({isBallClicked, isBallPitched, isBatEnabled, updateIsBallClicked, updateIsBallPitched, state}: Props) { 
    const { camera } = useThree();
    const cameraPosition = camera.position;
    const get = useThree((state: any) => state.get); //tricky typing
    const { detectIsBallInStrikeRange } = useScoreDetection();






    function throwBall(api: any) { //tricky typing
        const centerThrow = {
            x: cameraPosition.x+15,
            y: cameraPosition.y+90,
            z: cameraPosition.z + 10
        }
        function randomNumber(range: number) {
            return Math.random() * 2*range - range;
        }

        let forceVector = new CANNON.Vec3(centerThrow.x + randomNumber(100), centerThrow.y + randomNumber(100), centerThrow.z)
        let forceArr = [forceVector.x, forceVector.y, forceVector.z]

        api.applyImpulse(forceArr, [0,0,0])
        updateIsBallPitched(true);





    }
    //tricky typing (ThreeEvent<MouseEvent> according to typescript linter, which is not generated by @types/three)
    //api is using the api object generated by @react-three/cannon, which is the same every time, so don't think typing is necessary in this context, 
    //also for what it's worth not clear documentation on handling the react-three/cannon library with typescript. TLDR; not worth the effort
    function hitBall(event: any, api: any, ballPosition: [number,number,number]) {  
        const ballObject = get().scene.children.filter((object:THREE.Object3D) => {
            return object.name === 'ball'


        })[0]


        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersections = raycaster.intersectObject(ballObject);
        if (intersections.length > 0 && !isBallClicked && isBallPitched && isBatEnabled && detectIsBallInStrikeRange([ballPosition[0], ballPosition[1], ballPosition[2]])) {
            let forcePoint = intersections[0].point;
            let originVector = new CANNON.Vec3(0,0,0);
            let forceVector = new CANNON.Vec3(forcePoint.x - ballPosition[0], forcePoint.y-ballPosition[1], forcePoint.z-ballPosition[2]);
            forceVector = originVector.vsub(forceVector)
            forceVector = forceVector.scale(200)
            let forceArr = [forceVector.x, forceVector.y, forceVector.z];

            api.applyImpulse(forceArr, [0,0,0])
            updateIsBallClicked(true);







        }



    }




    return({throwBall, hitBall})









}

