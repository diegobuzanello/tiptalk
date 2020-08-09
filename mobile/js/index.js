// (c) 2013-2015 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton, statusDiv */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global cordova, bluetoothSerial  */
/* jshint browser: true , devel: true*/
'use strict';

var app = {

    initialize: function () {
        this.bindEvents();
        this.showMainPage();
    },
    bindEvents: function () {

        var TOUCH_START = 'touchstart';
        if (window.navigator.msPointerEnabled) { // windows phone
            TOUCH_START = 'MSPointerDown';
        }
        document.addEventListener('deviceready', this.onDeviceReady, false);
        refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
        // sendButton.addEventListener(TOUCH_START, this.sendData, false);
        // disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
        deviceList.addEventListener('touchstart', this.connect, false);
    },
    onDeviceReady: function () {
        app.refreshDeviceList();
    },
    refreshDeviceList: function () {
        bluetoothSerial.list(app.onDeviceList, app.onError);
    },
    onDeviceList: function (devices) {
        var option;

        // remove existing devices
        deviceList.innerHTML = "";
        app.setStatus("");

        devices.forEach(function (device) {

            var listItem = document.createElement('li'),
                html = '<b>' + device.name + '</b><br/>';

            listItem.innerHTML = html;

            if (cordova.platformId === 'windowsphone') {
                // This is a temporary hack until I get the list tap working
                var button = document.createElement('button');
                button.innerHTML = "Connect";
                button.addEventListener('click', app.connect, false);
                button.dataset = {};
                button.dataset.deviceId = device.id;
                listItem.appendChild(button);
            } else {
                listItem.dataset.deviceId = device.id;
            }
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                app.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android or Windows Phone
                app.setStatus("Please Pair a Bluetooth Device.");
            }

        } else {
            app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }

    },
    connect: function (e) {
        var onConnect = function () {
            // subscribe for incoming data
            bluetoothSerial.subscribe('\n', app.onData, app.onError);

            resultDiv.innerHTML = "";
            app.setStatus("Connected");
            app.showDetailPage();
        };

        var deviceId = e.target.dataset.deviceId;
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }

        bluetoothSerial.connect(deviceId, onConnect, app.onError);
    },
    onData: function (data) { // data received from Arduino
        // var audio = new Audio('mp3/teste1.mp3');
        // var audio2 = new Audio('mp3/teste2.mp3');
        // var audio3 = new Audio('mp3/teste3.mp3');
        // var result = data;



        // resultDiv.innerHTML = resultDiv.innerHTML + "Cor: " + result + "<br/>";
        // resultDiv.scrollTop = resultDiv.scrollHeight;

        // let result = 'Branco';
        teste(data);

        // if (false) {
        //     audio.play();
        // } else if (true) {
        //     audio2.play();
        // }

        // switch (data) {
        //     case "Branco":
        //         audio.play();
        //     case "Amarelo":
        //         audio2.play();
        //     default:
        //         audio3.play();
        // }

        // else {
        //     audio3.play
        // }
        // var x = document.getElementById("myAudio");
        // switch (data) {
        //     case 'Branco':
        //         x.play();
        //         break;
        //     default:
        //         console.log('Sorry, we are out of ' + data + '.');

        // }
    },

    // sendData: function (event) { // send data to Arduino

    //     var success = function () {
    //         console.log("success");
    //         // resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
    //         resultDiv.scrollTop = resultDiv.scrollHeight;
    //     };

    //     var failure = function () {
    //         alert("Failed writing data to Bluetooth peripheral");
    //     };

    //     // var data = messageInput.value;
    //     // bluetoothSerial.write(data, success, failure);
    // },
    disconnect: function (event) {
        bluetoothSerial.disconnect(app.showMainPage, app.onError);
    },
    showMainPage: function () {
        mainPage.style.display = "";
        detailPage.style.display = "none";
    },
    showDetailPage: function () {
        mainPage.style.display = "none";
        detailPage.style.display = "";
    },
    setStatus: function (message) {
        console.log(message);

        window.clearTimeout(app.statusTimeout);
        // statusDiv.innerHTML = message;
        // statusDiv.className = 'fadein';

        // automatically clear the status with a timer
        // app.statusTimeout = setTimeout(function () {
        //     statusDiv.className = 'fadeout';
        // }, 5000);
    },
    onError: function (reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    }
};
$.event.special.tap = {
    setup: function () {
        var self = this,
            $self = $(self);

        // Bind touch start
        $self.on('touchstart', function (startEvent) {
            // Save the target element of the start event
            var target = startEvent.target;

            // When a touch starts, bind a touch end handler exactly once,
            $self.one('touchend', function (endEvent) {
                // When the touch end event fires, check if the target of the
                // touch end is the same as the target of the start, and if
                // so, fire a click.
                if (target == endEvent.target) {
                    $.event.simulate('tap', self, endEvent);
                }
            });
        });
    }
};
function teste(data) {
    var audio = new Audio('mp3/teste1.mp3');
    var audio2 = new Audio('mp3/teste2.mp3');
    var audio3 = new Audio('mp3/teste3.mp3');
    // consoleLog.innerHTML = consoleLog.innerHTML + "Console Log: " + result + "<br/>";
    // let a = result.toString();

    // resultDiv.innerHTML = resultDiv.innerHTML + data + "<br/>";
    let a = parseInt(data);
    // var a = a + data;
    // resultDiv.innerHTML = a + "<br/>";

    switch (a) {
        case 1:
            audio.play();
            document.getElementById("cachorro").src = "img/pause.svg";
            setTimeout(function () { document.getElementById("cachorro").src = "img/play.svg"; }, 10000);
            //Branco
            break;
        case 2:
            audio2.play();
            //Amarelo
            break;
        case 3:
            audio3.play();
            //Preto 
            break;
        case 4:
            audio2.play();
            //Azul
            break;
        case 5:
            audio1.play();
            //Vermelho
            break;
        case 6:
            audio2.play();
            //Verde
            break;
        case 9:
            //audio3.play();
            //Não reconheceu cor
            break;
        // default:
        //     consoleLog.innerHTML = consoleLog.innerHTML + "Triste " + "<br/>";
        //     break;
    }

}
var myFuncCalls = 0;
var cont = 0;

function player() {
    var audio = new Audio('mp3/teste1.mp3');
   
    audio.play();
    document.getElementById("cachorro").src = "img/pause.svg";
    setInterval(function () { document.getElementById("cachorro").src = "img/play.svg"; }, 10000);

    if (cont === 0){
        myFuncCalls = myFuncCalls + 1;
        progress(myFuncCalls);
        cont++;
    }
    
}
function player1() {
    var audio = new Audio('mp3/teste1.mp3');
    audio.play();
    document.getElementById("cachorro").src = "img/pause.svg";
    setInterval(function () { document.getElementById("cachorro").src = "img/play.svg"; }, 10000);
    if (cont === 1){
        myFuncCalls = myFuncCalls + 1;
        progress(myFuncCalls);
    }
    cont++;
}
function player2() {
    var audio = new Audio('mp3/teste1.mp3');
    audio.play();
    document.getElementById("cachorro").src = "img/pause.svg";
    setInterval(function () { document.getElementById("cachorro").src = "img/play.svg"; }, 10000);
    if (cont === 2){
        myFuncCalls = myFuncCalls + 1;
        progress(myFuncCalls);
    }
    cont++;
}
function progress(myFuncCalls) {
    if (myFuncCalls === 1) {
        document.getElementById('progress1').textContent = "10%";
        document.getElementById('progress1').style.width = "10%";
    } else if (myFuncCalls === 2){
        document.getElementById('progress1').textContent = "20%";
        document.getElementById('progress1').style.width = "20%";
    } else if (myFuncCalls === 3){
        document.getElementById('progress1').textContent = "30%";
        document.getElementById('progress1').style.width = "30%";
    } 

    console.log(document.getElementById('progress1').textContent); //25%
    console.log(myFuncCalls);
    //    var valor = 0;
    //     valor++;
    //     console.log(document.getElementById('progress1').value = valor);
}

$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,

                dots: true
            },
            600: {
                items: 3,
                nav: true
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    });
});


