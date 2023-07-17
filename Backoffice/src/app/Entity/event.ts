import { Specialite } from "./specialite";

export interface Event {
    id:String;
    nom:String;
    description:String;
    images?:[String];
    nb_participant:number;
    nb_place_restant:number;
    date_debut:Date;
    date_fin:Date;
    date_fin_vote:Date;
    pourcentage:number;
    status:number;
    specialites?:[Specialite]
}
