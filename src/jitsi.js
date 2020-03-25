export function joinCall(groupName) {
  const domain = 'meet.jit.si';
  const options = {
    roomName: groupName,
    width: 700,
    height: 700,
    parentNode: document.querySelector('#jitsi')
  };

  const api = new window.JitsiMeetExternalAPI(domain, options);
}