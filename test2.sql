/*
CREATE OR ALTER VIEW all_data AS 
	SELECT
		c.id,
		c.name user_name,
		c.age age,
		s.id subdivision_id,
		parent_id,
		s.name sub_name
	FROM collaborators c
	JOIN subdivisions s ON s.id = c.subdivision_id;
*/

WITH prod AS (
    SELECT id, 
        parent_id, 
		subdivision_id,
		user_name,
		age,
		1 
        AS level, 
        sub_name
    FROM all_data 
    WHERE id = 710253
    UNION ALL
        SELECT 
            pr.id, 
            pr.parent_id, 
			pr.subdivision_id,
			pr.user_name,
			pr.age,
            level + 1, 
            pr.sub_name
    FROM all_data pr 
    JOIN prod dev ON 
		dev.subdivision_id = pr.parent_id 
		AND pr.subdivision_id NOT IN (100055,100059)
		AND pr.age < 40
)
SELECT 
	DISTINCT id, 
	user_name name, 
	sub_name, 
	subdivision_id sub_id, 
	level sub_level,
	COUNT(*) OVER(PARTITION BY sub_name) colls_count
FROM prod
GROUP BY 
	id, 
	user_name, 
	sub_name, 
	subdivision_id, 
	level
ORDER BY level;
