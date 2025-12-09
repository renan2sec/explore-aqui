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
        { src: 'img/nat4.jpg', title: 'Você', message: 'Você é especial demais pra ser comum.' }
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
                    p.catch(() => {});
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
    const textoSurpresa = "Na verdade… tudo isso é só um jeito bonito de te dizer que eu gosto muito de você.";
    const typedTextElement = document.getElementById('typedText');

    function iniciarDigitacao() {
        if (!typedTextElement) return;

        typedTextElement.textContent = "";
        let letraIndex = 0;

        const intervalo = setInterval(() => {
            if (letraIndex < textoSurpresa.length) {
                typedTextElement.textContent += textoSurpresa.charAt(letraIndex);
                letraIndex++;
            } else {
                clearInterval(intervalo);
            }
        }, 50);
    }

    const secaoSurpresa = document.getElementById('surpresa');

    if (secaoSurpresa) {
        const observer = new MutationObserver(() => {
            if (secaoSurpresa.style.display === 'block') {
                iniciarDigitacao();
            }
        });

        observer.observe(secaoSurpresa, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // =============================
    // FORMULÁRIO (ABRE OUTRA PÁGINA)
    // =============================
    window.openForm = function () {
        window.location.href = "formulario.html";
    };

});
