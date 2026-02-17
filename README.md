# Office Directory Digital Signage Template

A responsive, digital signage-ready office directory template.

## Features
- **3-Column Layout**: Company Name, Floor, Suite.
- **Auto-Scrolling**: Automatically scrolls through the list if it overflows the screen height.
- **Real-time Clock**: Displays current time and date.
- **Ticker**: Scrolling news/info ticker at the bottom.
- **Responsive**: Adapts to different screen sizes and orientations.
- **High Contrast**: Dark theme for readability and energy efficiency.

## Customization

### Adding Companies
Edit the `directoryData` array in `script.js`:
```javascript
const directoryData = [
    { name: "Your Company", floor: "1", suite: "101" },
    // Add more entries here
];
```

### Changing Ticker Messages
Edit the HTML in `index.html` inside the `<div class="ticker">` element.

### Styling
Modify `styles.css` to change colors, fonts, or layout. The `:root` variables at the top make it easy to customize the color scheme.

## Deployment
Simply host the files on any web server or open `index.html` in a browser in kiosk mode.
