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
                background-color: #008CBA;
                width: 30px;
                height: 30px;
                font-size: 12px;
                border-radius: 3px;
                padding: 2px;
                font-weight: bolder;
                justify-content: center;
                align-items: center;
                border: none;
                cursor: pointer;
            }

            .mainControlsMenuButton span {
                font-size: 8px;
            }
        `;
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    },

    addButton: function(name, onClick) {
        const button = document.createElement('button');
        button.id = `goto${name}`
        button.className = 'mainControlsMenuButton';
        button.innerHTML = `<span>${name}</span>`;
        button.addEventListener('click', onClick);

        const li = document.createElement('li');
        li.className = 'mainControlsMenuLi';
        li.appendChild(button);

        document.getElementById('mainControlsMenuUl').appendChild(li);
    }
};

export { viewerMainMenu };