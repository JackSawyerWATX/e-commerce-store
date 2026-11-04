import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { MemoryStore } from 'express-rate-limit';
import { createRateLimits } from './rate-limit.middleware.js';
test('auth limit blocks login/signup while preserving token refresh', async () => {
 const app=express();const limits=createRateLimits(null,()=>new MemoryStore());
 app.use('/api',limits.api);app.use(['/api/auth/login','/api/auth/signup'],limits.auth);
 app.post('/api/auth/login',(_,res)=>res.json({ok:true}));app.post('/api/auth/signup',(_,res)=>res.json({ok:true}));app.post('/api/auth/refresh-token',(_,res)=>res.json({ok:true}));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
 try {const url='http://127.0.0.1:'+server.address().port;for(let n=0;n<10;n++)assert.equal((await fetch(url+'/api/auth/login',{method:'POST'})).status,200);const blocked=await fetch(url+'/api/auth/signup',{method:'POST'});assert.equal(blocked.status,429);assert.ok(blocked.headers.get('retry-after'));assert.match((await blocked.json()).message,/fifteen minutes/);assert.equal((await fetch(url+'/api/auth/refresh-token',{method:'POST'})).status,200);}finally{await new Promise(resolve=>server.close(resolve));}
});
