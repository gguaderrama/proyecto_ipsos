import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'

const ParentPopupState = React.createContext(null)

const CascadingHoverMenusHooksCode = () => {
  const popupState = usePopupState({ popupId: 'demoMenu', variant: 'popover' })
  return (
    <div style={{ height: 600 }}>
      <Button variant="contained" {...bindHover(popupState)}>
        Hover to open Menu
      </Button>
      <ParentPopupState.Provider value={popupState}>
        <Menu
          {...bindMenu(popupState)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={popupState.close}>Tea</MenuItem>
          <MenuItem onClick={popupState.close}>Cake</MenuItem>
          <MenuItem onClick={popupState.close}>Death</MenuItem>
          <Submenu popupId="moreChoicesMenu" title="More Choices">
            <MenuItem onClick={popupState.close}>Cheesecake</MenuItem>
            <MenuItem onClick={popupState.close}>Cheesedeath</MenuItem>
            <Submenu popupId="evenMoreChoicesMenu" title="Even More Choices">
              <MenuItem onClick={popupState.close}>Cake (the band)</MenuItem>
              <MenuItem onClick={popupState.close}>Death Metal</MenuItem>
            </Submenu>
            <Submenu popupId="moreBenignChoices" title="More Benign Choices">
              <MenuItem onClick={popupState.close}>Salad</MenuItem>
              <MenuItem onClick={popupState.close}>Lobotomy</MenuItem>
            </Submenu>
          </Submenu>
        </Menu>
      </ParentPopupState.Provider>
    </div>
  )
}

export default CascadingHoverMenusHooksCode

const submenuStyles = theme => ({
  menu: {
    top: -theme.spacing.unit,
  },
  title: {
    flexGrow: 1,
  },
  moreArrow: {
    marginRight: theme.spacing.unit * -1,
  },
})

const Submenu = withStyles(submenuStyles)(
  ({ classes, title, popupId, children, ...props }) => {
    const parentPopupState = React.useContext(ParentPopupState)
    const popupState = usePopupState({
      popupId,
      variant: 'popover',
      parentPopupState,
    })
    return (
      <ParentPopupState.Provider value={popupState}>
        <MenuItem {...bindHover(popupState)} selected={popupState.isOpen}>
          <ListItemText className={classes.title}>{title}</ListItemText>
          <ChevronRight className={classes.moreArrow} />
        </MenuItem>
        <Menu
          {...bindMenu(popupState)}
          className={classes.menu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
          {...props}
        >
          {children}
        </Menu>
      </ParentPopupState.Provider>
    )
  }
)
