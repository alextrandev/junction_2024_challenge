# Users Data model (initial version)

```mermaid
classDiagram
    direction LR
    
    class Company {
        +string id
        +string name
        +string history
        +string businessId
        +list~string~ workStyles
        +list~string~ values
        +WorkingConditions workingConditions
        +JobPosition jobPosition
    }

    class WorkingConditions {
        +list~string~ flexibility
        +list~string~ location
        +string culture
        +boolean mentalHealthSupport
    }

    class JobPosition {
        +string title
        +Salary salary
        +list~string~ benefits
        +SelectionCriteria selectionCriteria
    }

    class Salary {
        +float min
        +float max
        +string currency
    }

    class SelectionCriteria {
        +list~string~ skills
        +string experience
        +float rating
        +Location location
    }

    class Location {
        +string postcode
        +string radius
    }

    class JobSeeker {
        +string id
        +list~string~ workStyles
        +list~string~ values
        +WorkingConditions workingConditions
        +string headline
        +list~PositionHistory~ positionHistory
        +list~string~ skills
        +string experience
        +string distance
    }

    class PositionHistory {
        +string position
        +string company
        +string duration
        +list~string~ skills
    }

    class Administration {
        +string id
        +Login login
    }

    class Login {
        +string username
        +string password
    }

    class Employee {
        +string id
        +string hashcode
        +string company
    }

    Company "1" -- "1" WorkingConditions : contains
    Company "1" -- "1" JobPosition : contains
    JobPosition "1" -- "1" Salary : contains
    JobPosition "1" -- "1" SelectionCriteria : contains
    SelectionCriteria "1" -- "1" Location : contains
    JobSeeker "1" -- "1" WorkingConditions : contains
    JobSeeker "1" -- "*" PositionHistory : has
    PositionHistory "1" -- "*" string : contains
    Administration "1" -- "1" Login : has
    Employee "1" -- "1" Company : worksAt


```


# Job Matching Analysis with Google NLU

This diagram represents the relationships between job seekers and their job matches based on the company's job postings and the match percentages.

## Mermaid Diagram of Job Seekers and Matches

```mermaid
classDiagram
    direction LR
    
    class JobSeeker {
        +string jobSeekerId
        +string jobSeeker
        +list~Match~ matches
    }
    
    class Match {
        +string companyName
        +string jobPost
        +string matchPercentage
    }

    JobSeeker "1" -- "*" Match : has
    
    %% Data sample for JS22345
    JobSeeker : "JS22345"
    JobSeeker : "Junior Data Scientist"
    Match : "CompanyName | Software Development Technical Lead | 33.33"
    Match : "TechInnovators | Data Scientist | 63.64"
    Match : "HealthTech Corp | Healthcare Product Manager | 33.33"
    Match : "GreenTech Solutions | Environmental Engineer | 33.33"
    Match : "FinServe Ltd. | Financial Analyst | 33.33"

    %% Data sample for JS12345
    JobSeeker : "JS12345"
    JobSeeker : "Experienced Full Stack Developer"
    Match : "CompanyName | Software Development Technical Lead | 100.00"
    Match : "TechInnovators | Data Scientist | 27.27"
    Match : "HealthTech Corp | Healthcare Product Manager | 63.64"
    Match : "GreenTech Solutions | Environmental Engineer | 27.27"
    Match : "FinServe Ltd. | Financial Analyst | 27.27"

    %% Data sample for JS67890
    JobSeeker : "JS67890"
    JobSeeker : "Senior Software Engineer"
    Match : "CompanyName | Software Development Technical Lead | 66.67"
    Match : "TechInnovators | Data Scientist | 27.27"
    Match : "HealthTech Corp | Healthcare Product Manager | 33.33"
    Match : "GreenTech Solutions | Environmental Engineer | 33.33"
    Match : "FinServe Ltd. | Financial Analyst | 33.33"

    %% Data sample for JS33456
    JobSeeker : "JS33456"
    JobSeeker : "Project Manager"
    Match : "CompanyName | Software Development Technical Lead | 41.67"
    Match : "TechInnovators | Data Scientist | 0.00"
    Match : "HealthTech Corp | Healthcare Product Manager | 66.67"
    Match : "GreenTech Solutions | Environmental Engineer | 8.33"
    Match : "FinServe Ltd. | Financial Analyst | 33.33"

    %% Data sample for JS44567
    JobSeeker : "JS44567"
    JobSeeker : "Marketing Specialist"
    Match : "CompanyName | Software Development Technical Lead | 33.33"
    Match : "TechInnovators | Data Scientist | 63.64"
    Match : "HealthTech Corp | Healthcare Product Manager | 33.33"
    Match : "GreenTech Solutions | Environmental Engineer | 66.67"
    Match : "FinServe Ltd. | Financial Analyst | 66.67"
