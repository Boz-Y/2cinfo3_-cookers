import mongoose from "mongoose";
const { Schema, model } = mongoose;

const EventSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
    },

    nb_participant: {
      type: Number,
      required: true,
    },
    nb_place_restant: {
      type: Number,
      required: true,
      default: function() {
        return this.nb_participant;
      }
    },
    date_debut: {
      type: Date,
      required: true,
    },
    date_fin: {
      type: Date,
      required: true,
    },
    date_fin_vote: {
      type: Date,
      required: true,
    },

    etat_fin_vote:{
      type:Boolean,
      default: false
    },
    user_createur: {
      type: Schema.Types.ObjectId,
      ref: "Users",

      //required: true,

    },
    specialites: 
      {
        type: [Schema.Types.ObjectId],
        ref: "Specialite",

       // required: true,

      },
    pourcentage: {
        type: Number,
        required: true
    },
    status:{
        type:Number,
        default:1
    }
  },
  {
    timestamps: true,
  }
);

export default model("Evenement", EventSchema);