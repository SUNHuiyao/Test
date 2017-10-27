import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as THREE from 'Three';
import { OrbitControls } from 'three-orbitcontrols-ts';
//THREE.OrbitControls = require('three-orbitcontrols')(THREE);
//import {OrbitControls} from './three/js/controls/OrbitControls-ts';

	var scene=new THREE.Scene();
    
    var renderer = new THREE.WebGLRenderer( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild ( renderer.domElement );

    var fov = 45;
    var near = 1;
    var far = 1000;

    var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
    camera.position.y = 7;
    //camera.position.set(0,15,40);
    //camera.lookAt(scene.position);
	renderer.render(scene, camera);

	function mousewheel(e) {
            e.preventDefault();

            if (e.wheelDelta) {  
                if (e.wheelDelta > 0) { 
                    fov -= (near < fov ? 1 : 0);
                }
                if (e.wheelDelta < 0) { 
                    fov += (fov < far ? 1 : 0);
                }
            } else if (e.detail) {  
                if (e.detail > 0) { 
                    fov -= 1;
                }
                if (e.detail < 0) { 
                    fov += 1;
                }
            }
            
            camera.fov = fov;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
    }

    window.addEventListener('mousewheel', mousewheel, false);

    const controls = new OrbitControls(camera, renderer.domElement);


    window.addEventListener( 'resize', function()
    {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize( width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix( );
    })

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
        [ 1.0, -1.0, -1.0],
        [ 1.0,  1.0, -1.0],
        [-1.0,  1.0, -1.0],
        [-1.0, -1.0,  1.0],
        [ 1.0, -1.0,  1.0],
        [ 1.0,  1.0,  1.0],
        [-1.0,  1.0,  1.0]
    ];
    var cube_wires = [
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
        [0, 2, 1],[0, 3, 2],
        [1, 2, 5],[2, 6, 5],
        [2, 3, 6],[3, 7, 6],
        [3, 0, 7],[0, 4, 7],
        [4, 5, 6],[4, 6, 7],
        [0, 1, 5],[0, 5, 4]
        
    ];
    var spritey_point=[];
    var geometry = new THREE.Geometry();
    var material_edges = new THREE.MeshBasicMaterial({ color: 0x696969, wireframe: true });
    var material_faces = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, wireframe: false});
    for (var n = 0; n < cube_vertices.length; n++){
        var vertex = new THREE.Mesh( geometry,material_edges);
        vertex.geometry.vertices.push(new THREE.Vector3(cube_vertices[n][0], cube_vertices[n][1], cube_vertices[n][2]));
        scene.add( vertex );
        spritey_point[n] = makeTextSprite( n, { fontsize: 30,textColor: {r:255, g:255, b:255, a:1.0}} );
        spritey_point[n].position.set(cube_vertices[n][0], cube_vertices[n][1], cube_vertices[n][2]);
        scene.add(spritey_point[n]);
    }
     for ( var j = 0; j < cube_faces.length; j ++ ) {
        var plane = new THREE.Mesh( geometry, material_faces);
        plane.geometry.faces.push(new THREE.Face3(cube_faces[j][0],cube_faces[j][1],cube_faces[j][2],cube_faces[j][3]));
        scene.add( plane );
    };
    var geometry_edges=[];
    var materials =[];
    var line =[];
    for(var i = 0; i < cube_wires.length; i++) {
        geometry_edges[i] = new THREE.Geometry();
        materials[i] = new THREE.LineBasicMaterial({ color: 0x0000ff});
        
        // Add first vertex of edge
        geometry_edges[i].vertices.push( new THREE.Vector3(
            cube_vertices[cube_wires[i][0]][0],
            cube_vertices[cube_wires[i][0]][1],
            cube_vertices[cube_wires[i][0]][2]
            )
        )
        // Add second vertex of edge
        geometry_edges[i].vertices.push( new THREE.Vector3(
            cube_vertices[cube_wires[i][1]][0],
            cube_vertices[cube_wires[i][1]][1],
            cube_vertices[cube_wires[i][1]][2]
            )
        );
        //var line = new THREE.Line( geometry_edges[i], materials[i], THREE.LinePieces);
        line[i] = new THREE.Line( geometry_edges[i], materials[i], THREE.LineSegments );
        scene.add( line[i] ) 
    }

    //var gridHelper = new THREE.GridHelper( size, divisions );
    //scene.add( gridHelper );

    /**
    create text in 2D
    * */
    function makeTextSprite( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 30;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 0.1;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:0, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:255, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;

        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        return sprite;  
    }

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

    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,50,0);
    scene.add(light);

    //game logic
    var update = function( )
    {

    };
    //draw Scene
    var render = function( )
    {
        renderer.render( scene, camera );

    }
    //run game loop (update,render, repeat)
    var GameLoop = function( ){
        requestAnimationFrame( GameLoop);
        update( );
        render( );
    }
    GameLoop( );

    var spritey=[];
    spritey[0] = makeTextSprite( " 0 ", { fontsize: 30} );
    spritey[0].position.set(0, -1.0, -1.0);
    spritey[1] = makeTextSprite( " 1 ", { fontsize: 30} );
    spritey[1].position.set(1.0, 0, -1.0);
    spritey[2] = makeTextSprite( " 2 ", { fontsize: 30} );
    spritey[2].position.set( 0,  1.0, -1.0);
    spritey[3] = makeTextSprite( " 3 ", { fontsize: 30} );
    spritey[3].position.set(-1.0,  0, -1.0);
    spritey[4] = makeTextSprite( " 4 ", { fontsize: 30} );
    spritey[4].position.set(-1.0, -1.0,  0);
    spritey[5] = makeTextSprite( " 5 ", { fontsize: 30} );
    spritey[5].position.set(1.0, -1.0,  0);
    spritey[6] = makeTextSprite( " 6 ", { fontsize: 30} );
    spritey[6].position.set(1.0, 1.0, 0);
    spritey[7] = makeTextSprite( " 7 ", { fontsize: 30} );
    spritey[7].position.set(-1.0, 1.0, 0);
    spritey[8] = makeTextSprite( " 8 ", { fontsize: 30} );
    spritey[8].position.set( 0, -1.0, 1.0);
    spritey[9] = makeTextSprite( " 9 ", { fontsize: 30} );
    spritey[9].position.set(1.0, 0, 1.0);
    spritey[10] = makeTextSprite( " 10 ", { fontsize: 30} );
    spritey[10].position.set(0, 1.0, 1.0);
    spritey[11] = makeTextSprite( " 11 ", { fontsize: 30} );
    spritey[11].position.set(-1.0, 0, 1.0);
    var a ;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(),INTERSECTED;
	function pickupObjects(e){
          mouse.x = (e.clientX/window.innerWidth)*2 -1;
          mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
          raycaster.setFromCamera(mouse,camera);
          var intersects = raycaster.intersectObjects(scene.children);

          if (intersects.length > 0) {
					if (INTERSECTED != intersects[0].object) {
						if (INTERSECTED) {
                            INTERSECTED.material.color.setHex(INTERSECTED.currentHex);                            
                            scene.remove(spritey[a]);
                            for(var j = 0; j < cube_wires.length; j++) {
                                if (intersects[0].object==line[j]) {
                                    a = j;
                                    scene.add( spritey[j]);
                                }
                            } 
                        }else{
                            scene.remove(spritey[a]);
                            for(var i = 0; i < cube_wires.length; i++) {
                                if (intersects[0].object==line[i]) {
                                    a = i;
                                    scene.add( spritey[i]);
                                } 
                            }
                        }
						INTERSECTED = intersects[0].object;
						INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
						INTERSECTED.material.color.set( 0xff0000 );                        
					}
				} else {
					if (INTERSECTED) {
                        INTERSECTED.material.color.set(INTERSECTED.currentHex);
                    }
					INTERSECTED = null;
                    scene.remove(spritey[a]);                 
				}
    
}


window.addEventListener( 'click', pickupObjects, false );

window.requestAnimationFrame(render);



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));