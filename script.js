// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    initializePage();
    
    // Configurar navegação suave
    setupSmoothScrolling();
    
    // Configurar abas de instalação
    setupInstallationTabs();
    
    // Configurar botões de copiar código
    setupCopyButtons();
    
    // Configurar modais
    setupModals();
    
    // Configurar formulário de newsletter
    setupNewsletterForm();
    
    // Configurar botão de voltar ao topo
    setupBackToTopButton();
    
    // Configurar eventos de prática e tópicos avançados
    setupPracticeAndAdvancedButtons();
});

// Função para inicializar a página
function initializePage() {
    // Atualizar ano atual no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Adicionar classe ativa ao primeiro link de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Adicionar efeito de digitação ao subtítulo
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        typeWriterEffect(subtitle, originalText, 0);
    }
}

// Efeito de digitação para o subtítulo
function typeWriterEffect(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriterEffect(element, text, i), 50);
    }
}

// Configurar navegação suave
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Remover classe ativa de todos os links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Adicionar classe ativa ao link clicado
                this.classList.add('active');
                
                // Rolar suavemente para o elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Atualizar link ativo baseado na rolagem
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Configurar abas de instalação
function setupInstallationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe ativa de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Configurar botões de copiar código
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            
            // Copiar para a área de transferência
            navigator.clipboard.writeText(code).then(() => {
                // Feedback visual
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.backgroundColor = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar: ', err);
                alert('Não foi possível copiar o código. Tente manualmente.');
            });
        });
    });
}

// Configurar modais
function setupModals() {
    const tipsModal = document.getElementById('tips-modal');
    const advancedModal = document.getElementById('advanced-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Fechar modal ao clicar no X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Fechar modal com tecla ESC
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// Configurar formulário de newsletter
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simular envio do formulário
                emailInput.value = '';
                
                // Feedback visual
                const submitButton = this.querySelector('button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Inscrito!';
                submitButton.style.backgroundColor = 'var(--success)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
                // Aqui normalmente enviaria para um servidor
                console.log(`Email inscrito: ${email}`);
            } else {
                alert('Por favor, insira um email válido.');
                emailInput.focus();
            }
        });
    }
}

// Validar formato de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Configurar botão de voltar ao topo
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Mostrar/ocultar botão baseado na rolagem
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.alignItems = 'center';
                backToTopButton.style.justifyContent = 'center';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        // Rolar para o topo ao clicar
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Configurar botões de prática e tópicos avançados
function setupPracticeAndAdvancedButtons() {
    const practiceTipsBtn = document.getElementById('practice-tips');
    const advancedTopicsBtn = document.getElementById('advanced-topics');
    
    if (practiceTipsBtn) {
        practiceTipsBtn.addEventListener('click', function() {
            const modal = document.getElementById('tips-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    }
    
    if (advancedTopicsBtn) {
        advancedTopicsBtn.addEventListener('click', function() {
            const modal = document.getElementById('advanced-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    }
}

// Adicionar efeito de digitação para comandos (opcional)
function animateCommands() {
    const commandCards = document.querySelectorAll('.command-card');
    
    commandCards.forEach((card, index) => {
        // Adicionar atraso para animação em cascata
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
    });
    
    // Observador de interseção para animação ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    commandCards.forEach(card => observer.observe(card));
}

// Inicializar animações quando a página carregar
window.addEventListener('load', function() {
    // Pequeno atraso para garantir que tudo está carregado
    setTimeout(() => {
        animateCommands();
    }, 500);
});
