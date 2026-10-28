# Prenotazioni Sala Riunioni - frontend

Frontend Angular per prenotare sale riunioni e postazioni. Backend: [PrenotazioniSalaRiunioni-be](https://github.com/CatBonzo/PrenotazioniSalaRiunioni-be).

## Avvio

1. Backend: nel repository del backend, PostgreSQL attivo e `SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun` (porta 8080).
2. Qui: `npm install`, poi `npm start` e apri http://localhost:4200.
3. Accesso: registrati da `/registrazione` oppure entra da `/accedi` con un utente del database.

Serve Node.js 22.22.3+ oppure 24.15+ (lo chiede Angular CLI 22).

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm start` | server di sviluppo su :4200 |
| `npm test` | test unitari (Karma e Jasmine) |
| `npm run build` | build di produzione in `dist/exprivia/browser` |
| `npm run watch` | build di sviluppo che si rifà a ogni modifica |
| `docker build -t prenotazioni-fe .` | immagine Nginx con la build di produzione |

`.npmrc` imposta `legacy-peer-deps=true` perché `lucide-angular` dichiara compatibilità solo fino ad Angular 21, anche se funziona con Angular 22.

## Pagine

| Percorso | Pagina | Chi la vede |
|---|---|---|
| `/` | Home | tutti |
| `/accedi`, `/registrazione` | accesso e registrazione | chi non è entrato |
| `/forgot-password`, `/reset-password` | recupero password via e-mail | chi non è entrato |
| `/dashboard/prenotazione-posizione` | planimetria e prenotazione di sala o postazione | `ROLE_USER`, `ROLE_ADMIN` |
| `/dashboard/update-user` | profilo | `ROLE_USER`, `ROLE_ADMIN` |
| `/dashboard/bookings` | tutte le prenotazioni, export Excel del giorno | `ROLE_ADMIN` |
| `/dashboard/user-management` | gestione utenti | `ROLE_ADMIN` |
| `/dashboard/statistiche` | statistiche delle prenotazioni | `ROLE_ADMIN` |
| `/forbidden` | accesso negato | tutti |

## Struttura

- `src/app/core/auth`: token JWT, sessione, guardie (`AuthGuard`, `UserRouteAccessService`).
- `src/app/core/services`: un servizio per risorsa del backend (prenotazioni, stanze, postazioni, utenti, admin); tutte le chiamate passano da `AxiosService`.
- `src/app/core/models`, `src/app/core/interfaces`: tipi dei dati del backend.
- `src/app/layout`: header e footer.
- `src/app/login`, `src/app/account`: accesso, registrazione, password, profilo.
- `src/app/pages`: una cartella per pagina; `dashboard/` ha le sue rotte figlie in `dashboard.routes.ts`.
- `src/app/shared`: componenti riusati (sidebar, calendario, conferma, caricamento, toast).
- `src/app/config`: ruoli (`authority.constant.ts`) e modelli di configurazione.

Decisioni e coordinamento col backend: `AGENTS.md`.
