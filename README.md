# GymHub 🏋‍♂  
GymHub is an application designed to manage the information of trainers, trainees, and their training activities in a gym. 
Trainees can register and modify their profiles, associate themselves with a trainer, and log details of their workouts, categorized
 into Upper Body 💪, Legs 🦵, and Cardio 🫀. Each entry includes the time spent training and the associated trainer.

---

## Project Architecture 🏗  
The application is built using microservices architecture, consisting of two main microservices:  

### 1. Main Microservice  
Responsible for managing user profiles (trainers and trainees), authentication, and reporting.  

#### Features:  
- Trainee Management:  
  - Register a new trainee.  
  - Modify trainee profiles (name, age, experience level, etc.).  
  - Associate trainees with trainers.  
  - Delete trainee profiles.  
  - Retrieve trainee information.  

- Trainer Management: 💪  
  - Register trainers with essential details (name, specialization, years of experience).  
  - Assign trainees to trainers.  

- Training Records: 📝  
  - Categorize workouts into Upper Body 💪, Legs 🦵, and Cardio 🫀 (additional categories can be added).  
  - Log workout time and assign trainers to each training session.  

- Monthly Reports:  
  - Generate monthly workout reports for trainees, including detailed activity logs categorized by week.  

### 2. Activities Microservice  📓  
Handles the storage of training activities using a non-relational database (MongoDB).  

#### Features:  
- Save training activities with the following details:  
  - Trainee ID.  
  - Trainee username.  
  - Trainer ID.  
  - Training name.  
  - Training date and duration.  
  - Training type.  
- Provide activity data to the main microservice for generating reports.  

---

## Project Structure 🗂  
plaintext
📂 GymHub  
├── 🛢 backups  
├── ⚙ config  
├── ⛲ src  
│   ├── 📂 application  
│   │   ├── 📂 domain  
│   │   │   ├── 📂 abstract-classes  
│   │   │   ├── 📂 models  
│   │   │   │   ├── 📂 enums  
│   │   │   │   ├── 📂 auth  
│   │   ├── 📂 infrastructure  
│   │       ├── 📂 dto  
│   │       ├── 📂 modules  
│   │       ├── 📂 routes  
│   │       ├── 📂 repositories  
│   │       ├── 📂 service
        


  ## Hexagonal architecture
![hexagonal architecture](C:\Users\laura\OneDrive\Imágenes\Capturas de pantalla\architecture.png)

## Technical requirements
### 1. *Technologies:*
- node.js
- TypeScript
- mongoDB
- MySql
- swagger

### 2. *Bookstores*
 
-   MySQL2 

	    
        npm install --save mysql2
        ```
	    ```
        npm install --save-dev @types/node