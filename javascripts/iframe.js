window.onload = () => {
    let iframeName = document.getElementById("comments-app-BV76JGsM-2");
    let iframeContent = iframeName.contentDocument;
    iframeContent.body.innerHTML = iframeContent.body.innerHTML + "<style>.tg-iframe{background-color: #161618}</style>";
}