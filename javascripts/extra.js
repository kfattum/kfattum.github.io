const copyButton = document.getElementById('btn-copy');
copyButton.addEventListener('click', (event) => { 
    // получаем текстовое содержимое, которое хотим скопировать
     const content = document.getElementById('content-copy').textContent;
    // загружаем содержимое в наш буфер обмена
     navigator.clipboard.writeText(content); 
})