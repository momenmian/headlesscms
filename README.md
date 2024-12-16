<p align="center">

<img src="./docs/static/OSBD_logo.svg" width="250">

<br><br>

<strong>Open source headless CMS by OSBD Alliance</strong>
<br><br>
OSBD is a community-driven initiative. We welcome everyone to contribute whether it’s fixing bugs, enhancing documentation, or helping spread the word. Your involvement matters!

</p>

<p align="center">

<a href="https://osbdalliance.org/">Website</a> |  <a href="https://github.com/OSBDAlliance/headlesscms">Documentation</a>

</p>

  
  

## Quick guide
`npm install`
`npm run start`

## nodemon installation for windows

Install Globally:

`npm install -g ts-node`
This makes ts-node available as a global command.

Install Locally in the Project:

`npm install ts-node --save-dev`

Update your scripts in package.json:
"start": "nodemon --ext 'ts,js,mjs,json' --exec 'npx ts-node server.ts'"


If installed, find the global npm path:
`npm config get prefix`

Ensure this path is in your system's Environment Variables:

Search for Environment Variables in the Start menu.
Edit the Path variable under "System Variables."
Add the global npm path (e.g., C:\Users\<YourUsername>\AppData\Roaming\npm).

Then restart using: `npm run start`

TODO::

  
**Prerequisites**
- Node.js ^20.14
- TypeScript

TODO::

## Documentation
TODO::
## Contributing
TODO::

