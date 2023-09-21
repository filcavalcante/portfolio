// Função para o menu sanduíche
function toggleMenu() {
    const checkbox = document.getElementById('close-menu');
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
    }
}

// Função para movimentar corretamente o scroll
function scrollToElement(elementId) {
    console.log(`Scrolling to element: ${elementId}`);
    const element = document.getElementById(elementId);

    if (element) {
        const yOffset = -65;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        // Atualize a seção ativa manualmente
        sections.forEach((section, index) => {
            if (section.id === elementId) {
                sections.forEach((s) => s.classList.remove('active-section'));
                section.classList.add('active-section');
                activeSectionIndex = index; // Atualize o activeSectionIndex com o índice da nova seção
                checkRolldropButton();
            }
        });
    }
}

// Função para verificar se um elemento está visível no viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const menuItems = document.querySelectorAll('#menu-list a'); // Seleciona os itens do menu
const backToTopLink = document.querySelector('.back-to-top'); // Seleciona o botão "back-to-top"
const logoLink = document.getElementById('logo'); // Seleciona o link da logo

let activeSectionIndex = 0;
let allowScroll = true;

// Variável para rastrear se o rolldrop está em processo de rolagem
let isRolldropScrolling = false;

// Função para rolar para a próxima seção
function scrollToNextSection() {
    if (allowScroll && !isRolldropScrolling) {
        const sections = document.querySelectorAll('section');
        const currentSection = sections[activeSectionIndex];
        let nextSection = sections[activeSectionIndex + 1];

        // Verifique se o próximo elemento é realmente uma seção e se está abaixo do atual
        while (nextSection && nextSection.tagName !== 'SECTION') {
            nextSection = sections[++activeSectionIndex];
        }

        if (nextSection) {
            const yOffset = window.innerWidth > 768 ? -65 : 0;
            const currentSectionRect = currentSection.getBoundingClientRect();
            const nextSectionRect = nextSection.getBoundingClientRect();

            // Verifique se a próxima seção está abaixo da atual ou na mesma posição vertical
            if (nextSectionRect.top >= currentSectionRect.bottom || nextSectionRect.bottom >= currentSectionRect.bottom) {
                isRolldropScrolling = true;
                currentSection.classList.remove('active-section');
                nextSection.classList.add('active-section');

                window.scrollTo({ top: nextSection.offsetTop + yOffset, behavior: 'smooth' });
                activeSectionIndex++;

                setTimeout(() => {
                    isRolldropScrolling = false;
                }, 100);
            }
        } else {
            // Impedir que o botão funcione na última seção
            rolldropButton.disabled = true;

            // Reiniciar o botão após um pequeno atraso (1 segundo neste exemplo)
            setTimeout(() => {
                activeSectionIndex = 0;
                sections.forEach((s) => s.classList.remove('active-section'));
                sections[activeSectionIndex].classList.add('active-section');
                rolldropButton.disabled = false;
            }, 100);
        }

        // Remova a classe "active" de todos os itens do menu
        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("active");
        });

        // Adicione a classe "active" apenas ao item de menu correspondente à seção atual
        menuItems[activeSectionIndex].classList.add("active");
    }
}

// Seleciona o menu de navegação "Home" quando o botão "back-to-top" é clicado
backToTopLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Back to top link clicked.");
    scrollToElement('home');
});

// Event listener para o botão rolldrop
const rolldropButton = document.getElementById('rolldrop-button');
if (rolldropButton) {
    rolldropButton.addEventListener('click', () => {
        console.log('Rolldrop button clicked');
        scrollToNextSection();

        // Remova a classe "active" de todos os itens do menu
        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("active");
        });

        // Adicione a classe "active" apenas ao item de menu correspondente à seção atual
        menuItems[activeSectionIndex].classList.add("active");
    });
}

// Adiciona um evento de clique para cada item de menu, mas apenas em telas maiores que 768px (web)
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', function (event) {
        if (window.innerWidth > 768) {
            event.preventDefault(); // Impede o comportamento padrão de navegação
            const targetId = this.getAttribute('href').substring(1); // Obtém o ID do destino sem o #
            console.log(`Menu item clicked: ${targetId}`);
            scrollToElement(targetId);
        }

        // Fecha o menu sanduíche
        const checkbox = document.getElementById('close-menu');
        if (checkbox) {
            checkbox.checked = false;
        }
    });
});

// Adiciona o comportamento de rolagem ao botão "back-to-top"
backToTopLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Back to top link clicked.");
    scrollToElement('home');
});

// Adiciona o comportamento de rolagem ao link da logo
logoLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Logo link clicked.");
    scrollToElement('home');

    // Remova a classe "active" de todos os itens do menu
    menuItems.forEach((menuItem) => {
        menuItem.classList.remove('active');
    });

    // Adicione a classe "active" ao item de menu "Home"
    menuItems[0].classList.add('active');
});

const sections = document.querySelectorAll('section');
document.querySelector('section#home').classList.add('active-section');

// Event listener para os links de navegação
const menuLinks = document.querySelectorAll('ul#menu-list a');
menuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSectionId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetSectionId);

        if (targetSection) {
            const targetIndex = Array.from(sections).indexOf(targetSection);

            // Verifique se o destino é diferente do ativo para evitar redirecionamentos para a mesma seção
            if (targetIndex !== activeSectionIndex) {
                sections.forEach((s) => s.classList.remove('active-section'));
                targetSection.classList.add('active-section');
                window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
                activeSectionIndex = targetIndex;
            }
        }
    });
});

// Função para verificar se o botão rolldrop deve ser exibido
function checkRolldropButton() {
    const sections = document.querySelectorAll('section');
    const lastSection = sections[sections.length - 1];
    const rolldropButton = document.getElementById('rolldrop-button');

    if (lastSection.classList.contains('active-section')) {
        rolldropButton.style.display = 'none'; // Oculta o botão na última seção
    } else {
        rolldropButton.style.display = 'block'; // Exibe o botão em outras seções
    }
}

// Chama a função para verificar o botão rolldrop inicialmente
checkRolldropButton();

window.addEventListener('scroll', () => {
    if (allowScroll) {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                sections.forEach((s) => s.classList.remove('active-section'));
                section.classList.add('active-section');
                activeSectionIndex = index;
                // Chama a função para verificar o botão rolldrop sempre que a seção ativa muda
                checkRolldropButton();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll(".nav-link");

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function (event) {
            // Remove a classe "active" de todos os links de navegação
            for (var j = 0; j < navLinks.length; j++) {
                navLinks[j].classList.remove("active");
            }

            // Adiciona a classe "active" ao link de navegação clicado
            this.classList.add("active");
        });
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
    menuItems[0].classList.add('active');
});

// Seleciona o menu "Home" quando o botão "back-to-top" é clicado
backToTopLink.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("Back to top link clicked.");
    scrollToElement('home');

    // Remove a classe "active" de todos os links de menu e adiciona-a ao link "Home"
    menuItems.forEach((menuItem) => {
        menuItem.classList.remove('active');
    });
    menuItems[0].classList.add('active'); // O primeiro link é o link "Home"
});

// Função para verificar a seção visível ao recarregar a página
function checkVisibleSectionOnLoad() {
    const yOffset = -65;
    let targetSectionIndex = -1;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top + yOffset <= 0 && rect.bottom + yOffset >= 0) {
            targetSectionIndex = index;
        }
    });

    if (targetSectionIndex !== -1) {
        menuItems.forEach((menuItem, index) => {
            menuItem.classList.remove("active");
        });

        menuItems[targetSectionIndex].classList.add("active");
    }
}

// Chame a função para verificar a seção visível ao recarregar a página
window.addEventListener('load', checkVisibleSectionOnLoad);
