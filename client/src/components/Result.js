import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import {v4 as uuidv4} from 'uuid'

const Result = ({ processedText }) => {
  
  const mapWords = () => {
    return processedText.map(wordCount => {
      return <tr key={uuidv4()}>
        <td data-testid={`${wordCount[0]}-word`} key={uuidv4()}>{wordCount[0]}</td>
        <td data-testid={`${wordCount[0]}-count`} key={uuidv4()}>{wordCount[1]}</td>
      </tr>
    })
  }

  return(
    <Table data-testid="results-table">
      <thead>
        <tr>
          <th>Word</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {mapWords()}
      </tbody>
    </Table>
  )
}

export default Result