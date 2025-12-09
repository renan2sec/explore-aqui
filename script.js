document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // NAVEGAÇÃO ENTRE SEÇÕES
    // =============================
    const menu = document.getElementById('menu');
    const sections = document.querySelectorAll('.hidden-section');

    // elemento de música (na seção "segredos")
    const romanticMusic = document.getElementById('romanticMusic');
    const musicToggleBtn = document.getElementById('musicToggleSegredos');

    window.openSection = function (id) {
        // esconde menu e todas as seções
        menu.style.display = 'none';
        sections.forEach(sec => sec.style.display = 'none');

        // mostra a seção pedida
        const section = document.getElementById(id);
        section.style.display = 'block';

        // se abrirmos a seção "segredos", tenta tocar a música
        if (id === 'segredos' && romanticMusic) {
            romanticMusic.currentTime = 0;
            const playPromise = romanticMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    if (musicToggleBtn) {
                        musicToggleBtn.textContent = '🎵 Tocar música';
                    }
                });
            }
            if (musicToggleBtn) {
                musicToggleBtn.textContent = '⏸ Pausar música';
            }
        } else {
            // pausa música nas outras seções
            if (romanticMusic) {
                romanticMusic.pause();
                romanticMusic.currentTime = 0;
            }
            if (musicToggleBtn) {
                musicToggleBtn.textContent = '🎵 Tocar música';
            }
        }
    };

    window.goBack = function () {
        sections.forEach(sec => sec.style.display = 'none');
        menu.style.display = 'grid';

        if (romanticMusic) {
            romanticMusic.pause();
            romanticMusic.currentTime = 0;
        }

        if (musicToggleBtn) {
            musicToggleBtn.textContent = '🎵 Tocar música';
        }
    };

    // =============================
    // SISTEMA DAS FOTOS (SEQUÊNCIA)
    // =============================
    const revealRandomImageBtn = document.getElementById('revealRandomImage');
    const randomImageContainer = document.getElementById('randomImageContainer');
    const randomImageElement = document.getElementById('randomImage');

    const flipCard = randomImageContainer
        ? randomImageContainer.querySelector('.flip-card')
        : null;

    const cardTitleElement = document.getElementById('cardTitle');
    const cardMessageElement = document.getElementById('cardMessage');

    const photosData = [
        { src: 'img/nat1.jpg', title: 'Seu Sorriso', message: 'Seu sorriso muda qualquer dia.' },
        { src: 'img/nat2.jpg', title: 'Seu Jeito', message: 'Tem algo em você que deixa tudo mais leve.' },
        { src: 'img/nat3.jpg', title: 'Seu Olhar', message: 'Seu olhar é poesia sem palavras.' },
        { src: 'img/nat4.jpg', title: 'Você', message: 'Você é especial demais pra ser comum.' },
        { src: 'img/nat5.jpg', title: 'Aquela Risada', message: 'Sua risada é contagiante!' },
        { src: 'img/nat6.jpg', title: 'Energia Boa', message: 'Adoro estar perto da sua energia positiva.' },
        { src: 'img/nat7.jpg', title: 'Detalhes', message: 'Os pequenos detalhes em você são incríveis.' },
        { src: 'img/nat8.jpg', title: 'Olhar Curioso', message: 'Seu olhar curioso me inspira a prestar atenção em tudo.' },
        { src: 'img/nat9.jpg', title: 'Presença', message: 'Sua presença deixa tudo mais leve e divertido.' },
        { src: 'img/nat10.jpg', title: 'Carisma', message: 'O seu jeito de ser é simplesmente carismático.' }
    ];

    let currentPhotoIndex = 0;

    if (revealRandomImageBtn) {
        revealRandomImageBtn.addEventListener('click', () => {
            const photo = photosData[currentPhotoIndex];

            if (flipCard) {
                flipCard.classList.remove('flipped');
            }

            if (randomImageElement) {
                randomImageElement.src = photo.src;
            }

            if (cardTitleElement) {
                cardTitleElement.textContent = photo.title;
            }

            if (cardMessageElement) {
                cardMessageElement.textContent = photo.message;
            }

            if (randomImageContainer) {
                randomImageContainer.style.display = 'block';
            }

            currentPhotoIndex++;
            if (currentPhotoIndex >= photosData.length) {
                currentPhotoIndex = 0;
            }
        });
    }

    if (randomImageContainer && flipCard) {
        randomImageContainer.addEventListener('click', () => {
            flipCard.classList.toggle('flipped');
        });
    }

    // =============================
    // BOTÃO DE MÚSICA (SEÇÃO SEGREDOS)
    // =============================
    if (musicToggleBtn && romanticMusic) {
        musicToggleBtn.addEventListener('click', () => {
            if (romanticMusic.paused) {
                const p = romanticMusic.play();
                if (p !== undefined) {
                    p.catch(() => { });
                }
                musicToggleBtn.textContent = '⏸ Pausar música';
            } else {
                romanticMusic.pause();
                musicToggleBtn.textContent = '🎵 Tocar música';
            }
        });
    }

    // =============================
    // TEXTO DIGITANDO (SURPRESA)
    // =============================
    const surpriseTexts = [
        "Gostei de ver você explorando com atenção… interessante 😏",
        "Você tem um jeito que chama atenção sem nem perceber 😉",
        "Cada clique seu me deixa curioso… o que mais vem por aí?",
        "Achei divertido acompanhar seus movimentos… continua assim ✨",
        "Olha só, você chegou até o fim… tá rendendo curiosidade 😄",
        "Confesso que quero ver você descobrindo mais… e eu também 😌"
    ];


    let currentSurpriseIndex = 0;
    let typingInterval;
    let currentText = "";

    const surpriseTextElement = document.getElementById("surpriseText");
    const nextSurpriseBtn = document.getElementById("nextSurpriseBtn");

    function typeText(text, element, callback) {
        // se já está digitando, termina imediatamente
        if (typingInterval) {
            clearInterval(typingInterval);
            element.textContent = currentText; // mostra texto completo
        }

        currentText = text;
        element.textContent = "";
        let index = 0;

        typingInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                typingInterval = null;
                if (callback) callback();
            }
        }, 40);
    }

    function showNextSurprise() {
        if (currentSurpriseIndex >= surpriseTexts.length) {
            nextSurpriseBtn.style.display = "none";
            surpriseTextElement.textContent = "Fim das curiosidades! 🎉";
            return;
        }

        typeText(surpriseTexts[currentSurpriseIndex], surpriseTextElement);
        currentSurpriseIndex++;
    }

    // Inicializa quando a seção é aberta
    const surpriseSection = document.getElementById("surpresa");
    const surpriseObserver = new MutationObserver(() => {
        if (surpriseSection.style.display === "block") {
            currentSurpriseIndex = 0;
            nextSurpriseBtn.style.display = "block";
            showNextSurprise();
        }
    });

    surpriseObserver.observe(surpriseSection, {
        attributes: true,
        attributeFilter: ["style"]
    });

    if (nextSurpriseBtn) {
        nextSurpriseBtn.addEventListener("click", showNextSurprise);
    }


    // =============================
    // FORMULÁRIO (ABRE OUTRA PÁGINA)
    // =============================
    window.openForm = function () {
        window.location.href = "formulario.html";
    };

});
