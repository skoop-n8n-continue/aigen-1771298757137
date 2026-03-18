// Configuration
const SCROLL_SPEED = 0.5; // Pixels per frame - slower is better for reading
const SCROLL_DELAY = 4000; // Delay at top/bottom in ms

// Mock Data
const directoryData = [
    { name: "Acme Corporation", floor: "1", suite: "100" },
    { name: "Globex Corporation", floor: "2", suite: "200" },
    { name: "Soylent Corp", floor: "2", suite: "205" },
    { name: "Initech", floor: "3", suite: "300" },
    { name: "Umbrella Corporation", floor: "4", suite: "400" },
    { name: "Stark Industries", floor: "5", suite: "500" },
    { name: "Wayne Enterprises", floor: "6", suite: "600" },
    { name: "Cyberdyne Systems", floor: "7", suite: "700" },
    { name: "Massive Dynamic", floor: "8", suite: "800" },
    { name: "Aperture Science", floor: "9", suite: "900" },
    { name: "Black Mesa Research", floor: "10", suite: "1000" },
    { name: "Tyrell Corporation", floor: "11", suite: "1100" },
    { name: "Weyland-Yutani Corp", floor: "12", suite: "1200" },
    { name: "Oceanic Airlines", floor: "12", suite: "1250" },
    { name: "MomCorp", floor: "14", suite: "1400" },
    { name: "Planet Express", floor: "15", suite: "1500" },
    { name: "Hooli", floor: "16", suite: "1600" },
    { name: "Pied Piper", floor: "16", suite: "1650" },
    { name: "Vehement Capital", floor: "17", suite: "1700" },
    { name: "Prestige Worldwide", floor: "18", suite: "1800" },
    { name: "Dunder Mifflin", floor: "19", suite: "1900" },
    { name: "Sabre", floor: "19", suite: "1950" },
    { name: "Gekko & Co", floor: "20", suite: "2000" },
    { name: "Pierce & Pierce", floor: "21", suite: "2100" },
    { name: "Duke & Duke", floor: "22", suite: "2200" },
    { name: "Vandelay Industries", floor: "23", suite: "2300" },
    { name: "Krusty Krab Holdings", floor: "24", suite: "2400" },
    { name: "Binford Tools", floor: "25", suite: "2500" },
    { name: "Nakatomi Trading", floor: "30", suite: "3000" }
];

// Sort data alphabetically by name
directoryData.sort((a, b) => a.name.localeCompare(b.name));

function init() {
    renderDirectory();
    startClock();
    // Allow a moment for rendering before calculating scroll
    setTimeout(initScroll, 100);
}

function renderDirectory() {
    const listContainer = document.getElementById('directory-list');
    
    // Clear existing
    listContainer.innerHTML = '';
    
    // Generate HTML
    directoryData.forEach(item => {
        const row = document.createElement('div');
        row.className = 'directory-item';
        
        row.innerHTML = `
            <div class="col col-name">${item.name}</div>
            <div class="col col-floor">${item.floor}</div>
            <div class="col col-suite">${item.suite}</div>
        `;
        
        listContainer.appendChild(row);
    });
}

function startClock() {
    const clockEl = document.getElementById('clock');
    const dateEl = document.getElementById('date');
    
    function update() {
        const now = new Date();
        
        // Time 12h format
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        clockEl.textContent = `${hours}:${minutes} ${ampm}`;
        
        // Date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
    
    update();
    setInterval(update, 1000); 
}

function initScroll() {
    const wrapper = document.getElementById('directory-wrapper');
    const list = document.getElementById('directory-list');
    
    let scrollTop = 0;
    let direction = 1; // 1 = down, -1 = up
    let isPaused = false;
    let pauseTimer = null;
    
    function scrollLoop() {
        const maxScroll = list.scrollHeight - wrapper.clientHeight;
        
        // If content fits, don't scroll
        if (maxScroll <= 0) {
            list.style.transform = `translateY(0)`;
            requestAnimationFrame(scrollLoop);
            return;
        }

        if (isPaused) {
            requestAnimationFrame(scrollLoop);
            return;
        }

        // Move
        scrollTop += (SCROLL_SPEED * direction);
        
        // Check bounds
        if (scrollTop >= maxScroll) {
            scrollTop = maxScroll;
            direction = -1; // Reverse
            isPaused = true;
            clearTimeout(pauseTimer);
            pauseTimer = setTimeout(() => { isPaused = false; }, SCROLL_DELAY);
        } else if (scrollTop <= 0) {
            scrollTop = 0;
            direction = 1; // Forward
            isPaused = true;
            clearTimeout(pauseTimer);
            pauseTimer = setTimeout(() => { isPaused = false; }, SCROLL_DELAY);
        }
        
        list.style.transform = `translateY(-${scrollTop}px)`;
        
        requestAnimationFrame(scrollLoop);
    }
    
    // Start loop
    scrollLoop();
}

document.addEventListener('DOMContentLoaded', init);
