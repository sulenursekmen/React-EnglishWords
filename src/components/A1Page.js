import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Pagination from "@mui/material/Pagination";
import SortIcon from "@mui/icons-material/Sort";
import axios from "axios";

function A1Page() {
  return (
    <div>
      <CollapsibleTable />
    </div>
  );
}

function CollapsibleTable() {
  const [openIndex, setOpenIndex] = useState(null);
  const [words, setWords] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 20;
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/words/list")
      .then((response) => {
        const sortedWords = response.data.sort((a, b) =>
          a.word.localeCompare(b.word)
        );
        setWords(sortedWords);
        setLearnedWords(new Array(sortedWords.length).fill(false));
      })
      .catch((error) => {
        console.error("There was an error fetching the words", error);
      });
  }, []);

  const handleCheckboxChange = (index) => {
    const newLearnedWords = [...learnedWords];
    newLearnedWords[index] = !newLearnedWords[index];
    setLearnedWords(newLearnedWords);
  };

  const handleRowClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLearnedSelectChange = async (index, value) => {
    const postData = {
      id: words[index].id,
      is_learned: value === "learned",
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/words/update-learned-status",
        postData
      );
      console.log("Post Response:", response.data);

      const newWords = [...words];
      newWords[index].is_learned = value === "learned";
      setWords(newWords);
    } catch (error) {
      console.error("There was an error posting the data", error);
    }
  };

  const filteredWords = words.filter(
    (word) =>
      word.level === "A1" &&
      word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = (currentPage - 1) * wordsPerPage;
  const currentWords = filteredWords.slice(indexOfFirstWord, indexOfLastWord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Math.ceil(filteredWords.length / wordsPerPage);

  const handleSort = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    const sortedWords = [...words].sort((a, b) => {
      const comparison = a.word.localeCompare(b.word);
      return newSortDirection === "asc" ? comparison : -comparison;
    });
    setWords(sortedWords);
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 600,
          margin: "16px auto",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 8 }}
          placeholder="Search Word"
          inputProps={{ "aria-label": "search word" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton
            aria-label={`sort-${sortDirection}`}
            size="small"
            onClick={handleSort}
          >
            <SortIcon />
          </IconButton>
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
            <TableCell></TableCell>
              <TableCell>#</TableCell>
              <TableCell>English Word</TableCell>
              <TableCell>Meaning</TableCell>
              <TableCell>Learned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentWords.map((word, index) => (
              <Row
                key={word.word}
                row={word}
                index={indexOfFirstWord + index}
                isOpen={openIndex === indexOfFirstWord + index}
                onRowClick={() => handleRowClick(indexOfFirstWord + index)}
                learned={learnedWords[indexOfFirstWord + index]}
                onCheckboxChange={() =>
                  handleCheckboxChange(indexOfFirstWord + index)
                }
                onLearnedSelectChange={(value) =>
                  handleLearnedSelectChange(indexOfFirstWord + index, value)
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={pageNumbers}
          page={currentPage}
          onChange={(event, value) => paginate(value)}
        />
      </div>
    </div>
  );
}

function Row({
  row,
  index,
  isOpen,
  onRowClick,
  learned,
  onCheckboxChange,
  onLearnedSelectChange,
}) {
  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: learned ? "orange" : "inherit",
          },
        }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onRowClick}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell component="th" scope="row">
          {row.word}
        </TableCell>
        <TableCell>{row.mean}</TableCell>
        <TableCell>
          <Checkbox checked={learned} onChange={onCheckboxChange} />
          {/* Removed the Select component */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div">
                Example Sentence
              </Typography>
              <Typography variant="body2">{row.sentence}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


export default A1Page;
