import React, { useEffect, useMemo, useState } from 'react'
import { hot } from 'react-hot-loader'
import { AddGif } from './AddGif'
import Grid from '@material-ui/core/Grid'
import ViewGifs from './ViewGifs'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

/**
 * Main application class. Handles setting up global state and theme
 * @param {boolean} darkMode To use the dark mode theme or not
 */
const Application = ({ darkMode }) => {
  const [gifs, setGifs] = useState([])
  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light'
      }
    })
  }, [darkMode])

  /**
   * Load the existing values from local storage
   */
  useEffect(() => {
    const storageJSON = localStorage.getItem('gifs')
    if (storageJSON) {
      const storage = JSON.parse(storageJSON)
      setGifs(storage.gifs)
    }
  }, [])

  /**
   * Update the local storage whenever a gif is added or removed from state
   */
  useEffect(() => {
    localStorage.setItem('gifs', JSON.stringify({ gifs: gifs }))
  }, [gifs])

  /**
   * Update state to include new gif
   * @param {object} gif New gif, with name and url
   */
  const addGif = (gif) => {
    setGifs([
      ...gifs,
      gif
    ])
  }

  const deleteGif = (gif) => {
    const filteredGifs = gifs.filter((element) => {
      return element.name !== gif.name && element.url !== gif.url
    })
    setGifs(filteredGifs)
  }

  return <ThemeProvider theme={theme}>
    <Grid container>
      <ViewGifs gifs={gifs} deleteGif={deleteGif} />
      <AddGif addGif={addGif} />
    </Grid>
  </ThemeProvider>
}

export default hot(module)(Application)

Application.propTypes = {
  darkMode: PropTypes.bool.isRequired
}
