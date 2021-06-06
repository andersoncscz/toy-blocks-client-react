import { Box, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from 'react';

const Block = ({ block }) => {
    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Typography className={classes.title}>{block.id.padStart(3, '0')}</Typography>
            <Typography className={classes.description}>{block.attributes.data}</Typography>
        </Box>
    )
}

Block.propTypes = {
    block: {
        id: PropTypes.string,
        type: PropTypes.string,
        attributes: PropTypes.shape({
            index: PropTypes.number,
            timestamp: PropTypes.number,
            data: PropTypes.string,
            ['previous-hash']: PropTypes.string,
            hash: PropTypes.string,            
        })
    }
};

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: '4px',
        padding: '8px',
        borderRadius: '2px',
        background: 'rgba(0, 0, 0, 0.12)',
    },
    title: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '10px',
        lineHeight: '16px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#304FFE',
    },
    description: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '20px',        
        letterSpacing: '0.25px',
        color: '#263238',
    }
}))

export default Block