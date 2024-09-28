import { ZoomMtg } from '@zoom/meetingsdk';
console.log(meetingUrl);

// Función que crea el iframe con la URL de la reunión de Zoom
function createIframe(meetingUrl) {
  // Crea un iframe para mostrar la videollamada
    const iframe = document.createElement('iframe');
    iframe.src = meetingUrl;
    iframe.width = '100%';
    iframe.height = '600';
    iframe.iframe.style.border = 'none';
    iframe.allow = 'camera; microphone; display-capture';

  // Agrega el iframe al cuerpo del documento
    document.body.appendChild(iframe);
}

// Exporta la función createIframe
// export { createIframe };
