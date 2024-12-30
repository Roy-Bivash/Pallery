import { createClient } from '@supabase/supabase-js';
import { supabase_config } from "../config/supabase_config.js";

if (!supabase_config.SUPABASE_URL || !supabase_config.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

const supabaseConnection = createClient(
    supabase_config.SUPABASE_URL, 
    supabase_config.SUPABASE_SERVICE_ROLE_KEY
);

export default supabaseConnection;