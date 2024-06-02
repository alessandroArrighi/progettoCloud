export interface Montatura {
    Modello: string | null
    Brand: string | null
    Prezzo: number | null
    Versione: string | null
    Calibro: string | null
    Ponte: string | null
    Aste: string | null
    Materiale: string | null
    Colore: string | null
    Immagine: string | null
    NewModello: string | null
}

export interface LAC {
    Modello: string | null
    Brand: string | null
    Prezzo: number | null
    Durata: string | null
    Fascia: string | null
    Focale: string | null
    NewModello: string | null
    Categoria: string | null
}

export interface User {
    IDUtente: number
    User: string
    Role: "admin" | "user"
}

export interface Ordine {
    IDProdotto: string
    Categoria: string
    Quantita: number
    Prezzo: number
    Immagine: string
}

export interface Utente {
	IDUtente: number
    User: string 	
    Password: string
    Nome: string
    Cognome: string 	
    Mail: string 	
    Telefono: number 	
    Indirizzo: string 
    Role: "admin" | "user" 	
}

export interface nuoviDatiUtente {
    User: string 	
    Nome: string
    Cognome: string 	
    Mail: string 	
    Telefono: number 	
    Indirizzo: string
}