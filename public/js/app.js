window.onload = function() {

        var _height = 850;
        var _width = 750;
        var scene = sjs.Scene({w:_width, h:_height});

        var layer1 = scene.Layer('background' );
        
        var options = { layer:layer1, size:[1300,1300]};
        var sprite = scene.Sprite("img/body_s.png", options);
        //sprite.scale(.1);
        sprite.move(1, 1);
        sprite.update();
        scene.dom.addEventListener('click', function(e) {
            console.log(e)

            // let options1 = { layer:layer1, size:[10,10], x:1,y:1};
            // let sprite1 = scene.Sprite("img/x.png");
            scene.loadImages(['img/x.png'])
            sprite1.move(e.x,e.y)
            sprite1.
            sprite1.update();
        }, true);

//     scene.loadImages(['img/body_s.jpg'], function() {

//         var function_array = [
//             {'name': 'Initialization',
//                 'execute':function () {
// bird = scene.Sprite('img/body_s.jpg');
// bird.update();
//             }},
//             {'name': 'Set position',
//                 'execute':function () {
// bird.position(200, 200);
// bird.update();
//             }},
//             {'name': 'Move',
//                 'execute':function () {
// bird.move(-10, -10);
// bird.update();
//             }},
//             {'name': 'Rotate',
//                 'execute':function () {
// bird.rotate(Math.PI / 3.0);
// bird.update();
//             }},
//             {'name': 'Scale',
//                 'execute':function () {
// bird.scale(bird.xscale + 0.5, bird.yscale + 0.5);
// bird.update();
//             }},
//             {'name': 'Set opacity',
//                 'execute':function () {
// bird.setOpacity(bird.opacity - 0.2);
// bird.update();
//             }},
//         ]

//         var list_str = "";
//         for(var i=0; i<function_array.length; i++) {
//             var el = function_array[i];
//             var code = String(el['execute']).split('{')[1].split('}')[0].replace(/^\s+|\s+$/g, '');

//             list_str = list_str + '<li><h2>'+ el.name
//               +'</h2><pre>'+
//               code
//               +'</pre><button id="exec_'+

//               i+'">Execute</button></li>';

//         }

//         exec_list.innerHTML = list_str;
//         exec_list.onclick = function(e) {
//             var index = parseInt(e.target.id.split('_')[1]);
//             if(function_array[index])
//                 function_array[index].execute();
//         }

//     });

};