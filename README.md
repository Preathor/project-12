Project 12

Github projekt z zaenkrat public kodo. V kratkem bo zadeva šla na private, authentikacija kode bo preko tokena.
- Kasneje se dodoajo raznorazni hooki za deploy on git commit/push
- delo poteka na "develop" branchu. Prečišena koda se merga in verzionira na main branchu.
- vsak commit naj ima commit message: "Kratek opis opravljenega dela [št.ur]". Primer: "Postavitev sistema. [5h]"

Predlagam razvoj in instalacijo na osebnem računalniku. Zagotovljen mora biti: 
- mysql workbench ali dbeaver
- node version mannager: https://github.com/nvm-sh/nvm z latest LTS verzijo node-a v16.17.0

Razlaga strukture: 
- client: front-end client. Vue, React, po želji. Za komunikacijo iz front-end strani predlagam za začetek axios. Kasneje mogoče o-auth.
  - sam osebno predlagam brez type-scripta. 
  - piše naj se lepa, čista, šolska koda. Brez fency "trikov". 
  - teste bi zaenkrat izpustil

- database: seed skripte za generiranje mysql podatkovne baze. Struktura tabele - izvoz iz mysql workbench

- deploy: front-end minificirana client koda, katero servira server koda

- log: vso komunikacijo s server kodo je treba logirat za primer čudnega obnašanja. Struktura je že pripravljena, samo še uporabljati je potrebno

- server: node.js express.js server api. 
  - functions: vse matmatične operacije in komunikacija z bazo
  - router: vstopna točka / api / router (REST api)
  - server: node.js server inicalizacija. Serviral ga bo pm2 ali forever
  - settings: globalni settingsi za node server


README.md

- osnovna instalacijska navodila
- TODO spisek

