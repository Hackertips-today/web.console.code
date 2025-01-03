

2 methods to load new window with a list of all scripts loaded from the current DOM in memory (in a new tab)

[ method 1 ]
const cmds = [...document.querySelectorAll('script[src]')].map(script => `wget --user-agent "Trident" --connect-timeout 4 "${script.src}"`);
const newWindow = window.open('', '_blank');
newWindow.document.write('<!DOCTYPE html><html><head><title>Wget Commands</title></head><body><pre>' + cmds.join('\n') + '</pre></body></html>');
newWindow.document.close();



IF YOU GET AN ERROR ABOUT TRUSTED TYPES TRY THIS METHOD:
[ method 2 ]
const cmds = [...document.querySelectorAll('script[src]')].map(
  script => `wget --user-agent "Trident" --connect-timeout 4 "${script.src}"`
);

const content = `
<!DOCTYPE html>
<html>
<head>
  <title>Wget Commands</title>
</head>
<body>
  <pre>${cmds.map(cmd => cmd).join('\n')}</pre>
</body>
</html>
`;

const trustedHTML = window.trustedTypes?.defaultPolicy?.createHTML(content) || content;
const newWindow = window.open('', '_blank');
newWindow.document.write(trustedHTML);
newWindow.document.close();

