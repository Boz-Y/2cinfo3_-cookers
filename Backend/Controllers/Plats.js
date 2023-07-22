import Plats from '../Models/Plats.js';
import Recettes from '../models/Recettes.js';
import Specialites from '../models/Specialite.js';
import Ingredients from '../models/Ingredients.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';






export function addOncePlat(req, res) {

  Plats.create({
    name: req.body.name,
    timeOfCook: req.body.timeOfCook,
    description: req.body.description,
    withIngredients: req.body.withIngredients.split(','),
    specialite:req.body.specialite,
    recette: req.body.recette,
    images: `${req.file.filename}`
  })
    .then((newPlat) => {
      res.status(200).json({
        name: newPlat.name,
        timeOfCook: newPlat.timeOfCook,
        description: newPlat.description,
        withIngredients: newPlat.withIngredients,
        specialite: newPlat.specialite,
        recette: newPlat.recette,
      });
      console.log('withIngredients:', req.body.withIngredients);
      console.log(newPlat)
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
    // console.log(plat)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du plat' });
  }
}

// Fonction pour générer le PDF avec les caractéristiques du plat
async function generatePDF(plat) {
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

  // Événement lors de l'ajout d'une nouvelle page
  doc.on('pageAdded', () => {
    // Appliquer le même design de la première page à chaque nouvelle page
    doc.image(backgroundImagePath, 0, 0, { width: doc.page.width, height: doc.page.height });
  });


  // Écriture des caractéristiques du plat dans le document PDF
  const imagePath = './assets/logo-01.jpg';

  // doc.image(imagePath, { fit: [230, 230] });
  doc.image(imagePath, 20, 20, { width: 100 });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.fill('red');
  doc.fontSize(16).text('Nom : ' ,{ align: 'center' });
  doc.fill('black');
  doc.fontSize(16).text( plat.name, {  align: 'center', underline: true });

  if (plat.images) {
    // Charger et afficher l'image
    const imagePlatPath = `./public/images/${plat.images}`;
    const imageWidth = 300; // Largeur de l'image en pixels
    const xPosition = (doc.page.width - imageWidth) / 2;
    doc.image(imagePlatPath, xPosition, undefined, { width: imageWidth });  }
  doc.moveDown();
  doc.fill('red');
  doc.fontSize(15).text('timeOfCook : ',{ align: 'center' });
  doc.fill('black');
  doc.fontSize(15).text( plat.timeOfCook, { align: 'center' });
  // doc.fill('red');
  // doc.fontSize(15).text('Ingredients : ',{ align: 'center' } );
  // doc.fill('black');
  // doc.fontSize(15).text( plat.withIngredients, { align: 'center' });
  // doc.moveDown();
  if (plat.withIngredients && plat.withIngredients.length > 0) {
    doc.moveDown(); // Espacement entre les lignes
    doc.fill('red').fontSize(15).text('Ingrédients :', { align: 'center' });

    for (const ingredientId of plat.withIngredients) {
      try {
        const ingredient = await Ingredients.findById(ingredientId);
        if (ingredient) {
          doc.fill('black').fontSize(15).text('- ' + ingredient.name + ' ' + ingredient.description , { align: 'center' });
          const imagePath = `./public/images/${ingredient.ingImg}`;
          const imageWidth = 100; // Largeur de l'image en pixels
          const xPosition = (doc.page.width - imageWidth) / 2;
          doc.image(imagePath, xPosition, undefined, { width: imageWidth });
          doc.moveDown(); 

        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ingrédient', error);
      }
    }
  }
  // doc.fill('red');
  // doc.fontSize(15).text('specialite : ',{ align: 'center' } );
  // doc.fill('black');
  // doc.fontSize(15).text( plat.specialite, { align: 'center' });
  // doc.moveDown();
  if (plat.specialite) {
    doc.fill('red').fontSize(15).text('Spécialité :', { align: 'center' });

    try {
      const specialite = await Specialites.findById(plat.specialite);
      if (specialite) {
        doc.fill('black').fontSize(15).text('- ' + specialite.name, { align: 'center' });
        const imagePath = `./public/images/${specialite.specImg}`;
        const imageWidth = 30; // Largeur de l'image en pixels
        const xPosition = (doc.page.width - imageWidth) / 2;
        doc.image(imagePath, xPosition, undefined, { width: imageWidth });      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la spécialité', error);
    }
  }
  // doc.fill('red');
  // doc.fontSize(15).text('recette : ' ,{ align: 'center' });
  // doc.fill('black');
  // doc.fontSize(15).text( plat.recette, { align: 'center' });
  if (plat.recette && plat.recette.length > 0) {
    doc.moveDown(); // Espacement entre les lignes
    doc.fill('red').fontSize(15).text('Recette :',{ align: 'center' });

    for (const recetteId of plat.recette) {
      try {
        const recette = await Recettes.findById(recetteId);
        if (recette) {
          doc.fill('black').fontSize(15).text('- ' + recette.order + ' : ' + recette.description,{ align: 'center' });

        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la recette', error);
      }
    }
  }




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
        recette: req.body.recette,
        // images: `${req.file.filename}`

      }
    }
    else {
      newPlat = {
        name: req.body.name,
        timeOfCook: req.body.timeOfCook,
        description: req.body.description,
        withIngredients: req.body.withIngredients,
        specialite: req.body.specialite,
        recette: req.body.recette,

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

            //   try {
            //     generatePDF(doc2);

                  
            // } catch (error) {
            //   console.error("Error generating QR code or PDF:", error);
            // }

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


