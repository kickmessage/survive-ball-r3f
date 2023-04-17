import { useThree } from "@react-three/fiber";

export default function useObjects() {

    const objects = useThree().scene.children;

    const ring = objects.filter((object) => {
        return object.name === 'ring'


    })[0]

    return { ring };



}
