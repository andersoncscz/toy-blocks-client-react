import {
  Box,


  CircularProgress, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary,
  makeStyles, Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import React from "react";
import colors from "../constants/colors";
import Block from './Block';
import Status from "./Status";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();

  function renderExpansionPanelDetails() {
    if (node.blocks && node.blocks.error) {
      return (
        <Box className={classes.blockMessageContainer}>
          <Typography className={classes.blockMessageError}>{'Sorry, something went wrong.'}</Typography>
        </Box>
      )
    }

    if (node.loading) {
      return (
        <Box className={classes.blockLoadingContainer}>
          <CircularProgress color="primary" />
        </Box>        
      )

    }

    if (node.blocks && node.blocks.list.length > 0) {
      return (
        <Box className={classes.blockContainer}>
          {node.blocks.list.map(block => <Block key={block.id} block={block} />)}
        </Box>        
      )
    }    

    return (
      <Box className={classes.blockMessageContainer}>
        <Typography className={classes.blockMessageEmpty}>{"There's nothing to show."}</Typography>
      </Box>      
    )
  }

  return (
    <ExpansionPanel
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <ExpansionPanelSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {renderExpansionPanelDetails()}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  blockContainer: {
    flex: 1,
    marginTop: '-12px',
  },
  blockMessageContainer: {
    flex: 1,
    padding: '8px',
    alignItems: 'flex-start',
  },
  blockLoadingContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
  },
  blockMessageError: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',        
    letterSpacing: '0.25px',
    color: 'red',
  },
  blockMessageEmpty: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',        
    letterSpacing: '0.25px',
    color: '#263238',
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
