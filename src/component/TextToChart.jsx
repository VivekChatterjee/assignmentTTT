import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Papa from "papaparse";
import "./textToChart.css";

const TextToChart = () => {
  const [fetchedWords, setFetchedWords] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Word: ${payload[0].payload.word}`}</p>
          <p className="count">{`Count: ${payload[0].payload.count}`}</p>
        </div>
      );
    }

    return null;
  };

  const getAndParseWords = async () => {
    const dataObject = await axios.get(
      "https://www.terriblytinytales.com/test.txt"
    );
    const words = dataObject.data.split(/\s+/);
    const wordsCount = {};

    words.forEach((word) => {
      const lowerCaseWord = word.toLowerCase();
      wordsCount[lowerCaseWord] = (wordsCount[lowerCaseWord] || 0) + 1;
    });

    const wordsInSortedOrder = Object.entries(wordsCount).sort(
      (a, b) => b[1] - a[1]
    );
    const topTwentyWords = wordsInSortedOrder
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));

    setFetchedWords(topTwentyWords);
  };

  const exportCSV = () => {
    const csv = Papa.unparse(fetchedWords);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ttt-words-frequency.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {!fetchedWords && <button onClick={getAndParseWords}>Submit</button>}
      {fetchedWords && (
        <>
          <button onClick={exportCSV}>Export</button>
          <BarChart
            style={{ cursor: "pointer" }}
            width={810}
            height={350}
            data={fetchedWords}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis stroke="white" dataKey="word" />
            <YAxis stroke="white" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="count" fill="#05BFDB" />
          </BarChart>
        </>
      )}
    </>
  );
};

export default TextToChart;
