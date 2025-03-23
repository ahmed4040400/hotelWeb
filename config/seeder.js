import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';
import Reservation from '../models/Reservation.js';

// Function to seed initial data
const seedData = async () => {
  try {
    console.log('Checking if database needs seeding...');

    // Count existing records
    const userCount = await User.count();
    const hotelCount = await Hotel.count();

    // Only seed if no records exist
    if (userCount === 0 && hotelCount === 0) {
      console.log('Seeding database with initial data...');

      // Create users
      const managerPassword = await bcrypt.hash('admin123', 10);
      const guestPassword = await bcrypt.hash('guest123', 10);

      const manager = await User.create({
        name: 'Admin User',
        username: 'admin',
        email: 'admin@luxstay.com',
        password: managerPassword,
        role: 'manager'
      });

      const guest = await User.create({
        name: 'Guest User',
        username: 'guest',
        email: 'guest@example.com',
        password: guestPassword,
        role: 'guest'
      });

      // Create hotels (using the same data from the frontend)
      const hotels = await Hotel.bulkCreate([
        {
          name: 'فندق النيل الفاخر',
          image: 'https://cdn.usegalileo.ai/sdxl10/6ac2565e-ec1a-456b-af28-a3a2d62206ab.png',
          title: 'إقامة فاخرة',
          description: 'يقع في قلب القاهرة، هذا الفندق يوفر إقامة فاخرة وخدمة ممتازة.',
          rating: 4.6,
          reviews: 1200,
          location: 'القاهرة',
          distance: '0 كم',
          price: '2000 جنيه/ليلة'
        },
        {
          name: 'منتجع البحر الأحمر',
          image: 'https://cdn.usegalileo.ai/sdxl10/64612da8-988b-48e9-8db7-a29ccbb8fa2d.png',
          title: 'جنة على الشاطئ',
          description: 'الغردقة، المدينة الساحلية الجميلة، معروفة بشواطئها الرائعة.',
          rating: 4.8,
          reviews: 800,
          location: 'الغردقة',
          distance: '450 كم',
          price: '3000 جنيه/ليلة'
        },
        {
          name: 'لودج الأهرامات',
          image: 'https://cdn.usegalileo.ai/sdxl10/193ce704-7595-4571-857e-7cf120a5a550.png',
          title: 'ملاذ تاريخي',
          description: 'استمتع بإطلالة رائعة على الأهرامات في هذا الفندق الفاخر.',
          rating: 4.7,
          reviews: 600,
          location: 'الجيزة',
          distance: '15 كم',
          price: '2500 جنيه/ليلة'
        },
        {
          name: 'فندق الإسكندرية الكبير',
          image: 'https://hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg',
          title: 'جنة على الشاطئ',
          description: 'الإسكندرية، المدينة الساحلية الجميلة، معروفة بشواطئها الرائعة وتاريخها العريق.',
          rating: 4.5,
          reviews: 900,
          location: 'الإسكندرية',
          distance: '225 كم',
          price: '2100 جنيه/ليلة'
        },
        {
          name: 'فندق الأقصر الهادئ',
          image: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
          title: 'ملاذ طبيعي',
          description: 'الأقصر معروفة بمعابدها الفرعونية ومناظرها الطبيعية الخلابة.',
          rating: 4.7,
          reviews: 700,
          location: 'الأقصر',
          distance: '650 كم',
          price: '2800 جنيه/ليلة'
        }
      ]);

      // Create sample reservations
      await Reservation.bulkCreate([
        {
          userId: guest.id,
          hotelId: hotels[0].id,
          checkIn: '2023-10-01',
          checkOut: '2023-10-05',
          price: '8000 جنيه',
          status: 'confirmed'
        },
        {
          userId: guest.id,
          hotelId: hotels[1].id,
          checkIn: '2023-11-10',
          checkOut: '2023-11-15',
          price: '15000 جنيه',
          status: 'confirmed'
        }
      ]);

      console.log('Database seeded successfully!');
      console.log('Sample credentials:');
      console.log('Manager: admin@luxstay.com / admin123');
      console.log('Guest: guest@example.com / guest123');
    } else {
      console.log('Database already has data, skipping seed operation.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default seedData;