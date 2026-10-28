# Prenotazioni Sala Riunioni - Frontend

Interfaccia web per la prenotazione delle sale riunioni e delle postazioni. Il backend è in [PrenotazioniSalaRiunioni-be](https://github.com/CatBonzo/PrenotazioniSalaRiunioni-be).

## Tecnologie

- Angular 22 (componenti standalone, control flow a blocchi)
- Angular Material 22, PrimeNG 22 (toast)
- TailwindCSS, lucide-angular
- Axios per le chiamate al backend (`http://localhost:8080`)

## Requisiti

- Node.js 22.22.3+ oppure 24.15+ (richiesto da Angular CLI 22)

## Avvio

```bash
npm install
npm start
```

Poi apri `http://localhost:4200/`.

Build di produzione:

```bash
npm run build
```

L'output è in `dist/exprivia/browser`.

`.npmrc` imposta `legacy-peer-deps=true` perché `lucide-angular` dichiara compatibilità solo fino ad Angular 21, anche se funziona con Angular 22.
