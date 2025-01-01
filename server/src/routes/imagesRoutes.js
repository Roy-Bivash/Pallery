import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';


// Return all the images of the connected user
router.get('/', authenticateToken, async (req, res) => {
    let images = [];

    try {
        const { data, error } = await supabaseConnection
            .rpc('get_user_images_with_favorites', { user_id_var: req.user.id });
        if (error) {
            throw error;
        }
        images = data.map(obj => {
            const { is_favorite, ...rest } = obj;
            return { ...rest, favorite: is_favorite };
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ 
        success: true,
        message: `All the images of ${req.user.name}`,
        images
    });
});

async function removeFavorite(user_id, img_id) {
    const { error } = await supabaseConnection
        .from('favorite')
        .delete()
        .eq('user_id', user_id)
        .eq('image_id', img_id)
    return error;
}

async function addFavorite(user_id, img_id) {
    const { error } = await supabaseConnection
        .from('favorite')
        .insert([
            { user_id, image_id: img_id },
        ])
        .select()
    return error;
}

router.put('/favorite', authenticateToken, async (req, res) => {
    const { newState, imgId } = req.body;

    if (typeof newState !== 'boolean' || typeof imgId !== 'number') {
        return res.status(400).json({
            error: 'Invalid input',
            message: 'Missing parametters',
        });
    }

    try {
        let error;

        if(newState){
            error = await addFavorite(req.user.id, imgId);
        }else{
            error = await removeFavorite(req.user.id, imgId);
        }

        if (error) throw error;
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ 
        success: true,
        message: "",
    });
});

export default router;