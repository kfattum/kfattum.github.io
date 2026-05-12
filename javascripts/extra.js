function deblur() {
  window.setTimeout(function () {
  var element = document.querySelector('.preloader');
    if (element) {
    element.classList.remove('blur');
    }
  }, 500);
}

// кнопка скопировать
document.querySelectorAll('.button_copy').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const cleanUrl = window.location.origin + window.location.pathname;
        const notification = document.getElementById('copy-notification');

        navigator.clipboard.writeText(cleanUrl).then(() => {
            // Показываем уведомление
            notification.classList.add('show');
            
            // Скрываем уведомление через 2.5 секунды
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2500);
            
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    });
});

// поделиться в тг
document.getElementById('shareButton').addEventListener('click', function() {
    // Собираем URL без хэша и параметров
    const cleanUrl = window.location.origin + window.location.pathname;
    
    const url = encodeURIComponent(cleanUrl); 
    const text = encodeURIComponent(document.title); 
    const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    
    window.open(shareUrl, '_blank');
});