--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: add_user_tag(bigint, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_user_tag(user_id bigint, tag_name text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  tag_id bigint;
BEGIN
  -- Try to insert the tag or get the existing tag ID
  INSERT INTO public.tags (name)
  VALUES (tag_name)
  ON CONFLICT (name) DO NOTHING;

  -- Retrieve the tag ID (new or existing)
  SELECT id INTO tag_id
  FROM public.tags
  WHERE name = tag_name;

  -- Associate the tag with the user
  INSERT INTO public.user_tags (user_id, tag_id)
  VALUES (user_id, tag_id)
  ON CONFLICT (user_id, tag_id) DO NOTHING; -- Prevent duplicate entries in the user_tags table
END;
$$;


ALTER FUNCTION public.add_user_tag(user_id bigint, tag_name text) OWNER TO postgres;

--
-- Name: add_user_tags(bigint, text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_user_tags(user_id_var bigint, tag_names text[]) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  tag_id_dec bigint;
  tag_name_dec text;
BEGIN
  FOREACH tag_name_dec IN ARRAY tag_names LOOP
    -- Try to insert the tag or get the existing tag ID
    INSERT INTO public.tags (name)
    VALUES (tag_name_dec)
    ON CONFLICT (name) DO NOTHING;

    -- Retrieve the tag ID (new or existing)
    SELECT id INTO tag_id_dec
    FROM public.tags
    WHERE name = tag_name_dec;

    -- Associate the tag with the user
    INSERT INTO public.user_tags (user_id, tag_id)
    VALUES (user_id_var, tag_id_dec)
    ON CONFLICT (user_id, tag_id) DO NOTHING; -- Prevent duplicate entries in the user_tags table
  END LOOP;
END;
$$;


ALTER FUNCTION public.add_user_tags(user_id_var bigint, tag_names text[]) OWNER TO postgres;

--
-- Name: delete_image_and_return_url(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_image_and_return_url(image_id_del bigint) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    deleted_image_url text;
BEGIN
    -- Get the URL of the image to be deleted
    SELECT url INTO deleted_image_url FROM images WHERE id = image_id_del;

    -- Delete associations from the favorite table
    DELETE FROM favorite WHERE image_id = image_id_del;

    -- Delete the image from the images table
    DELETE FROM images WHERE id = image_id_del;

    -- Return the URL of the deleted image
    RETURN deleted_image_url;
END;
$$;


ALTER FUNCTION public.delete_image_and_return_url(image_id_del bigint) OWNER TO postgres;

--
-- Name: get_user_images_with_favorites(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_user_images_with_favorites(user_id_var bigint) RETURNS TABLE(id bigint, url text, title text, is_favorite boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id, 
        i.url, 
        i.title, 
        CASE 
            WHEN f.user_id IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS is_favorite
    FROM 
        images i
    LEFT JOIN 
        favorite f ON i.id = f.image_id AND f.user_id = user_id_var
    WHERE 
        i.user_id = user_id_var;
END;
$$;


ALTER FUNCTION public.get_user_images_with_favorites(user_id_var bigint) OWNER TO postgres;

--
-- Name: remove_user_tags_by_ids(bigint, bigint[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  tag_id_dec bigint;
BEGIN
  FOREACH tag_id_dec IN ARRAY tag_ids LOOP
    -- Remove the association between the user and the tag
    DELETE FROM public.user_tags
    WHERE user_id = user_id_var AND tag_id = tag_id_dec;
  END LOOP;
END;
$$;


ALTER FUNCTION public.remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]) OWNER TO postgres;

--
-- Name: update_user_profile_picture(bigint, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_user_profile_picture(user_id bigint, new_picture text) RETURNS TABLE(old_profile_picture text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH old_value AS (
        SELECT profile_picture FROM "user" WHERE id = user_id
    )
    UPDATE "user"
    SET profile_picture = new_picture
    WHERE id = user_id
    RETURNING (SELECT profile_picture FROM old_value);
END;
$$;


ALTER FUNCTION public.update_user_profile_picture(user_id bigint, new_picture text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite (
    user_id bigint NOT NULL,
    image_id bigint NOT NULL
);


ALTER TABLE public.favorite OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    url text,
    title text,
    user_id bigint
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.images ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id bigint NOT NULL,
    name text
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tags ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    email text,
    password text,
    name text,
    pseudo text,
    bio text,
    profile_picture text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tags (
    user_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE public.user_tags OWNER TO postgres;

--
-- Name: TABLE user_tags; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.user_tags IS 'Table to associate users with tags (many-to-many relationship)';


--
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (user_id, image_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: images images_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_url_key UNIQUE (url);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_tags user_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_pkey PRIMARY KEY (user_id, tag_id);


--
-- Name: favorite favorite_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id);


--
-- Name: favorite favorite_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: images images_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_tags user_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: user_tags user_tags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tags
    ADD CONSTRAINT user_tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: favorite; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.favorite ENABLE ROW LEVEL SECURITY;

--
-- Name: images; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

--
-- Name: tags; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

--
-- Name: user; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;

--
-- Name: user_tags; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION add_user_tag(user_id bigint, tag_name text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.add_user_tag(user_id bigint, tag_name text) TO anon;
GRANT ALL ON FUNCTION public.add_user_tag(user_id bigint, tag_name text) TO authenticated;
GRANT ALL ON FUNCTION public.add_user_tag(user_id bigint, tag_name text) TO service_role;


--
-- Name: FUNCTION add_user_tags(user_id_var bigint, tag_names text[]); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.add_user_tags(user_id_var bigint, tag_names text[]) TO anon;
GRANT ALL ON FUNCTION public.add_user_tags(user_id_var bigint, tag_names text[]) TO authenticated;
GRANT ALL ON FUNCTION public.add_user_tags(user_id_var bigint, tag_names text[]) TO service_role;


--
-- Name: FUNCTION delete_image_and_return_url(image_id_del bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.delete_image_and_return_url(image_id_del bigint) TO anon;
GRANT ALL ON FUNCTION public.delete_image_and_return_url(image_id_del bigint) TO authenticated;
GRANT ALL ON FUNCTION public.delete_image_and_return_url(image_id_del bigint) TO service_role;


--
-- Name: FUNCTION get_user_images_with_favorites(user_id_var bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_user_images_with_favorites(user_id_var bigint) TO anon;
GRANT ALL ON FUNCTION public.get_user_images_with_favorites(user_id_var bigint) TO authenticated;
GRANT ALL ON FUNCTION public.get_user_images_with_favorites(user_id_var bigint) TO service_role;


--
-- Name: FUNCTION remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]) TO anon;
GRANT ALL ON FUNCTION public.remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]) TO authenticated;
GRANT ALL ON FUNCTION public.remove_user_tags_by_ids(user_id_var bigint, tag_ids bigint[]) TO service_role;


--
-- Name: FUNCTION update_user_profile_picture(user_id bigint, new_picture text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_user_profile_picture(user_id bigint, new_picture text) TO anon;
GRANT ALL ON FUNCTION public.update_user_profile_picture(user_id bigint, new_picture text) TO authenticated;
GRANT ALL ON FUNCTION public.update_user_profile_picture(user_id bigint, new_picture text) TO service_role;


--
-- Name: TABLE favorite; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.favorite TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.favorite TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.favorite TO service_role;


--
-- Name: TABLE images; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.images TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.images TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.images TO service_role;


--
-- Name: SEQUENCE images_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.images_id_seq TO anon;
GRANT ALL ON SEQUENCE public.images_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.images_id_seq TO service_role;


--
-- Name: TABLE tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.tags TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.tags TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.tags TO service_role;


--
-- Name: SEQUENCE tags_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.tags_id_seq TO anon;
GRANT ALL ON SEQUENCE public.tags_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.tags_id_seq TO service_role;


--
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."user" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."user" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."user" TO service_role;


--
-- Name: SEQUENCE user_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.user_id_seq TO anon;
GRANT ALL ON SEQUENCE public.user_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.user_id_seq TO service_role;


--
-- Name: TABLE user_tags; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_tags TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_tags TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.user_tags TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--

