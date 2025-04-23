# JAAT-AI UI Components

A collection of plain HTML, CSS, and JavaScript UI components for JAAT-AI applications. These components provide modern, animated, and accessible UI elements without any framework dependencies.

## Components

### Button Component

Versatile button components with various styles, states, and animations.

**Features:**
- Multiple variants (primary, secondary, outline, ghost)
- Different sizes (small, default, large)
- Icon support (left, right, icon-only)
- States (hover, active, disabled, loading)
- Ripple effect animation

**Files:**
- `button.html` - Demo and examples
- `button.css` - Styles
- `button.js` - Functionality and API

**Usage:**
```html
<button class="jaat-button">Primary Button</button>
<button class="jaat-button jaat-button-secondary">Secondary</button>
<button class="jaat-button jaat-button-outline">Outline</button>
<button class="jaat-button jaat-button-ghost">Ghost</button>
```

**JavaScript API:**
```javascript
// Create a button programmatically
const myButton = window.jaatUI.button.create(
  'Button Text', 
  'primary', // variant: 'primary', 'secondary', 'outline', 'ghost' 
  'default',  // size: 'sm', 'default', 'lg'
  () => console.log('Button clicked')
);
document.body.appendChild(myButton);
```

### Dialog Component

Modal dialogs for displaying information, alerts, or forms.

**Features:**
- Regular and alert dialog variants
- Form integration
- Keyboard navigation (Escape to close, Tab trap)
- Customizable headers, bodies, and footers
- Confirm and cancel actions

**Files:**
- `dialog.html` - Demo and examples
- `dialog.css` - Styles
- `dialog.js` - Functionality and API

**Usage:**
```html
<!-- Dialog structure -->
<div class="jaat-dialog" id="myDialog" aria-labelledby="dialogTitle" aria-modal="true">
    <div class="jaat-dialog-overlay"></div>
    <div class="jaat-dialog-content">
        <div class="jaat-dialog-header">
            <h3 class="jaat-dialog-title" id="dialogTitle">Dialog Title</h3>
            <button class="jaat-dialog-close" aria-label="Close Dialog">
                <span class="jaat-dialog-close-icon">&times;</span>
            </button>
        </div>
        <div class="jaat-dialog-body">
            <p>Dialog content goes here...</p>
        </div>
        <div class="jaat-dialog-footer">
            <button class="jaat-button jaat-button-ghost jaat-dialog-cancel">Cancel</button>
            <button class="jaat-button jaat-dialog-confirm">Confirm</button>
        </div>
    </div>
</div>

<!-- Open dialog button -->
<button class="jaat-button" onclick="jaatUI.dialog.open('myDialog')">Open Dialog</button>
```

**JavaScript API:**
```javascript
// Open a dialog
window.jaatUI.dialog.open('myDialogId');

// Close a dialog
window.jaatUI.dialog.close(dialogElement);

// Create a dialog programmatically
const myDialog = window.jaatUI.dialog.create({
  title: 'Dialog Title',
  content: '<p>This is the dialog content</p>',
  confirmText: 'Save',
  cancelText: 'Cancel',
  isAlert: false,
  onConfirm: () => console.log('Confirmed'),
  onCancel: () => console.log('Cancelled')
});
```

### Select Component

Dropdown select components for choosing from a list of options.

**Features:**
- Native select styling
- Custom select with enhanced UI
- Multiple selection support
- Option groups
- Validation states (error handling)
- Keyboard navigation

**Files:**
- `select.html` - Demo and examples
- `select.css` - Styles
- `select.js` - Functionality and API

**Usage:**
```html
<!-- Basic Select -->
<div class="jaat-select">
    <label for="mySelect" class="jaat-select-label">Label</label>
    <div class="jaat-select-wrapper">
        <select id="mySelect" class="jaat-select-input">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
        </select>
        <div class="jaat-select-icon">
            <!-- Icon SVG goes here -->
        </div>
    </div>
</div>
```

**JavaScript API:**
```javascript
// Get value from custom select
const value = window.jaatUI.select.getCustomValue('customSelectId');

// Set value for custom select
window.jaatUI.select.setCustomValue('customSelectId', 'option2');

// Create a select programmatically
const mySelect = window.jaatUI.select.create({
  id: 'mySelectId',
  label: 'Select Label',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ],
  placeholder: 'Choose an option',
  required: true,
  onChange: (e) => console.log('Selected:', e.target.value)
});
```

## Integration

1. Include the component CSS files in your HTML head section:
```html
<link rel="stylesheet" href="path/to/button.css">
<link rel="stylesheet" href="path/to/dialog.css">
<link rel="stylesheet" href="path/to/select.css">
```

2. Include the component JavaScript files before the closing body tag:
```html
<script src="path/to/button.js"></script>
<script src="path/to/dialog.js"></script>
<script src="path/to/select.js"></script>
```

3. Use the component HTML structures in your templates.

4. Access component functionality through the `window.jaatUI` global object.

## Theming

All components use CSS variables for styling, making them easy to customize. Override these variables in your CSS to match your application's theme:

```css
:root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --secondary: #8b5cf6;
    --background: #ffffff;
    --foreground: #000000;
    /* ... other variables */
}
```

For dark mode support, you can toggle a class on the body element and override the variables:

```css
body.dark-theme {
    --primary: #818cf8;
    --primary-hover: #6366f1;
    --secondary: #a78bfa;
    --background: #1f2937;
    --foreground: #f9fafb;
    /* ... other variables */
}
```

## Accessibility

These components are built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Responsive design

## Demo

Open `index.html` to see a demonstration of all components together.