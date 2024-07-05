// const { MongoClient, ServerApiVersion } = require("mongodb");

// // Replace the placeholder with your Atlas connection string
// const uri = "mongodb+srv://alonsoherrera:CLMUJo9kqtP5wybG@digitalskillapp.uwl1zgz.mongodb.net/?retryWrites=true&w=majority&appName=DigitalSkillApp";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");


//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://alonsoherrera:CLMUJo9kqtP5wybG@digitalskillapp.uwl1zgz.mongodb.net/?retryWrites=true&w=majority&appName=DigitalSkillApp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
  }
);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define the database and collection
    const database = client.db('DigitalSkillApp');
    const collection = database.collection('Progreso');

    // Example data to insert
    const data = [
      { user: "Dani", test: "creación de contenido", Puntaje: 100 },
      { user: "Seba", test: "creación de contenido", Puntaje: 212 },
      { user: "Fran", test: "creación de contenido", Puntaje: 10321321 }
    ];

    // Insert data into the collection
    const result = await collection.insertMany(data);
    console.log("${result.insertedCount} documents were inserted with the _id: ${result.insertedIds}");
//READDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    // Query data from the collection
    const query = { test: "creación de contenido" };
    const options = {
      // sort matched documents in descending order by score
      sort: { Puntaje: -1 },
      // Include only the user and Puntaje fields in each returned document
      projection: { _id: 0, user: 1, Puntaje: 1 },
    };

    const cursor = collection.find(query, options);

    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    } else {
      await cursor.forEach(doc => console.log(doc));
    }
//READDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);