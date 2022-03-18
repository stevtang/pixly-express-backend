CREATE TABLE images (id SERIAL PRIMARY KEY,
                                       filename TEXT, s3_image_path TEXT, make TEXT, model TEXT, focal_length TEXT, iso TEXT, date_time TIMESTAMP,
                                                                                                                                        width INTEGER, height INTEGER);
