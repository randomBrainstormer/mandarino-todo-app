

Prerequisiti:

1 - Creare un DB MySQL e Aggiornare le credenziali dell database appena creato nel file .env 
2 - procedere a installare le dependencys con `yarn install`
3 - procedere a le migrations del database con il comando `yarn db:up` per aggiornare e creare le tabelle del progetto. 
4 - `yarn dev` per avviare il client e anche il server.  (Sarebbeero su due node diversi, ma con conccurently lo facciamo avviare nella stessa finestra solo per lo sviluppo)

L'utente di prova è    user:  test   password: test 



TODO
[x] Implementare l'scrittura e lettura DB delle liste
[] Implementare l'scrittura e lettura DB dei ToDos 
[] Aggiungere funzione Logout
[] Fare il login permanente per la sezione
[] Aggiungere la posibilità di editare una lista
[] Aggiungere la posibilità di editare un ToDo
[] Aggiungere la possibilità di riordinare l'ordine dei ToDo
[] Aggiungere sistema de notifiche. (se il login went wrong. Unable to add to list.  List added successfuly?
[] add query creds strategy (fare i request all'api solo se sei logato)