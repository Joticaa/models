const viewerMainMenuNew = {
    init: function() {
        const mainContent = document.getElementById('mainContent');

        const mainControlsMenu = document.createElement('div');
        mainControlsMenu.id = 'mainControlsMenu';

        const mainControlsMenuUl = document.createElement('ul');
        mainControlsMenuUl.id = 'mainControlsMenuUl';

        mainControlsMenu.appendChild(mainControlsMenuUl);
        mainContent.appendChild(mainControlsMenu);

        const style = document.createElement('style');
        style.type = 'text/css';
        const css = `
            #mainControlsMenu {
                position: fixed;
                top: 15px;
                left: 15px;
                padding: 0;
            }

            #mainControlsMenuUl {
                list-style: none;
                padding: 0px;
                margin-top: 16px;
            }

            .mainControlsMenuLi {
                margin-bottom: 10px;
            }

            .mainControlsMenuButton {
                border-radius: 3px;
                padding: 2px;
                justify-content: center;
                align-items: center;
                border: none;
                cursor: pointer;
                background-color: transparent;
            }

            .mainControlsMenuButton img {
                display: block;
            }

            .mainControlsMenuButton span {
                display: none;
            }
        `;
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);

        // Adjust button sizes initially and on resize
        this.adjustButtonSizes();
        window.addEventListener('resize', this.adjustButtonSizes);
    },

    addButton: function(name, onClick, imageUrl) {
        const button = document.createElement('button');
        button.id = `goto${name}`;
        button.className = 'mainControlsMenuButton';
        button.innerHTML = `<img src="${imageUrl}" alt="${name}">`;
        button.addEventListener('click', onClick);

        const li = document.createElement('li');
        li.className = 'mainControlsMenuLi';
        li.appendChild(button);

        document.getElementById('mainControlsMenuUl').appendChild(li);

        // Adjust button size for the newly added button
        this.adjustButtonSizes();
    },

    adjustButtonSizes: function() {
        const bodyHeight = document.body.clientHeight;
        let buttonSize;

        if (bodyHeight >= 500) {
            buttonSize = 35;
        } else if (bodyHeight > 400 && bodyHeight < 500) {
            buttonSize = 30;
        } else if (bodyHeight > 350 && bodyHeight <= 400) {
            buttonSize = 23;
        } else {
            buttonSize = 15;
        }

        const buttons = document.querySelectorAll('.mainControlsMenuButton');
        buttons.forEach(button => {
            button.style.width = `${buttonSize}px`;
            button.style.height = `${buttonSize}px`;

            const img = button.querySelector('img');
            img.style.width = `${buttonSize}px`;
            img.style.height = `${buttonSize}px`;
        });
    }
};

export { viewerMainMenuNew };