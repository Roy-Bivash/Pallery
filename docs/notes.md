# Notes

### Query

- Get images with favorite
```sql
SELECT 
    i.id, 
    i.url, 
    i.title, 
    i.folder_id, 
    CASE 
        WHEN f.user_id IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS is_favorite
FROM 
    images i
LEFT JOIN 
    favorite f ON i.id = f.image_id AND f.user_id = 1
WHERE 
    i.user_id = 1;
```



```sql
CREATE OR REPLACE FUNCTION delete_image_and_return_url(image_id_del bigint)
RETURNS text
LANGUAGE plpgsql
SECURITY INVOKER
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
```