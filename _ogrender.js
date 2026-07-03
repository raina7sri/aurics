const path=require('path');
const puppeteer=require(path.join('C:','Users','raina','Documents','Claude','Projects','Sylvan Learning','render','node_modules','puppeteer'));
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const pg=await b.newPage();
await pg.setViewport({width:1200,height:630,deviceScaleFactor:2});
await pg.goto('file://'+__dirname.split(path.sep).join('/')+'/og-card.html',{waitUntil:'networkidle2'});
await pg.screenshot({path:'og-image.png',clip:{x:0,y:0,width:1200,height:630}});
await b.close();console.log('wrote og-image.png');})();
