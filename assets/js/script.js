    // ── Loading ──
    window.addEventListener('load', () => {
      const bar = document.getElementById('loadBar');
      const loading = document.getElementById('loading');
      bar.style.width = '100%';
      setTimeout(() => {
        loading.classList.add('hide');
        // Trigger hero bg zoom
        document.getElementById('heroBg').classList.add('loaded');
      }, 1800);
    });

    // ── Header scroll ──
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── Mobile menu ──
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.add('open');
    });
    document.getElementById('mobileClose').addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('open');
      });
    });

    // ── Reveal on scroll ──
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // ── Cardápio tabs ──
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      });
    });

    // ── Lightbox ──
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    document.querySelectorAll('.gal-item').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('lightboxClose').addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // ── Carousel ──
    const track = document.getElementById('carouselTrack');
    const cards = track.querySelectorAll('.depoimento-card');
    let currentSlide = 0;

    // Build dots
    const dotsContainer = document.getElementById('carouselDots');
    const totalSlides = Math.ceil(cards.length / getVisible());

    function getVisible() {
      return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const n = Math.ceil(cards.length / getVisible());
      for (let i = 0; i < n; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(idx) {
      const visible = getVisible();
      const maxIdx = Math.ceil(cards.length / visible) - 1;
      currentSlide = Math.max(0, Math.min(idx, maxIdx));
      const cardWidth = cards[0].offsetWidth + 24; // gap
      track.style.transform = `translateX(-${currentSlide * cardWidth * visible}px)`;
      document.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    document.getElementById('carouselPrev').addEventListener('click', () => goTo(currentSlide - 1));
    document.getElementById('carouselNext').addEventListener('click', () => goTo(currentSlide + 1));

    buildDots();
    window.addEventListener('resize', () => { buildDots(); goTo(0); }, { passive: true });

    // Auto-advance
    setInterval(() => {
      const maxIdx = Math.ceil(cards.length / getVisible()) - 1;
      goTo(currentSlide < maxIdx ? currentSlide + 1 : 0);
    }, 5000);

    // ── Imagem ascendente hero ──
    window.addEventListener('scroll', () => {
      const heroBg = document.getElementById('heroBg');
      if (heroBg) {
        heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });

    // Enviar mensagem personalizada ao pedir orçamento pra eventos
    function enviarWhatsApp() {
      // Captura os valores dos campos pelos IDs
      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const evento = document.getElementById('tipo_evento').value;
      const convidados = document.getElementById('convidados').value;
      const msg = document.getElementById('mensagem').value;

      // Monta a mensagem formatada
      const texto = `Olá! Me chamo ${nome}, e gostaria de solicitar o orçamento pra um evento.\n` +
        `Meu telefone: ${telefone}\n` +
        `Tipo de evento: ${evento}\n` +
        `Número de convidados: ${convidados}\n` +
        `Detalhes/Observações: ${msg}`;

      // Codifica o texto para ser enviado via URL
      const url = `https://wa.me/+5564999990000?text=${encodeURIComponent(texto)}`;

      // Abre o WhatsApp
      window.open(url, '_blank');
    }
