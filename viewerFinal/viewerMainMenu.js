const viewerMainMenu = {
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
                display : block;
                position: fixed;
                background-color: transparent;
                opacity: 0.8;
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

            @media (max-height: 300px) {
                #mainControlsMenuUl {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .mainControlsMenuLi {
                    flex: 1 1 calc(50% - 10px); /* Two items per row with a 10px gap */
                }
            }
        `;
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);

        this.adjustButtonSizes();
        window.addEventListener('resize', this.adjustButtonSizes.bind(this));
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
        const bodyWidth = document.body.clientWidth;
        let buttonSize;

        const screenshotButton = document.getElementById('screenshotButton');

        if (!screenshotButton) {
            if (bodyHeight >= 500) {
                buttonSize = 35;
            } else if (bodyHeight > 400 && bodyHeight < 500) {
                buttonSize = 30;
            } else if (bodyHeight > 350 && bodyHeight <= 400) {
                buttonSize = 27;
            } else if (bodyHeight >= 300 && bodyHeight <= 350) {
                buttonSize = 23;
            } else {
                buttonSize = 15;
            }
        } else {
            const newBodyHeight = bodyHeight - 70 - screenshotButton.offsetHeight;
            buttonSize = newBodyHeight / 8;

            if (bodyWidth / buttonSize < 5.5){
                buttonSize = bodyWidth / 5.5
            }
        }

        buttonSize = Math.max(buttonSize,22)

        const buttons = document.querySelectorAll('.mainControlsMenuButton');
        buttons.forEach(button => {
            button.style.width = `${buttonSize}px`;
            button.style.height = `${buttonSize}px`;

            const img = button.querySelector('img');
            img.style.width = `${buttonSize}px`;
            img.style.height = `${buttonSize}px`;
        });

        

        // Apply flexbox layout if body height is below 300px
        const mainControlsMenuUl = document.getElementById('mainControlsMenuUl');
        if (bodyHeight < 280) {
            mainControlsMenuUl.style.display = 'flex';
            mainControlsMenuUl.style.flexWrap = 'wrap';
            mainControlsMenuUl.style.gap = '0px';

            const lis = mainControlsMenuUl.querySelectorAll('.mainControlsMenuLi');
            lis.forEach(li => {
                li.style.flex = '1 1 calc(50% - 10px)';
                li.style.width = `13.33px`
            });
        } else {
            mainControlsMenuUl.style.display = 'block'; // 
            mainControlsMenuUl.style.flexWrap = '';
            mainControlsMenuUl.style.gap = '';

            const lis = mainControlsMenuUl.querySelectorAll('.mainControlsMenuLi');
            lis.forEach(li => {
                li.style.flex = ''; 
            });
        }
    }
};

export { viewerMainMenu };
