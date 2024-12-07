INSERT INTO userinfo (lastname, firstname, email, roles, password) VALUES
    ('DOE', 'John', 'john.doe@gmail.com', '1', 'secure123'),
    ('DUPONT', 'Marie', 'marie.dupont@gmail.com', '0', 'passMarie!'),
    ('KIM', 'Soo', 'soo.kim@gmail.com', '0', 'kim2024'),
    ('LEWIS', 'Paul', 'paul.lewis@gmail.com', '1', 'paulLewis@88'),
    ('GARCIA', 'Laura', 'laura.garcia@gmail.com', '0', 'lauraSecure#1');

INSERT INTO category (name) VALUES
    ('camera'),
    ('laptop'),
    ('smartphone'),
    ('headphones'),
    ('printer'),
    ('camera 6'),;

INSERT INTO product (user_id, category_id, name, description, illustration, price, tva) VALUES
    (1, 1, 'camera', 'Caméra infrarouge', 'https://cdn.pixabay.com/photo/2018/05/28/20/31/camera-3437077_640.jpg', 400, 20),
    (2, 2, 'laptop', 'Ordinateur portable puissant', 'https://cdn.pixabay.com/photo/2016/11/19/14/00/laptop-1838307_640.jpg', 1200, 20),
    (3, 3, 'smartphone', 'Smartphone dernier cri', 'https://cdn.pixabay.com/photo/2014/05/02/21/50/phone-336112_640.jpg', 800, 20),
    (4, 4, 'headphones', 'Casque audio de qualité', 'https://cdn.pixabay.com/photo/2017/01/22/19/12/headphones-2000597_640.jpg', 150, 20),
    (5, 5, 'printer', 'Imprimante multifonction', 'https://cdn.pixabay.com/photo/2014/07/01/12/35/printer-381472_640.jpg', 200, 20);
    (6, 6, 'camera 6', 'Caméra professionnelle Lorem ipsum', 'https://cdn.pixabay.com/photo/2016/03/10/16/13/camera-1248682_640.jpg', 600, 20);


INSERT INTO address (user_id, phone, codepostal, city) VALUES
    (1, '0143058690', '91139', 'Grigny'),
    (2, '0678543210', '75001', 'Paris'),
    (3, '0498345678', '13008', 'Marseille'),
    (4, '0321456789', '59000', 'Lille'),
    (5, '0556123456', '33000', 'Bordeaux');
