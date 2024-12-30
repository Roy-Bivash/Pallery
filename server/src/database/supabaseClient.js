const { createClient } = require('@supabase/supabase-js');
import { supabase_config } from "../config/supabase_config";

if (!supabase_config.SUPABASE_URL || !supabase_config.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

module.exports = supabase;