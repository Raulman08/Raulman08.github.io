// CONFIGURACIÓN BÁSICA
        const SCREEN_WIDTH = 256;
        const SCREEN_HEIGHT = 240;
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
        const buf = new ArrayBuffer(imageData.data.length);
        const buf8 = new Uint8ClampedArray(buf);
        const buf32 = new Uint32Array(buf);
        
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var nes = null;
        var interval = null;

        // INICIALIZAR EL EMULADOR
        nes = new jsnes.NES({
            onFrame: function(frameBuffer) {
                var i = 0;
                for (var y = 0; y < SCREEN_HEIGHT; ++y) {
                    for (var x = 0; x < SCREEN_WIDTH; ++x) {
                        i = y * 256 + x;
                        buf32[i] = 0xff000000 | frameBuffer[i];
                    }
                }
                imageData.data.set(buf8);
                ctx.putImageData(imageData, 0, 0);
            },
            onAudioSample: function(left, right) {
                // Audio simplificado
            }
        });

        // BUCLE DEL JUEGO
        function onAnimationFrame() {
            nes.frame();
            requestAnimationFrame(onAnimationFrame);
        }

        // FUNCIÓN PRINCIPAL PARA CARGAR Y JUGAR
        function iniciarJuego() {
            alert("SOBRANG MAHAL KITA Y BUENA SUERTE MMMMMWWWAAAA")
            // 1. Activar Audio (Requisito del navegador)
            if(audioCtx.state === 'suspended') audioCtx.resume();
            
            // 2. Ocultar el menú
            document.getElementById('overlay').style.display = 'none';

            // 3. Descargar el archivo automáticamente
            console.log("Descargando galaga.nes...");
            
            fetch('galaga.nes')
                .then(response => {
                    if (!response.ok) throw new Error("No se encontró el archivo galaga.nes");
                    return response.arrayBuffer();
                })
                .then(buffer => {
                    // Convertir ArrayBuffer a String binario para JSNES
                    var romData = String.fromCharCode.apply(null, new Uint8Array(buffer));
                    
                    // Cargar y arrancar
                    nes.loadROM(romData);
                    onAnimationFrame();
                    console.log("Juego iniciado.");
                })
                .catch(error => {
                    alert("ERROR: " + error.message + "\n\nAsegúrate de ejecutar esto en un SERVIDOR LOCAL (Live Server), no con doble clic.");
                    document.getElementById('overlay').style.display = 'flex';
                });
        }

        // CONTROLES DE TECLADO
        function keyboard(callback, event) {
            var player = 1;
            switch(event.keyCode) {
                case 37: callback(player, jsnes.Controller.BUTTON_LEFT); break;
                case 39: callback(player, jsnes.Controller.BUTTON_RIGHT); break;
                case 90: callback(player, jsnes.Controller.BUTTON_A); break; // Z
                case 88: callback(player, jsnes.Controller.BUTTON_B); break; // X
                case 13: callback(player, jsnes.Controller.BUTTON_START); break; // Enter
                case 17: callback(player, jsnes.Controller.BUTTON_SELECT); break; // Ctrl
            }
        }
        document.addEventListener('keydown', (e) => { keyboard(nes.buttonDown, e) });
        document.addEventListener('keyup', (e) => { keyboard(nes.buttonUp, e) });
