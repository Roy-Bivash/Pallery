import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// TODO : Change later
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function getImageById(img_id){
    let { data: images, error } = await supabaseConnection
    .from('images')
    .select('id, url')
    .eq('id', img_id)
    
    return { image: images[0], error};
}

async function deleteImgDatabase(img_id){
    const { error } = await supabaseConnection
        .from('images')
        .delete()
        .eq('id', img_id)
    
    return error;
}

async function deleteImgServer(url) {
    const filePath = path.join(__dirname, `..${url}`);
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      return `Failed to delete file: ${error.message}`
    }
}

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: 'Invalid input',
            message: 'Missing parametters',
        });
    }

    try {

        const { image, error } =  await getImageById(id);
        if (error) {
            throw error;
        }

        let err = await removeFavorite(req.user.id, id);
        if(err){
            throw err;
        }
        
        err = await deleteImgDatabase(id);
        if(err){
            throw err;
        }

        err = await deleteImgServer(image.url);
        if(err){
            throw err;
        }

    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ 
        success: true,
        message: "",
    });
});

export default router;