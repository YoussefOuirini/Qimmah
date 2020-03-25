const jitsiCall = class Jitsi {
  constructor(domain, options) {
    this.domain = domain;
    this.options = options;
    this.api = new window.JitsiMeetExternalAPI(this.domain, this.options);
  }

  hangup() {
    this.api.executeCommand('hangup');
  }
};

export function joinCall(groupName) {
  const domain = 'meet.jit.si';
  const options = {
    roomName: groupName,
    width: 700,
    height: 700,
    parentNode: document.querySelector('#jitsi')
  };
  const call = new jitsiCall(domain, options);
  return call;
}