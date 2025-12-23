import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/login';

const testLogin = async (email, password) => {
    console.log(`\nTesting login for: ${email}`);
    try {
        const response = await axios.post(API_URL, { email, password });
        console.log('✅ Login Successful!');
        console.log('Role:', response.data.user.role);
    } catch (error) {
        if (error.response) {
            console.error('❌ Login Failed:', error.response.status, error.response.data);
        } else {
            console.error('❌ Network/Server Error:', error.message);
        }
    }
};

const run = async () => {
    // 1. Test Admin Login
    await testLogin('govindmalav2004@gmail.com', 'Gaurav@2308');

    // 2. Test User Login (from previous DB check: demo2@gmail.com / 1234)
    await testLogin('demo2@gmail.com', '1234');
};

run();
