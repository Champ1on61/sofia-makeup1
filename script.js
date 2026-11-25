// ===== Шапка при скролле =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Мобильное меню =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ===== Анимация появления секций =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===== ОТПРАВКА ЗАЯВКИ В TELEGRAM (БЕЗ БОТА) =====
const form = document.getElementById('bookingForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const date = formData.get('date');
    const message = formData.get('message') || 'Нет комментария';
    
    // Форматируем дату
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // Собираем текст сообщения
    const text = `Здравствуйте! Хочу записаться на макияж.\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n💄 Услуга: ${service}\n📅 Дата: ${formattedDate}\n💬 Комментарий: ${message}`;
    
    // Кодируем текст для ссылки
    const encodedText = encodeURIComponent(text);
    
    // Username Софьи в Telegram (без @)
    const telegramUsername = 'Sofgx_s'; 
    
    // Открываем Telegram с готовым текстом
    window.open(`https://t.me/${telegramUsername}?text=${encodedText}`, '_blank');
    
    // Показываем сообщение клиенту
    alert('✅ Откроется Telegram. Просто нажмите кнопку "Отправить" в чате с Софьей!');
    form.reset();
});

// ===== Плавная прокрутка =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});