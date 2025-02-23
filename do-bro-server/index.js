const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: ["http://localhost:5173"], // Added '//' after 'http:'
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access" });
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoaded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: "unauthorized access" });
      }
      console.log(decoaded);
      req.user = decoaded;
      next();
    });
  }
};

// DB uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yshmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// DB codes
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // collections from db
    const jobsCollection = client.db("doBro").collection("jobs");
    const bidsCollection = client.db("doBro").collection("bids");

    // JWT Generate 1. install jsonwebtoken + cookie-parser
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Clear token on Logout
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    // Get All jobs data from db
    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });

    // Get a single job data from db using job id
    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    // Save a bid data in DB
    app.post("/bid", async (req, res) => {
      const bidData = req.body;

      // check if its a duplicate request
      const query = {
        email: bidData.email,
        jobId: bidData.jobId,
      };
      const alreadyApplied = await bidsCollection.findOne(query);
      if (alreadyApplied) {
        return res
          .status(400)
          .send("You have already placed a bid on this job");
      }

      const result = await bidsCollection.insertOne(bidData);
      res.send(result);
    });

    // Save a job data in DB
    app.post("/job", async (req, res) => {
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });

    // Get all jobs posted by a specific user
    app.get("/jobs/:email", verifyToken, async (req, res) => {
      const tokenEmail = req.user.email;
      const email = req.params.email;
      if (tokenEmail !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const query = { "buyer.email": email };
      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    // Delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });

    // Update a job
    app.put("/job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const result = await jobsCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // Get all bids for a user by email from db
    app.get("/my-bids/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };

      try {
        const result = await bidsCollection.find(query).toArray();
        res.send(result.length ? result : []); // Send empty array if no bids found
      } catch (error) {
        console.error("Error fetching bids for user:", error);
        res.status(500).send({ error: "Failed to fetch bids" });
      }
    });

    // Get all bid requests from db job owner
    app.get("/bid-requests/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "buyer.email": email };
      const result = await bidsCollection.find(query).toArray();
      res.send(result);
    });

    // Update bid status
    app.patch("/bid/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: status,
      };
      const result = await bidsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Get All jobs data from db for pagination
    app.get("/all-jobs", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const filter = req.query.filter;
      const sort = req.query.sort;
      const search = req.query.search;

      let query = {
        job_title : {$regex: search, $options: 'i'},
      };
      if (filter) query.category = filter
      let options = {};
      if (sort) options = { sort: { deadline: sort === "asc" ? 1 : -1 } };
      const result = await jobsCollection
        .find(query,options )
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    // Get All jobs data count from db
    app.get("/jobs-count", async (req, res) => {
      const filter = req.query.filter;
      const search = req.query.search
      let query = {
        job_title : {$regex: search, $options: 'i'},
      };
      if (filter) query.category = filter
      const count = await jobsCollection.countDocuments(query);
      res.send({ count });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from DoBro Server");
});

app.listen(port, () => console.log(`App running on port ${port}`));
12;
