document.addEventListener('DOMContentLoaded', () => {
    const colorDisplay = document.getElementById('colorDisplay');
    const htmlColorInput = document.getElementById('htmlColorInput');
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const redValueSpan = document.getElementById('redValue');
    const greenValueSpan = document.getElementById('greenValue');
    const blueValueSpan = document.getElementById('blueValue');
    const hexCodeInput = document.getElementById('hexCode');
    const rgbCodeInput = document.getElementById('rgbCode');

    let currentRed = parseInt(redSlider.value);
    let currentGreen = parseInt(greenSlider.value);
    let currentBlue = parseInt(blueSlider.value);

    // Function to update the color display and codes
    function updateColor() {
        const rgbColor = `rgb(${currentRed}, ${currentGreen}, ${currentBlue})`;
        colorDisplay.style.backgroundColor = rgbColor;
        rgbCodeInput.value = rgbColor;
        hexCodeInput.value = rgbToHex(currentRed, currentGreen, currentBlue);
    }

    // Function to convert RGB to Hex
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Function to convert Hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Event listener for HTML color input
    htmlColorInput.addEventListener('input', (event) => {
        const hex = event.target.value;
        const rgb = hexToRgb(hex);
        if (rgb) {
            currentRed = rgb.r;
            currentGreen = rgb.g;
            currentBlue = rgb.b;
            redSlider.value = currentRed;
            greenSlider.value = currentGreen;
            blueSlider.value = currentBlue;
            redValueSpan.textContent = currentRed;
            greenValueSpan.textContent = currentGreen;
            blueValueSpan.textContent = currentBlue;
            updateColor();
        }
    });

    // Event listeners for RGB sliders
    redSlider.addEventListener('input', (event) => {
        currentRed = parseInt(event.target.value);
        redValueSpan.textContent = currentRed;
        updateColor();
    });

    greenSlider.addEventListener('input', (event) => {
        currentGreen = parseInt(event.target.value);
        greenValueSpan.textContent = currentGreen;
        updateColor();
    });

    blueSlider.addEventListener('input', (event) => {
        currentBlue = parseInt(event.target.value);
        blueValueSpan.textContent = currentBlue;
        updateColor();
    });

    // Function to copy text to clipboard
    window.copyToClipboard = (elementId) => {
        const element = document.getElementById(elementId);
        element.select();
        element.setSelectionRange(0, 99999); // For mobile devices
        try {
            document.execCommand('copy');
            alert('Copied to clipboard: ' + element.value);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy. Please copy manually: ' + element.value);
        }
    };

    // Initial color update
    updateColor();
});