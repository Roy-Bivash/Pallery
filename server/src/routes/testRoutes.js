import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js'; 

router.get('/', async (req, res) => {
    let testData = [];
    try {
        const { data, error } = await supabaseConnection.from('user').select('*');
        if (error) {
          throw error;
        }
        testData = data;
    } catch (err) {
        console.error('Error fetching data from Supabase:', err.message);
        res.status(500).json({ error: 'Failed to fetch data from Supabase' });
    }
    

    res.json({ 
        message: 'this is the test route',
        data:testData
    });
});

export default router;