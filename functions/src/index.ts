// import * as functions from 'firebase-functions';

// const universal = require(`${process.cwd()}/dist/server`).app;

// export const ssr = functions.https.onRequest(universal);
import * as functions from 'firebase-functions';
// tslint:disable-next-line: no-import-side-effect
import 'zone.js/dist/zone-node';
// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import {readFileSync} from 'fs';
import {enableProdMode} from '@angular/core';
// import { join } from 'path';n
// const DIST_FOLDER = join(process.cwd(), 'dist/');
import * as admin from 'firebase-admin';

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(`${process.cwd()}/dist/server/main.js`);

enableProdMode();
admin.initializeApp()
const app = express();

const indexHtml = readFileSync(__dirname + '/index-server.html', 'utf-8').toString();

app.get('*.*', express.static(__dirname + '/dist', {
  maxAge: '1y'
}));

app.route('*').get((req, res) => {

  console.log(req.url);

  renderModuleFactory(AppServerModuleNgFactory, {
    document: indexHtml,
    url: req.url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    res.status(200).send(html);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });

});

exports.ssrApp = functions.https.onRequest(app);
