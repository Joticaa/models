const ui = { 
    
    init: function() {
        const controlDiv = document.createElement('div');
        controlDiv.id = 'controlDiv';

        const controlDivUl = document.createElement('ul');
        controlDivUl.id = 'controlDivUl';

        controlDiv.appendChild(controlDivUl);
        document.body.appendChild(controlDiv);

        const style = document.createElement('style');
        style.type = 'text/css';
        const css = `
            #controlDiv {
                position: fixed;
                top: 15px;
                right: 15px;
                padding: 0;
            }
            #controlDivUl {
                list-style: none;
            }
            .controlDivLi {
                margin-bottom: 10px;
                display: flex;
                flex-direction: row-reverse;
            }
            .folderButton {
                background-color: #008CBA;
                width: 30px;
                height: 30px;
                font-size: 12px;
                border-radius: 3px;
                margin-left: 5px;
                padding: 2px;
                font-weight: bolder;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                cursor: pointer;
            }
            .folderUl {
                position: absolute;
                right: 50px;
                list-style: none;
                margin: 0;
                padding: 5px;
                width: 200px;
                border: 1px solid grey;
                border-radius: 5px;
                border-top-right-radius: 0px;
                background-color: #263238;
                opacity: 0;
                display: none;
                transition: opacity 0.3s, display 0.3s;
            }
            .folderUl.show {
                opacity: 0.9;
                display: block;
            }
            .folderLi {
                color : #ffffff;
                padding: 2px;
                font-size: 13px;
                display: flex;
                align-items: center;    
                justify-content: space-between;
                border-bottom : 1px dotted #ffffff;
            }
            .uiSlider {
                width: 100px; 
                }
            
            .uiColorPicker{
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-color: transparent;
                width: 80px;
                border: 5px;
                cursor: pointer;
            }

            .uiColorPicker::-webkit-color-swatch {
                border-radius: 3px;
                border: 1px solid #000000;
              }
        `;
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    },

    addFolder: function(folderName) {
        const ul = document.getElementById('controlDivUl');
        if (ul) {
            const li = document.createElement('li');
            li.className = 'controlDivLi';
            li.textContent = folderName;

            ul.appendChild(li);
        } else {
            console.error('UL element not found');
        }
    },
    
    addFolderContent22: function(idName) {
        const ul = document.getElementById('controlDivUl');
        if (ul) {
            const li = document.createElement('li');
            li.className = 'controlDivLi';
    
            const button = document.createElement('button');
            button.id = idName + 'Button';
            button.className = 'folderButton';
            button.style.position = 'relative'; // Set the button's position to relative
    
            const img = document.createElement('img');
            img.src = '/assets/img/product/gear.png';
            img.alt = 'Gear';
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.position = 'absolute'; // Set the image's position to absolute
            img.style.top = '50%'; // Adjust the vertical position
            img.style.transform = 'translateY(-50%)'; // Center the image vertically
    
            button.appendChild(img);
    
            const folderUl = document.createElement('ul');
            folderUl.id = idName + 'Ul';
            folderUl.className = 'folderUl';
    
            li.appendChild(button);
            li.appendChild(folderUl);
            ul.appendChild(li);
    
            button.addEventListener('click', function() {
                const targetUlId = button.id.replace('Button', 'Ul');
                const targetUl = document.getElementById(targetUlId);
    
                ui.toggleVisibility(targetUl);
            });
    
            return folderUl;
        } else {
            console.error('UL element not found');
            return null;
        }
    },

    addFolderContent: function(idName) {
        const ul = document.getElementById('controlDivUl');
        if (ul) {
            const li = document.createElement('li');
            li.className = 'controlDivLi';

            const button = document.createElement('button');
            button.id = idName + 'Button';
            button.className = 'folderButton';
            button.innerText = idName;

            const folderUl = document.createElement('ul');
            folderUl.id = idName + 'Ul';
            folderUl.className = 'folderUl';

            li.appendChild(button);
            li.appendChild(folderUl);
            ul.appendChild(li);

            button.addEventListener('click', function() {
                const targetUlId = button.id.replace('Button', 'Ul');
                const targetUl = document.getElementById(targetUlId);

                ui.toggleVisibility(targetUl);
            });

            return folderUl;
        } else {
            console.error('UL element not found');
            return null;
        }
    },

    addFolderItem: function(folderUl, itemName, callback) {
        if (folderUl) {
            const li = document.createElement('li');
            li.className = 'folderLi';

            const div = document.createElement('div');
            div.textContent = itemName;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // Add event listener to the checkbox to handle toggling
            checkbox.addEventListener('change', function() {
                callback(checkbox.checked);
            });

            li.appendChild(div);
            li.appendChild(checkbox);

            folderUl.appendChild(li);
        } else {
            console.error('Folder UL element not found');
        }
    },

    addFolderSlider: function(folderUl, itemName, min, max, step, object, property, onChange) {
        if (folderUl) {
            const li = document.createElement('li');
            li.className = 'folderLi';
    
            const div = document.createElement('div');
            div.textContent = itemName;
    
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'uiSlider';
            slider.min = min;
            slider.max = max;
            slider.step = step;
            slider.value = object[property];
    
            // Add event listener to the slider to update the object's property
            slider.addEventListener('input', function() {
                object[property] = parseFloat(slider.value);
                if (onChange && typeof onChange === 'function') {
                    onChange(object[property]);
                }
            });
    
            li.appendChild(div);
            li.appendChild(slider);
    
            folderUl.appendChild(li);
        } else {
            console.error('Folder UL element not found');
        }
    },

    addFolderColorPicker: function(folderUl, itemName, object, property) {
        if (folderUl) {
            const li = document.createElement('li');
            li.className = 'folderLi';
    
            const div = document.createElement('div');
            div.textContent = itemName;
    
            // Create a container to hold the color picker
            const colorPickerContainer = document.createElement('div');
            colorPickerContainer.className = 'colorPickerContainer';
    
            const colorPicker = document.createElement('input');
            colorPicker.type = 'color';
            colorPicker.className = 'uiColorPicker';
            colorPicker.style.width = '80px'; // Adjust width as needed
            colorPicker.value = `#${object[property].getHexString()}`; // Get hexadecimal color value from THREE.Color
    
            // Add event listener to the color picker to update the object's property
            colorPicker.addEventListener('input', function() {
                object[property].set(colorPicker.value);
            });
    
            // Append the color picker to the container
            colorPickerContainer.appendChild(colorPicker);
    
            li.appendChild(div);
            li.appendChild(colorPickerContainer);
    
            folderUl.appendChild(li);
    
            // Event listener to display color picker to the left of the click
            div.addEventListener('click', function(event) {
                colorPickerContainer.style.left = `-${colorPickerContainer.offsetWidth}px`;
                // Resize color picker when clicked
                colorPicker.style.width = '300px';
                colorPicker.style.height = '20px';
            });
        } else {
            console.error('Folder UL element not found');
        }
    },

    toggleVisibility: function(targetUl) {
        const ulElements = document.querySelectorAll('.folderUl');
        ulElements.forEach(ul => {
            if (ul !== targetUl) {
                ul.classList.remove('show');
                setTimeout(() => {
                    ul.style.display = 'none';
                }, 300);
            }
        });

        if (targetUl.style.display === 'none' || !targetUl.style.display) {
            targetUl.style.display = 'block';
            setTimeout(() => {
                targetUl.classList.add('show');
            }, 0);
        } else {
            targetUl.classList.remove('show');
            setTimeout(() => {
                targetUl.style.display = 'none';
            }, 300);
        }
    },

    addListeners: function() {
        const buttons = document.querySelectorAll('.folderButton');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const targetUlId = button.id.replace('Button', 'Ul');
                const targetUl = document.getElementById(targetUlId);

                ui.toggleVisibility(targetUl);
            });
        });
    }
};

export { ui };
