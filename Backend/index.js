const express = require('express');
const app = express();
require('dotenv/config');
const cors = require('cors');
// require('./schedulars/photoUpdateScheduler')

app.use(cors());

//middlewares
app.use(express.json());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


//Routers
const usersRoutes = require('./routers/users');
const candidateRoutes = require('./routers/candidates');
const projectRoutes = require('./routers/projects');
const commentRoutes = require('./routers/comments');
const electionRoutes = require('./routers/Elections');
const complaintsRoutes = require('./routers/complaints');
const partiesRoutes = require('./routers/parties');
const resultsRoutes = require('./routers/results');
const peoplesRoutes = require('./routers/peoples');
const adminsRoutes = require('./routers/admins');
const presidentialElectionsRoutes = require('./routers/presidentialElections');
const parlimentaryElectionsRoutes = require('./routers/parlimentaryElections');
const provinvialElectionsRoutes = require('./routers/provincialElections');
const passwordRecoveryRoutes = require('./routers/passwordrecoveryroute');
const verificationsRoutes = require('./routers/verifications');
const candidateDescriptionRoutes = require('./routers/candidateDescriptionRoutes');
const reportFakesRoutes = require('./routers/reportFakes');
const uploadRoute = require('./routers/uploadRoute');


const api = process.env.API_URL

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/candidates`, candidateRoutes);
app.use(`${api}/projects`, projectRoutes);
app.use(`${api}/comments`, commentRoutes);
app.use(`${api}/elections`, electionRoutes);
app.use(`${api}/complaints`, complaintsRoutes);
app.use(`${api}/parties`, partiesRoutes);
app.use(`${api}/results`, resultsRoutes);
app.use(`${api}/peoples`, peoplesRoutes);
app.use(`${api}/admins`, adminsRoutes);
app.use(`${api}/presidentialElections`, presidentialElectionsRoutes);
app.use(`${api}/parlimentaryElections`, parlimentaryElectionsRoutes);
app.use(`${api}/provincialElections`, provinvialElectionsRoutes);
app.use(`${api}/passwords`, passwordRecoveryRoutes);
app.use(`${api}/passwords`, passwordRecoveryRoutes);
app.use(`${api}/verifications`, verificationsRoutes);
app.use(`${api}/description`, candidateDescriptionRoutes);
app.use(`${api}/reportFakes`, reportFakesRoutes);
app.use(`${api}/upload`, uploadRoute);

// Add this after your existing routes in app.js
if (process.env.NODE_ENV === 'development') {
  const faceRecognitionTestRoutes = require('./routers/faceRecognitionTest');
  app.use(`${api}/test/face-recognition`, faceRecognitionTestRoutes);
  console.log('Face recognition test routes enabled');
}

// Check for required environment variables


// Database Connection

// MySQL connection using Sequelize
const sequelize = require('./config/mysql');


const Admin = require('./models/admin');
const bcrypt = require('bcrypt');

// Sync models (creates tables if they don't exist and updates them)
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Sequelize models synchronized');
    try {
        const email = 'admin@admin.com';
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('Admin123!', 10);
            await Admin.create({
                adminId: 'A001',
                name: 'Super Admin',
                email: email,
                password: hashedPassword,
                phone: '1234567890'
            });
            console.log('Default Admin Account Created Automatically!');
        } else {
            console.log('Default Admin Account already exists.');
        }

        // Run the Telangana seed script
        const seedTelangana = require('./seedTelangana');
        await seedTelangana();
    } catch (err) {
        console.error('Error seeding admin automatically:', err);
    }
  })
  .catch(err => console.error('Sequelize sync error:', err));



// Set up the server
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("<h1>Website is working 🚀</h1>");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
