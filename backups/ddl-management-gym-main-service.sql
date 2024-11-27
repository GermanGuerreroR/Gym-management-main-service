CREATE DATABASE gym_management_main_service;

USE gym_management_main_service;

--- Coaches
CREATE TABLE coaches (
    id_coach INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('Female', 'Male', 'Other') NOT NULL,
    date_birth DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE coaches_professional_details (
    id_coach_professional_detail INT AUTO_INCREMENT PRIMARY KEY,
    experience INT NOT NULL CHECK (experience >= 0),
    education_level ENUM(
        'Intern',
        'Technical',
        'University',
        'Postgraduate'
    ) NOT NULL,
    id_coach_fk INT NOT NULL,
    FOREIGN KEY (id_coach_fk) REFERENCES coaches (id_coach) ON DELETE CASCADE
);

CREATE TABLE certifications (
    id_certification INT AUTO_INCREMENT PRIMARY KEY,
    certification_name VARCHAR(255) NOT NULL,
    certification_date DATE NOT NULL,
    certifying_entity VARCHAR(255) NOT NULL,
    id_coach_fk INT NOT NULL,
    FOREIGN KEY (id_coach_fk) REFERENCES coaches (id_coach) ON DELETE CASCADE
);

CREATE TABLE specialities (
    id_specialty INT AUTO_INCREMENT PRIMARY KEY,
    specialty_name VARCHAR(50) NOT NULL,
    id_coach_fk INT NOT NULL,
    FOREIGN KEY (id_coach_fk) REFERENCES coaches (id_coach) ON DELETE CASCADE
);

--- Apprentices
CREATE TABLE apprentices (
    id_apprentice INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender ENUM('Female', 'Male', 'Other') NOT NULL,
    date_birth DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE apprentices_additional_info (
    id_apprentice_additional_info INT PRIMARY KEY AUTO_INCREMENT,
    training_goal ENUM(
        'Lose weight',
        'Gain muscle mass',
        'Gain endurance',
        'Gain flexibility',
        'Other'
    ) NOT NULL,
    fitness_level ENUM(
        'Beginner',
        'Intermediate',
        'Advanced'
    ) NOT NULL,
    weight DECIMAL(6, 3) NOT NULL CHECK (
        weight >= 0.500
        AND weight <= 300.000
    ), -- Peso entre 0.5 kg y 300.0 kg
    height DECIMAL(5, 2) NOT NULL CHECK (
        height >= 0.50
        AND height <= 2.50
    ), -- Altura entre 0.50 m y 2.50 m
    id_coach_fk INT NOT NULL,
    id_apprentice_fk INT NOT NULL, -- Esta es la clave foránea para referenciar la tabla `apprentices`
    FOREIGN KEY (id_apprentice_fk) REFERENCES apprentices (id_apprentice) ON DELETE CASCADE,
    FOREIGN KEY (id_coach_fk) REFERENCES coaches (id_coach) ON DELETE SET NULL
);

CREATE TABLE custom_training_goals (
    id_custrom_training_goal INT PRIMARY KEY AUTO_INCREMENT,
    custom_goal_description VARCHAR(255) NOT NULL,
    id_apprentice_fk INT,
    FOREIGN KEY (id_apprentice_fk) REFERENCES apprentices (id_apprentice) ON DELETE CASCADE
);

CREATE TABLE training_activities (
    id_training_activity INT AUTO_INCREMENT PRIMARY KEY,
    id_apprentice_fk INT NOT NULL,
    id_coach_fk INT,
    id_category_fk INT NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    activity_date DATE NOT NULL,
    FOREIGN KEY (id_apprentice_fk) REFERENCES apprentices (id_apprentice) ON DELETE CASCADE,
    FOREIGN KEY (id_coach_fk) REFERENCES coaches (id_coach) ON DELETE SET NULL,
    FOREIGN KEY (id_category_fk) REFERENCES activity_categories (id_category) ON DELETE RESTRICT
);

CREATE TABLE activity_categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);