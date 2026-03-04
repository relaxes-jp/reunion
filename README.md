# Former colleague reunion

Alumni Directory App (LINE LIFF & Google Apps Script)
This application is a dedicated alumni directory system built with LINE LIFF and Google Apps Script (GAS). It allows members of a specific LINE group to register their information, search for classmates, and export the directory as a PDF.

## 🚀 Features
* Member Registration & Profile Updates: 
  
  Users can easily register their name, maiden name, affiliation, and a personal message/update.

* Search Functionality: 
  
  A real-time search interface to find fellow alumni by name, maiden name, or LINE display name.

* PDF Generation: 
  
  Generates a professional A4-sized PDF directory with custom layouts, hosted on Google Drive.

  * Smart Caching: 
    
      To save server resources, only one PDF is generated per day. Subsequent requests on the same day will open the existing file.

* LINE Group Integration:

  * Strict access control: Only members within a specific LINE Group ID can access the app.

  * Optional notifications: Users can choose to notify the group when they update their profile.

## 🛠 Technology Stack
* Frontend: HTML5, CSS3, JavaScript (Vanilla JS)

* Platform: LINE Front-end Framework (LIFF)

* Backend: Google Apps Script (GAS)

* Database: Google Sheets

* Storage: Google Drive (for PDF hosting)

## 🔒 Security & Access Control
To ensure data privacy and prevent unauthorized access, the app implements a robust security architecture:

1. Server-Side Identity Management:
Sensitive identifiers, such as the Authorized Group ID, are stored securely within GAS Script Properties. They are never hard-coded in the frontend source code, preventing accidental leaks on GitHub.

2. Backend Validation (Single Source of Truth):
Every request from the LIFF app includes the groupId from the user's context. The GAS backend validates this against the stored "Authorized ID" before processing any data (Search, Register, or PDF Generation). Access is immediately denied if the IDs do not match.

3. Frontend Access Restriction:
Upon initialization, the app fetches the validation status from the backend. If the user is accessing from outside the designated group, the UI is automatically locked to prevent unauthorized interaction.

## 📄 PDF Layout Details
The exported PDF is optimized for A4 Portrait orientation:

* Auto-scaling: 
  
  Columns are adjusted to fit the page width.

* Focused Content: 
  
  The "Current Status/Message" column is given maximum width for readability.

* Daily Snapshots: 
  
  Files are named with timestamps (e.g., Directory_20260303.pdf) for easy organization.