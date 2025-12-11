document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('header');
    const menu = document.getElementById('menu');
    const sections = document.querySelectorAll('.hidden-section');

    const romanticMusic = document.getElementById('romanticMusic');
    const musicToggleBtn = document.getElementById('musicToggleSegredos');
    const musicTitleDisplay = document.getElementById('musicTitleDisplay');
    const nextMusicBtn = document.getElementById('nextMusicBtn');
    
    const musicEffects = document.getElementById('musicEffects');
    const musicBars = musicEffects ? musicEffects.querySelectorAll('span') : [];

    const musicPlaylist = [
        { src: 'audio/QuebraCabeca.mp3', title: 'Quebra-Cabeça 🧩' },
        { src: 'audio/mirror.mp3', title: 'Mirrors ❤️' },
        { src: 'audio/NossoPlano.mp3', title: 'Nosso Plano 🌙' }
    ];

    let currentMusicIndex = 0;

    function startMusicEffects() {
        musicBars.forEach(bar => bar.style.animationPlayState = 'running');
    }

    function stopMusicEffects() {
        musicBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }

    function typeEffect(element, text, speed, callback) {
        let i = 0;
        element.textContent = '';
        element.classList.remove('finished-typing');

        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.add('finished-typing');
                if (callback) callback();
            }
        }
        typing();
    }

    function loadAndPlayMusic() {
        if (!romanticMusic || musicPlaylist.length === 0 || !musicTitleDisplay) return;

        const currentTrack = musicPlaylist[currentMusicIndex];
        
        romanticMusic.src = currentTrack.src;
        musicTitleDisplay.textContent = currentTrack.title;

        romanticMusic.load();
        const playPromise = romanticMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicToggleBtn.textContent = '⏸ Pausar música';
                startMusicEffects();
            }).catch(() => {
                musicToggleBtn.textContent = '🎵 Tocar música';
                stopMusicEffects();
            });
        }
    }

    function playNextTrack() {
        currentMusicIndex = (currentMusicIndex + 1) % musicPlaylist.length;
        loadAndPlayMusic();
    }

    const introOverlay = document.getElementById('introOverlay');
    const introTextElement = document.getElementById('introText');
    const introMessage = "Toda vez que você entrar aqui, terá coisas novas pra você ✨";

    if (introTextElement && introOverlay) {
        typeEffect(introTextElement, introMessage, 70, () => {
            setTimeout(() => {
                introOverlay.classList.add('hidden');
            }, 1500);
        });
    }

    const musicPhotoElement = document.getElementById('musicPhoto');
    let slideshowInterval;
    let slideshowIndex = 0;

    function updateSlideshow() {
        if (!musicPhotoElement) return;

        const photo = photosData[slideshowIndex];

        musicPhotoElement.classList.remove('active');

        setTimeout(() => {
            musicPhotoElement.src = photo.src;
            
            musicPhotoElement.classList.add('active');

            slideshowIndex = (slideshowIndex + 1) % photosData.length;
        }, 1000);
    }

    function startSlideshow() {
        const initialPhoto = photosData[0];
        musicPhotoElement.src = initialPhoto.src;
        musicPhotoElement.classList.add('active');

        slideshowIndex = 1;

        slideshowInterval = setInterval(updateSlideshow, 4000); 
    }

    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        if (musicPhotoElement) {
            musicPhotoElement.classList.remove('active');
        }
    }


    window.openSection = function (id) {
        const section = document.getElementById(id);

        if (header) header.style.display = 'none';
        menu.style.display = 'none';
        sections.forEach(sec => {
            sec.classList.remove('section-enter');
            sec.style.display = 'none';
        });

        section.style.display = 'block';
        setTimeout(() => { section.classList.add('section-enter'); }, 10);

        if (id === 'segredos' && romanticMusic) {
            loadAndPlayMusic();
            
            romanticMusic.onended = function() {
                playNextTrack();
            };
            startSlideshow();
        } else {
            if (romanticMusic) {
                romanticMusic.pause();
                romanticMusic.currentTime = 0;
                romanticMusic.onended = null;
            }
            if (musicToggleBtn) musicToggleBtn.textContent = '🎵 Tocar música';
            stopMusicEffects();
            stopSlideshow();
        }
    };

    window.goBack = function () {
        sections.forEach(sec => {
            sec.style.display = 'none';
            sec.classList.remove('section-enter');
        });

        if (header) header.style.display = 'block';

        menu.style.display = 'grid';

        if (romanticMusic) {
            romanticMusic.pause();
            romanticMusic.currentTime = 0;
            romanticMusic.onended = null;
        }
        if (musicToggleBtn) musicToggleBtn.textContent = '🎵 Tocar música';
        stopMusicEffects();
        stopSlideshow();
    };

    const revealRandomImageBtn = document.getElementById('revealRandomImage');
    const randomImageContainer = document.getElementById('randomImageContainer');
    const randomImageElement = document.getElementById('randomImage');
    const flipCard = randomImageContainer ? randomImageContainer.querySelector('.flip-card') : null;
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
            if (currentPhotoIndex >= photosData.length) {
                revealRandomImageBtn.textContent = 'Você viu todos os momentos! ❤️';
                revealRandomImageBtn.disabled = true;
                if (randomImageContainer) randomImageContainer.style.display = 'none';
                return;
            }

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
        });
    }

    if (randomImageContainer && flipCard) {
        randomImageContainer.addEventListener('click', () => {
            flipCard.classList.toggle('flipped');
        });
    }

    if (musicToggleBtn && romanticMusic) {
        musicToggleBtn.addEventListener('click', () => {
            if (romanticMusic.paused) {
                const p = romanticMusic.play();
                if (p !== undefined) { p.catch(() => { }); }
                musicToggleBtn.textContent = '⏸ Pausar música';
                startMusicEffects();
            } else {
                romanticMusic.pause();
                musicToggleBtn.textContent = '🎵 Tocar música';
                stopMusicEffects();
            }
        });
    }

    if (nextMusicBtn) {
        nextMusicBtn.addEventListener('click', playNextTrack);
    }

    const surpriseTexts = [
        "Você tem um jeito que chama atenção sem nem perceber 😉",
        "Tem algo no seu jeito que prende a atenção naturalmente…",
        "É curioso como você faz coisas simples parecerem interessantes 😏",
        "Tem uma leveza em você que é difícil de ignorar",
        "Quanto mais você explora, mais dá vontade de continuar olhando…",
        "Não sei se você percebe, mas sua presença deixa tudo mais interessante ✨"
    ];

    let currentSurpriseIndex = 0;

    const surpriseTextElement = document.getElementById("surpriseText");
    const nextSurpriseBtn = document.getElementById("nextSurpriseBtn");

    function showNextSurprise() {
        if (currentSurpriseIndex >= surpriseTexts.length) {
            if (nextSurpriseBtn) nextSurpriseBtn.style.display = "none";
            if (surpriseTextElement) surpriseTextElement.textContent = "Fim das curiosidades! 🎉";
            return;
        }
        typeEffect(surpriseTextElement, surpriseTexts[currentSurpriseIndex], 40);
        currentSurpriseIndex++;
    }

    const surpriseSection = document.getElementById("surpresa");
    const surpriseObserver = new MutationObserver(() => {
        if (surpriseSection.style.display === "block") {
            currentSurpriseIndex = 0;
            if (nextSurpriseBtn) nextSurpriseBtn.style.display = "block";
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

    window.openForm = function () {
        window.location.href = "formulario.html";
    };

});
