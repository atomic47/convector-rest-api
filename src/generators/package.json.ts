import { BaseGenerator } from './base';

export class PackageJsonOptions {
  controllers: { [k: string]: any }[];
}
export class PackageJsonGenerator extends BaseGenerator {
  contents = `{
  "name": "server",
  "version": "1.0.0",
  "description": "Convector Autogenerated Server",
  "main": "index.js",
  "scripts": {
    "start": "npm run build && pm2-runtime pm2.config.json",
    "start:daemon": "pm2 startOrRestart pm2.config.json --no-daemon",
    "stop": "pm2 stop pm2.config.json",
    "tsc": "tsc",
    "clean": "rimraf dist client",
    "refresh": "./node_modules/pm2/bin/pm2 stop 0 && ./node_modules/pm2/bin/pm2 start 0",
    "build": "npm run clean && tsc",
    "prepare": "npm run build",
    "test": "mocha -r ts-node/register test/*.spec.ts --reporter spec"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.3",
    "config": "^1.30.0",
    "dotenv": "^6.0.0",
    "express": "^4.16.3",
    "node-couchdb": "^1.3.0",
    "x509": "^0.3.3",
    ${this.options.controllers.map(controller =>
    `"${controller.name}": "^0.1.0",
    `).join('')}
    "@worldsibu/convector-adapter-fabric": "~1.3.0",
    "@worldsibu/convector-storage-couchdb": "~1.3.0",
    "swagger-ui-express": "^4.0.6"
  },
  "devDependencies":{
    "@types/bytebuffer": "^5.0.40",
    "@types/node": "^12.0.8",
    "mocha": "^5.2.0",
    "pm2": "^3.4.1",
    "rimraf": "^2.6.2",
    "ts-node": "^7.0.0",
    "typescript": "2.9.2"
    }
}`;

  constructor(filename: string, path: string, private options: PackageJsonOptions) {
    super(filename, path);
  }
}