import React, { useContext, useState } from 'react'
import Popover from '@material-ui/core/Popover'
import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { SettingsContext } from '../contexts/settings'
import { FiltersContext } from '../contexts/filters'

import styles from './style/PageListTools.module.scss'
import dropdownStyles from './style/Dropdown.module.scss'

const PageListTools = () => {
  const { settings } = useContext(SettingsContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopup = () => {
    setAnchorEl(null)
  }

  const handleSort = sort => {
    handleClosePopup()
    updateFilters({
      sort
    })
  }

  return (
    <div className={styles.tools}>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handlePopup}
      >
        {filters.sort === 'createdAsc' ? (
          <span>Created <FiArrowUp /></span>
        ) : (
          filters.sort === 'createdDesc' ? (
            <span>Created <FiArrowDown /></span>
          ) : (
            filters.sort === 'titleAsc' ? (
              <span>Title <FiArrowUp /></span>
            ) : (
              filters.sort === 'titleDesc' ? (
                <span>Title <FiArrowDown /></span>
              ) : (
                <span>Sort Notes</span>
              )
            )
          )
        )}
        
      </button>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClosePopup}
      >
        <div className={`${settings.theme} ${dropdownStyles.contentSm}`}>
          <span className={styles.title}>Sort Notes</span>
          <ul className={styles.menu}>
            {filters.sort === 'createdDesc' ? (
              <li onClick={() => handleSort('createdAsc')}><FiArrowUp />Created</li>
            ) : (
              <li onClick={() => handleSort('createdDesc')}><FiArrowDown />Created</li>
            )}
            {filters.sort === 'titleAsc' ? (
              <li onClick={() => handleSort('titleDesc')}><FiArrowDown />Title</li>
            ) : (
              <li onClick={() => handleSort('titleAsc')}><FiArrowUp />Title</li>
            )}
          </ul>
        </div>
      </Popover>
    </div>
  )
}
 
export default PageListTools
