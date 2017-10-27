"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
var THREE = require("Three");
var three_orbitcontrols_ts_1 = require("three-orbitcontrols-ts");
//THREE.OrbitControls = require('three-orbitcontrols')(THREE);
//import {OrbitControls} from './three/js/controls/OrbitControls-ts';
var camera, scene, renderer;
var cube, sphere, torus;
//, material;
var count = 0, cubeCamera1;
var lon = 0, lat = 0;
var phi = 0, theta = 0;
//var mouseX = 0, mouseY = 0;
//var windowHalfX = window.innerWidth / 2;
//var windowHalfY = window.innerHeight / 2;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var fov = 75;
var near = 0.1;
var far = 1000;
var camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
camera.fov = fov;
camera.updateProjectionMatrix();
renderer.render(scene, camera);
camera.position.set(0, 1.5, 4);
/*var material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            opacity: 0.75
        });*/
/*var mesh = new THREE.Mesh( new THREE.SphereBufferGeometry( 500, 32, 16 ), new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
mesh.scale.x = -1;
scene.add( mesh );*/
function mousewheel(e) {
    e.preventDefault();
    //e.stopPropagation();
    if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
            fov -= (near < fov ? 1 : 0);
        }
        if (e.wheelDelta < 0) {
            fov += (fov < far ? 1 : 0);
        }
    }
    else if (e.detail) {
        if (e.detail > 0) {
            fov -= 1;
        }
        if (e.detail < 0) {
            fov += 1;
        }
    }
    //改变fov值，并更新场景的渲染
    camera.fov = fov;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    //updateinfo();
}
window.addEventListener('mousewheel', mousewheel, false);
var controls = new three_orbitcontrols_ts_1.OrbitControls(camera, renderer.domElement);
//调节屏幕适应大小
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
///////////////////////////////
/*declare module namespace {


    export interface Metadata {
        version: number;
        type: string;
        generator: string;
    }

    export interface Position {
        itemSize: number;
        type: string;
        array: number[];
    }

    export interface Normal {
        itemSize: number;
        type: string;
        array: number[];
    }

    export interface Uv {
        itemSize: number;
        type: string;
        array: number[];
    }

    export interface Attributes {
        position: Position;
        normal: Normal;
        uv: Uv;
    }

    export interface BoundingSphere {
        center: number[];
        radius: number;
    }

    export interface Data {
        attributes: Attributes;
        boundingSphere: BoundingSphere;
    }

    export interface RootObject {
        metadata: Metadata;
        data: Data;
    }

}*/
/*var json ={

    "metadata": {"crs": {"epsg": 3857}, "filetype": "mobius", "version": 1.0, "location": "+40.6894-074.0447", "schema": "xxx"},
    "geometry": {
        "pointsets":[
            [
                [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
            
        ],
        //[[[0,0], [0,1], [0,2],[0,3]],[]],
        "entities": [
            [],
            [],
            [
                [200, [[0, [1,5,4,0]]], []],
                [200, [[0, [2,6,5,1]]], []],
                [200, [[0, [3,7,6,2]]], []],
                [200, [[0, [0,4,7,3]]], []],
                [200, [[0, [2,1,0,3]]], []],
                [200, [[0, [5,6,7,4]]], []]
            ]
        ]
    }
};

//var obj = eval(json);
    var str =JSON.stringify(json);
    var obj = JSON.parse(str);


    //document.write(obj.geometry.pointsets[0][0][0]+"</br>");
    //document.write(obj.geometry.pointsets[0].length+"</br>");
    /*var point = obj.geometry.pointsets[0][0][0]*obj.geometry.pointsets[1][0]+obj.geometry.pointsets[0][0][1]*obj.geometry.pointsets[1][1]+obj.geometry.pointsets[0][0][2]*obj.geometry.pointsets[1][2]+obj.geometry.pointsets[1][3];
    document.write(point+"</br>");*/
/*var point = []
for(var i = 0;i<obj.geometry.pointsets[0].length;i++){
    var a = obj.geometry.pointsets[0][i][0]*obj.geometry.pointsets[1][0]+obj.geometry.pointsets[0][i][1]*obj.geometry.pointsets[1][1]+obj.geometry.pointsets[0][i][2]*obj.geometry.pointsets[1][2]+obj.geometry.pointsets[1][3];
    point.push(a);

};*/
var cube_vertices = [
    [-1.0, -1.0, -1.0],
    [1.0, -1.0, -1.0],
    [1.0, 1.0, -1.0],
    [-1.0, 1.0, -1.0],
    [-1.0, -1.0, 1.0],
    [1.0, -1.0, 1.0],
    [1.0, 1.0, 1.0],
    [-1.0, 1.0, 1.0]
];
var cube_edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4]
];
var cube_faces = [
    [0, 2, 1], [0, 3, 2],
    [1, 2, 5], [2, 6, 5],
    [2, 3, 6], [3, 7, 6],
    [3, 0, 7], [0, 4, 7],
    [4, 5, 6], [4, 6, 7],
    [0, 1, 5], [0, 5, 4]
];
//var geometry_vertex = new THREE.Geometry();
//var material_faces = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var geometry_vertex = [];
var material_vertex = [];
var geometry_vertex = [];
var ;
for (var n = 0; n < cube_vertices.length; n++) {
    geometry_vertex[n] = new THREE.Geometry();
    material_vertex[n] = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var vertex = new THREE.Mesh(geometry_vertex[n], material_vertex[n]);
    vertex.geometry.vertices.push(new THREE.Vector3(cube_vertices[n][0], cube_vertices[n][1], cube_vertices[n][2]));
    scene.add(vertex);
}
for (var j = 0; j < cube_faces.length; j++) {
    var plane = new THREE.Mesh(geometry, material_faces);
    plane.geometry.faces.push(new THREE.Face3(cube_faces[j][0], cube_faces[j][1], cube_faces[j][2], cube_faces[j][3]));
    scene.add(plane);
}
;
var geometry_edges = [];
var materials = [];
for (var i = 0; i < cube_edges.length; i++) {
    geometry_edges[i] = new THREE.Geometry();
    materials[i] = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 20 });
    // Add first vertex of edge
    geometry_edges[i].vertices.push(new THREE.Vector3(cube_vertices[cube_edges[i][0]][0], cube_vertices[cube_edges[i][0]][1], cube_vertices[cube_edges[i][0]][2]));
    // Add second vertex of edge
    geometry_edges[i].vertices.push(new THREE.Vector3(cube_vertices[cube_edges[i][1]][0], cube_vertices[cube_edges[i][1]][1], cube_vertices[cube_edges[i][1]][2]));
    var line = new THREE.Line(geometry_edges[i], materials[i], THREE.LinePieces);
    scene.add(line);
}
//var line = new THREE.Line( geometry_edges, material, THREE.LinePieces);
//scene.add( line );
//geometry.computeFaceNormals();
/*geometry_edges.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[0][0]][0],
        cube_vertices[cube_edges[0][0]][1],
        cube_vertices[cube_edges[0][0]][2]
        )
    )
// Add second vertex of edge
geometry_edges.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[0][1]][0],
        cube_vertices[cube_edges[0][1]][1],
        cube_vertices[cube_edges[0][1]][2]
    )
)
var line = new THREE.Line( geometry_edges, material, THREE.LinePieces);
scene.add( line );

geometry1.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[1][0]][0],
        cube_vertices[cube_edges[1][0]][1],
        cube_vertices[cube_edges[1][0]][2]
        )
    )
// Add second vertex of edge
geometry1.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[1][1]][0],
        cube_vertices[cube_edges[1][1]][1],
        cube_vertices[cube_edges[1][1]][2]
    )
)
var line = new THREE.Line( geometry1, material4, THREE.LinePieces);
scene.add( line );

geometry2.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[2][0]][0],
        cube_vertices[cube_edges[2][0]][1],
        cube_vertices[cube_edges[2][0]][2]
        )
    )
// Add second vertex of edge
geometry2.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[2][1]][0],
        cube_vertices[cube_edges[2][1]][1],
        cube_vertices[cube_edges[2][1]][2]
    )
)
var line = new THREE.Line( geometry2, material1, THREE.LinePieces);
scene.add( line );

geometry3.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[3][0]][0],
        cube_vertices[cube_edges[3][0]][1],
        cube_vertices[cube_edges[3][0]][2]
        )
    )
// Add second vertex of edge
geometry3.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[3][1]][0],
        cube_vertices[cube_edges[3][1]][1],
        cube_vertices[cube_edges[3][1]][2]
    )
)
var line = new THREE.Line( geometry3, material2, THREE.LinePieces);
scene.add( line );

geometry4.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[4][0]][0],
        cube_vertices[cube_edges[4][0]][1],
        cube_vertices[cube_edges[4][0]][2]
        )
    )
// Add second vertex of edge
geometry4.vertices.push( new THREE.Vector3(
        cube_vertices[cube_edges[4][1]][0],
        cube_vertices[cube_edges[4][1]][1],
        cube_vertices[cube_edges[4][1]][2]
    )
)
var line = new THREE.Line( geometry4, material3, THREE.LinePieces);
scene.add( line );*/
//var vector = new THREE.Vector3();  
//var obj = scene.getObjectByName(geometry);
//vector = vector.setFromMatrixPosition(obj.matrixWorld);               
/*var halfWidth = window.innerWidth / 2;
var halfHeight = window.innerHeight / 2;
console.log(cube_vertices[0][0] * halfWidth + halfWidth)
var result = {
    x: Math.round(cube_vertices[0][0] * halfWidth + halfWidth),
    y: Math.round(-cube_vertices[0][1] * halfHeight + halfHeight)
};
//2D坐标
console.log(result)

var spritey = makeTextSprite( " 0 ",
    { fontsize: 10} );
spritey.position.set(1, -2, -1.5);
scene.add( spritey );

var spritey = makeTextSprite( " 1 ",
    { fontsize: 10 } );
spritey.position.set(3, -2,-1.5);
scene.add( spritey );
    var spritey = makeTextSprite( " 2 ",
    { fontsize: 10} );
spritey.position.set(3, 0, -1.5);
scene.add( spritey );

var spritey = makeTextSprite( " 3 ",
    { fontsize: 10} );
spritey.position.set(3, 0, -1.5);
scene.add( spritey );

var spritey = makeTextSprite( " 4 ",
    { fontsize: 10} );
spritey.position.set(1, -2, 0.5);
scene.add( spritey );

var spritey = makeTextSprite( " 5 ",
    { fontsize: 10 } );
spritey.position.set(3,-2, 0.5);
scene.add( spritey );
var spritey = makeTextSprite( " 6 ",
    { fontsize: 10} );
spritey.position.set(3, 0,0.5);
scene.add( spritey );

var spritey = makeTextSprite( " 7 ",
    { fontsize: 10} );
spritey.position.set(1, -2,0.5);
scene.add( spritey );*/
var halfWidth = window.innerWidth / 2;
var halfHeight = window.innerHeight / 2;
/**
   *使用示例：創建XYZ
   * */
function createXYZText() {
    //創建Z
    var spritey = makeTextSprite("Z", { fontsize: 10 });
    spritey.position.set(0, 1, 1);
    scene.add(spritey);
    //創建X
    spritey = makeTextSprite("X", { fontsize: 10 });
    spritey.position.set(1, 1, 0);
    scene.add(spritey);
    //創建Y
    spritey = makeTextSprite("Y", { fontsize: 10 });
    spritey.position.set(0, 1, 0);
    scene.add(spritey);
    //創建Y
    spritey = makeTextSprite("0", { fontsize: 10 });
    spritey.position.set(0, 0, 0);
    scene.add(spritey);
}
createXYZText();
/**
 create text in 2D
 * */
function makeTextSprite(message, parameters) {
    if (parameters === undefined)
        parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 1;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 0, g: 0, b: 0, a: 1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText(message);
    var textWidth = metrics.width;
    context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
    context.lineWidth = borderThickness;
    roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);
    context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
    context.fillText(message, borderThickness, fontsize + borderThickness);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial({ map: texture, useScreenCoordinates: true });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
    return sprite;
}
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
/*for ( var i = 0; i < 8; i ++ ) {
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        object.geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][i][0], obj.geometry.pointsets[0][0][1], obj.geometry.pointsets[0][0][2]));
        scene.add( object );
}; wireframe: true, */
/*for ( var i = 0; i < 8; i ++ ) {
        var vertex = new THREE.Mesh( geometry,material);
        // new THREE.MeshLamberMaterial( {color: 0xffffff} ) );
            //( { wireframe: true, color: 0xffffff, specular: 0x555555, shininess: 30 } ) );
        vertex.geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][i][0], obj.geometry.pointsets[0][i][1], obj.geometry.pointsets[0][i][2]));
        scene.add( vertex );
};
for ( var i = 0; i < 6; i ++ ) {
        var plane = new THREE.Mesh( geometry, material);
            //( {  color:0xffffff, specular: 0x555555, shininess: 30 } ));
        plane.geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][i][1][0][1][0],obj.geometry.entities[2][i][1][0][1][1],obj.geometry.entities[2][i][1][0][1][2],obj.geometry.entities[2][i][1][0][1][3]));
        scene.add( plane );
};

//loop
/*var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][0][0], obj.geometry.pointsets[0][0][1], obj.geometry.pointsets[0][0][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][1][0], obj.geometry.pointsets[0][1][1], obj.geometry.pointsets[0][1][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][2][0], obj.geometry.pointsets[0][2][1], obj.geometry.pointsets[0][2][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][3][0], obj.geometry.pointsets[0][3][1], obj.geometry.pointsets[0][3][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][4][0], obj.geometry.pointsets[0][4][1], obj.geometry.pointsets[0][4][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][5][0], obj.geometry.pointsets[0][5][1], obj.geometry.pointsets[0][5][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][6][0], obj.geometry.pointsets[0][6][1], obj.geometry.pointsets[0][6][2]));
geometry.vertices.push(new THREE.Vector3(obj.geometry.pointsets[0][7][0], obj.geometry.pointsets[0][7][1], obj.geometry.pointsets[0][7][2]));


//var a =[new THREE.Face3(obj.geometry.entities[2][0][1][0][1][0],obj.geometry.entities[2][0][1][0][1][1],obj.geometry.entities[2][0][1][0][1][2],obj.geometry.entities[2][0][1][0][1][3])];
geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][0][1][0][1][0],obj.geometry.entities[2][0][1][0][1][1],obj.geometry.entities[2][0][1][0][1][2],obj.geometry.entities[2][0][1][0][1][3]));

 geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][1][1][0][1][0],obj.geometry.entities[2][1][1][0][1][1],obj.geometry.entities[2][1][1][0][1][2],obj.geometry.entities[2][1][1][0][1][3]));
 geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][2][1][0][1][0],obj.geometry.entities[2][2][1][0][1][1],obj.geometry.entities[2][2][1][0][1][2],obj.geometry.entities[2][2][1][0][1][3]));
 geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][3][1][0][1][0],obj.geometry.entities[2][3][1][0][1][1],obj.geometry.entities[2][3][1][0][1][2],obj.geometry.entities[2][3][1][0][1][3]));
 geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][4][1][0][1][0],obj.geometry.entities[2][4][1][0][1][1],obj.geometry.entities[2][4][1][0][1][2],obj.geometry.entities[2][4][1][0][1][3]));
 geometry.faces.push(new THREE.Face3(obj.geometry.entities[2][5][1][0][1][0],obj.geometry.entities[2][5][1][0][1][1],obj.geometry.entities[2][5][1][0][1][2],obj.geometry.entities[2][5][1][0][1][3]));
*/
//var cubeMaterials = 
//{
//  new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/1.png'), side: THREE.DoubleSide}),//RIGHT SIDE
//  new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/2.png'), side: THREE.DoubleSide}),//LEFT SIDE
// new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/3.png'), side: THREE.DoubleSide}),//TOP SIDE
// new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/4.png'), side: THREE.DoubleSide}),//BOTTOM SIDE
// new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/5.png'), side: THREE.DoubleSide}),//FRONT SIDE
// new THREE.MeshBasicMaterial({ map: new THREE.Textureloader( ).load('img/6.png'), side: THREE.DoubleSide}),//BACK SIDE
//}
//create a material, colour or image texture
//var material = new THREE.MeshFaceMaterial( cubeMaterials);
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 15, 5);
scene.add(light);
//game logic
var update = function () {
};
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
//draw Scene
var render = function () {
    //camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;
    //camera.lookAt( scene.position );
    renderer.render(scene, camera);
};
//run game loop (update,render, repeat)
var GameLoop = function () {
    requestAnimationFrame(GameLoop);
    update();
    render();
};
GameLoop();
function pickupObjects(e) {
    //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    //从相机发射一条射线，经过鼠标点击位置
    raycaster.setFromCamera(mouse, camera);
    //计算射线相机到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED)
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.set(0xff0000);
        }
    }
    else {
        if (INTERSECTED)
            INTERSECTED.material.color.set(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
}
window.addEventListener('click', pickupObjects, false);
window.requestAnimationFrame(render);
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });
