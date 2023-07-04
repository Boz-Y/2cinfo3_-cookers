import Plats from '../models/Plats.js';
import { pdfGenerator } from "../Controllers/utils/pdfPlat.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';



export  function addOncePlat (req, res){
            Plats.create({
            name: req.body.name,
            timeOfCook: req.body.timeOfCook,
            description: req.body.description,
            withIngredients: req.body.withIngredients,
            specialite: req.body.specialite,
            recette: req.body.recette


          })
            .then((newPlat) => {
              
              res.status(200).json({
                name: newPlat.name,
                timeOfCook: newPlat.timeOfCook,
                description: newPlat.description,  
                withIngredients: newPlat.withIngredients,
                specialite: newPlat.specialite,
                recette: newPlat.recette


              });


            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      
  


export function getAll(req, res) {
  Plats
    .find({})

    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function DeletePlat(req, res) {
  const id =req.params.id
  const plat = await Plats.findByIdAndDelete(id);
  res.status(200).json({"message":"deleted"});
}

// export function getPlatById(req, res){
//   Plats.findById(req.params.id)
//           .then((doc1) => {
//             res.status(200).json(doc1);
//           })
//           .catch((err) => {
//             res.status(500).json({ error: err });
//           });


// }


// export function getPlatById(req, res) {
//   Plats.findById(req.params.id)
//     .populate('recette')
//     .populate('specialite')
//     .populate('withIngredients')

//     .then((plat) => {
//       if (plat) {
//         // Récupérer l'objet recette associé à l'ID
//         const recette = plat.recette;
//         const Ingredients = plat.withIngredients;
//         const specialite = plat.specialite;


//         // Afficher le contenu de la recette
//         // console.log("Contenu de la recette:", recette);
//         // console.log("Contenu de la Ingredients:", Ingredients);
//         // console.log("Contenu de la specialite:", specialite);

//         try {
//           pdfGenerator(
//             plat
//           );
  
//       } catch (error) {
//         console.error("Error generating QR code or PDF:", error);
//       }

//         res.status(200).json(plat);
//             console.log(plat)
//       } else {
//         res.status(404).json({ error: 'Plat non trouvé' });
//       }
//     })

//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// }


export async function getPlatById(req, res) {
  try {
    const platId = req.params.id; // Identifiant du plat à récupérer

    // Récupération du plat depuis la collection de plats (exemple avec Mongoose)
    const plat = await Plats.findById(platId);

    if (!plat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }

    // Génération du PDF avec les caractéristiques du plat
    generatePDF(plat);

    // Réponse de l'API avec les caractéristiques du plat
    res.json(plat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du plat' });
  }
}

// Fonction pour générer le PDF avec les caractéristiques du plat
function generatePDF(plat) {
  // Création d'un nouveau document PDF
  const doc = new PDFDocument();
  const namePlat = './generated/pdf/'+ plat.name +'.pdf'
  // Stream du document vers un fichier
  const outputStream = fs.createWriteStream(namePlat);
  doc.pipe(outputStream);

  // Définition de l'arrière-plan
  const backgroundImagePath = './assets/background.jpg';


  // Ajouter l'arrière-plan à la première page
  doc.image(backgroundImagePath, 0, 0, { width: doc.page.width, height: doc.page.height });




  // Écriture des caractéristiques du plat dans le document PDF
  const imagePath = './assets/logo-01.jpg';
  doc.image(imagePath, { fit: [150, 150] });

  doc.fill('red');
  doc.fontSize(16).text('Nom : ' );
  doc.fill('black');
  doc.fontSize(16).text( plat.name, { underline: true });
  doc.fill('red');
  doc.fontSize(15).text('timeOfCook : ');
  doc.fill('black');
  doc.fontSize(15).text( plat.timeOfCook);
  doc.fill('red');
  doc.fontSize(15).text('Ingredients : ' );
  doc.fill('black');
  doc.fontSize(15).text( plat.withIngredients);
  doc.fill('red');
  doc.fontSize(15).text('specialite : ' );
  doc.fill('black');
  doc.fontSize(15).text( plat.specialite);
  doc.fill('red');
  doc.fontSize(15).text('recette : ' );
  doc.fill('black');
  doc.fontSize(15).text( plat.specialite);





  // Finalisation du document PDF
  doc.end();

  console.log('Le PDF a été généré avec succès !');
}




export function putOnce(req, res) {
  let newPlat = {};
    if(req.file == undefined) {
      newPlat = {
        name: req.body.name,
        timeOfCook: req.body.timeOfCook,
        description: req.body.description,
        withIngredients: req.body.withIngredients,
        specialite: req.body.specialite,
        recette: req.body.recette

      }
    }
    else {
      newPlat = {
        name: req.body.name,
        timeOfCook: req.body.timeOfCook,
        description: req.body.description,
        withIngredients: req.body.withIngredients,
        specialite: req.body.specialite,
        recette: req.body.recette

      }
    }
  Plats.findByIdAndUpdate(req.params.id, newPlat)
    .then((doc1) => {
      Plats.findById(req.params.id)
        .then((doc2) => {
            res.status(200).json(doc2);
            // console.log(newPlat)
              })
        .catch((err) => {
            res.status(500).json({ error: err });
              });

              try {
                pdfGenerator(
                  newPlat
                );
                  
            } catch (error) {
              console.error("Error generating QR code or PDF:", error);
            }

          })
      .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function getPlatsBySpeciality(req, res)  {
	const specialite = req.params.specialityId;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Plats.find({
		specialite,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((plats) => {
			res.json(plats);
		})
		.catch((err) => console.log(err));
};




// export function getPlatsByIngredients(req, res)  {
// 	const ingredient = req.params.ingredientId;
// 	const limit = Number(req.query.limit) || 0;
// 	const sort = req.query.sort == 'desc' ? -1 : 1;

// 	Plats.find({
// 		ingredient,
// 	})
// 		.select(['-_id'])
// 		.limit(limit)
// 		.sort({ id: sort })
// 		.then((plats) => {
// 			res.json(plats);
// 		})
// 		.catch((err) => console.log(err));
// };


