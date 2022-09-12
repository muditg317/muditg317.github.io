import * as fs from 'fs';
// import { REDIRECTS } from '../data/urls/redirects';
// const REDIRECTS = require('../src/data/urls').REDIRECTS;

const template = `
<!DOCTYPE html>
<html>
    <head>
        <title>{title}</title>
     <meta charset="UTF-8" />
     <meta http-equiv="refresh" content="0; URL={target}" />
   </head>
   <body>
     <h1>Redirect to {title}</h1>
     <p>If you are not redirected within 3 seconds, click <a href="{target}">here</a>.</p>
     <script type="text/javascript">
       window.location.replace("{target}");
     </script>
   </body>
</html>
`;


const redirText = fs.readFileSync('src/data/urls/redirects.ts', 'utf8');
const REDIR_REGEX = /REDIRECTS = (\[[\w\W]*\]) as const;/;
const match = redirText.match(REDIR_REGEX)!;
const redir_str = match[1].replace(/(group|entryType):.*/gm, '');
const REDIRECTS: any[] = eval(redir_str);
// console.log(REDIRECTS);

REDIRECTS.forEach(redirect => {
  const { aliases, target, title } = redirect;
  (aliases as string[]).forEach(alias => {
    const html = template.replace(/{title}/g, title).replace(/{target}/g, target);
    console.log(`Writing ${alias} to ${target}`);
    if (!fs.existsSync(`build/${alias}`)) {
      fs.mkdirSync(`build/${alias}`);
    }
    fs.writeFileSync(`./build/${alias}/index.html`, html);
    console.log(`Done`);
  });
  // console.log(`${redirect.title}: ${redirect.aliases} -> ${redirect.target}`);
});

export {}