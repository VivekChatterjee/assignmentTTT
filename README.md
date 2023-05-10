Hey, Welcome to this Repository!

## Running the App
To run this app in your local system, simply download the zip. After unzip, run command **npm install** in the terminal and finally **npm run dev** command to get started.

This project was created using vite with [npm create vite](https://vitejs.dev/guide/)).

## Packages

1. axios package has been used for making HTTP requests, for fetching the contents of the test.txt file.
2. recharts package, which is a charting library built on react components. It is used here for creating histogram.
3. papaparse package, which is a powerful CSV parser and exporter. It has been used for exporting the histogram data as a CSV file.

## Components

The App contains two functions. 

1. getAndParseWords: This function is responsible for fetching the content of the test.txt file from ttt website and then parsing it to get the 20 most frequent words and storing them in a useState variable.

2. exportCSV: This function is responsible for exporting the histogram data as a CSV file and letting users download it when the "Export" button is clicked.

Return part contains the following:

1. A React Fragment wrapping up the whole component.  
2. A Submit button which is displayed on page load, after clicking, it gets hidden. When it is clicked, the app starts to fetch content from the text file.
3. Now when the data has been stored in a variable, then only an Export button along with the Bar Chart is shown on the screen, both enclosed in a React Fragment.
4. Export has an Onclick event handler which exports the data into CSV file when clicked.
5. Custom Toolkit have been used for external styling.

[Visit the Deployed Link](https://assignment-ttt.netlify.app/)
