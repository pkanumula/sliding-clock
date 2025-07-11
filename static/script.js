/* static/script.js */
document.addEventListener('DOMContentLoaded', () => {
    const digitHeight = 90; // The height of a single digit in pixels.

    const strips = {
        h1: { slider: document.getElementById('h1-slider'), strip: document.getElementById('h1'), digits: '01', last: null },
        h2: { slider: document.getElementById('h2-slider'), strip: document.getElementById('h2'), digits: '0123456789', last: null },
        m1: { slider: document.getElementById('m1-slider'), strip: document.getElementById('m1'), digits: '012345', last: null },
        m2: { slider: document.getElementById('m2-slider'), strip: document.getElementById('m2'), digits: '0123456789', last: null },
        s1: { slider: document.getElementById('s1-slider'), strip: document.getElementById('s1'), digits: '012345', last: null },
        s2: { slider: document.getElementById('s2-slider'), strip: document.getElementById('s2'), digits: '0123456789', last: null },
        ampm: { slider: document.getElementById('ampm-slider'), strip: document.getElementById('ampm'), digits: ['AM', 'PM'], last: null }
    };

    function setupClock() {
        for (const key in strips) {
            const part = strips[key];
            part.strip.innerHTML = '';

            for (const digit of part.digits) {
                const digitEl = document.createElement('div');
                digitEl.className = 'digit';
                digitEl.textContent = digit;
                part.strip.appendChild(digitEl);
            }

            const requiredHeight = part.digits.length * digitHeight;
            part.slider.style.height = `${requiredHeight}px`;
        }
    }

    function updateSlider(part, value) {
        const digitIndex = part.digits.indexOf(value);
        if (digitIndex === -1) return;

        if (part.last !== null && part.strip.children[part.last]) {
            part.strip.children[part.last].classList.remove('active');
        }
        if (part.strip.children[digitIndex]) {
           part.strip.children[digitIndex].classList.add('active');
        }
        part.last = digitIndex;
        
        const stripYOffset = -(digitIndex * digitHeight) + (part.slider.clientHeight / 2) - (digitHeight / 2);
        part.strip.style.transform = `translateY(${stripYOffset}px)`;
    }

    async function updateClock() {
        try {
            const response = await fetch('/time');
            if (!response.ok) return;
            const data = await response.json();

            updateSlider(strips.h1, data.hours[0]);
            updateSlider(strips.h2, data.hours[1]);
            updateSlider(strips.m1, data.minutes[0]);
            updateSlider(strips.m2, data.minutes[1]);
            updateSlider(strips.s1, data.seconds[0]);
            updateSlider(strips.s2, data.seconds[1]);
            updateSlider(strips.ampm, data.am_pm);
            
        } catch (error) {
            console.error('Error fetching time:', error);
        }
    }

    setupClock();
    updateClock();
    setInterval(updateClock, 1000);
});