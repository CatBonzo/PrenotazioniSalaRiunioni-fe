# AGENTS.md - frontend Prenotazioni Sala Riunioni

Registro vivo delle decisioni. Si aggiorna a ogni passo, con il perché. Le decisioni superate si barrano.

## 1. Contesto

Frontend per la prenotazione di sale riunioni e postazioni (planimetria, calendario, gestione utenti e statistiche per l'amministratore). Il backend è in CatBonzo/PrenotazioniSalaRiunioni-be e ha il suo AGENTS.md. Il codice viene da reddooneee/PrenotazionePostazioni-Exprivia (cartella `frontend`, Angular 19) ed è stato portato ad Angular 22 il 2026-10-28. Il repository di origine non si tocca: le modifiche si fanno solo qui.

## 2. Regole di lavoro

- Lingua dell'interfaccia e della documentazione: italiano.
- Un ramo e una pull request verso `main` per ogni passo; il merge lo fa solo Mahima.
- Versioni: sempre le ultime stabili.
- Nessuna credenziale nel codice: l'indirizzo del backend e le chiavi stanno nella configurazione, non nei servizi.
- I ruoli (`ROLE_USER`, `ROLE_ADMIN`, `ROLE_BUILDM`) decidono cosa si vede, ma l'ultima parola è del backend: nascondere una voce non è una protezione.
- Ogni chiamata al backend passa da un servizio in `core/services` e da `AxiosService`, mai da un componente.
- Se il contratto col backend non torna, si annota nel registro dei contratti (sezione 4) e si corregge nel backend, non con un giro nel frontend.

## 3. Decisioni

| Data | Decisione | Perché |
|---|---|---|
| 2026-10-28 | Frontend importato da PrenotazionePostazioni-Exprivia così com'era (Angular 19) | Partire dal codice che funzionava e aggiornarlo a passi, una versione di Angular alla volta |
| 2026-10-28 | Aggiornamento ad Angular 20, poi 21, poi 22 con le migrazioni ufficiali (`ng update`): control flow a blocchi (`@if`, `@for`), `provideZoneChangeDetection`, `ChangeDetectionStrategy.Eager`, `withXhr` | Saltare versioni rompe le migrazioni automatiche; a passi ogni versione compila prima di passare alla successiva |
| 2026-10-28 | TypeScript 6: tolto `baseUrl` da `tsconfig.json`, gli alias `@/` restano in `paths` | `baseUrl` è deprecato in TypeScript 6 |
| 2026-10-28 | PrimeNG 22 solo per i toast (`MessageService`); tolte le opzioni di transizione del toast non più supportate | Il resto dell'interfaccia è Angular Material e TailwindCSS, con le icone di lucide-angular: PrimeNG serviva solo lì |
| 2026-10-28 | `lucide-angular` 1.0.0 con `legacy-peer-deps=true` in `.npmrc` | Dichiara compatibilità solo fino ad Angular 21, ma funziona con il 22; senza l'opzione `npm install` si ferma |
| 2026-10-28 | Dockerfile su Node 24; l'immagine finale è Nginx con `dist/exprivia/browser` | Angular CLI 22 chiede Node 22.22.3+ o 24.15+ |
| 2026-10-28 | Chiamate HTTP con Axios (`AxiosService`), non con `HttpClient` | Scelta del progetto di origine, tenuta per non riscrivere i servizi durante l'aggiornamento. Il token Bearer si aggiunge in un intercettore di Axios |
| 2026-10-28 | Token JWT e profilo in cache nel `localStorage` (`TokenService`, `AuthService`) | Scelta del progetto di origine: la sessione sopravvive alla chiusura della scheda. Il token dura 24 ore (impostazione del backend) |
| 2026-10-28 | Rotte protette per ruolo con `data.authorities` e `UserRouteAccessService`; tutta la dashboard dietro `AuthGuard` | I ruoli vengono dal token del backend; chi non ha il ruolo va su `/forbidden` |
| 2026-10-28 | Documentazione sul modello di BuonaCaccia-fe: README breve (avvio, comandi, pagine, struttura) e questo registro | Mahima ha chiesto di prendere spunto dalla documentazione di Buonacaccia frontend |

## 4. Registro dei contratti

Attriti trovati tra frontend e backend. Si aggiorna quando se ne trova uno e quando si chiude.

| Data | Problema | Esito |
|---|---|---|
| 2026-10-28 | `AxiosService` ha l'indirizzo del backend scritto nel codice (`http://localhost:8080`), mentre `environment.apiUrl` esiste ma non è usato | Aperto: leggere l'indirizzo da `environment` per poter puntare a un backend diverso in produzione |
| 2026-10-28 | Su 401 l'intercettore manda a `/login`, ma la pagina di accesso è `/accedi`: si finisce sulla Home | Aperto: cambiare il rinvio in `/accedi` |
| 2026-10-28 | `PostazioneService` chiama `GET /api/postazioni/stanza/{id}`, `/piano/{piano}` e `/disponibili/{data}`, che il backend non espone | Aperto: `getPostazioniByStanza` è usato dalla prenotazione, gli altri due no. Decidere se aggiungerli al backend o toglierli dal frontend |
| 2026-10-28 | `UserService.deleteUser` chiama `DELETE /api/utenti/elimina/{id}`, che non esiste; il backend ha `DELETE /api/admin/utente/{id}` (admin) e `DELETE /api/utenti/elimina-account` (sé stessi) | Aperto: allineare il servizio a uno dei due endpoint |
| 2026-10-28 | Il backend lascia pubblico `GET /api/prenotazioni/postazioni/9/orari-disponibili` (solo la postazione 9, residuo di una prova) | Aperto, nel backend: vedi il suo AGENTS.md |
| 2026-10-28 | Il ruolo del responsabile di sede si chiama `ROLE_BUILDM` qui (`config/authority.constant.ts`) e `ROLE_BUILDMAN` nel backend | Aperto: nessuna rotta lo usa ancora, ma va allineato prima di farlo |
| 2026-10-28 | Il CORS del backend ammette solo `http://localhost:4200` | Da rivedere quando il frontend andrà in produzione |

## 5. Prossimi passi

Da decidere con Mahima: chiudere gli attriti aperti del registro, aggiungere test che girino davvero (oggi gli `.spec.ts` sono quelli generati da Angular CLI), e valutare il passaggio da Axios a `HttpClient`.
