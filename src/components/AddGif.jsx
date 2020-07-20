import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const InputField = styled(TextField)`
  margin-bottom: 20px;
  width: 100%;
`

const AddButton = styled(Button)`
  width: 100%;
`

/**
 * Component to show form for adding a gif
 * Uses controlled inputs
 * @param addGif The function to add a gif to the state
 */
export const AddGif = ({ addGif }) => {
  // Valid reflects whether there is an input in both name and url
  const [gif, setGif] = useState({
    name: '',
    url: '',
    valid: false
  })

  /**
   * Update the gif name and validity from an input event
   * @param {object} evt onChange event
   */
  const updateName = (evt) => {
    evt.persist()
    setGif(prevState => ({
      ...prevState,
      name: evt.target.value,
      valid: prevState.url && evt.target.value
    }))
  }

  /**
   * Update the GIF Url and validity
   * @param {object} evt onChange event
   */
  const updateUrl = (evt) => {
    evt.persist()
    setGif(prevState => ({
      ...prevState,
      url: evt.target.value,
      valid: prevState.name && evt.target.value
    }))
  }

  /**
   * Handle button click to add GIF
   */
  const handleClick = () => {
    addGif({
      name: gif.name,
      url: gif.url
    })
  }

  return <React.Fragment>
    <h2>Add Gif</h2>
    <Grid item xs={12}>
      <InputField onChange={updateName} label="GIF name" value={gif.name} variant="outlined" />
    </Grid>
    <Grid item xs={12}>
      <InputField onChange={updateUrl} label="GIF url" value={gif.url} variant="outlined" />
    </Grid>
    <Grid xs={12}>
      <AddButton variant="contained" color="primary" disabled={!gif.valid} onClick={handleClick}>Add GIF</AddButton>
    </Grid>
  </React.Fragment>
}

AddGif.propTypes = {
  addGif: PropTypes.func.isRequired
}
