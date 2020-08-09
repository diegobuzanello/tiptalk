var checkbox = document.querySelector('input[name=mode]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000)
}

function increaseFont() {
    console.log('foi')
    document.getElementById("fontS").style.fontSize = "120%";
}
function decreaseFont() {
    console.log('foi')
    document.getElementById("fontS").style.fontSize += 10;
}
function changeFontSize(target) {
    var demo = document.getElementById("fontS");
    var computedStyle = window.getComputedStyle
          ? getComputedStyle(demo) // Standards
          : demo.currentStyle;     // Old IE
    var fontSize;
  
    if (computedStyle) { // This will be true on nearly all browsers
        fontSize = parseFloat(computedStyle && computedStyle.fontSize);
  
        if (target == document.getElementById("button1")) {
          fontSize += 5;
        } else if (target == document.getElementById("button2")) {
          fontSize -= 5;
        }
        demo.style.fontSize = fontSize + "px";
    }
  }