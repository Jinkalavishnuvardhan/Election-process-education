const bcrypt = require('bcrypt');
const Admin = require('./models/admin');
const sequelize = require('./config/mysql');

async function seedAdmin() {
    try {
        await sequelize.authenticate();
        console.log('MySQL connection established');
        await sequelize.sync();
        
        const email = 'admin@admin.com';
        const password = 'Admin123!';
        
        const existingAdmin = await Admin.findOne({ where: { email } });
        if (existingAdmin) {
            console.log('Admin already exists.');
            process.exit(0);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await Admin.create({
            adminId: 'A001',
            name: 'Super Admin',
            email: email,
            password: hashedPassword,
            phone: '1234567890'
        });
        
        console.log('Admin created successfully! Email: admin@admin.com | Password: Admin123!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
