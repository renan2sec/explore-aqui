document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // NAVEGAÇÃO ENTRE SEÇÕES
    // =============================
    const menu = document.getElementById('menu');
    const sections = document.querySelectorAll('.hidden-section');

    // elemento de música (na seção "segredos")
    const romanticMusic = document.getElementById('romanticMusic');
    const musicToggleBtn = document.getElementById('musicToggleSegredos');

    // efeitos visuais da música
    const musicEffects = document.getElementById('musicEffects');
    const musicBars = musicEffects ? musicEffects.querySelectorAll('span') : [];

    function startMusicEffects() {
        musicBars.forEach(bar => bar.style.animationPlayState = 'running');
    }

    function stopMusicEffects() {
        musicBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }

    window.openSection = function (id) {
        menu.style.display = 'none';
        sections.forEach(sec => sec.style.display = 'none');

        const section = document.getElementById(id);
        section.style.display = 'block';

        // ===== SEÇÃO MÚSICA =====
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

            startMusicEffects();

        } else {
            if (romanticMusic) {
                romanticMusic.pause();
                romanticMusic.currentTime = 0;
            }

            if (musicToggleBtn) {
                musicToggleBtn.textContent = '🎵 Tocar música';
            }

            stopMusicEffects();
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

        stopMusicEffects();
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
                startMusicEffects();
            } else {
                romanticMusic.pause();
                musicToggleBtn.textContent = '🎵 Tocar música';
                stopMusicEffects();
            }
        });
    }

    // =============================
    // TEXTO DIGITANDO (SURPRESA)
    // =============================
    const surpriseTexts = [
        "Você tem um jeito que chama atenção sem nem perceber 😉",
        "Tem algo no seu jeito que prende a atenção naturalmente…",
        "É curioso como você faz coisas simples parecerem interessantes 😏",
        "Tem uma leveza em você que é difícil de ignorar",
        "Quanto mais você explora, mais dá vontade de continuar olhando…",
        "Não sei se você percebe, mas sua presença deixa tudo mais interessante ✨"
    ];

    let currentSurpriseIndex = 0;
    let typingInterval;
    let currentText = "";

    const surpriseTextElement = document.getElementById("surpriseText");
    const nextSurpriseBtn = document.getElementById("nextSurpriseBtn");

    function typeText(text, element, callback) {
        if (typingInterval) {
            clearInterval(typingInterval);
            element.textContent = currentText;
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
    // FORMULÁRIO
    // =============================
    window.openForm = function () {
        window.location.href = "formulario.html";
    };

});
