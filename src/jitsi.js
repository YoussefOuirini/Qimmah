const domain = 'meet.jit.si';
const options = {
    roomName: 'JitsiMeetAPIExample',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet')
};
const api = new window.JitsiMeetExternalAPI(domain, options);

export function getIframe() {
  const iframe = api.getIFrame();
  return iframe;
}