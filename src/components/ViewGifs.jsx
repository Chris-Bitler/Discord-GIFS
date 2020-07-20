import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { hot } from 'react-hot-loader'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

/**
 * Various CSS classes to override some styles from material-ui
 */
const ComboBox = styled(Autocomplete)`
  margin-bottom: 20px;
`
const Gif = styled.img`
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 100%;
`
const Buttons = styled.span`
margin-bottom: 10px;
`
const SpacedButton = styled(Button)`
margin-right: 10px;
`
const Divider = styled.hr`
margin-top: 30px;
width: 100%;
display: block;
`

/**
 * Component to show the GIF combobox along with the gif itself and buttons to copy link/delete
 * @param {[]} gifs Array of gif objects representing the saved gifs
 * @param {function} deleteGif Function to delete a given gif
 */
const ViewGifs = ({ gifs, deleteGif }) => {
  const [currentGif, setCurrentGif] = useState()

  /**
   * Update the selected gif from the combobox selection
   * @param {object} event The event
   * @param {object} value The value selected
   */
  const updateSelectedGif = (event, value) => {
    setCurrentGif(value)
  }

  /**
   * Copy the current GIF's url to the clipboard
   * This seems to be the most effective way to do it from within javascript..
   */
  const copyGifToClipboard = () => {
    const element = document.createElement('textarea')
    element.value = currentGif.url
    element.setAttribute('readonly', '')
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    document.body.appendChild(element)
    element.select()
    document.execCommand('copy')
    document.body.removeChild(element)
  }

  /**
   * Delete the current gif from the state
   */
  const delGif = () => {
    deleteGif(currentGif)
    setCurrentGif(null)
  }

  return <React.Fragment>
    <Grid item xs={12}>
      <ComboBox
        id="combo-box"
        options={gifs}
        onChange={updateSelectedGif}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select GIF" variant="outlined" />}
      />
    </Grid>
    <Grid item xs={12}>
      {currentGif && <Gif src={currentGif.url} />}
    </Grid>
    <Grid item xs={12}>
      {currentGif && (
        <Buttons>
          <SpacedButton variant="contained" color="primary" onClick={copyGifToClipboard}>Copy GIF Link</SpacedButton>
          <SpacedButton variant="contained" color="secondary" onClick={delGif}>Delete</SpacedButton>
        </Buttons>
      )}
    </Grid>
    <Divider />
  </React.Fragment>
}

export default hot(module)(ViewGifs)

ViewGifs.propTypes = {
  gifs: PropTypes.array.isRequired,
  deleteGif: PropTypes.func.isRequired
}
