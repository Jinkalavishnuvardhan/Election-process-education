const User = require('./models/user');
const Party = require('./models/party');
const Candidate = require('./models/candidate');
const bcrypt = require('bcrypt');

async function seedTelangana() {
    try {
        console.log('Starting Telangana Seed...');

        // 1. Seed Parties
        const brs = await Party.findOrCreate({
            where: { partyId: 'P001' },
            defaults: {
                name: 'Bharat Rashtra Samithi (BRS)',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/TRS_Flag.jpg'
            }
        });

        const congress = await Party.findOrCreate({
            where: { partyId: 'P002' },
            defaults: {
                name: 'Indian National Congress (INC)',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/1200px-Indian_National_Congress_hand_logo.svg.png'
            }
        });

        const bjp = await Party.findOrCreate({
            where: { partyId: 'P003' },
            defaults: {
                name: 'Bharatiya Janata Party (BJP)',
                logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/1200px-Bharatiya_Janata_Party_logo.svg.png'
            }
        });

        console.log('Parties seeded.');

        // 2. Seed a normal Voter
        const hashedUserPassword = await bcrypt.hash('Voter123!', 10);
        const [voter] = await User.findOrCreate({
            where: { email: 'voter1@telangana.in' },
            defaults: {
                firstName: 'Ramesh',
                lastName: 'Rao',
                nic: '1985001234V',
                gender: 'Male',
                passwordHash: hashedUserPassword,
                phone: '9876543210',
                addressline1: '12-3/A, Ameerpet',
                city: 'Hyderabad',
                district: 'Hyderabad',
                province: 'Telangana',
                profilePhoto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                nicFront: 'https://example.com/nic-front.jpg',
                nicBack: 'https://example.com/nic-back.jpg',
                realtimePhoto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                isVerified: true,
                isCandidate: false
            }
        });

        // 3. Seed a Candidate User
        const [candidateUser] = await User.findOrCreate({
            where: { email: 'candidate1@telangana.in' },
            defaults: {
                firstName: 'K.C.',
                lastName: 'Rao',
                nic: '1954001234C',
                gender: 'Male',
                passwordHash: hashedUserPassword,
                phone: '9988776655',
                addressline1: 'Chief Minister Camp Office',
                city: 'Hyderabad',
                district: 'Hyderabad',
                province: 'Telangana',
                profilePhoto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                nicFront: 'https://example.com/nic-front.jpg',
                nicBack: 'https://example.com/nic-back.jpg',
                realtimePhoto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                isVerified: true,
                isCandidate: true
            }
        });

        console.log('Users seeded.');

        // 4. Seed the Candidate details linked to the Candidate User
        if (candidateUser.isNewRecord === false || candidateUser) {
            await Candidate.findOrCreate({
                where: { userId: candidateUser.id },
                defaults: {
                    partyId: brs[0].id,
                    skills: ['Leadership', 'Public Speaking', 'Administration'],
                    objectives: ['Bangaru Telangana', 'Farmers Welfare'],
                    bio: 'Experienced political leader aiming to develop the state.',
                    isVerified: true
                }
            });
            console.log('Candidate details seeded.');
        }

        console.log('Telangana Data Seeding Complete!');
    } catch (err) {
        console.error('Error in seedTelangana:', err);
    }
}

module.exports = seedTelangana;
