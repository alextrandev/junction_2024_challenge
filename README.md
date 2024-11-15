# Junction_2024_Challenge: ThriveConnect
This is a challenge project for Junction Hackathon 2024 - Going Offline. The topic is ThriveConnect: Redefine Work Well-being.

_Our solution anonymously matches companies and job seekers by aligning values, work styles, and benefits, and includes a secure rating system. Companies can gather regular, anonymous feedback, ensuring up-to-date, fair insights on workplace conditions without compromising employee privacy._

## Demo
Checkout this Youtube video to see how it works:<br/>
[![Youtube](src/assets/screenshots/Youtube-preview.png)](https://www.youtube.com/watch?v=BXPmU39od5M)
[youtube.com/watch?v=BXPmU39od5M](https://www.youtube.com/watch?v=BXPmU39od5M)

### Here is the live demo: [https://junction2024.alextran.dev/](https://junction2024.alextran.dev/)

## The challenge
Your mission is to create an app where employees can discover job opportunities that align with their personal values, work styles, and mental well-being needs. Both employees and companies will create anonymous profiles, which are matched based on shared priorities like mental health support, flexible working conditions, and workplace culture.

This app will also analyze data on company performance, covering diversity efforts, community engagement, and mental health initiatives, ensuring employees find workplaces that genuinely support their well-being. A key challenge is ensuring transparency and trust—how can we ensure that reviews left on companies are fair and authentic, not biased by HR departments or disgruntled former employees?

The goal behind this app is clear: we want to help companies understand that they can change their structures and culture to become mentally sustainable workplaces. Creating an app that reveals the true atmosphere within a company can apply positive pressure for change, driving businesses to take mental health seriously. We want to lead the conversation on how companies must take responsibility for their employees’ mental health and well-being.

You can leverage various sources to understand which skills and cultural aspects are appreciated in modern workplaces. Let’s connect the dots between company culture and employee competencies.

## Problem and Real-World Impact
Our solution focuses on helping employees discover job opportunities that align with their personal values, work styles, and mental well-being needs. By anonymously matching job seekers with companies based on these factors, it eliminates biases related to gender, age, or background. Both parties are evaluated on compatibility, promoting fairness and diversity in hiring. Job seekers can find roles that support their values and well-being, while companies can identify candidates who fit their culture. Additionally, the platform fosters honest feedback through an **anonymous review verification system**, gathering genuine reviews that contribute to improving company cultures and employee satisfaction.
  
## Features:
- **Anonymous Job Matching**: Job seekers and companies are anonymously matched based on preferences and skills. A match score is calculated based on work styles, location, salary, and culture. Identities are only revealed after a successful interview, ensuring privacy and reducing bias.  
- **Anonymous Company Reviews**: Employees can leave verified reviews after six months and annually thereafter. Reviews are linked to a contract’s hashcode, ensuring authenticity. Post-termination, employees can submit one final review before the hash is deactivated.  
- **Hashcode Verification**: A unique hashcode (e.g., `kfeE3kjEKpafa45jl52`) is created when a contract is signed, containing company ID, employee ID, and start date. Reviews are verified against this hashcode before publication.  
- **Security**: Salted hashes ensure reviews are anonymous and secure, preventing decryption and preserving privacy.  
- **NLP Integration**: IBM’s NLP technology is used for tasks like resume screening, skill gap analysis, job recommendations, and chatbot-driven candidate engagement. This improves recruitment efficiency for both employers and job seekers.

## Backlogs:
Future plans include expanding the anonymous review system for more detailed company culture feedback, refining the NLP-based matching algorithm for personalized pairings, and updating the review process for more frequent feedback. AI tools will automate recruitment, enhancing efficiency, user experience, and transparency.

## Technologies used
The solution uses **Google paltform’s Natural Language Processing (NLP)** for job matching, leveraging sentiment analysis, skill gap analysis, and job recommendations to streamline the process. This enables unbiased matching based on shared preferences and skills. 

Languages:
- JavaScript

Libraries and frameworks:
- React
- json-server
- Material UI
- Redux

Data model: [here](DATAMODEL.md)

## Setup and usage

**Live page [here](https://junction2024.alextran.dev/)**

**To host project locally**
- Clone the project: ```git clone https://github.com/alextrandev/junction_2024_challenge.git```
- Change working directory ```cd junction_2024_challenge```
- Install dependencies ```npm install```
- Serve json-server in local host ```npm run start-json``` _Make sure port 3001 is not in use_
- Serve project in local host ```npm run dev```

## Screenshot
**Homepage**
![HomePage](src/assets/screenshots/HomePage.png)

**Job Seeker profile**
Here Job Seeker can fill out their preferred working condition, their values and share why they qualified for the best job positions
![Job Seeker profile](src/assets/screenshots/jobseekerDashboard.png)

**Employee review**
Current employees can review their company work environment / culture to benefits their future job search and help out fellow job seekers
![Employee review](src/assets/screenshots/EmployeeReview.png)
QR Hash system is implemented to ensure the transparency and honesty of reviews
![Employee review](src/assets/screenshots/QRHashSystem.png)

**Job match**
Job opotunities are offered based on profile matching which takes into account values, work ethics, work cultures, flexibity
![Job match](src/assets/screenshots/JobMatch.png)
The Job search processes are entirely anonymous. Job seekers will not have to be worry about their sex, ethnicity, age, etc. Companies can keep their trategy ans secret safe.
![Job match](src/assets/screenshots/CompanyMatch.png)

**Dark mode suppported**
![Dark mode](src/assets/screenshots/DarkMode.png)

## Authors and acknowledgment

- Special thank to our mentor (Martin Holland)[https://github.com/martin-holland]
- Thanks [Junction](https://www.hackjunction.com/) 2024 crews and organizer for the wonderful event.
- Thanks Junction's partner [Aava](https://www.aava.fi/) for the wonderful challenge and all the help from Aava's booth.
