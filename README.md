
# 🎬 Movie Searcher App (Salesforce LWC)

This is a Lightning Web Component (LWC) based Movie Search App built on the Salesforce platform.  
It allows users to search for movies or series by entering a keyword and a page number.  
The app fetches real-time results using the **IMDB API** and displays relevant movie information.

---

## 🔍 Features

- 🔎 **Search Movies or Series**  
  Enter the title and page number to search for movies/series via the IMDB API.

- 🧩 **Component Communication Patterns**
  - **Parent-to-Child** communication
  - **Child-to-Parent** communication
  - **Independent Components using Message Channel**

- 📦 **IMDB API Integration**  
  Fetches data from IMDB and renders the results in the UI.

- 🎨 Clean and responsive Lightning UI

---

## 🛠️ Technologies Used

- Salesforce LWC (Lightning Web Components)
- Apex
- Lightning Message Channel
- IMDB API
- HTML/CSS

---

## 🖼️ Screenshot

![Movie Details UI](<img width="1904" height="819" alt="image" src="https://github.com/user-attachments/assets/2922dd90-526e-4739-b1a2-135c95ee0ff8" />)

---

## 📂 Project Structure

```text
lwc/
├── movieSearch     // input fields for search term and page number
├── movieTile           // displays list of results
├── movieDetails           // individual movie card
├── movieMessageChannel // Lightning Message Channel for cross-component comm
