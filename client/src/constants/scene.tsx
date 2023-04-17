import * as THREE from "three";


const sizes = {
    x: window.innerWidth,
    y: window.innerHeight
}





const ballSpotLightPosition = {
    x: 0,
    y: 400,
    z: 0 
}



const ballPosition = {
    x: 650, 
    y: 100,
    z: 650 
}

const cameraPosition = {
    x: 1250, 
    y: 130,
    z: 1250
}

const ringPosition = {
    x: cameraPosition.x - 50,
    y: 142,
    z: cameraPosition.z  - 50 
}




const camera = new THREE.PerspectiveCamera(90, sizes.x*2 / (sizes.y*3), 0.1, 10000);

camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
camera.lookAt(0,40,0)



// add lights
function AmbientLight() {
    return(
        <ambientLight color="white" intensity={0.3}/>
    )
}

//light.position.set(ambientLightPosition.x, ambientLightPosition.y, ambientLightPosition.z);


//const ballSpotLight = new THREE.SpotLight(0xffffff, 0.5);
//ballSpotLight.angle = Math.PI/1
//ballSpotLight.castShadow = true;
////ballSpotLight.shadow.mapSize.width = 1024
////ballSpotLight.shadow.mapSize.height = 1024
//ballSpotLight.position.set(ballSpotLightPosition.x, ballSpotLightPosition.y, ballSpotLightPosition.z);
//

function Spotlight() {
    return(
        <spotLight color="yellow" intensity={0.5} angle={Math.PI} castShadow={true} position={[ballSpotLightPosition.x, ballSpotLightPosition.y, ballSpotLightPosition.z]} />
    )
}




//export const ballSpotLightCameraHelper = new THREE.CameraHelper(ballSpotLight.shadow.camera)

//const sceneBackgroundColor = useLoader(THREE.TextureLoader, sky)
//
////baseball field
////
////texture
//const bodyTexture = useLoader;
//
///ground
//const groundGeometry = new THREE.PlaneGeometry(1000,1000)
//const groundMaterial =   new THREE.MeshStandardMaterial({
//    side: THREE.DoubleSide,
//    color: 'darkgrey'
//});
//const ground = new THREE.Mesh(groundGeometry, groundMaterial);
//let rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)
//ground.quaternion.multiply(rotation);
//ground.position.set(0,0,0)

//walls
//const wallGeometry = new THREE.PlaneGeometry(1000,500);
//const wallMaterial =  new THREE.MeshPhongMaterial({
//    side: THREE.DoubleSide,
//    //   map: greenWallTexture 
//    color: 'brown'
//})
////leftwall
//const wall = new THREE.Mesh(wallGeometry, wallMaterial);
//wall.position.set(0,250,-500)
////rightwall
//const wall2 = wall.clone();
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2)
//wall2.quaternion.multiply(rotation)
//wall2.position.set(-500,250,0);
//

//stands
//
//infield/outfield poles
//(forgot the official name lol)
// Create a Three.js cylinder geometry for the pole
//var poleGeometry = new THREE.CylinderGeometry( 50, 50, 2000, 3200 );
//
//// Create a Three.js material for the pole
//var poleMaterial = new THREE.MeshPhongMaterial( {color: 'yellow'}) 
//
//// Create a Three.js mesh using the geometry and material
//var pole = new THREE.Mesh( poleGeometry, poleMaterial);
//pole.position.x = 500;
//pole.position.z = -500;
//pole.position.y += 1000;

//var pole2 = new THREE.Mesh(poleGeometry, poleMaterial)
//pole2.position.x = -500;
//pole2.position.z = 500;
//pole2.position.y += 1000;

//stands/benches (bunt area)
//
//const buntWallGeometry = new THREE.PlaneGeometry(1000,50)
//const buntWallMaterial = new THREE.MeshPhongMaterial({
//    color: 'grey',
//    side: THREE.DoubleSide
//
//})
//const buntWall = new THREE.Mesh(buntWallGeometry, buntWallMaterial);
//buntWall.position.set(0, 25, 500);
//const buntWall2 = new THREE.Mesh(buntWallGeometry, buntWallMaterial)
//buntWall2.position.set(500, 25, 0);
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2)
//buntWall2.quaternion.multiply(rotation)

//add detection zones for home runs
//
//
//const detectionZoneMaterial = new THREE.MeshStandardMaterial({
//    side: THREE.DoubleSide,
//    color: 'ForestGreen'
//})
//const homeRunDetectionWalls = new THREE.Group();
//const wallHomeRunDetectionGeometry = new THREE.PlaneGeometry(1000,1000);
//const leftWallHomeRunDetection = new THREE.Mesh(
//    wallHomeRunDetectionGeometry,
//    detectionZoneMaterial
//
//)
//leftWallHomeRunDetection.position.set(wall.position.x, wall.position.y, wall.position.z);
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)
//leftWallHomeRunDetection.quaternion.multiply(rotation)
//leftWallHomeRunDetection.position.x -= 1000 
//leftWallHomeRunDetection.position.z += 500
//leftWallHomeRunDetection.position.y = 0;
//
//const rightWallHomeRunDetection = new THREE.Mesh(
//    wallHomeRunDetectionGeometry, 
//    detectionZoneMaterial
//)
//rightWallHomeRunDetection.position.set(wall2.position.x, wall2.position.y, wall2.position.z);
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)
//rightWallHomeRunDetection.quaternion.multiply(rotation)
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2)
//rightWallHomeRunDetection.quaternion.multiply(rotation)
//
//rightWallHomeRunDetection.position.x += 500 
//rightWallHomeRunDetection.position.z -= 1000 
//rightWallHomeRunDetection.position.y = 0;
//
//
//
//
//
//homeRunDetectionWalls.add(leftWallHomeRunDetection, rightWallHomeRunDetection);



//bunt out area detection
//
//const buntDetectionWalls = new THREE.Group();
//const wallBuntDetectionGeometry = new THREE.PlaneGeometry(1000,1000);
//const leftWallBuntDetection = new THREE.Mesh(
//    wallBuntDetectionGeometry,
//    detectionZoneMaterial
//
//
//)
//leftWallBuntDetection.position.set(buntWall.position.x, buntWall.position.y, buntWall.position.z);
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)
//leftWallBuntDetection.quaternion.multiply(rotation)
////leftWallBuntDetection.position.x += 750 + 4500/2;
//leftWallBuntDetection.position.z += 500;
////leftWallBuntDetection.position.y = 0;
//
//const rightWallBuntDetection = new THREE.Mesh(
//    wallBuntDetectionGeometry, 
//    detectionZoneMaterial
//
//)
//rightWallBuntDetection.position.set(buntWall2.position.x, buntWall2.position.y, buntWall2.position.z);
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI/2)
//rightWallBuntDetection.quaternion.multiply(rotation)
//rotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI/2)
//rightWallBuntDetection.quaternion.multiply(rotation)
//
//rightWallBuntDetection.position.x += 500;
//rightWallBuntDetection.position.z += 750 + 4500/2;
//rightWallBuntDetection.position.y = 0;s
//

const colors: string[] = [];

const coolColors: [number, number, number][] = [
    [148, 0, 211], // Violet
    [75, 0, 130], // Indigo
    [0, 0, 255], // Blue
    [0, 255, 255], // Cyan
    [0, 255, 0], // Green
];

const hotColors: [number, number, number][] = [
    [255, 255, 0], // Yellow
    [255, 165, 0], // Orange
    [255, 0, 0], // Red
];

const numSteps = 100;

function interpolateColors(color1: [number, number, number], color2: [number, number, number], factor: number): [number, number, number] {
    const result = [];
    for (let i = 0; i < 3; i++) {
        result.push(Math.floor((color1[i] * (1 - factor)) + (color2[i] * factor)));
    }
    return result as [number, number, number];
}

for (let i = 0; i < coolColors.length - 1; i++) {
    const startColor = coolColors[i];
    const endColor = coolColors[i + 1];
    const increment = 1 / numSteps;
    for (let j = 0; j < numSteps; j++) {
        const factor = j * increment;
        const interpolatedColor = interpolateColors(startColor, endColor, factor);
        const colorString = `rgb(${interpolatedColor.join(', ')})`;
        colors.push(colorString);
    }
}

for (let i = 0; i < hotColors.length - 1; i++) {
    const startColor = hotColors[i];
    const endColor = hotColors[i + 1];
    const increment = 1 / numSteps;
    for (let j = 0; j < numSteps; j++) {
        const factor = j * increment;
        const interpolatedColor = interpolateColors(startColor, endColor, factor);
        const colorString = `rgb(${interpolatedColor.join(', ')})`;
        colors.push(colorString);
    }
}

colors.slice(0,500);





export { camera, AmbientLight, Spotlight,  cameraPosition, ringPosition, colors, ballPosition }
