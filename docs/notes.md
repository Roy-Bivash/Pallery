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