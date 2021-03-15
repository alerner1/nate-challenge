import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {v4 as uuidv4} from 'uuid'

const Result = ({ processedText, urlPath, submitted }) => {
  
  const mapWords = () => {
    for (const dataChunk of processedText) {
      return dataChunk.map(wordCount => {
        return <tr key={uuidv4()}>
          <td data-testid={`${wordCount[0]}-word`} key={uuidv4()}>{wordCount[0]}</td>
          <td data-testid={`${wordCount[0]}-count`} key={uuidv4()}>{wordCount[1]}</td>
        </tr>
      })
    }
  }

  return(
    <Row>
      <Col xs={{ span: 6, offset: 3}}>
        <h3 className="text-center"><a href={urlPath}>{urlPath}</a></h3>
        {submitted ?
          <Table data-testid="results-table">
            { processedText.length > 0 ?
                <>
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {mapWords()}
                </tbody>
                </>
              :
                'Loading...'
            }
          </Table>
          :
          null
        }
      </Col>
    </Row>
  )
}

export default Result