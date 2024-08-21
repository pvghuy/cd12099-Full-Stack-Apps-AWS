import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  app.get("/filterimage", async (req, res) => {
    try {
      const img_url = req.query.image_url.toString();
      
      //    1. validate the image_url query
      if (!img_url) {
        return res.status(404).send("Image URL not found!");
      }

      //    2. call filterImageFromURL(image_url) to filter the image
      const filteredImage = await filterImageFromURL(img_url);

      //    3. send the resulting file in the response
      res.status(200).sendFile(filteredImage);
      
      //    4. deletes any files on the server on finish of the response
      res.on('finish', () => {
        deleteLocalFiles[filteredImage];
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Unexpected errors on server!")      
    }
  })
    
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
