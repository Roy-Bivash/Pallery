import express from 'express';
const router = express.Router();
import supabaseConnection from '../database/supabaseClient.js';
import { authenticateToken } from '../lib/auth.js';

// Get the loged users infos
router.get('/', authenticateToken, async (req, res) => {
    let userInfo = null;
    let img_count = 0;
    let tags = [];
    try {
        const { data, error } = await supabaseConnection
            .from('user')
            .select('id, email, name, pseudo, bio, profile_picture')
            .eq('id', req.user.id);

        const { error:count_err, count } = await supabaseConnection
            .from('images')
            .select("*", { count: "exact", head: true })
            .eq('user_id', req.user.id);

        const { data:all_tags, error:tags_err } = await supabaseConnection
            .from('user_tags')
            .select('tag_id, tags(name)')
            .eq('user_id', req.user.id);
            
        if (error | count_err | tags_err) {
            throw error | count_err | tags_err;
        }
        
        if (data.length != 0) {
            userInfo = data[0];
            img_count = count;
            tags = all_tags.map(tag => ({
                tag_id: tag.tag_id,
                name: tag.tags.name
            }));
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({
        success: true,
        message: "User info retrieved successfully",
        user: userInfo,
        tags,
        img_count
    });
});

// Get the loged users infos for the navbar
router.get('/nav', authenticateToken, async (req, res) => {
    let userInfo = null;
    try {
        const { data, error } = await supabaseConnection
            .from('user')
            .select('email, name, profile_picture')
            .eq('id', req.user.id);

        if (error) {
            throw error;
        }
        
        if (data.length != 0) {
            userInfo = data[0];
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({
        success: true,
        message: "User info retrieved successfully",
        user: userInfo,
    });
});

// Get the loged users infos for the navbar
router.post('/update', authenticateToken, async (req, res) => {
    const { user, tags } = req.body;
    if (!user || !tags) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    try {
        const { error } = await supabaseConnection
            .from('user')
            .update({ 
                email: user.email,
                name: user.name,
                pseudo: user.pseudo,
                bio: user.bio, 
            })
            .eq('id', req.user.id)
            .select()
        if (error) {
            throw error;
        }

        if(tags.add.length > 0){
            const { error:tag_add_err } = await supabaseConnection
                .rpc('add_user_tags', {
                    user_id_var: req.user.id,
                    tag_names: tags.add.map(el => (el.name))
                })
            if (tag_add_err) {
                throw tag_add_err;
            }
        }
        if(tags.remove.length > 0){
            const { error:tag_remove_err } = await supabaseConnection
                .rpc('remove_user_tags_by_ids', {
                    user_id_var: req.user.id,
                    tag_ids: tags.remove.map(el => (el.tag_id))
                })
            if (tag_remove_err) {
                throw tag_remove_err;
            }
        }
        
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({
        success: true,
        message: "User info retrieved successfully",
    });
});

export default router;