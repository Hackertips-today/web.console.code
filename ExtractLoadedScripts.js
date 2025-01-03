

 [ Extract all scripts in DOM into JS array and display on a new page]
       ___ _____       __          _     _             _    
      |_  /  ___|      \ \        | |   | |           | |   
        | \ `--.   _____\ \       | |__ | | __ _ _ __ | | __
        | |`--. \ |______> >      | '_ \| |/ _` | '_ \| |/ /
    /\__/ /\__/ /       / /       | |_) | | (_| | | | |   < 
    \____/\____/       /_/        |_.__/|_|\__,_|_| |_|_|\_\
                               ______                        
                              |______|                       

     Bonus: Displays as wget statements you can easily grab
--------
  

2 methods to load new window with a list of all scripts loaded from the current DOM in memory (in a new tab)

[ method 1 ]
const cmds = [...document.querySelectorAll('script[src]')].map(script => `wget --user-agent "Trident" --connect-timeout 4 "${script.src}"`);
const newWindow = window.open('', '_blank');
newWindow.document.write('<!DOCTYPE html><html><head><title>Wget Commands</title></head><body><pre>' + cmds.join('\n') + '</pre></body></html>');
newWindow.document.close();

--------

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

[ SHOULD OPEN IN NEW WINDOW ]

wget --user-agent "Trident" --connect-timeout 4 "https://www.gstatic.com/og/_/js/<snip>AAAAAAAAA,csi"
wget --user-agent "Trident" --connect-timeout 4 "https://www.gstatic.com/og/_/js/k=og.asy.en_US.tVea3j"
wget --user-agent "Trident" --connect-timeout 4 "https://www.google.com/xjs/_/js/k=xjs.s.en_US.eJ9pz7S"
wget --user-agent "Trident" --connect-timeout 4 "https://www.google.com/xjs/_/js/k=xjs.s.en_US.eJ9pz7SMyok"
wget --user-agent "Trident" --connect-timeout 4 "https://www.google.com/xjs/_/js/k=xjs.s.en_US.eJ9pz7SMyok.2"
wget --user-agent "Trident" --connect-timeout 4 "https://www.google.com/xjs/_/js/k=xjs.s.en_US.eJ9pz7SMyok.2018.O"
  
