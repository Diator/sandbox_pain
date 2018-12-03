    var pointsList = new Array();
window.onload = async function() {
    const {
        Scene,
        Sprite,
        Group,
        Label
    } = spritejs;
    const scene = new Scene('#paper', {
        viewport: ['auto', 'auto'],
        resolution: [724, 201]
    });

    // await scene.preload([
    //    'img/body_s.png'
    //  ]);
    // await scene.preload([
    //    'img/x.png'
    //  ]);
    const layer = scene.layer('layer');
    //layer.canvas.style.backgroundColor = '#FFFDCC';
    const body_s = new Sprite();
    body_s.attr({
        anchor: [0, 0],
        textures: 'img/body_s.png'
    });
    layer.append(body_s);
    layer.on('click', function(e) {
        console.log(e)
        if (e.target.text == null) {
            if (e.target.texturesSize[0] > 200) {
                let sprite1 = new Sprite("img/x.png");
                sprite1.attr({
                    x: e.layerX - 10,
                    y: e.layerY - 10,
                    scale: [0.10, 0.10]
                });
                sprite1.on('click', function(e) {
                    layer.remove(sprite1);
                pointsList.splice(pointsList.findIndex(function(element){
                return (element.x == this.xy[0] && element.y == this.xy[1]) ;
                } ,sprite1),1)
                    
                })
                //sprite1.scale(.05,.05);
                console.log(sprite1);
                layer.append(sprite1);
                pointsList.push({
                    "x": (e.layerX - 10),
                    "y": (e.layerY - 10)
                })
            }
        }
        if (e.target.text == "Save") {};
    });
    let resp = await $.getJSON("points.json", function(json) {
        for (var item of json.points) {
            //console.log(json); // this will show the info it in firebug console
            let sprite1 = new Sprite("img/x.png");
            sprite1.attr({
                x: item.x,
                y: item.y,
                scale: [0.10, 0.10]
            });
            sprite1.on('click', function(e) {
                layer.remove(sprite1);
                pointsList.splice(pointsList.findIndex(function(element){
                return (element.x == this.xy[0] && element.y == this.xy[1]) ;
                } ,sprite1),1)
            })
            pointsList.push({
                    "x": (item.x ),
                    "y": (item.y )
                })
            //sprite1.scale(.05,.05);
            console.log(sprite1);
            layer.append(sprite1);
        }
    });
    //*****************************************************
    const button = new Group();
    button.attr({
        anchor: 0.5,
        pos: [660, 180],
    });
    layer.append(button);
    const buttonNormal = new Label('Save');
    buttonNormal.attr({
        font: '10px "Arial"',
        fillColor: '#04773B',
        lineHeight: 30,
        textAlign: 'center',
        size: [50, 30],
        border: [3, '#178C4E'],
        borderRadius: 48,
    });
    button.append(buttonNormal);
    const buttonHover = new Sprite();
    buttonHover.attr({
        bgcolor: '#208B50',
        height: 35,
        width: 40,
        opacity: 0,
        borderRadius: 30,
        zIndex: -1,
    });
    button.append(buttonHover);
    /* eslint-disable no-console */
    console.log('Place mouse hover the button...');
    /* eslint-enable no-console */
    let hoverAnim = null;
    let touched = false;
    // prevent mouseenter on mobile device
    // mobile point events: touchstart > (touchmove)+ > touchend > (mouseenter) > mouseover > mousemove > mousedown > mouseup > click
    // https://patrickhlauke.github.io/touch/tests/results/
    button.on('mouseenter', async (evt) => {
        if (touched) return;
        layer.canvas.style.cursor = 'pointer';
        buttonNormal.attr({
            fillColor: '#fff',
        });
        if (hoverAnim) {
            hoverAnim.cancel();
            hoverAnim = null;
        }
        hoverAnim = buttonHover.animate([{
            width: 30,
            opacity: 0
        }, {
            width: 55,
            opacity: 1
        }, ], {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-in',
        });
        await hoverAnim.finished;
        hoverAnim = null;
    }).on('mouseleave', async (evt) => {
        if (touched) return;
        layer.canvas.style.cursor = 'default';
        buttonNormal.attr({
            fillColor: '#04773B',
        });
        if (hoverAnim) {
            hoverAnim.cancel();
            hoverAnim = null;
        }
        hoverAnim = buttonHover.animate([{
            width: 30,
            opacity: 1
        }, {
            width: 55,
            opacity: 0
        }, ], {
            duration: 500,
            fill: 'forwards',
            easing: 'ease-out',
        });
        await hoverAnim.finished;
        hoverAnim = null;
    });
    button.on('touchstart', (evt) => {
        touched = true;
        if (hoverAnim) {
            hoverAnim.cancel();
            hoverAnim = null;
        }
        buttonNormal.attr({
            fillColor: '#fff',
        });
        buttonHover.attr({
            width: 50,
        });
    });
    button.on('touchend', (evt) => {
        if (hoverAnim) {
            hoverAnim.cancel();
            hoverAnim = null;
        }
        buttonNormal.attr({
            fillColor: '#04773B',
        });
        buttonHover.attr({
            width: 0,
        });
    });
    button.on('mousedown', (evt) => {
        button.attr({
            scale: 0.9,
        });
    }).on('mouseup', (evt) => {
        button.attr({
            scale: 1.0,
        });
    });
    button.on('click', (evt) => {
        /* eslint-disable no-console */
        console.log('button clicked');
        $.ajax("/pointSave", {
            data: JSON.stringify(pointsList),
            contentType: 'application/json',
            type: 'POST'
        }).done(function(data) {
            var dataURL = layer.canvas.toDataURL('png');
            console.log(dataURL);
            var print_canvas = document.getElementById("print_canvas");
            print_canvas.src = dataURL;
        });
    })
};