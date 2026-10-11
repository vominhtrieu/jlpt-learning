import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve('out'),port=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.png':'image/png','.woff2':'font/woff2'};
createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),base=resolve(root,'.'+pathname);
  if(base!==root&&!base.startsWith(root+sep)){res.writeHead(403).end();return}
  for(const file of [base,base+'.html',resolve(base,'index.html')]){
   try{if(!(await stat(file)).isFile())continue;res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:await readFile(file));return}catch{}
  }
  res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));
 }catch{res.writeHead(400).end('Bad request')}
}).listen(port,()=>console.log(`Kotoba: http://localhost:${port}`));
