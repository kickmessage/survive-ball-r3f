import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function useMouse() {


    const { camera } = useThree();
    const objects = useThree().scene.children;

    const cursor = objects.filter((object) => {
        return object.name === 'cursor'


    })[0]
    const plane = objects.filter((object) => {
        return object.name === 'cursor-detection-plane'


    })[0]

    const ball = objects.filter((object) => {
        return object.name === 'ball'


    })[0]



    const updateCursorPosition = (event: MouseEvent) => {

        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);

        if (intersects && intersects.length > 0) {
            const position = intersects[0].point;
            if (cursor) {

                cursor.position.set(position.x, position.y, position.z);
                if (ball) {

                    cursor.lookAt(ball.position);

                }
                else console.error('ball not defined')

            }
            else {
                console.error('cursor ref not defined')
            }
        }
    };



    return { updateCursorPosition };
}

